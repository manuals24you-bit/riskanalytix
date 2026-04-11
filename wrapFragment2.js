const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', 'utf8');

// Find the entries.map in step 3 (around line 370 area, before step 4)
// We know justification row is around line 604
// The issue: justification <tr> is OUTSIDE the return() of entries.map

// Strategy: find the return ( ... ) in entries.map that contains the first <tr>
// and make it return a fragment with both rows

// Find the exact return statement containing our table rows
const justRowComment = '                        {/* Justification row */}';
const justIdx = c.indexOf(justRowComment);
console.log('justification row at:', justIdx);

// The return statement should be before the first <tr>
// Go backwards from justIdx to find "return ("
let returnSearchIdx = justIdx;
while (returnSearchIdx > 0) {
  const candidate = c.lastIndexOf('return (', returnSearchIdx - 1);
  if (candidate === -1) break;
  // Check if this is inside entries.map
  const nextLine = c.slice(candidate, candidate + 200);
  if (nextLine.includes('<tr key={e.id}')) {
    returnSearchIdx = candidate;
    break;
  }
  returnSearchIdx = candidate;
}
console.log('return ( at:', returnSearchIdx, JSON.stringify(c.slice(returnSearchIdx, returnSearchIdx + 60)));

// Find the closing ) of this return
// The return closes after the justification row's </tr>
const justTrEnd = c.indexOf('</tr>', justIdx + justRowComment.length);
console.log('just </tr> at:', justTrEnd);

// Find closing ) after that
let closeIdx = c.indexOf(')', justTrEnd);
// But we need the return's ) not a style )
// Look for the pattern: \n                      )
const returnClosePattern = '\n                      )';
const closeIdx2 = c.indexOf(returnClosePattern, justTrEnd);
console.log('return close at:', closeIdx2, JSON.stringify(c.slice(closeIdx2, closeIdx2 + 20)));

if (returnSearchIdx > 0 && closeIdx2 > 0) {
  // Find where <tr key={e.id} starts (after "return (")
  const trStart = c.indexOf('<tr key={e.id}', returnSearchIdx);
  
  // Replace: return (\n                        <tr  
  // with: return (\n                        <>\n                        <tr
  c = c.slice(0, trStart) + '<>\n                        ' + c.slice(trStart);
  
  // Now find the closing ) again (shifted by '<>\n                        '.length)
  const shift = '<>\n                        '.length;
  const newCloseIdx = c.indexOf(returnClosePattern, justTrEnd + shift);
  
  // Insert </> before the return closing )
  c = c.slice(0, newCloseIdx) + '\n                        </>' + c.slice(newCloseIdx);
  
  console.log('Fragment added');
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/analysis/NewAnalysisPage.tsx', c, 'utf8');
console.log('done');