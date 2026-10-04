import { getCollection } from 'astro:content';
export async function loadContent() {
  const [songs, members, guides, releases, concerts, milestones, listeningPaths] = await Promise.all([
    getCollection('songs', e => e.data.status === 'published'), getCollection('members', e => e.data.status === 'published'), getCollection('guides', e => e.data.status === 'published'), getCollection('releases', e => e.data.status === 'published'), getCollection('concerts', e => e.data.status === 'published'), getCollection('milestones', e => e.data.status === 'published'), getCollection('listeningPaths', e => e.data.status === 'published'),
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
  for (const m of milestones) m.data.songIds.forEach(checkSong);
  const history = new Map((await getCollection('history')).map(entry => [entry.id,entry]));
  for(const record of history.values()) for(const id of record.data.setlistIds) if(!concerts.some(c=>c.id===id)) throw new Error(`找不到歷史引用的歌單：${record.id} / ${id}`);
  for(const song of songs) for(const id of song.data.historyIds) if(!history.has(id)) throw new Error(`歌曲引用不存在的歷史：${song.id} / ${id}`);
  for (const p of listeningPaths) {
    if (p.data.sourcePerformanceId && !history.has(p.data.sourcePerformanceId)) throw new Error(`找不到路線的演出來源：${p.id}`);
    for (const s of p.data.songs) {
      if (s.songId) checkSong(s.songId);
      if (s.historyId) {
        const record = history.get(s.historyId);
        if (!record || record.data.type !== 'digital_single' || record.data.status !== 'released') throw new Error(`找不到已發行歌曲紀錄：${s.historyId}`);
      }
    }
  }
  return { songs: songs.sort((a,b) => a.data.releaseDate.localeCompare(b.data.releaseDate)), members, guides, releases, concerts, milestones, listeningPaths };
}
