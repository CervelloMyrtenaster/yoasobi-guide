const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
module.exports = function applyHistoryReview(records, sources) {
  const review = JSON.parse(fs.readFileSync(path.join(__dirname, 'history-patches.json'), 'utf8'));
  for (const source of review.sources) {
    if (sources[source.id]) assert.equal(sources[source.id].url, source.url, `Source identity changed: ${source.id}`);
    sources[source.id] = { ...source, accessedAt: review.asOf };
  }
  for (const patch of review.patches) {
    const row = records.find(record => record.id === patch.id);
    assert.ok(row, `Missing history record: ${patch.id}`);
    for (const [key, value] of Object.entries(patch.expect)) assert.deepEqual(row[key], value, `${patch.id}: recheck ${key}`);
    Object.assign(row, patch.set);
    row.sources = [...new Set([...row.sources, ...patch.addSources])];
    row.reviewedAt = review.asOf;
    row.sourceScopes = { ...row.sourceScopes };
    for (const id of patch.addSources) row.sourceScopes[id] = patch.set.verificationScope;
  }
};
if (require.main === module) {
  const file = path.join(__dirname, '../history-data.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  module.exports(data.records, data.sources);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  console.log('Applied verified audit history patches; existing IDs and dates preserved.');
}
