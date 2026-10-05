import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync,readdirSync } from 'node:fs';
import { concertSchema,songSchema,pathSchema } from '../src/schemas/content';
import { liveStats } from '../src/lib/live-stats';
const read=(file:string)=>JSON.parse(readFileSync(file,'utf8'));
const concerts=readdirSync('src/content/concerts').filter(f=>f.endsWith('.json')).map(f=>concertSchema.parse(read(`src/content/concerts/${f}`)));
const song=(id:string)=>songSchema.parse(JSON.parse(readFileSync(`src/content/songs/${id}.md`,'utf8').split('---')[1]));

test('武道館報告中的穿插曲不遺漏，兩日 WANDARA 的 acoustic 與安可不混合',()=>{
  const nice=concerts.find(c=>c.id==='nice-to-meet-you-2021-12-04')!;
  assert.equal(nice.setlist.length,16);
  assert.equal(nice.setlist.find(t=>t.position===12)?.songId,'epilogue');
  const first=concerts.find(c=>c.id==='wandara-okinawa-2025-11-29')!;
  const second=concerts.find(c=>c.id==='wandara-okinawa-2025-11-30')!;
  assert.deepEqual(first.setlist.slice(5,7).map(t=>t.songId),['love-letter','ano-yume-wo-nazotte']);
  assert.deepEqual(second.setlist.slice(5,7).map(t=>t.songId),['ano-yume-wo-nazotte','love-letter']);
  assert.equal(first.setlist.length,18);assert.equal(second.setlist.length,17);
  assert.ok(first.setlist.some(t=>t.songId==='kaishin-no-ichigeki'&&t.section==='encore'));
  assert.ok(!second.setlist.some(t=>t.songId==='kaishin-no-ichigeki'));
  for(const c of concerts)assert.deepEqual(c.setlist.map(t=>t.position),c.setlist.map((_,i)=>i+1));
});

test('音樂祭與專場分開，未區分長度不產生完整率，發行後樣本排除舊年份',()=>{
  const solo=liveStats(concerts,'idol',{eventType:'solo'});
  const festival=liveStats(concerts,'idol',{eventType:'festival'});
  assert.equal(solo.total,10);assert.equal(festival.total,5);
  assert.equal(solo.rate,null);assert.equal(festival.rate,null);
  assert.equal(liveStats(concerts,'idol',{eventType:'solo',releasedOn:song('idol').releaseDate}).total,9);
  assert.equal(liveStats(concerts,'orion',{eventType:'solo',releasedOn:song('orion').releaseDate}).total,0);
});

test('成績保留年／月日期與獎項對象，延伸路線歌曲唯一並有影片依據',()=>{
  const idol=song('idol');
  assert.equal(idol.achievements.find(a=>a.title.includes('年度 Hot 100'))?.date,'2023');
  assert.equal(idol.achievements.find(a=>a.title.includes('9 億'))?.date,'2025-03');
  assert.ok(idol.achievements.find(a=>a.title.includes('Global Excl. U.S.'))?.description.includes('不同榜單'));
  for(const id of ['concert-next-ten','concert-deeper-fifteen']){
    const route=pathSchema.parse(read(`src/content/listening-paths/${id}.json`));
    assert.equal(new Set(route.songs.map(s=>s.songId)).size,route.songs.length);
    for(const item of route.songs){assert.ok(song(item.songId!));assert.ok(route.sources.some(s=>s.url===item.listenUrl));}
  }
});
