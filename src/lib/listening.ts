import type { CollectionEntry } from 'astro:content';
export function listeningSongs(route: CollectionEntry<'listeningPaths'>, songs: CollectionEntry<'songs'>[], history: CollectionEntry<'history'>[]) {
  return route.data.songs.map(item => {
    const record = history.find(r => r.id === item.historyId);
    const song = songs.find(s => item.songId ? s.id === item.songId : s.data.titleJa === record?.data.title && s.data.releaseDate === record?.data.date);
    if (!song) throw new Error(`路線無法連結歌曲：${route.id}`);
    return { ...item, song };
  });
}
