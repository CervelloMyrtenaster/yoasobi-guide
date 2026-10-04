import type { Concert } from '../schemas/content';
export function liveStats(concerts: Concert[], songId: string, scope: { from?: string; to?: string; eventType?: Concert['eventType']; releasedOn?: string } = {}) {
  const included = concerts.filter(c => c.status === 'published' && c.eventStatus === 'completed' && c.setlistStatus === 'complete' && c.date.length === 10 && (!scope.releasedOn || scope.releasedOn.length === 10) && (!scope.eventType || c.eventType === scope.eventType) && (!scope.from || c.date >= scope.from) && (!scope.to || c.date <= scope.to) && (!scope.releasedOn || c.date >= scope.releasedOn));
  const full = included.filter(c => c.setlist.some(s => s.songId === songId && s.performance === 'full')).length;
  const shortened = included.filter(c => c.setlist.some(s => s.songId === songId && ['excerpt','medley'].includes(s.performance))).length;
  const appearances = included.filter(c => c.setlist.some(s => s.songId === songId)).length;
  const unspecified = included.filter(c => c.setlist.some(s => s.songId === songId && s.performance === 'listed')).length;
  // A published complete list does not establish how much of each song was sung.
  const performanceKnown = !included.some(c => c.setlist.some(s => s.performance === 'listed'));
  return { total: included.length, appearances, unspecified, performanceKnown, full, shortened, rate: included.length && performanceKnown ? full / included.length : null, from: included.map(c => c.date).sort()[0], to: included.map(c => c.date).sort().at(-1) };
}
