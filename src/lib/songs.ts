import type { Song } from '../schemas/content';
export const songKinds: Record<Song['kind'],string> = {original:'日文原曲',english:'英文版',arrangement:'重新編曲','live-version':'現場錄音版',remix:'Remix',interlude:'序曲／間奏',collaboration:'合作／翻唱'};
export const songLanguages: Record<Song['language'],string> = {ja:'日文',en:'英文',other:'其他／短曲'};
export const achievementLabels: Record<Song['achievements'][number]['type'],string> = {chart:'榜單／成績',award:'獲獎',nomination:'提名',certification:'認證'};
