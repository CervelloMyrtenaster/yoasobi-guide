import { getCollection } from 'astro:content';
import metadata from '../content/history/metadata.json';
export { metadata as historyMetadata };
export const historyTypes: Record<string, string> = {
  milestone:'里程碑', mv:'MV 公開', digital_single:'配信單曲', physical_single:'實體單曲',
  ep:'EP', album_track:'首次收錄', video_album:'演出影像', vinyl_release:'黑膠發行',
  tie_in:'作品起用', collaboration:'音樂合作', brand_collaboration:'品牌合作',
  release_announcement:'發行預告', tour:'巡演', tour_show:'巡演場次', one_man_concert:'單獨演出',
  festival:'音樂祭／活動', online_concert:'線上演出', broadcast_performance:'電視演出',
  guest_performance:'嘉賓演出', special_performance:'特別演出', joint_concert:'聯合演出', talk_event:'對談活動',
};
export const historyStatuses: Record<string,string> = {
  documented:'資料有正文支持', released:'已發行', performed:'有事後演出紀錄',
  listed_past:'已列日程・尚未核對事後紀錄', scheduled:'未來預定', cancelled:'已取消',
  postponed:'已延期', announced:'已公告・月日未定',
};
export const releaseTypes = new Set(['digital_single','physical_single','ep','album_track','video_album','vinyl_release','release_announcement']);
export const liveTypes = new Set(['tour','tour_show','one_man_concert','festival','online_concert','broadcast_performance','guest_performance','special_performance','joint_concert','talk_event']);
export async function loadHistory() {
  const records = await getCollection('history');
  return records.sort((a,b) => a.data.date.localeCompare(b.data.date) || a.id.localeCompare(b.id));
}
