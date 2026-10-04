import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { songSchema, articleSchema, releaseSchema, concertSchema, milestoneSchema, pathSchema, historySchema } from './schemas/content';
const md = (folder: string) => glob({ base: `./src/content/${folder}`, pattern: '*.md' });
const json = (folder: string) => glob({ base: `./src/content/${folder}`, pattern: '*.json' });
export const collections = {
  history: defineCollection({ loader: file('./src/content/history/verified.json'), schema: historySchema }),
  songs: defineCollection({ loader: md('songs'), schema: songSchema }),
  members: defineCollection({ loader: md('members'), schema: articleSchema }),
  guides: defineCollection({ loader: md('guides'), schema: articleSchema }),
  releases: defineCollection({ loader: json('releases'), schema: releaseSchema }),
  concerts: defineCollection({ loader: json('concerts'), schema: concertSchema }),
  milestones: defineCollection({ loader: json('milestones'), schema: milestoneSchema }),
  listeningPaths: defineCollection({ loader: json('listening-paths'), schema: pathSchema }),
};
