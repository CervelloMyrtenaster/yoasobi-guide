import type { LiveSample } from './live-stats';
export function compareSetlists(left: Pick<LiveSample,'setlist'>, right: Pick<LiveSample,'setlist'>) {
  const ids=[...new Set([...left.setlist,...right.setlist].map(t=>t.songId))];
  return ids.map(songId=>({songId,left:left.setlist.filter(t=>t.songId===songId),right:right.setlist.filter(t=>t.songId===songId)}));
}
