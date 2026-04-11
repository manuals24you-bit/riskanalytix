const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/App.tsx', 'utf8');

// Add TermsPage import
if (!c.includes('TermsPage')) {
  c = c.replace(
    "import TermsPage",
    "import TermsPage"
  );
  // Add import after existing imports
  c = c.replace(
    "import PrivacyPage",
    "import TermsPage        from './pages/legal/TermsPage'\nimport PrivacyPage"
  );
}

// Add route
if (!c.includes("path=\"/terms\"") && !c.includes("path='/terms'")) {
  c = c.replace(
    "path=\"/privacy\"",
    "path=\"/terms\"   element={<TermsPage />} />\n      <Route path=\"/privacy\""
  );
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/App.tsx', c, 'utf8');
console.log('terms route:', c.includes('/terms'));
console.log('TermsPage import:', c.includes('TermsPage'));