import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync,readdirSync} from 'node:fs';
import {returnContext,withContext} from '../src/lib/navigation';import {videoDate} from '../src/lib/video-dates';import {includedSamples,liveStats} from '../src/lib/live-stats';import {compareSetlists} from '../src/lib/setlist-comparison';import {concertSchema,songSchema,songResearchSchema,pathSchema,historySchema} from '../src/schemas/content';
const json=(f:string)=>JSON.parse(readFileSync(f,'utf8'));const concerts=readdirSync('src/content/concerts').filter(f=>f.endsWith('.json')).map(f=>concertSchema.parse(json(`src/content/concerts/${f}`)));
const songs=new Map(readdirSync('src/content/songs').filter(f=>f.endsWith('.md')).map(f=>[f.slice(0,-3),songSchema.parse(JSON.parse(readFileSync(`src/content/songs/${f}`,'utf8').split('---')[1]))]));
test('return contexts keep subpaths, query and position while rejecting open redirects',()=>{
 const origin='https://example.github.io',base='/yoasobi-guide/',allowed=[base+'songs/',base+'listen/concert-first-five/'];
 assert.equal(returnContext(base+'songs/?q=Idol&year=2023#song-idol',origin,base,allowed),base+'songs/?q=Idol&year=2023#song-idol');
 for(const input of ['https://evil.test/yoasobi-guide/songs/','//evil.test/yoasobi-guide/songs/','/songs/','/yoasobi-guide/../songs/','javascript:alert(1)',base+'missing/',base+'songs/#<script>'])assert.equal(returnContext(input,origin,base,allowed),null,input);
 assert.equal(returnContext(base+'songs/?from=discard&q=abc',origin,base,allowed),base+'songs/?q=abc');
 const destination=new URL(withContext(base+'songs/idol/#live-videos',base+'listen/concert-first-five/#song-idol'),origin);assert.equal(destination.hash,'#live-videos');assert.equal(destination.searchParams.get('from'),base+'listen/concert-first-five/#song-idol');
});
test('video date extraction preserves explicit single days and never selects part of a range',()=>{
 assert.equal(videoDate('Wembley 2025.6.9 @venue'),'2025-06-09');assert.equal(videoDate('2024.11.10'),'2024-11-10');assert.equal(videoDate('2022.8.06'),'2022-08-06');
 for(const title of ['2025.2.22-23','2025.02.22–23','2025','2025.2','2025.02.30','no date'])assert.equal(videoDate(title),undefined,title);
});
test('overseas/series filters keep honest denominators and zero appearances',()=>{
 const abroad=includedSamples(concerts,{region:'overseas'});assert.equal(abroad.length,6);assert.deepEqual(new Set(abroad.map(c=>c.country)),new Set(['韓國','新加坡','英國','美國']));
 assert.equal(includedSamples(concerts,{tourId:'pop-out-2024'}).length,1);assert.equal(includedSamples(concerts,{country:'英國',eventType:'festival'}).length,0);
 const zero=liveStats(abroad,'orion');assert.equal(zero.appearances,1);assert.equal(zero.total,6);assert.equal(liveStats(abroad,'orion',{releasedOn:songs.get('orion')!.releaseDate}).total,1);
});
test('two-day comparison retains first-day cover and reversed acoustic sequence',()=>{
 const guide=json('src/content/live-guide.json');const initial=guide.comparisons.find((c:{id:string})=>c.id===guide.defaultComparison)!;
 assert.equal(initial.leftId,'wandara-okinawa-2025-11-29');assert.equal(initial.rightId,'wandara-okinawa-2025-11-30');
 for(const example of guide.comparisons) for(const id of [example.leftId,example.rightId]) assert.ok(concerts.some(c=>c.id===id&&c.eventStatus==='completed'&&c.setlistStatus==='complete'));
 const a=concerts.find(c=>c.id==='wandara-okinawa-2025-11-29')!,b=concerts.find(c=>c.id==='wandara-okinawa-2025-11-30')!;const comparison=compareSetlists(a,b);
 assert.equal(comparison.filter(r=>r.left.length&&r.right.length).length,17);assert.equal(comparison.find(r=>r.songId==='kaishin-no-ichigeki')!.right.length,0);
 assert.equal(comparison.find(r=>r.songId==='love-letter')!.left[0].position,6);assert.equal(comparison.find(r=>r.songId==='love-letter')!.right[0].position,7);
});
test('completed setlists agree with published history, date and provenance',()=>{
 const history=json('src/content/history/verified.json').map((r:unknown)=>historySchema.parse(r));
 for(const c of concerts){const record=history.find((r:ReturnType<typeof historySchema.parse>)=>r.setlistIds.includes(c.id));assert.ok(record,`history link: ${c.id}`);assert.equal(record.status,'performed');assert.equal(record.date,c.date);assert.ok(c.sources.length);}
 assert.equal(concerts.find(c=>c.id==='head-in-the-clouds-la-2023-08-06')!.setlist.length,8);
 assert.equal(concerts.find(c=>c.id==='wembley-2025-06-09')!.setlist.find(s=>s.songId==='watch-me')!.position,7);
});
test('all published works have research notes with claim sources and correct version isolation',()=>{
 const research=readdirSync('src/content/song-research').filter(f=>f.endsWith('.json')).map(f=>songResearchSchema.parse(json(`src/content/song-research/${f}`)));assert.equal(research.length,songs.size);
 for(const r of research){assert.ok(songs.has(r.songId));assert.ok(r.notes.every(n=>n.sources.length&&n.sources.every(s=>s.scope)));}
 assert.equal(songs.get('yuusha')!.achievements.find(a=>a.type==='certification')!.date,'2026-07');assert.equal(songs.get('yoru-ni-kakeru')!.achievements.find(a=>a.type==='certification')!.date,'2025-03');
 assert.equal(research.find(r=>r.songId==='new-me-en')!.credits.find(c=>c.role==='英語譯詞')!.name,'Konnie Aoki');
 for(const [id,s] of songs)for(const v of s.videos){if(v.performedOn)assert.equal(v.performedOn,videoDate(v.title),id);if(v.concertId)assert.ok(concerts.some(c=>c.id===v.concertId&&c.date===v.performedOn&&c.setlist.some(t=>t.songId===id)));}
});
test('preparation extensions are incremental and recent releases are not given invented live evidence',()=>{
 const core=pathSchema.parse(json('src/content/listening-paths/concert-first-five.json')),two=pathSchema.parse(json('src/content/listening-paths/concert-two-hours.json')),days=pathSchema.parse(json('src/content/listening-paths/concert-three-days.json'));
 assert.equal(core.minutes,30);assert.equal(two.minutes,120);assert.equal(days.days,3);assert.deepEqual(two.prerequisites,[core.id]);assert.deepEqual(days.prerequisites,[two.id]);
 const ids=[...two.songs,...days.songs].map(s=>s.songId!);assert.equal(new Set(ids).size,ids.length);for(const id of ['adrena','baby','orion'])assert.ok(days.songs.find(s=>s.songId===id)!.goal!.includes('不主張'));
});
