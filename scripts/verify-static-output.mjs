// Inspect built files, including paths on a case-sensitive GitHub Pages host.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';
const directory=path.resolve(process.argv[2]??'dist');
const origin='https://cervellomyrtenaster.github.io',base='/yoasobi-guide/';
const files=new Set(fs.readdirSync(directory,{recursive:true}).filter(f=>fs.statSync(path.join(directory,f)).isFile()).map(f=>f.replaceAll('\\','/')));
const html=[...files].filter(f=>f.endsWith('.html'));
const read=file=>fs.readFileSync(path.join(directory,file),'utf8');
const decode=value=>value.replaceAll('&amp;','&').replaceAll('&#x26;','&');
const target=url=>{if(!url.pathname.startsWith(base))return null;const name=decodeURIComponent(url.pathname.slice(base.length));return files.has(name)?name:files.has(name+'index.html')?name+'index.html':null;};
const failures=[];let references=0,fragments=0;
const ids=new Map(html.map(file=>[file,new Set([...read(file).matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))]));
const titles=new Map();
for(const file of html){
 const page=read(file),route=file.replace(/index\.html$/,'');
 const pageURL=new URL(base+route,origin);
 // Removed editorial panels must not reappear on any generated song page.
 if(/^songs\/[^/]+\/index\.html$/.test(file)){
  for(const label of ['題名與日語練習','資料覆蓋與待查項目','學習資料來源與整理範圍']){
   if(page.includes(label))failures.push({file,reason:'removed song section reappeared',label});
  }
 }
 const title=page.match(/<title>([^<]+)<\/title>/)?.[1];
 if(!title)failures.push({file,reason:'missing title'});
 if(titles.has(title))failures.push({file,reason:'duplicate title',other:titles.get(title)});titles.set(title,file);
 if(!/<html lang="zh-Hant"/.test(page))failures.push({file,reason:'language'});
 if(!/<meta name="description" content="[^"]+"/.test(page))failures.push({file,reason:'description'});
 if(file!=='404.html'){
  const canonical=decode(page.match(/<link rel="canonical" href="([^"]+)"/)?.[1]??'');
  if(canonical!==pageURL.href)failures.push({file,reason:'canonical',canonical});
  if(decode(page.match(/<meta property="og:url" content="([^"]+)"/)?.[1]??'')!==canonical)failures.push({file,reason:'Open Graph URL'});
 }else if(!page.includes('noindex,follow')||page.includes('rel="canonical"'))failures.push({file,reason:'404 indexing'});
 for(const match of page.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const raw=decode(match[1]);if(/^(?:mailto:|tel:|data:|javascript:)/.test(raw))continue;
  const url=new URL(raw,pageURL);if(url.origin!==origin)continue;references++;
  const destination=target(url);if(!destination){failures.push({file,raw,reason:'missing or incorrectly cased target'});continue;}
  if(url.hash&&destination.endsWith('.html')){
   fragments++;const hash=decodeURIComponent(url.hash.slice(1));
   // Song links acquire return anchors in the browser; compare rows also vary with selected shows.
   const dynamic=/^song-link-\d+$/.test(hash)||(destination==='live/compare/index.html'&&url.search&&hash.startsWith('song-'));
   if(!ids.get(destination)?.has(hash)&&!dynamic)failures.push({file,raw,reason:'missing fragment'});
  }
 }
}
const sitemap=[...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(decode(m[1])));
for(const url of sitemap)if(url.origin!==origin||!target(url)||!url.pathname.endsWith('/'))failures.push({url:url.href,reason:'sitemap'});
assert.equal(new Set(sitemap.map(u=>u.href)).size,sitemap.length);
assert.equal(sitemap.length,html.length-1,'all indexable pages appear in sitemap');
assert.ok(files.has('.nojekyll'));assert.ok(files.has('404.html'));
assert.ok(read('robots.txt').includes(origin+base+'sitemap.xml'));
assert.deepEqual(failures,[]);
const js=[...files].filter(f=>f.endsWith('.js'));
console.log(JSON.stringify({htmlPages:html.length,indexablePages:sitemap.length,localReferences:references,fragmentReferences:fragments,unresolved:failures.length,javascriptFiles:js.length,javascriptBytes:js.reduce((n,f)=>n+fs.statSync(path.join(directory,f)).size,0),javascriptGzipBytes:js.reduce((n,f)=>n+gzipSync(read(f)).length,0),largestHTML:html.map(f=>({file:f,bytes:fs.statSync(path.join(directory,f)).size})).sort((a,b)=>b.bytes-a.bytes).slice(0,3),noJekyll:true,custom404:true},null,2));
