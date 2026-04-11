const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', 'utf8');

// Replace static lang read with useState
c = c.replace(
  "const lang = (localStorage.getItem('i18nextLng') || 'en') as Lang\n  const t = getLandingT(lang)",
  "const [lang, setLang] = useState<Lang>((localStorage.getItem('i18nextLng') || 'en') as Lang)\n  const t = getLandingT(lang)\n\n  useEffect(() => {\n    const onStorage = () => setLang((localStorage.getItem('i18nextLng') || 'en') as Lang)\n    window.addEventListener('storage', onStorage)\n    // Also check on focus in case changed in same tab\n    const onFocus = () => setLang((localStorage.getItem('i18nextLng') || 'en') as Lang)\n    window.addEventListener('focus', onFocus)\n    return () => { window.removeEventListener('storage', onStorage); window.removeEventListener('focus', onFocus) }\n  }, [])"
);

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/LandingPage.tsx', c, 'utf8');
console.log('done:', c.includes('useState<Lang>'));