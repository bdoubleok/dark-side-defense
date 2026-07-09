const assert = require('assert');
const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const requiredHandlers = [
  "setQBQuality('elite', this)",
  "setQBQuality('average', this)",
  "setQBQuality('backup', this)",
  "setLastPlays('zones', this)",
  "setLastPlays('mixed', this)",
  "setLastPlays('blitz', this)",
  "setRushWorking('yes', this)",
  "setRushWorking('no', this)",
];

for (const handler of requiredHandlers) {
  assert(
    indexHtml.includes(handler),
    `Expected decision control to pass the clicked element: ${handler}`
  );
}

const functionsToCheck = ['setQBQuality', 'setLastPlays', 'setRushWorking'];

for (const functionName of functionsToCheck) {
  const functionStart = indexHtml.indexOf(`function ${functionName}(`);
  assert(functionStart !== -1, `Expected ${functionName} to be defined`);

  const nextFunctionStart = indexHtml.indexOf('\n        function ', functionStart + 1);
  const functionSource = indexHtml.slice(functionStart, nextFunctionStart);

  assert(
    functionSource.startsWith(`function ${functionName}(`) && functionSource.split('{', 1)[0].includes('target'),
    `Expected ${functionName} to accept an explicit target argument`
  );
  assert(
    !/\bevent\b/.test(functionSource),
    `${functionName} should not depend on a browser-specific global event`
  );
}
