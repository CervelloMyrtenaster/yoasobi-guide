import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { concertSchema, pathSchema, songSchema } from '../src/schemas/content';
import { liveStats } from '../src/lib/live-stats';
const json=(file:string)=>JSON.parse(readFileSync(file,'utf8'));

test('recent festival evidence is completed, scoped and not treated as full-length singing',()=>{
  const ids=['lollapalooza-2024-08-03','central-echoes-baa-2026-04-04','lollapalooza-2026-08-02'];
  const concerts=ids.map(id=>concertSchema.parse(json(`src/content/concerts/${id}.json`)));
  assert.deepEqual(concerts.map(c=>c.setlist.length),[13,10,12]);
  assert.ok(concerts.every(c=>c.eventStatus==='completed'&&c.setlist.every(t=>t.performance==='listed')));
  const rawSong=readFileSync('src/content/songs/orion.md','utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)![1];
  const orion=liveStats(concerts,'orion',{releasedOn:songSchema.parse(JSON.parse(rawSong)).releaseDate});
  assert.equal(orion.appearances,1);assert.equal(orion.total,1);
  const route=pathSchema.parse(json('src/content/listening-paths/concert-recent-festivals.json'));
  assert.deepEqual(route.evidenceConcertIds,ids.slice(1));
  for(const item of route.songs)assert.ok(concerts.slice(1).some(c=>c.setlist.some(t=>t.songId===item.songId)));
});

test('long-tail stream achievements retain snapshot dates and never imply certification',()=>{
  for(const id of ['taisho-roman','tsubame','adventure','seventeen','mister','butai-ni-tatte','moshimo-inochi-ga-egaketara']){
    const text=readFileSync(`src/content/songs/${id}.md`,'utf8');
    const song=songSchema.parse(JSON.parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)![1]));
    const record=song.achievements.find(a=>a.source.url==='https://www.billboard-japan.com/special/detail/5087/')!;
    assert.ok(record);assert.equal(record.type,'chart');assert.equal(record.date,'2026-09-08');
    assert.match(record.dateBasis,/不是首次突破日/);assert.match(record.source.scope,/不等同 RIAJ 認證/);
  }
});

test('official certification months preserve partial dates and remain distinct from chart snapshots',()=>{
  for(const [id,date] of [['taisho-roman','2023-08'],['mister','2023-08'],['seventeen','2025-03']]){
    const raw=readFileSync(`src/content/songs/${id}.md`,'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)![1];
    const song=songSchema.parse(JSON.parse(raw));
    const certification=song.achievements.find(a=>a.type==='certification')!;
    assert.equal(certification.date,date);assert.match(certification.dateBasis,/不補/);
    assert.equal(song.achievements.filter(a=>a.type==='chart').length,1);
  }
});
