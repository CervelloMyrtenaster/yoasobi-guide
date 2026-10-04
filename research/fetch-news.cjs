const fs = require('node:fs');
const parse = raw => JSON.parse(raw.slice(raw.indexOf('(')+1, raw.lastIndexOf(')')));
async function main() {
  let all=[];
  for(let start=0;start<2000;start+=100) {
    let data;
    if(start===0) data=parse(fs.readFileSync('research/raw/news-index-0.jsonp','utf8'));
    else {
      const url=`https://www.sonymusic.co.jp/json/v2/artist/YOASOBI/information/start/${start}/count/100/callback/InfoCallcack`;
      const response=await fetch(url); if(!response.ok) throw Error(response.status);
      const raw=await response.text(); fs.writeFileSync(`research/raw/news-index-${start}.jsonp`,raw);data=parse(raw);
    }
    console.log(JSON.stringify({start,count:data.items.length,first:data.items[0]?.date,last:data.items.at(-1)?.date,keys:Object.keys(data)}));
    all.push(...data.items);
    if(data.items.length<100) break;
  }
  fs.writeFileSync('research/raw/official-news.json',JSON.stringify(all,null,2));
  fs.writeFileSync('research/raw/news-headlines.tsv',all.map(x=>`${x.id}\t${x.date}\t${x.title.replace(/\s+/g,' ')}`).join('\n'));
  console.log('TOTAL '+all.length);
}
main().catch(e=>{console.error(e);process.exit(1)});
