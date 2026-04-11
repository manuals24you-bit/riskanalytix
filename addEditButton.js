const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/pages/dashboard/DashboardPage.tsx', 'utf8');

const oldBtn = `\u{1F4CB}
                          </button>
                        </div>`;
const newBtn = `\u{1F4CB}
                          </button>
                          <button
                            onClick={() => navigate(\`/analysis/\${a.id}/edit\`)}
                            title="Edytuj analiz\u0119"
                            style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #1e2d45', background: 'transparent', color: '#8a99b0', cursor: 'pointer', fontSize: '11px' }}
                          >
                            \u270F\uFE0F
                          </button>
                        </div>`;

if (c.includes(oldBtn)) {
  c = c.replace(oldBtn, newBtn);
  console.log('edit button added');
} else {
  console.log('not found, checking...');
  const idx = c.indexOf('\u{1F4CB}');
  console.log('clipboard at:', idx, JSON.stringify(c.slice(idx, idx + 80)));
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/pages/dashboard/DashboardPage.tsx', c, 'utf8');