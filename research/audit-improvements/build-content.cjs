// Reproducible, reviewed additions. No network or UI text is generated from search snippets.
const fs=require('node:fs');
const {videoDate}=require('../../src/lib/video-dates.ts');
const day='2026-10-04';
const write=(file,data)=>{fs.mkdirSync(require('node:path').dirname(file),{recursive:true});fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');};
const readSong=id=>{const parts=fs.readFileSync(`src/content/songs/${id}.md`,'utf8').split('---');return {data:JSON.parse(parts[1]),body:parts.slice(2).join('---')};};
const saveSong=(id,s)=>fs.writeFileSync(`src/content/songs/${id}.md`,'---\n'+JSON.stringify(s.data,null,2)+'\n---'+s.body);
const ids=fs.readdirSync('src/content/songs').map(f=>f.replace(/\.md$/,''));
const songs=new Map(ids.map(id=>[id,readSong(id)]));
for(const s of songs.values()) s.data.achievements??=[];
for(const s of songs.values())for(const a of s.data.achievements){if(!a.institution){if(a.title.includes('JASRAC'))a.institution='JASRAC';else if(a.title.includes('MTV VMAJ'))a.institution='MTV VMAJ';else if(a.title.includes('Billboard Global'))a.institution='Billboard（全球榜）';else if(a.title.includes('Billboard JAPAN'))a.institution='Billboard JAPAN';}}
for(const file of fs.readdirSync('src/content/concerts').filter(f=>f.endsWith('.json'))){const name=`src/content/concerts/${file}`;const concert=JSON.parse(fs.readFileSync(name));if(concert.country==='JP'){concert.country='日本';write(name,concert);}}
const source=(title,url,scope)=>({title,url,scope});
const news=(id,scope)=>source('YOASOBI 官方製作與發行公告',`https://www.yoasobi-music.jp/news/${id}`,scope);
const patches=JSON.parse(fs.readFileSync('research/audit-improvements/history-patches.json'));
const newConcerts=[
 ['denko-sekka-saitama-2023-06-04','history-0243','2023-06-04','電光石火 埼玉 Day2','日本','埼玉','さいたまスーパーアリーナ','denko-sekka',561709,'祝福,夜に駆ける,三原色,セブンティーン,ミスター,海のまにまに,好きだ,優しい彗星,もしも命が描けたら,たぶん,ハルジオン,ハルカ,ツバメ,怪物,群青,アドベンチャー','アイドル'],
 ['asia-seoul-2023-12-17','history-0256','2023-12-17','LIVE IN SEOUL KOREA Day2','韓國','首爾','KOREA UNIV. TIGER DOME','asia-2023-2024',561709,'夜に駆ける,祝福,三原色,セブンティーン,ミスター,Biri-Biri,優しい彗星,勇者,もう少しだけ,ハルジオン,たぶん,あの夢をなぞって,怪物,群青,アドベンチャー','アイドル'],
 ['pop-out-haneda-2024-01-26','history-0205','2024-01-26','POP OUT 東京 Day2','日本','東京','Zepp Haneda(TOKYO)','pop-out-2024',561709,'セブンティーン,祝福,ハルジオン,大正浪漫,三原色,たぶん,Biri-Biri,怪物,もしも命が描けたら,優しい彗星,ツバメ,アイドル,勇者,アドベンチャー,群青,HEART BEAT','夜に駆ける'],
 ['chogenjitsu-singapore-2025-02-23','history-0181','2025-02-23','超現実 IN SINGAPORE','新加坡','新加坡','Singapore Indoor Stadium','asia-2024-2025',577052,'セブンティーン,祝福,UNDEAD,New me,好きだ,もう少しだけ,ハルジオン,たぶん,モノトーン,優しい彗星,怪物,勇者,あの夢をなぞって,アイドル,HEART BEAT,群青','舞台に立って,夜に駆ける'],
 ['wembley-2025-06-09','history-0177','2025-06-09','LIVE AT OVO ARENA WEMBLEY Day2','英國','倫敦','OVO ARENA WEMBLEY','wembley-2025',577052,'セブンティーン,祝福,UNDEAD,PLAYERS,好きだ,ハルジオン,Watch me!,たぶん,モノトーン,優しい彗星,怪物,勇者,あの夢をなぞって,アイドル,HEART BEAT,群青','舞台に立って,夜に駆ける'],
 ['head-in-the-clouds-la-2023-08-06','history-0231','2023-08-06','Head In The Clouds Los Angeles','美國','Los Angeles（報導地區）','Rose Bowl in Pasadena',null,null,'祝福,夜に駆ける,ミスター,たぶん,もしも命が描けたら,怪物,群青,アイドル',''],
];
const titleToId=title=>{const entry=[...songs].find(([,s])=>s.data.titleJa===title&&s.data.language==='ja'&&s.data.kind==='original');if(!entry)throw new Error(`找不到曲名：${title}`);return entry[0];};
for(const [id,historyId,date,title,country,city,venue,tourId,newsId,main,encore] of newConcerts){
 const sources=newsId?[news(newsId,`${date}、${venue} 及官方影像商品刊載曲序；不是完整未剪輯影像或演唱長度的證據。`)]:[source('Natalie / ぴあ：Head In The Clouds 事後報導','https://lp.p.pia.jp/article/news/284424/index.html','2023-08-06 YOASOBI 正式時段八首歌單；不把全場壓軸的合作再加入本時段。')];
 let position=0;const setlist=[...main.split(',').map(t=>({position:++position,songId:titleToId(t),section:'main',performance:'listed'})),...encore.split(',').filter(Boolean).map(t=>({position:++position,songId:titleToId(t),section:'encore',performance:'listed'}))];
 write(`src/content/concerts/${id}.json`,{id,status:'published',updatedAt:day,title,date,country,city,venue,...(tourId?{tourId}:{}),eventType:newsId?'solo':'festival',eventStatus:'completed',setlistStatus:'complete',setlist,verifiedAt:day,notes:[newsId?'使用官方影像商品說明中標為セットリスト的曲序，未將收錄影像視為未剪輯全場，也不自行判定 full／excerpt。':'報導的洛杉磯地區名稱與 Pasadena 場館分開保留；不推定行政城市或舞台名稱。',...(id.includes('clouds')?['報導另提全場 finale 的合作演唱；它不屬於 YOASOBI 八首正式時段歌單。']:[])],sources});
 const sid=newsId?`audit-film-${newsId}`:'audit-hitc-la';
 if(!patches.sources.some(s=>s.id===sid))patches.sources.push({id:sid,title:sources[0].title,url:sources[0].url,publisher:newsId?'YOASOBI official / Sony Music':'Natalie / ぴあ',language:'ja',kind:newsId?'primary':'secondary'});
 if(!patches.patches.some(p=>p.id===historyId))patches.patches.push({id:historyId,expect:{date},set:{status:'performed',dateBasis:'performance_report',description:`${title}；事後公開資料確認演出與刊載歌單。`,verificationScope:sources[0].scope,setlistIds:[id]},addSources:[sid]});
}
write('research/audit-improvements/history-patches.json',patches);

const oriconSource=source('ORICON：2023-06-26 付串流榜與十四首累計里程碑','https://www.oricon.co.jp/news/2283718/full/','正文註 8 明列各曲累計一億次的榜單付日；它不是 RIAJ 認證或全球播放量。');
const oriconDates={'yoru-ni-kakeru':'2020-08-24',halzion:'2021-03-01',gunjo:'2021-03-29',kaibutsu:'2021-04-26',encore:'2021-07-12',tabun:'2021-07-12','ano-yume-wo-nazotte':'2021-08-09',haruka:'2021-08-16','mou-sukoshi-dake':'2021-12-27',sangenshoku:'2022-01-03','yasashii-suisei':'2022-06-20',shukufuku:'2023-02-13',idol:'2023-05-22','love-letter':'2023-06-26'};
for(const [id,date] of Object.entries(oriconDates)){const s=songs.get(id);if(!s.data.achievements.some(a=>a.source.url===oriconSource.url&&a.date===date))s.data.achievements.push({type:'chart',date,dateBasis:'ORICON 榜單付日（不是新聞發布日）',title:'ORICON 累計串流突破一億次',institution:'ORICON',metric:'日本週間串流榜累計',description:'此為 ORICON 公布的歷史達成日期，供觀察發行後的累積過程；不與 Billboard、RIAJ 或 MV 點閱相加。',source:oriconSource});}
for(const [id,date,title,description,url] of [
 ['yoru-ni-kakeru','2025-03','RIAJ 首件雙鑽石串流認證','認證月為 2025-03，累計門檻十億次；協會於 2025-04-28 公布。認證以協會申請與資料範圍為準，不是所有平台的即時總計。','https://prtimes.jp/main/html/rd/p/000000597.000010908.html'],
 ['idol','2024-01','RIAJ 鑽石串流認證','門檻五億次。協會於 2024-02-29 公告，認證月為 2024-01，並記錄配信起 295 日為當時最快達成；不改寫為二月認證。','https://prtimes.jp/main/html/rd/p/000000535.000010908.html'],
 ['yuusha','2026-07','RIAJ 三白金串流認證','認證月為 2026-07，累計門檻三億次；協會公告日為 2026-08-27。此認證與本頁較早的 Billboard 歷史快照分開閱讀。','https://prtimes.jp/main/html/rd/p/000000675.000010908.html']
]){const s=songs.get(id);if(!s.data.achievements.some(a=>a.type==='certification'&&a.date===date))s.data.achievements.push({type:'certification',date,dateBasis:'RIAJ 認證年月',title,description,institution:'日本唱片協會（RIAJ）',metric:'串流認證',source:source('日本唱片協會官方發布',url,'認證種類、月份、門檻與公告說明；保留年月精度。')});}
const gunjo=songs.get('gunjo');if(!gunjo.data.achievements.some(a=>a.date==='2026-03-04'&&a.source.url.endsWith('/581541')))gunjo.data.achievements.push({type:'chart',date:'2026-03-04',dateBasis:'Billboard JAPAN 公開日；統計期間 2026-02-23 至 2026-03-01',title:'Billboard JAPAN 累計串流突破九億次',institution:'Billboard JAPAN',metric:'日本串流榜累計',description:'官方依該週 Billboard JAPAN 集計確認九億次，與較早 ORICON 一億次里程碑分列；不同機構不相加，也不當作 RIAJ 認證。',source:news(581541,'九億次里程碑、公開日與集計期間；已讀 Sony Music 同一官方新聞正文。')});

const additions={
 gunjo:{notes:[['mv','廣告、封面與 MV 的製作者各有分工','牧野惇在具名製作訪談中說明，他先執導 Alfort 廣告，再製作歌曲 MV；女舞者由藍にいな的封面人物發展而來。MV 使用手作人偶、分別拍攝及合成，舞者與隕石的衝突是他另構想的故事，不是漫畫畫面的直接剪輯。',source('Sculptors Labo：牧野惇談群青 MV','https://sculptors.jp/topics/1686','本人受訪與公開職務表；訪談刊載日不是歌曲或 MV 發行日。')],['creation','一首歌如何走出最初的廣告用途','官方回顧將 Alfort、DANCE ONE、高校棒球行進曲、青山合唱企劃與麥當勞 mashup 分列。這些是同曲的不同合作使用，不是五個新的 YOASOBI 原創單曲，也不代表動畫改編的藍色時期片頭歌。',news(581541,'官方逐項列出的用途；不同合作版本不合併為新原創歌曲。')]],credits:[['MV 導演／人偶操演','牧野惇'],['MV 美術','河野朋美'],['MV 製作','太陽企画']]},
 shukufuku:{notes:[['narrative','先區分敘事者與電視動畫主角','官方原作《ゆりかごの星》署名大河内一楼，從鋼彈 Aerial 的第一人稱描寫史萊塔在水星長大。這讓歌曲中的陪伴與出發可以從機體視角理解；本站建議先辨認敘事者，再比較動畫片頭如何把兩者放進畫面，而不把歌曲當成主角自述。',source('鋼彈官方：ゆりかごの星','https://gundam-official.com/witch-from-mercury/music/novel/','原作署名、敘事者與故事前提；比較方法是本站閱讀建議。')]]},
 'yoru-ni-kakeru':{notes:[['mv','保留小說行間，而不是畫出唯一答案','藍にいな在 J-WAVE 與團體對談時說明，MV 先以小說建立構成，卻避免過度具體，讓影像保留讀者解釋的餘地。Ayase 回憶選擇她，是希望嚴肅故事仍以易接近的流行色彩呈現。這是創作者的說明，不以本站對鏡頭的猜測代替。',source('J-WAVE：YOASOBI 與藍にいな對談','https://news.j-wave.co.jp/2020/09/post-6629.html','MV 企劃、原作與畫面留白的本人說明。')]],credits:[['MV 動畫','藍にいな']]},
 haruka:{notes:[['mv','圖像作者與小說作者是不同角色','Sony Creative Products 的公開製作說明確認伊豆見香苗製作 MV。鈴木おさむ提供《月王子》的文字原作；讀這首歌時可把文學敘事、角色圖像和音樂製作三個職務分開，避免把影像一併歸給小說作者。',source('Sony Creative Products：ハルカ MV 製作公告','https://newscast.jp/news/8100662','MV 製作者與公開資訊。')]],credits:[['MV 製作','伊豆見香苗']]},
 'taisho-roman':{notes:[['mv','文字設計也參與跨時代敘事','前田定則的製作紀錄說明，字幕、題名與片中文字依大正／令和及兩名角色的對比設計。職務表列高瀬裕介為導演、分鏡及世界觀設計，木村真二為美術監督，SHAFT 製作動畫；這些職務不能互換。',source('前田定則：大正浪漫 製作紀錄','https://maedasadanori.com/works/taishoroman_mv/','文字設計與完整職務署名；與把木村真二稱為導演的二級摘要分開。')]],credits:[['MV 導演／分鏡／世界觀設計','高瀬裕介'],['美術監督','木村真二'],['角色設計','窪之内英策'],['文字設計','前田定則'],['動畫製作','SHAFT']]},
 mister:{notes:[['creation','從機器人的書信，到失去之後的記憶','官方介紹的敘事者是受保護的 android，向「先生」寫信回想所有者。島本理生的回應著重再也見不到的人與記憶，而不是把「所有者」等同一般戀愛中的佔有欲。',news(541228,'原作梗概與作者回應；新聞中的星期誤植不作發行日依據。')],['mv','角色、動畫與圖像設計由不同團隊合作','製作公司公開完整職務表：篠田利隆負責 MV 導演，pomodorosa 提供角色原案，Liberty Animation Studio 製作動畫，.MP 負責美術指導與設計。這些是不同職務，不應把全支動畫歸給一位作者。',source('dotMP：ミスター製作紀錄','https://dotmp.jp/work/87766','製作職務與署名；頁面日期不當作 MV 公開日。')]],credits:[['MV 導演','篠田利隆（異次元TOKYO）'],['角色原案','pomodorosa'],['動畫製作','Liberty Animation Studio'],['美術指導','堀内秀（.MP）']]},
 'moshimo-inochi-ga-egaketara':{notes:[['mv','舞台視覺與刺繡動畫的延伸','清川あさみ的製作紀錄確認，她原已參與同名舞台的視覺與美術，後來擔任歌曲 MV 的導演、分鏡及原畫。影像以刺繡圖像為基礎，結合數位與手作；故事中畫出生命的代價，與媒材本身的「製作」形成可比較的關係。',source('清川あさみ：MV 製作紀錄','https://www.asamikiyokawa.com/works/produce/732/','採用職務與刺繡媒材說明；此頁 EP 名稱有誤，以官方 THE BOOK 2 發行資料為準。')]],credits:[['MV 導演／分鏡／原畫','清川あさみ'],['CG 導演','HIDEKI INABA'],['Animation Producer','松居秀之（P.I.C.S.）']]},
 players:{notes:[['creation','素材不是一篇小說，而是許多玩家的回憶','PlayStation 30 周年企劃募集「想消除記憶再玩一次的遊戲」經驗，歌曲以投稿 #MemoryOfPlay 為素材。這使故事的主體由一位小說角色擴展為玩家共同記憶，應與 monogatary.com 小說改編分開辨認。',news(573881,'投稿企劃與創作素材。')],['mv','三十組創作者，讓遊戲記憶成為三十種圖像','官方明列鈴木健太與釣部東京為導演、稲垣雄史為製作人；共有三十組創作者參與。片中成人重新記起遊戲角色給自己的力量，對應企劃的回憶主題。',news(573881,'MV 工作人員、參與組數及故事說明。')]],credits:[['MV 導演','鈴木健太、釣部東京'],['MV 製作人','稲垣雄史']]},
 'watch-me':{notes:[['narrative','先看前傳，再看動畫中的妮可','篠原健太的《心コロロン》描寫妮可出發修行以前的過去，與守仁各自的苦惱及連結。它是歌曲直接原作，不應以整部漫畫概述代替。',news(574444,'原作與故事時間位置。')],['mv','新畫面與動畫片段共同構成 MV','官方說明 MV 全篇由動畫團隊製作，既有新繪鏡頭，也使用切取角色生活的動畫片段。因此 MV、電視片頭和動畫正篇是相關但不同的觀看入口。',news(574444,'MV 製作範圍與素材形式。')]]},
 monotone:{notes:[['mv','MV 畫出電影沒有呈現的時刻','電影團隊另外製作幼馴染三人與「ふれる」的新動畫，與岡田麿里前傳小說互相對照；並非只把電影預告接在歌曲上。',news(567367,'MV 新製作畫面、原作與電影關係。')],['version','電影版、日文原版與英文版的差異','官方 CD 說明列出英文版 Monotone，以及新增段落的 Movie Edit；英文版由 Konnie Aoki 譯詞。電影剪輯版新增段落的資訊不應套用到所有串流版本。',news(567367,'單曲三種版本與英文譯詞署名。')]]},
 'umi-no-manimani':{notes:[['mv','海邊一夜的空間與心境','辻村深月原作中的離家少女，在夜海遇見另一名少女；官方指定動畫作家土海明日香執導 MV，並介紹歌曲以中速描寫夜海的神祕感。讀故事前可先辨認場景如何限制人物的行動，讀後再看圖像如何呈現轉變。',news(550542,'原作梗概、MV 導演與歌曲介紹；聆聽方法為本站觀察。')]],credits:[['MV 導演','土海明日香']]},
 idol:{notes:[['creation','小說、歌曲與觀眾的聲音','《45510》是赤坂アカ為此曲另寫的小說。歌曲中的應援呼聲由 REAL AKIBA BOYZ 參與，不全是 ikura 一人的配唱；動畫、小說與現場 call 的觀看位置可分開思考。',news(551361,'直接原作與 call part 參與者。')],['mv','歌曲 MV 與動畫團隊的合作','官方指出 MV 由動画工房製作。小說提供觀看偶像的另一個位置，MV 呈現角色形象；兩者可互讀，仍不應把小說敘事者直接當成 MV 每一鏡的視角。',news(551361,'MV 製作公司；末句為本站閱讀方法。')]],credits:[['應援 call','REAL AKIBA BOYZ'],['MV 動畫製作','動画工房']]},
 yuusha:{notes:[['mv','與動畫正篇同公司，另製完整影像','官方記錄 MV 由 MADHOUSE 製作，全篇為原創動畫，描寫勇者一行人的旅行與芙莉蓮、欣梅爾的連結，並使用近似剪紙的圖像處理。MV 不是動畫片頭的簡單加長版。',news(580760,'MV 製作方式與視覺說明，不以點閱數推定銷量。')]],credits:[['MV 動畫製作','MADHOUSE']]},
 adrena:{notes:[['mv','從 PLAYERS 到花樣少年少女','釣部東京也參與〈PLAYERS〉，本次監督全篇動畫 MV。官方以角色奔跑、交錯與誤會描述它的喜劇節奏；與〈BABY〉同動畫的片尾感情段落比較，可看到同一作品的兩種音樂用途。',news(580136,'MV 導演、全篇動畫及片頭用途。')]],credits:[['MV 導演','釣部東京']]},
 baby:{notes:[['mv','電視片尾與歌曲 MV 分開公開','官方公告先公開無字幕片尾、再公開 MV。MV 依蒼樹靖子小說《My Dear……》與歌曲製作，描寫瑞稀思念佐野的學生生活。它與〈アドレナ〉的片頭喜劇形成另一個觀看方向。',news(580270,'兩種影像與小說關係。')]]},
 gekijo:{notes:[['creation','雙主唱與「演出自己」的構想','官方確認 Ayase 加入演唱，成為雙主唱作品。樂曲回應每個人在自己的舞台扮演角色的想法；三谷幸喜為歌曲另寫《劇場ものがたり》，不能只以電視劇劇情代替原作。',news(577827,'Ayase 演唱、直接原作與創作回應。')],['mv','本人出演與鏡頭中的鏡頭','Pennacky 執導 YOASOBI 首支本人出演的實拍 MV，菅田將暉、二階堂ふみ也參與。團體的說明提到拍演員的人、拍攝者又被拍攝的多層結構；這提供研究歌曲與「演」之間關係的具體入口。',news(577827,'MV 導演、演員與團體說明。')]],credits:[['MV 導演','Pennacky'],['MV 出演','YOASOBI、菅田將暉、二階堂ふみ']]},
 seventeen:{notes:[['creation','小說出版順序與 EP 曲序並不相同','《はじめての》四篇小說對應四首歌曲；〈セブンティーン〉最後公布，卻在 EP 排第一。原作介紹由父親救女兒的行動開啟，聆聽時應分開辨認書籍梗概與歌曲敘事，不能依出版或發行順序推定歌中人稱。',news(550910,'企劃、故事梗概與四首 EP 曲序；該新聞 EP 年份誤植，以已核對 2023-05-10 商品資料為準。')]]},
 sukida:{notes:[['narrative','告白以前，先試圖刪去過去','官方梗概寫由舞準備第四次告白，並希望消去前三次告白。這個構思把「喜歡」與重新理解自己的選擇連在一起；因此題名雖直接，故事不是只有一句戀愛宣言。',news(550910,'森絵都《ヒカリノタネ》梗概。')]]},
 'new-me-en':{notes:[['version','英語版同時改動編曲與影像','官方明說英語演唱之外另施不同編曲；MV 由 Hana Watanabe 執導、Tsugumi 出演。適合比較人聲、伴奏與影像的新處理，不能只視為日文版換語言。',news(575234,'譯詞、編曲差異、導演與出演者。')]],credits:[['英語譯詞','Konnie Aoki'],['MV 導演','Hana Watanabe'],['MV 出演','Tsugumi']]},
 'monotone-en':{notes:[['version','英文版與電影剪輯版分開辨認','官方單曲商品介紹列出英文版 Monotone，譯詞署名為 Konnie Aoki；同一商品另有增加段落的 Movie Edit。英文改寫和電影剪輯是兩種不同處理，不能把 Movie Edit 的新增段落套用到英文版。',news(567367,'英文版曲目與譯詞署名；Movie Edit 另列。')]],credits:[['英語譯詞','Konnie Aoki']]},
};
for(const [id,s] of songs){
 const d=s.data;const extra=additions[id];
 const primary=d.sources.find(s=>!/wikipedia/.test(s.url))??d.sources[0];
 const works=d.sourceWorks.items.map(w=>`《${w.title}》${w.author?`（${w.author}）`:''}：${w.kind}`).join('；');
 const notes=[];
 if(d.versionOf){const original=songs.get(d.versionOf).data;notes.push({area:'version',title:'與原曲分開記錄的發行',text:`本作品的音源首次發行為 ${d.releaseDate}；日文原曲〈${original.titleJa}〉為 ${original.releaseDate}。故事素材沿用原曲${works?`的 ${works}`:''}；本頁不繼承原曲的榜單或獎項。`,sources:[primary]});}
 else notes.push({area:'creation',title:d.kind==='interlude'?'在完整曲序中的位置':'創作素材與合作的界線',text:works?`直接創作素材為 ${works}。${d.tieIns.state==='known'?`合作用途為 ${d.tieIns.items.map(t=>`${t.title}（${t.kind}）`).join('、')}。`:''}理解原作作者與合作對象的不同角色，再閱讀正文的故事概述。`:`${d.summary} ${d.kind==='interlude'?'此類曲目以 EP 曲序與前後歌曲理解，不另編造小說情節。':'目前官方未列獨立小說素材；作品用途與製作背景見本頁已核對資料。'}`,sources:[...d.sources.filter(s=>!/wikipedia/.test(s.url)).slice(0,2)]});
 if(extra)notes.push(...extra.notes.map(([area,title,text,src])=>({area,title,text,sources:[src]})));
 const creditSource=extra?.notes.find(n=>n[0]==='mv'||n[0]==='version')?.[3]??extra?.notes[0]?.[3];
 const credits=(extra?.credits??[]).map(([role,name])=>({role,name,scope:'僅適用此歌曲／此版本的製作紀錄。',source:creditSource}));
 const gaps=[];
 if(!notes.some(n=>n.area==='mv')&&d.kind!=='interlude')gaps.push({area:'mv',note:d.videos.some(v=>v.kind==='mv')?'已有官方 MV 入口；導演訪談與完整製作職務尚待逐項查核。':'尚未核對獨立歌曲 MV；不以 audio 或現場片段冒充。'});
 if(!d.achievements.some(a=>a.type==='chart'))gaps.push({area:'charts',note:'尚未收入可逐曲核對的榜單紀錄；不代表未上榜。'});
 if(!d.achievements.some(a=>a.type==='award'||a.type==='nomination'))gaps.push({area:'awards',note:'尚未收入本曲可核對的獎項或提名；團體獎項不自動歸到每首歌。'});
 if(!d.achievements.some(a=>a.type==='certification'))gaps.push({area:'certification',note:'尚未逐曲確認認證種類與月份；不能從播放數自行換算認證。'});
 if(d.language==='en'&&!credits.some(c=>c.role.includes('譯詞')))gaps.push({area:'version',note:'此英文版的譯詞／製作署名需另核對，不由其他英文版推定。'});
 write(`src/content/song-research/${id}.json`,{id,songId:id,status:'published',updatedAt:day,notes,credits,gaps,sources:[...new Map(notes.flatMap(n=>n.sources).map(s=>[s.url,s])).values()]});
 for(const v of d.videos.filter(v=>v.kind==='live')){const performedOn=videoDate(v.title);delete v.performedOn;delete v.concertId;if(performedOn){v.performedOn=performedOn;const cs=fs.readdirSync('src/content/concerts').filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync('src/content/concerts/'+f))).filter(c=>c.date===performedOn&&c.setlist.some(t=>t.songId===id));if(cs.length===1)v.concertId=cs[0].id;}v.scene=/CDTV/.test(v.title)?'tv':/THE (FIRST|HOME) TAKE/.test(v.title)?'studio':/ONLINE|SING YOUR WORLD/.test(v.title)?'online':/Clockenflap|ROCK IN JAPAN FESTIVAL|ZOZOFES/.test(v.title)?'festival':/TOUR|WEMBLEY|NICE TO MEET YOU|DOME LIVE/.test(v.title)?'concert':'other';v.contextNote='日期僅採影片標題明載；沒有日期或跨日標題時，不選定某一天。';}
 saveSong(id,s);
}
const pathFile=id=>JSON.parse(fs.readFileSync(`src/content/listening-paths/${id}.json`));
const core=pathFile('concert-first-five');Object.assign(core,{minutes:30,order:1,selectionNotes:['五首同見於 2023-08-06 海外音樂祭；順序兼顧出道、合唱與動畫入口，是編輯策展而非跨年頻率排行。','先能認出前奏與副歌，再練呼吸；夜に駆ける MV 有年齡限制，可改看官方演唱片段。'],evidenceConcertIds:['head-in-the-clouds-la-2023-08-06','wembley-2025-06-09','wandara-okinawa-2025-11-30']});core.songs.forEach(s=>s.goal='聽一次，能把前奏與副歌對上歌名。');write('src/content/listening-paths/concert-first-five.json',core);
const preparationGoals={
 yuusha:'用 MV 認識故事，再辨認副歌的節奏與旋律，和祝福比較不同動畫的情緒。',
 sangenshoku:'先抓住副歌與三人重逢的故事；回到歌單，看它與開場代表曲如何相接。',
 seventeen:'對照兩場歌單的開場位置，聽前奏如何啟動整場，而不只單聽副歌。',
 undead:'把快速段落與副歌分段聽，先認出轉折；跟唱時保留換氣，不要求一次背完。',
 'yasashii-suisei':'與怪物連著聽，辨認快與慢的反差；看它在歌單如何形成喘息與敘事。',
 'love-letter':'比較兩日 WANDARA 的 acoustic 段落位置；先跟旋律，再認出致音樂的來信主題。',
 'butai-ni-tatte':'看倫敦與新加坡的安可曲序，再回聽前奏；把鼓舞感與具體運動原作分開理解。',
 players:'先看三十組創作者的 MV，再辨認倫敦歌單的位置；思考共同回憶怎樣成為現場入口。',
 'watch-me':'以 MV 熟悉妮可的前傳，抓住輕快副歌；與較重的曲目連著聽，認出氣氛變化。',
 gekijo:'聽 Ayase 與 ikura 的雙主唱，再看官方現場；認出聲音交接，避免只找熟悉的 ikura 音色。',
 mister:'先讀 android 的書信視角，再看 MV 與海外音樂祭歌單；辨認抒情作品如何進入精簡時段。',
 'moshimo-inochi-ga-egaketara':'看刺繡 MV，再選武道館的另一日官方片段；曲目同名不代表是同一天的影像。',
 'umi-no-manimani':'先用中速夜海的聲音換一個步調；回到電光石火歌單，辨認代表曲以外的敘事空間。',
 'biri-biri':'比較首爾與 POP OUT 的位置，抓住遊戲世界與節奏；不要只用最早演出的零次數判斷重要性。',
 monotone:'對照新加坡的曲序，先認出旋律；再比較日文、英文與電影剪輯各自的用途。',
 'heart-beat':'先看 18 祭合作背景與現場，再找歌單後段；把群體聲音與純主唱作品比較。',
};
const pick=id=>({songId:id,reason:songs.get(id).data.summary,goal:preparationGoals[id]??'認識作品的原作、合作與官方 MV。'});
write('src/content/listening-paths/concert-two-hours.json',{id:'concert-two-hours',status:'published',purpose:'concert',updatedAt:day,title:'約 2 小時：把五首延伸成一場的記憶',summary:'先完成 30 分鐘五首，再新增十首；保留時間觀賞現場、重聽與比較兩份歌單。約兩小時包含前一條路線，是可調整的規劃。',minutes:120,order:2,prerequisites:['concert-first-five'],selectionNotes:['加入東京巨蛋、倫敦與 WANDARA 的交集與不同聲音；ラブレター在日文專場樣本中的重要性也值得注意。','PLAYERS、Watch me! 及劇上來自已完成的 2025 歌單，不把它們列為 2026 每場必演。'],evidenceConcertIds:['chogenjitsu-tokyo-2024-11-10','wembley-2025-06-09','wandara-okinawa-2025-11-30'],songs:['yuusha','sangenshoku','seventeen','undead','yasashii-suisei','love-letter','butai-ni-tatte','players','watch-me','gekijo'].map(pick),sources:[...core.sources,news(577052,'倫敦與新加坡曲序。')]});
write('src/content/listening-paths/concert-three-days.json',{id:'concert-three-days',status:'published',purpose:'concert',updatedAt:day,title:'分 3 天：從代表曲到近期作品',summary:'前兩條路線之外再新增九首。每天約 30–60 分鐘：補較少遇到的作品、比較場次，再認識 2026 新作；新作並非已有演出證據。',days:3,order:3,prerequisites:['concert-two-hours'],selectionNotes:['第 1 天補專場氣氛與較少見的敘事，第 2 天看海外與不同規模的選曲，第 3 天認識 2026 新作。','2026 三首僅由發行與合作資料選入。現有完整歌單樣本最新至 2025-11-30，不據此聲稱近期巡演一定演出。'],evidenceConcertIds:['pop-out-haneda-2024-01-26','chogenjitsu-singapore-2025-02-23','wandara-okinawa-2025-11-30'],songs:['mister','moshimo-inochi-ga-egaketara','umi-no-manimani','biri-biri','monotone','heart-beat','adrena','baby','orion'].map((id,i)=>({...pick(id),day:Math.floor(i/3)+1,goal:i>=6?'認識新作、原作與 MV；本路線不主張已有常演紀錄。':pick(id).goal})),sources:[...core.sources,news(561709,'POP OUT 與首爾歌單。'),...['adrena','baby','orion'].flatMap(id=>songs.get(id).data.sources.filter(s=>!/wikipedia/.test(s.url)).slice(0,1))]});
const beginner=pathFile('first-listen');Object.assign(beginner,{order:0,minutes:35,selectionNotes:['五首建立小說、概念故事、漫畫靈感與動畫合作的不同入口；推薦次序是編輯聆聽設計。']});beginner.songs.forEach(s=>s.goal='認出原作／合作對象，聽完 MV 後用一句話說出歌曲的故事入口。');write('src/content/listening-paths/first-listen.json',beginner);
for(const id of ['concert-two-hours','concert-three-days']){const route=pathFile(id);route.sources=[...new Map([...route.evidenceConcertIds.flatMap(id=>JSON.parse(fs.readFileSync(`src/content/concerts/${id}.json`)).sources),...route.songs.flatMap(s=>songs.get(s.songId).data.sources)].map(s=>[s.url,s])).values()];write(`src/content/listening-paths/${id}.json`,route);}
console.log(`Added 6 verified setlists; ${songs.size} research records; ${[...songs.values()].reduce((n,s)=>n+s.data.achievements.length,0)} achievements.`);
