import type { APIRoute } from 'astro';
import { loadContent } from '../lib/content';
import { loadHistory } from '../lib/history';
import { path } from '../lib/paths';
export const GET: APIRoute = async ({site}) => {
  const { songs, releases, members, guides, concerts } = await loadContent();
  const records=await loadHistory();
  const routes=['','songs/','releases/','history/','live/','live/prepare/','live/stats/','live/videos/',...guides.map(e=>`${e.id}/`),...members.map(e=>`members/${e.id}/`),...songs.map(e=>`songs/${e.id}/`),...releases.map(e=>`releases/${e.id}/`),...concerts.map(e=>`live/${e.id}/`),...records.map(e=>`history/${e.id}/`)];
  const escape=(v:string)=>v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...new Set(routes)].map(route=>`<url><loc>${escape(new URL(path(route),site).href)}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
