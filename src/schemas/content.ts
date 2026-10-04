import { z } from 'astro/zod';
import { isoDate, fullDate, datePrecision } from './dates';
const date = fullDate;
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const source = z.object({ title: z.string(), url: z.url(), scope: z.string() });
const common = { status: z.enum(['draft', 'published']), updatedAt: date, sources: z.array(source).min(1) };
const relationship = z.object({ state: z.enum(['known', 'none', 'unknown']), items: z.array(z.object({ title: z.string(), author: z.string().optional(), kind: z.string(), url: z.url().optional() })) });
export const songSchema = z.object({
  ...common, titleJa: z.string(), titleRomaji: z.string(),
  titleZh: z.object({ text: z.string(), kind: z.enum(['official', 'editorial', 'common']) }),
  aliases: z.array(z.string()).default([]), summary: z.string(), releaseDate: isoDate,
  language: z.enum(['ja', 'en', 'other']), versionOf: id.optional(), releaseIds: z.array(id),
  kind: z.enum(['original','english','arrangement','live-version','remix','interlude','collaboration']).default('original'),
  historyIds: z.array(id).default([]), dateNotes: z.string().optional(),
  relatedSongIds: z.array(id).default([]),
  achievements: z.array(z.object({ type: z.enum(['chart','award','nomination','certification']), date: isoDate, dateBasis: z.string(), title: z.string(), description: z.string(), institution: z.string().optional(), metric: z.string().optional(), source })).default([]),
  sourceWorks: relationship, tieIns: relationship, tags: z.array(z.string()),
  videos: z.array(z.object({ youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/), title: z.string(), kind: z.enum(['mv', 'live', 'audio']), sourceUrl: z.url(), externalOnly: z.boolean().default(false), restrictionNote: z.string().optional(), performedOn: isoDate.optional(), publishedOn: isoDate.optional(), concertId: id.optional(), scene: z.enum(['concert','festival','tv','studio','online','other']).optional(), contextNote: z.string().optional() })),
  japaneseLearning: z.object({
    url: z.url().refine(v => { const u = new URL(v); return u.protocol === 'https:' && u.hostname === 'www.marumaru-x.com' && /^\/japanese-song\/play-[a-z0-9]+$/.test(u.pathname) && !u.search && !u.hash; }, '請填入 marumaru 歌曲詳細頁網址'),
    verifiedAt: date,
  }).optional(),
}).strict();
export const articleSchema = z.object({ ...common, title: z.string(), summary: z.string(), order: z.number().default(0) });
export const releaseSchema = z.object({ ...common, id, title: z.string(), kind: z.enum(['album', 'ep', 'single']), date: isoDate, summary: z.string().optional(), listeningNotes: z.array(z.string()).default([]), tracklistComplete: z.boolean().default(false), tracks: z.array(z.object({ songId: id, position: z.number().int().positive() })) });
export const milestoneSchema = z.object({ ...common, id, date: isoDate, title: z.string(), summary: z.string(), kind: z.enum(['formation', 'release', 'live']), songIds: z.array(id).default([]) });
export const concertSchema = z.object({
  ...common, id, title: z.string(), date: isoDate, country: z.string(), city: z.string(), venue: z.string(), tourId: id.optional(),
  eventType: z.enum(['solo', 'festival', 'tv', 'online', 'other']), eventStatus: z.enum(['scheduled', 'completed', 'cancelled']),
  setlistStatus: z.enum(['complete', 'partial', 'unknown']),
  setlist: z.array(z.object({ position: z.number().int().positive(), songId: id, section: z.enum(['main', 'encore']), performance: z.enum(['full', 'excerpt', 'medley', 'listed']), medleyId: id.optional() })),
  verifiedAt: date, notes: z.array(z.string()).default([]),
});
export const pathSchema = z.object({
  ...common, id, title: z.string(), summary: z.string(), purpose: z.enum(['beginner','concert']).default('beginner'),
  sourcePerformanceId: id.optional(),
  minutes: z.number().int().positive().optional(), days: z.number().int().positive().optional(),
  order: z.number().int().default(0), prerequisites: z.array(id).default([]),
  selectionNotes: z.array(z.string()).default([]), evidenceConcertIds: z.array(id).default([]),
  songs: z.array(z.object({ songId: id.optional(), historyId: id.optional(), reason: z.string(), goal: z.string().optional(), day: z.number().int().positive().optional(), listenUrl: z.url().refine(value => {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'www.youtube.com' && url.pathname === '/watch' && /^[A-Za-z0-9_-]{11}$/.test(url.searchParams.get('v') ?? '');
  }, '聆聽連結需為已核對的 YouTube 影片').optional() }).refine(s => Boolean(s.songId) !== Boolean(s.historyId), '聆聽項目需指定一個歌曲或歷史紀錄 ID')),
});
export const songResearchSchema = z.object({
  ...common, id, songId: id,
  notes: z.array(z.object({ area: z.enum(['creation','narrative','mv','reception','version']), title: z.string(), text: z.string(), sources: z.array(source).min(1) })).min(1),
  credits: z.array(z.object({ role: z.string(), name: z.string(), scope: z.string(), source })).default([]),
  gaps: z.array(z.object({ area: z.enum(['creation','mv','charts','certification','awards','live','version']), note: z.string() })).default([]),
});
export type Concert = z.infer<typeof concertSchema>;
export const liveGuideSchema = z.object({
  defaultComparison: id,
  comparisons: z.array(z.object({ id, title: z.string(), leftId: id, rightId: id, description: z.string() })).min(1),
}).refine(value => new Set(value.comparisons.map(c => c.id)).size === value.comparisons.length && value.comparisons.some(c => c.id === value.defaultComparison), '比較入口 ID 必須唯一，預設入口必須存在');

export const historySchema = z.object({
  id, title: z.string(), type: z.string(), date: isoDate, year: z.number().int(),
  datePrecision: z.enum(['year', 'month', 'day']), endDate: isoDate.optional(),
  location: z.string().nullable(), venue: z.string().nullable(), description: z.string(),
  sources: z.array(source).min(1), verified: z.literal(true), verifiedAt: fullDate,
  status: z.enum(['documented', 'released', 'performed', 'listed_past', 'scheduled', 'cancelled', 'postponed', 'announced']),
  dateBasis: z.string(), verificationScope: z.string(), conflictNotes: z.array(z.string()),
  showIds: z.array(id).default([]),
  setlistIds: z.array(id).default([]),
}).strict().refine(r => r.datePrecision === datePrecision(r.date) && r.year === Number(r.date.slice(0,4)), '日期、年份及精度必須一致');
