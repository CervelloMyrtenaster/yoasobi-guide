import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { songSchema, releaseSchema, concertSchema } from '../src/schemas/content';
const read=(file:string)=>JSON.parse(readFileSync(file,'utf8'));
const songs=readdirSync('src/content/songs').filter(f=>f.endsWith('.md')).map(file=>{
  const text=readFileSync(`src/content/songs/${file}`,'utf8');const end=text.indexOf('\n---',4);
  return {id:file.slice(0,-3),data:songSchema.parse(JSON.parse(text.slice(4,end))),body:text.slice(end+4)};
});
const releases=readdirSync('src/content/releases').filter(f=>f.endsWith('.json')).map(file=>releaseSchema.parse(read(`src/content/releases/${file}`)));
test('已發行配信作品皆可從歷史連到有介紹內容的歌曲頁',()=>{
  const history=read('src/content/history/verified.json');
  const required=history.filter((r:any)=>r.type==='digital_single'&&r.status==='released');
  assert.equal(required.length,54);
  for(const h of required){const related=songs.filter(s=>s.data.historyIds.includes(h.id));assert.ok(related.length,`缺少 ${h.title} (${h.id})`);for(const s of related)assert.match(s.body,/## 音樂特色/);}
  assert.equal(songs.filter(s=>s.data.kind==='original'&&s.data.language==='ja').length,35);
  assert.equal(songs.filter(s=>s.data.kind==='english').length,34);
});
test('完整 EP 曲序無缺頁，雙向收錄引用一致，版本指向原曲',()=>{
  assert.equal(releases.length,9);
  for(const r of releases){assert.equal(r.tracklistComplete,true);assert.deepEqual(r.tracks.map(t=>t.position),r.tracks.map((_,i)=>i+1));assert.equal(new Set(r.tracks.map(t=>t.songId)).size,r.tracks.length);for(const t of r.tracks){const s=songs.find(s=>s.id===t.songId);assert.ok(s,`${r.id}/${t.songId}`);assert.ok(s.data.releaseIds.includes(r.id));}}
  for(const s of songs){for(const id of s.data.releaseIds)assert.ok(releases.find(r=>r.id===id)?.tracks.some(t=>t.songId===s.id));if(s.data.versionOf){const o=songs.find(t=>t.id===s.data.versionOf);assert.ok(o);assert.notEqual(s.id,o.id);assert.equal(o.data.kind,'original');}}
});
test('日文原曲都有已核對的歌曲學習頁，影片類型不混用',()=>{
  for(const s of songs.filter(s=>s.data.kind==='original'))assert.ok(s.data.japaneseLearning,`缺少學習頁 ${s.id}`);
  const videoIds=new Set(read('research/catalog/videos.json').filter((v:any)=>v.author==='YOASOBI').map((v:any)=>v.id));
  for(const v of read('research/catalog/extra-videos.json'))videoIds.add(v.id);
  for(const v of read('research/content-enrichment/verified-live-videos.json')) {
    assert.ok(['YOASOBI','THE FIRST TAKE'].includes(v.author));
    assert.equal(v.verifiedAt,'2026-10-04');
    videoIds.add(v.id);
  }
  for(const s of songs)for(const v of s.data.videos)assert.ok(videoIds.has(v.youtubeId),`影片未查核 ${s.id}/${v.youtubeId}`);
  assert.equal(songs.find(s=>s.id==='monotone-en')!.data.videos[0].kind,'audio');
  assert.equal(songs.find(s=>s.id==='yoru-from-the-first-take')!.data.videos[0].kind,'live');
  assert.equal(songs.find(s=>s.id==='yoru-ni-kakeru')!.data.videos[0].externalOnly,true);
});
test('新刊載歌單區分本篇安可，不推定完整演唱',()=>{
  const c=concertSchema.parse(read('src/content/concerts/chogenjitsu-tokyo-2024-11-10.json'));
  assert.equal(c.setlist.length,25);assert.equal(c.setlist.filter(t=>t.section==='encore').length,2);
  assert.equal(c.setlist.filter(t=>t.performance!=='listed').length,0);
  for(const t of c.setlist)assert.ok(songs.some(s=>s.id===t.songId));
  const record=read('src/content/history/verified.json').find((r:any)=>r.id==='history-0195');
  assert.deepEqual(record.setlistIds,[c.id]);assert.equal(record.date,c.date);assert.deepEqual(record.showIds,[]);
});
