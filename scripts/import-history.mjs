import { readFile, writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const root = new URL('../', import.meta.url);
const research = JSON.parse(await readFile(new URL('research/history-data.json', root), 'utf8'));
const audit = await readFile(new URL('research/audit.md', root), 'utf8');
const conflicts = Object.fromEntries(audit.split('\n').filter(line => /^\| C\d+ \|/.test(line)).map(line => {
  const [id, finding, handling, followup] = line.split('|').slice(1).map(s => s.trim());
  return [id, `${id}：${finding}。${handling}。${followup}`];
}));
const records = research.records.filter(r => r.verified === true).map(r => {
  assert.ok(r.date, `${r.id}: verified record requires a known date or partial date`);
  assert.ok(!r.candidateDate, `${r.id}: candidate dates must not enter published content`);
  const sources = r.sources.map(id => {
    const s = research.sources[id];
    assert.ok(s && s.kind !== 'candidate', `${r.id}: candidate-only source ${id}`);
    return {title: s.title, url: s.url, scope: r.sourceScopes?.[id] ?? r.verificationScope};
  });
  // Keep documented conflicts alongside the published fact, rather than hide them in research files.
  const linked = Object.keys(conflicts).filter(id => r.conflictIds?.includes(id));
  return {
    id:r.id, title:r.title, type:r.type, date:r.date, year:r.year, datePrecision:r.datePrecision,
    ...(r.endDate ? {endDate:r.endDate} : {}), location:r.location, venue:r.venue,
    description:r.description, sources, verified:true, verifiedAt:research.asOf,
    status:r.status, dateBasis:r.dateBasis, verificationScope:r.verificationScope,
    conflictNotes:linked.map(id => conflicts[id].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')),
    showIds:r.showIds ?? [],
    setlistIds:r.setlistIds ?? [],
  };
});
await mkdir(new URL('src/content/history/', root), {recursive:true});
await writeFile(new URL('src/content/history/verified.json', root), JSON.stringify(records,null,2)+'\n');
await writeFile(new URL('src/content/history/metadata.json', root), JSON.stringify({
  asOf:research.asOf, verifiedCount:records.length, pendingCount:research.records.filter(r=>!r.verified).length,
  scope:research.scope, verificationPolicy:research.verificationPolicy,
},null,2)+'\n');
console.log(`Imported ${records.length} verified history records; excluded ${research.records.length-records.length} candidates.`);
