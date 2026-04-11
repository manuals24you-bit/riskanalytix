const fs = require('fs');
const path = require('path');

const localesDir = 'C:/Projects/riskpro/frontend/src/i18n/locales';

const scenarios = {
  'pl.json': 'Scenariusz zagro\u017cenia',
  'en.json': 'Hazard scenario',
  'de.json': 'Gef\u00e4hrdungsszenario',
  'fr.json': 'Sc\u00e9nario de danger',
  'it.json': 'Scenario di pericolo',
  'es.json': 'Escenario de peligro',
  'cs.json': 'Sc\u00e9n\u00e1\u0159 nebezpe\u010d\u00ed',
};

for (const [file, value] of Object.entries(scenarios)) {
  const filePath = path.join(localesDir, file);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Add scenario after action key in analysis section
  if (json.analysis && json.analysis.action && !json.analysis.scenario) {
    json.analysis.scenario = value;
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
    console.log(`${file}: added scenario = "${value}"`);
  } else if (json.analysis && json.analysis.scenario) {
    console.log(`${file}: already has scenario`);
  } else {
    console.log(`${file}: analysis.action not found`);
  }
}