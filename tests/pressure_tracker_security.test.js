const assert = require('assert');
const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function getFunctionSource(functionName) {
  const functionStart = indexHtml.indexOf(`function ${functionName}(`);
  assert(functionStart !== -1, `Expected ${functionName} to be defined`);

  const nextFunctionStart = indexHtml.indexOf('\n        function ', functionStart + 1);
  assert(nextFunctionStart !== -1, `Expected ${functionName} to be followed by another function`);

  return indexHtml.slice(functionStart, nextFunctionStart);
}

assert(
  indexHtml.includes('let pressureLog = loadPressureLog();'),
  'Pressure log should be loaded through the guarded loader'
);
assert(
  indexHtml.includes('let totalPlays = loadTotalPlays(pressureLog.length);'),
  'Total plays should fall back to the recovered pressure log count'
);

const loadPressureLogSource = getFunctionSource('loadPressureLog');
assert(loadPressureLogSource.includes('try {'), 'loadPressureLog should catch storage/parse failures');
assert(loadPressureLogSource.includes('JSON.parse(storedLog)'), 'loadPressureLog should parse persisted JSON');
assert(loadPressureLogSource.includes('Array.isArray(parsedLog)'), 'loadPressureLog should reject non-array payloads');
assert(loadPressureLogSource.includes('catch (error)'), 'loadPressureLog should recover from corrupt localStorage');

const savePressureTrackerStateSource = getFunctionSource('savePressureTrackerState');
assert(savePressureTrackerStateSource.includes('try {'), 'savePressureTrackerState should catch storage write failures');
assert(savePressureTrackerStateSource.includes("localStorage.setItem('pressureLog'"), 'savePressureTrackerState should persist the log');
assert(savePressureTrackerStateSource.includes('catch (error)'), 'savePressureTrackerState should recover from unavailable storage');

const updatePressureTrackerSource = getFunctionSource('updatePressureTracker');
assert(
  updatePressureTrackerSource.includes('logList.replaceChildren();'),
  'updatePressureTracker should clear rows without preserving unsafe HTML'
);
assert(
  updatePressureTrackerSource.includes('document.createTextNode(` Q${p.quarter}, ${p.time} - ${p.name}`)'),
  'Pressure entry labels should render as text nodes, not HTML'
);
assert(
  updatePressureTrackerSource.includes('logList.appendChild(entry);'),
  'Pressure entries should be appended as DOM nodes'
);
assert(
  !/logList\.innerHTML\s*=\s*pressureLog\.map/.test(updatePressureTrackerSource),
  'Pressure entries must not be rendered by interpolating stored values into innerHTML'
);

const updatePressureSuccessSource = getFunctionSource('updatePressureSuccess');
assert(
  updatePressureSuccessSource.includes('if (!pressureLog[index]) return;'),
  'updatePressureSuccess should ignore stale or invalid row indexes'
);
assert(
  updatePressureSuccessSource.includes('normalizePressureSuccess(successType)'),
  'updatePressureSuccess should normalize persisted result classes'
);
