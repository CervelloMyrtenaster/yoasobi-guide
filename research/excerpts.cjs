const fs = require('node:fs');
const rows = JSON.parse(fs.readFileSync('research/raw/official-news.json','utf8'));
const clean = s => s.replace(/<br\s*\/?\s*>/gi,'\n').replace(/<\/p>/gi,'\n').replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&');
for(const id of process.argv.slice(2)) {
  const r=rows.find(x=>String(x.id)===id); if(!r)continue;
  const body=clean(r.article);
  console.log(`SOURCE ${id} ${r.date} ${r.title}\n${body.slice(0,1300)}\n`);
}
