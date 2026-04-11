const fs = require('fs');

// 1. Add edit route to App.tsx
let app = fs.readFileSync('C:/Projects/riskpro/frontend/src/App.tsx', 'utf8');
app = app.replace(
  "<Route path=\"/analysis/new\"   element={<PrivateRoute><NewAnalysisPage /></PrivateRoute>} />",
  "<Route path=\"/analysis/new\"   element={<PrivateRoute><NewAnalysisPage /></PrivateRoute>} />\n      <Route path=\"/analysis/:id/edit\" element={<PrivateRoute><NewAnalysisPage /></PrivateRoute>} />"
);
fs.writeFileSync('C:/Projects/riskpro/frontend/src/App.tsx', app, 'utf8');
console.log('edit route added:', app.includes('/edit'));

// 2. Add useParams and edit mode to NewAnalysisPage
let page = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Add useParams import
page = page.replace(
  "import { useNavigate } from 'react-router-dom'",
  "import { useNavigate, useParams } from 'react-router-dom'"
);

// Add useQuery import if not present
if (!page.includes('useQuery')) {
  page = page.replace(
    "import { useMutation } from '@tanstack/react-query'",
    "import { useMutation, useQuery } from '@tanstack/react-query'"
  );
}

// Add edit mode logic after useNavigate
const navigateDecl = "  const navigate = useNavigate()";
const editModeLogic = `  const navigate = useNavigate()
  const { id: editId } = useParams<{ id: string }>()
  const isEditMode = !!editId

  // Load existing analysis for edit mode
  const { data: existingAnalysis } = useQuery({
    queryKey: ['analysis', editId],
    queryFn: async () => {
      if (!editId) return null
      const { data } = await api.get(\`/analyses/\${editId}\`)
      return data
    },
    enabled: !!editId,
  })`;

page = page.replace(navigateDecl, editModeLogic);

// Apply existing data to form and entries when loaded
// Find where form state is initialized and add useEffect
const formInit = "  const [form, setForm] = useState<AnalysisForm>(EMPTY_FORM)";
const formWithEffect = `  const [form, setForm] = useState<AnalysisForm>(EMPTY_FORM)
  const [entries, setEntries] = useState<RiskEntry[]>([])

  // Load existing analysis data in edit mode
  useEffect(() => {
    if (existingAnalysis && isEditMode) {
      const { riskEntries, ...analysisData } = existingAnalysis
      setForm({
        machineName: analysisData.machineName || '',
        machineCategory: analysisData.machineCategory || '',
        machineTypeId: analysisData.machineTypeId || '',
        riskMethod: analysisData.riskMethod || 'SxP',
        intendedUse: analysisData.intendedUse || '',
        foreseenMisuse: analysisData.foreseenMisuse || '',
        spaceLimits: analysisData.spaceLimits || '',
        timeLimits: analysisData.timeLimits || '',
        envLimits: analysisData.envLimits || '',
        serialNo: analysisData.serialNo || '',
        manufacturer: analysisData.manufacturer || '',
        productionYear: analysisData.productionYear ? String(analysisData.productionYear) : '',
        purpose: analysisData.purpose || '',
        norm: analysisData.norm || '',
        analystName: analysisData.analystName || '',
        analysisDate: analysisData.analysisDate ? analysisData.analysisDate.slice(0, 10) : '',
        notes: analysisData.notes || '',
        clientName: analysisData.clientName || '',
        clientCompany: analysisData.clientCompany || '',
        clientNip: analysisData.clientNip || '',
        clientAddress: analysisData.clientAddress || '',
      })
      if (riskEntries?.length) {
        setEntries(riskEntries.map((e: any) => ({ ...e, id: e.id || String(Math.random()) })))
      }
    }
  }, [existingAnalysis, isEditMode])`;

// Replace existing form and entries declarations
page = page.replace(formInit, formWithEffect);

// Remove duplicate entries declaration if exists
page = page.replace(
  /\n  const \[entries, setEntries\] = useState<RiskEntry\[\]>\(\[\]\)\n\n  \/\/ Load existing/,
  '\n\n  // Load existing'
);

// Add useEffect import
if (!page.includes('useEffect')) {
  page = page.replace(
    "import { useState",
    "import { useState, useEffect"
  );
}

// Update save function to use PUT when editing
page = page.replace(
  "await api.post('/analyses', {",
  "await (isEditMode ? api.put(`/analyses/${editId}`, { : api.post('/analyses', {)) })\n      // fix below\n      const _unused = await api.post('/analyses', {"
);

// Actually let's do a cleaner replace
page = page.replace(
  "      const _unused = await api.post('/analyses', {",
  "      // cleaned up"
);
page = page.replace(
  "await (isEditMode ? api.put(`/analyses/${editId}`, { : api.post('/analyses', {)) })\n      // fix below\n",
  ""
);

// Clean save - find the actual save call
const saveIdx = page.indexOf("await api.post('/analyses'");
if (saveIdx > -1) {
  // Find the closing of this api call
  const saveEnd = page.indexOf("      navigate('/analysis/", saveIdx);
  const saveCall = page.slice(saveIdx, saveEnd);
  const newSaveCall = saveCall.replace(
    "await api.post('/analyses',",
    "await (isEditMode ? api.put(`/analyses/${editId}`, : api.post('/analyses',"
  );
  // Close the ternary
  const closingParen = newSaveCall.lastIndexOf(')');
  const fixedSaveCall = newSaveCall.slice(0, closingParen) + ')' + newSaveCall.slice(closingParen);
  page = page.slice(0, saveIdx) + fixedSaveCall + page.slice(saveEnd);
}

// Update page title for edit mode
page = page.replace(
  "{t('analysis.step4')}",
  "{isEditMode ? (t('analysis.editAnalysis') || 'Edytuj analizę') : t('analysis.step4')}"
);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', page, 'utf8');
console.log('edit mode added');
console.log('useParams:', page.includes('useParams'));
console.log('isEditMode:', page.includes('isEditMode'));
console.log('useEffect:', page.includes('useEffect'));