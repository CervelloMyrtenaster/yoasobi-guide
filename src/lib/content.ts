import { getCollection } from 'astro:content';
import liveGuideData from '../content/live-guide.json';
import {liveGuideSchema} from '../schemas/content';
export async function loadContent() {
  const [songs, members, guides, releases, concerts, milestones, listeningPaths, songResearch] = await Promise.all([
    getCollection('songs', e => e.data.status === 'published'), getCollection('members', e => e.data.status === 'published'), getCollection('guides', e => e.data.status === 'published'), getCollection('releases', e => e.data.status === 'published'), getCollection('concerts', e => e.data.status === 'published'), getCollection('milestones', e => e.data.status === 'published'), getCollection('listeningPaths', e => e.data.status === 'published'),
    getCollection('songResearch', e => e.data.status === 'published'),
  ]);
  const songIds = new Set(songs.map(s => s.id)); const releaseIds = new Set(releases.map(r => r.id));
  for (const entry of [...releases, ...concerts, ...milestones, ...listeningPaths]) if (entry.id !== entry.data.id) throw new Error(`檔名與資料 ID 不一致：${entry.id}`);
  const checkSong = (id: string) => { if (!songIds.has(id)) throw new Error(`找不到已發布歌曲：${id}`); };
  for (const s of songs) { if (s.data.versionOf) checkSong(s.data.versionOf); s.data.relatedSongIds.forEach(checkSong); for (const id of s.data.releaseIds) if (!releaseIds.has(id)) throw new Error(`找不到發行作品：${id}`); }
  for (const r of releases) {
    for (const t of r.data.tracks) checkSong(t.songId);
    if(new Set(r.data.tracks.map(t=>t.position)).size!==r.data.tracks.length) throw new Error(`發行曲序重複：${r.id}`);
    if(r.data.tracklistComplete && r.data.tracks.some((t,i)=>t.position!==i+1)) throw new Error(`完整曲序不連續：${r.id}`);
  }
  for (const c of concerts) {
    for (const s of c.data.setlist) checkSong(s.songId);
    const positions = c.data.setlist.map(s => s.position);
    if (new Set(positions).size !== positions.length) throw new Error(`歌單順序重複：${c.id}`);
  }
  const liveGuide=liveGuideSchema.parse(liveGuideData);
  for(const comparison of liveGuide.comparisons) for(const id of [comparison.leftId,comparison.rightId]) {
    const concert=concerts.find(c=>c.id===id);
    if(!concert || concert.data.eventStatus!=='completed' || concert.data.setlistStatus!=='complete') throw new Error(`比較入口必須引用已完成且完整的歌單：${comparison.id} / ${id}`);
  }
  for (const m of milestones) m.data.songIds.forEach(checkSong);
  const history = new Map((await getCollection('history')).map(entry => [entry.id,entry]));
  for(const record of history.values()) for(const id of record.data.setlistIds) if(!concerts.some(c=>c.id===id)) throw new Error(`找不到歷史引用的歌單：${record.id} / ${id}`);
  for(const record of history.values()) for(const id of record.data.setlistIds) {
    const concert=concerts.find(c=>c.id===id)!;
    if(concert.data.eventStatus==='completed' && record.data.status!=='performed') throw new Error(`已完成歌單與歷史狀態矛盾：${record.id} / ${id}`);
    if(record.data.date!==concert.data.date) throw new Error(`歌單與歷史日期矛盾：${record.id} / ${id}`);
  }
  for(const entry of songResearch) { if(entry.id!==entry.data.id) throw new Error(`研究檔名與 ID 不一致：${entry.id}`); checkSong(entry.data.songId); }
  if(new Set(songResearch.map(r=>r.data.songId)).size!==songResearch.length) throw new Error('同一作品有重複研究紀錄');
  for(const song of songs) if(!songResearch.some(r=>r.data.songId===song.id)) throw new Error(`作品缺少研究紀錄：${song.id}`);
  for(const song of songs) for(const video of song.data.videos) if(video.concertId) {
    const concert=concerts.find(c=>c.id===video.concertId);
    if(!concert || !concert.data.setlist.some(t=>t.songId===song.id)) throw new Error(`影片引用的場次未列本曲：${song.id}`);
    if(video.performedOn && concert.data.date!==video.performedOn) throw new Error(`影片日期與場次矛盾：${song.id}`);
  }
  for(const song of songs) for(const id of song.data.historyIds) if(!history.has(id)) throw new Error(`歌曲引用不存在的歷史：${song.id} / ${id}`);
  for (const p of listeningPaths) {
    if(new Set(p.data.prerequisites).size!==p.data.prerequisites.length || p.data.prerequisites.includes(p.id)) throw new Error(`重複或自我引用路線：${p.id}`);
    for(const id of p.data.prerequisites) if(!listeningPaths.some(other=>other.id===id)) throw new Error(`找不到前置路線：${id}`);
    for(const id of p.data.evidenceConcertIds) if(!concerts.some(c=>c.id===id)) throw new Error(`找不到路線參考歌單：${id}`);
    if (p.data.sourcePerformanceId && !history.has(p.data.sourcePerformanceId)) throw new Error(`找不到路線的演出來源：${p.id}`);
    for (const s of p.data.songs) {
      if (s.songId) checkSong(s.songId);
      if (s.historyId) {
        const record = history.get(s.historyId);
        if (!record || record.data.type !== 'digital_single' || record.data.status !== 'released') throw new Error(`找不到已發行歌曲紀錄：${s.historyId}`);
      }
    }
  }
  return { songs: songs.sort((a,b) => a.data.releaseDate.localeCompare(b.data.releaseDate)), members, guides, releases, concerts, milestones, listeningPaths, songResearch, liveGuide };
}
