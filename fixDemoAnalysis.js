const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', 'utf8');

// Find envLimits and the problematic area after it
const envIdx = c.indexOf("envLimits: '+5");
const afterEnv = c.indexOf("'", envIdx + 10);
const lineEnd = c.indexOf('\n', afterEnv);

console.log('envLimits ends at:', lineEnd);
console.log('next chars:', JSON.stringify(c.slice(lineEnd, lineEnd + 50)));

// After envLimits value, we need to close the return object with }
// Currently it goes straight to </button> which is JSX outside the object
// Need to add: ,\n    entries: [...],\n  }
// But actually we need to find where the entries array is and include it

// The object needs to be closed before the JSX. 
// Let's find what comes after envLimits - should be entries
const entriesIdx = c.indexOf('entries:', c.indexOf('getDemoAnalysis'));
console.log('entries at:', entriesIdx);

// If envLimits is after entries, we just need to close the object
// Check: is envLimits before or after entries?
console.log('envLimits at:', envIdx, 'entries at:', entriesIdx);

// envLimits should come BEFORE entries (or after, in the object)
// The issue is envLimits is at the END of the object, missing closing }
// Add } after the envLimits line
const fix = c.slice(0, lineEnd) + '\n  }' + c.slice(lineEnd);
c = fix;

// But wait - we also need to check if entries are in the object
// Let's check the full getDemoAnalysis function
const getDemoStart = c.indexOf('function getDemoAnalysis');
const getDemoEnd = c.indexOf('\nexport function', getDemoStart);
console.log('getDemoAnalysis body:', c.slice(getDemoStart, getDemoEnd).slice(0, 500));

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/SamplePDFButtons.tsx', c, 'utf8');