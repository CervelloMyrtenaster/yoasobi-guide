const fs = require('node:fs');
const all = JSON.parse(fs.readFileSync('research/raw/official-news.json','utf8'));
const clean = text => text.replace(/<br\s*\/?\s*>/gi,'\n').replace(/<\/p>/gi,'\n').replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&ldquo;|&rdquo;/g,'"').replace(/&#039;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
for(const id of process.argv.slice(2)) {
  const row=all.find(r=>String(r.id)===id);if(!row){console.log('NOT_FOUND '+id);continue;}
  const text=clean(row.article);
  fs.writeFileSync(`research/raw/${id}.txt`,`${row.title}\n發布日期 ${row.date}\n${text}`);
  console.log(`\nSOURCE ${id} ${row.date} ${row.title}\n${text}`);
}
