const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/dashboard/DashboardPage.tsx', 'utf8');

// 1. Add useMutation import
c = c.replace(
  "import { useQuery } from '@tanstack/react-query'",
  "import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'"
);

// 2. Add queryClient and duplicate mutation after navigate declaration
c = c.replace(
  "  const { user, logout } = useAuthStore()",
  `  const { user, logout } = useAuthStore()
  const queryClient = useQueryClient()
  const duplicateMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.post(\`/analyses/\${id}/duplicate\`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analyses'] })
    },
  })`
);

// 3. Add duplicate button next to open button
const oldBtn = `<button onClick={() => navigate(\`/analysis/\${a.id}\`)} style={{ padding: '5px 12px', borderRadius: '5px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '11px' }}>
                            {t('dashboard.open')}
                          </button>`;

const newBtns = `<div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => navigate(\`/analysis/\${a.id}\`)} style={{ padding: '5px 12px', borderRadius: '5px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '11px' }}>
                            {t('dashboard.open')}
                          </button>
                          <button
                            onClick={() => duplicateMutation.mutate(a.id)}
                            disabled={duplicateMutation.isPending}
                            title={t('dashboard.duplicate') || 'Duplikuj analizę'}
                            style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '11px' }}
                          >
                            📋
                          </button>
                        </div>`;

if (c.includes(oldBtn)) {
  c = c.replace(oldBtn, newBtns);
  console.log('buttons added');
} else {
  console.log('button not found');
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/dashboard/DashboardPage.tsx', c, 'utf8');
console.log('duplicateMutation:', c.includes('duplicateMutation'));