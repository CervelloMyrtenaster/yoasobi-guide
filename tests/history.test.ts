import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { isoDate, fullDate } from '../src/schemas/dates';
import { historySchema, pathSchema } from '../src/schemas/content';

test('ISO dates retain year/month precision and reject invented or invalid dates', () => {
  for(const value of ['2019','2026-10','2024-02-29','2026-10-04']) assert.equal(isoDate.parse(value),value);
  for(const value of ['2023-02-29','2026-13','2026-00','2026-04-31','2026-10-00','2026/10/04','2026-1-01']) assert.equal(isoDate.safeParse(value).success,false,value);
  assert.equal(fullDate.safeParse('2026').success,false);
});

test('published history is exactly the verified research, without precision loss or candidate leakage', () => {
  const research = JSON.parse(readFileSync('research/history-data.json','utf8'));
  const published = JSON.parse(readFileSync('src/content/history/verified.json','utf8'));
  const verified = research.records.filter((r: {verified:boolean})=>r.verified);
  assert.deepEqual(published.map((r:{id:string})=>r.id),verified.map((r:{id:string})=>r.id));
  for(const [index, raw] of published.entries()) {
    const r = historySchema.parse(raw);
    const original = verified[index];
    for(const key of ['date','datePrecision','status','location','venue','description']) assert.equal(r[key as keyof typeof r],original[key],`${r.id}: ${key}`);
    assert.ok(r.sources.length > 0);
    if(original.conflictIds?.length) assert.ok(r.conflictNotes.length>0,`${r.id}: conflict hidden`);
  }
});

test('festival dates remain distinct from headline shows and cancelled performances', () => {
  const published = JSON.parse(readFileSync('src/content/history/verified.json','utf8'));
  const byId = new Map<string,ReturnType<typeof historySchema.parse>>(published.map((r: unknown) => {
    const item = historySchema.parse(r);
    return [item.id,item];
  }));
  for(const id of ['history-0247','history-0230','history-0124','history-0125']) {
    assert.equal(byId.get(id)?.type,'festival',`${id}: music festival must not count as solo show`);
  }
  const northAmerica = byId.get('history-0275')!;
  const shows = northAmerica.showIds.map(id=>byId.get(id)!);
  assert.equal(shows.filter(r=>r.type==='festival').length,2);
  assert.equal(shows.filter(r=>r.type==='tour_show').length,6);
  const cancelled = byId.get('history-0304')!;
  assert.equal(cancelled.status,'cancelled');
  assert.equal(cancelled.date,'2021-08-08');
  assert.equal(byId.has('history-0280'),false,'conflicting international vinyl date remains unpublished');
});

test('tour groups reference unique existing performances with the same date range', () => {
  const published = JSON.parse(readFileSync('src/content/history/verified.json','utf8')).map((r: unknown)=>historySchema.parse(r));
  const byId = new Map<string,ReturnType<typeof historySchema.parse>>(published.map((r: ReturnType<typeof historySchema.parse>)=>[r.id,r]));
  for(const group of published.filter((r: ReturnType<typeof historySchema.parse>)=>r.type==='tour')) {
    assert.equal(new Set(group.showIds).size,group.showIds.length,`${group.id}: repeated performance`);
    const dates = group.showIds.map((id: string)=>{
      const show = byId.get(id);
      assert.ok(show && show.type!=='tour',`${group.id}: missing or nested performance`);
      return show.date;
    }).sort();
    assert.equal(group.date,dates[0]);
    assert.equal(group.endDate,dates.at(-1));
  }
});

test('concert preparation references published releases and an actual documented performance without creating frequency data', () => {
  const route = pathSchema.parse(JSON.parse(readFileSync('src/content/listening-paths/concert-first-five.json','utf8')));
  const history = JSON.parse(readFileSync('src/content/history/verified.json','utf8')).map((r: unknown)=>historySchema.parse(r));
  const byId = new Map<string,ReturnType<typeof historySchema.parse>>(history.map((r: ReturnType<typeof historySchema.parse>)=>[r.id,r]));
  const performance = byId.get(route.sourcePerformanceId!)!;
  assert.equal(performance.type,'festival');
  assert.equal(performance.status,'performed');
  assert.equal(performance.date,'2023-08-06');
  assert.equal(route.purpose,'concert');
  assert.equal(new Set(route.songs.map(s=>s.historyId)).size,route.songs.length);
  for (const item of route.songs) {
    const release = byId.get(item.historyId!)!;
    assert.equal(release.type,'digital_single');
    assert.equal(release.status,'released');
    assert.ok(release.date <= performance.date,`${release.id}: release must precede this performance`);
    assert.ok(item.listenUrl && route.sources.some(source=>source.url === item.listenUrl),`${release.id}: listening link needs a recorded source`);
  }
  assert.ok(route.summary.includes('不是跨年演出頻率排行'));
  assert.equal(pathSchema.safeParse({...route,songs:[{songId:'song',historyId:'history-0003',reason:'invalid double reference'}]}).success,false);
  assert.equal(pathSchema.safeParse({...route,songs:[{reason:'missing reference'}]}).success,false);
});
