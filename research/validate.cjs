const fs = require('node:fs');
const assert = require('node:assert/strict');
const data = JSON.parse(fs.readFileSync('research/history-data.json', 'utf8'));
const required = ['id','title','type','date','year','location','venue','description','sources','verified'];
const ids = new Set();
for (const r of data.records) {
  for (const key of required) assert.ok(Object.hasOwn(r,key), `${r.id}: missing ${key}`);
  assert.ok(!ids.has(r.id), `duplicate ${r.id}`); ids.add(r.id);
  assert.equal(typeof r.verified,'boolean');
  assert.ok(r.sources.length > 0, `${r.id}: no source`);
  for (const id of r.sources) assert.ok(data.sources[id], `${r.id}: unknown source ${id}`);
  if(r.verified) {
    assert.ok(r.date, `${r.id}: verified without date precision`);
    assert.ok(!r.candidateDate && !r.candidateVenue, `${r.id}: verified retains candidate fields`);
    for(const id of r.sources) assert.notEqual(data.sources[id].kind,'candidate',`${r.id}: candidate source used as verified`);
  }
  assert.equal(r.datePrecision,r.date?.length===10?'day':r.date?.length===7?'month':r.date?'year':'unknown',`${r.id}: wrong date precision`);
  if (r.date !== null) {
    assert.match(r.date,/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/);
    assert.equal(Number(r.date.slice(0,4)),r.year);
    if(r.date.length === 10) assert.equal(new Date(`${r.date}T00:00:00Z`).toISOString().slice(0,10),r.date);
  }
  if (!r.verified) { assert.equal(r.date,null); assert.equal(r.status,'unverified'); }
  if (r.status === 'performed') assert.ok(r.date <= data.asOf, `${r.id}: future performed`);
  if (r.status === 'scheduled') assert.ok(r.date > data.asOf, `${r.id}: past scheduled`);
  for(const child of r.showIds ?? []) assert.ok(data.records.some(x=>x.id===child),`unknown show ${child}`);
  for(const id of r.setlistIds ?? []) {
    const file=`src/content/concerts/${id}.json`;
    assert.ok(fs.existsSync(file),`${r.id}: missing setlist ${id}`);
    const concert=JSON.parse(fs.readFileSync(file,'utf8'));
    assert.equal(concert.id,id);assert.equal(concert.date,r.date,`${r.id}: setlist date differs`);
  }
  if(r.showIds?.length) {
    assert.equal(new Set(r.showIds).size,r.showIds.length,`${r.id}: duplicate child`);
    const dates=r.showIds.map(id=>data.records.find(x=>x.id===id).date).sort();
    assert.equal(r.date,dates[0],`${r.id}: incorrect tour start`);
    assert.equal(r.endDate,dates.at(-1),`${r.id}: incorrect tour end`);
  }
}
for(const s of Object.values(data.sources)) assert.match(s.url,/^https:\/\//);
assert.ok(fs.existsSync('research/audit.md'));
const result = {records:data.records.length,verified:data.records.filter(r=>r.verified).length,pending:data.records.filter(r=>!r.verified).length,sources:Object.keys(data.sources).length,statuses:data.records.reduce((a,r)=>(a[r.status]=(a[r.status]??0)+1,a),{})};
console.log(JSON.stringify(result,null,2));
