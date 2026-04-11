const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Find the return statement in entries.map - need to wrap both <tr> in <>...</>
// Find: return (
//         <tr key={e.id} ...
// and wrap it with <> to include the justification row

const step3 = c.indexOf('STEP 3');
const entriesMap = c.indexOf('entries.map', step3);
const returnIdx = c.indexOf('                        return (\n', entriesMap);
const returnIdxCRLF = c.indexOf('                        return (\r\n', entriesMap);
const actualReturn = returnIdx > -1 ? returnIdx : returnIdxCRLF;
console.log('return at:', actualReturn);

// Find the closing ) of the return statement (after justification row closes)
const justEnd = c.indexOf('                        </tr>', c.indexOf('Justification row'));
const justEndClose = justEnd + 30; // after </tr>
console.log('justification </tr> at:', justEnd);
console.log('context after:', JSON.stringify(c.slice(justEnd, justEnd + 60)));

// Find the next return closing - look for "\n                      )\n                    })"
const returnClose = c.indexOf('\n                      )\n                    })', justEnd);
console.log('return close at:', returnClose);

if (actualReturn > -1 && returnClose > -1) {
  // Replace: return (\n                        <tr  with: return (\n                        <>\n                        <tr
  const oldReturn = c.slice(actualReturn, actualReturn + 50);
  console.log('old return:', JSON.stringify(oldReturn));
  
  // Insert <> after return (
  const insertAfterReturn = actualReturn + '                        return (\n'.length;
  c = c.slice(0, insertAfterReturn) + '                        <>\n' + c.slice(insertAfterReturn);
  
  // Now find the return close and insert </> before it
  const newReturnClose = c.indexOf('\n                      )\n                    })', justEnd);
  c = c.slice(0, newReturnClose) + '\n                        </>' + c.slice(newReturnClose);
  
  console.log('wrapped with Fragment');
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');