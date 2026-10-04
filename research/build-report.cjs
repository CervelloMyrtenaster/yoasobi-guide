const fs = require('node:fs');
const assert = require('node:assert/strict');
const cutoff='2026-10-04';
const news=JSON.parse(fs.readFileSync('research/raw/official-news.json','utf8'));
const raw=fs.readFileSync('research/raw/live-index.txt','utf8');
const live=JSON.parse(raw.slice(raw.indexOf('(')+1,raw.lastIndexOf(')'))).items;
const sources={}; const records=[];
const source=(id,title,url,publisher,language='ja',kind='primary')=>{sources[id]={id,title,url,publisher,language,kind,accessedAt:cutoff};return id;};
const n=id=>{const r=news.find(x=>String(x.id)===String(id));if(!r)throw Error('Missing news '+id);const sid='news-'+id;source(sid,r.title,`https://www.yoasobi-music.jp/news/${id}`,'YOASOBI / Sony Music');sources[sid].publishedAt=r.date.replaceAll('.','-');sources[sid].retrieval='Sony Music 公開 JSONP 的 article 正文；非搜尋摘要';sources[sid].auditUrl=`https://www.sonymusic.co.jp/json/v2/artist/YOASOBI/information/${id}/callback/InfoSingleCallcack`;return sid;};
const ext=(id,title,url,publisher,lang='ja',kind='primary')=>source(id,title,url,publisher,lang,kind);
const riaj=ext('riaj-202111','2021年11月度串流認證及配信開始日','https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418','日本唱片協會');
const bst=ext('beastars','BEASTARS 第2期音樂與 CD 資訊','https://bst-anime.com/sp/','BEASTARS 製作委員會');
const rc=ext('recochoku-202107','2021年7月月間獎及 RGB / Monster 發行資訊','https://prtimes.jp/main/html/rd/p/000001411.000002747.html','RecoChoku');
const step=ext('recochoku-step','2021年5月月間獎及もう少しだけ發行日','https://prtimes.jp/main/html/rd/p/000001384.000002747.html','RecoChoku');
const tfm=ext('tfm-letter','Letter Song Project 對談與ラブレター發行日','https://www.tfm.co.jp/post/archive/59316','TOKYO FM');
const sonyOrigin=ext('sony-origin','Ayase 與 A&R 討論 YOASOBI 成立及首支 MV','https://cocotame.jp/series/015030/','Sony Music Cocotame');
const swallow=ext('sony-swallow','ツバメ創作專訪與 The Swallow 配信日期','https://cocotame.jp/series/038638/','Sony Music Cocotame');
const orchard=(num,title)=>ext('orchard-'+num,title,`https://prtimes.jp/main/html/rd/p/00000${String(num).padStart(4,'0')}.000055377.html`,'The Orchard Japan');
const biri=orchard(821,'Biri-Biri 日英版本同日配信');
const eside3=orchard(947,'E-SIDE 3 及 Coachella 三場演出公告');
const undead=orchard(1017,'UNDEAD 配信日期公告');
const adventure=orchard(889,'Adventure 英語版配信公告');
const usa=orchard(1056,'紐約、波士頓演出報告及 On the Stage 發行公告');
const heartbeat=orchard(845,'HEART BEAT 配信與 MV 公開');
const yuusha=orchard(773,'勇者配信與 MV 公開');
const orion=orchard(1821,'Orion 英語版配信與 MV 公開');
const thebook=orchard(1811,'THE BOOK 系列全四作及配信日期');
const overseas2022=orchard(521,'首次海外演出事後報告及 E-SIDE 2 配信日期');
const hajimeteCatalog=ext('oricon-hajimete','はじめての EP 商品目錄及發行日期','https://www.oricon.co.jp/prof/760597/products/1470842/1/','Oricon','ja','secondary');
const brave=ext('firsttimes-brave','The Brave 配信資訊','https://www.thefirsttimes.jp/news/0000353719/','THE FIRST TIMES','ja','secondary');
const yuming=ext('oricon-yuming','中央フリーウェイ合作製作及專輯資訊','https://www.oricon.co.jp/news/2299286/full/','Oricon','ja','secondary');
const yumingOfficial=ext('universal-yuming','ユーミン乾杯!! 商品與合作資訊','https://sp.universal-music.co.jp/yuming/kanpai/','Universal Music');
const ballade=ext('cdjournal-ballade','Ballade Ver. 配信當日報導','https://www.cdjournal.com/news/yoasobi/96544','CDJournal','ja','secondary');
const echoes2025=ext('echoes-report','CENTRAL Echoes Baa 官方演出報告','https://ototoy.jp/news/123311','CENTRAL 官方報告／OTOTOY','ja','secondary');
const echoes2026=ext('central-2026-report','CENTRAL 2026第二日演出報告','https://www.thefirsttimes.jp/report/0000789645/','THE FIRST TIMES','ja','secondary');
const milanoReport=ext('milano-report','TikTok LIVE 官方事後報告','https://note.com/yoasobi_staff/n/n800259469f78','YOASOBI official note');
const halzionReport=ext('billboard-halzion','ハルジオン配信與ZONe企畫','https://www.billboard-japan.com/d_news/detail/87866/2','Billboard JAPAN','ja','secondary');
const wild=ext('wild-history','WILD BUNCH 歷屆紀錄（含2022取消）','https://www.wildbunchfest.jp/history/','WILD BUNCH FEST.');
const ln=ext('livenation-2026','Never Ending Stories 北美八場日程','https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll','Live Nation','en');
const bb2020=ext('billboard-2020','2020年榜官方新聞稿','https://www.hankyu-hanshin.co.jp/release/docs/317e7269e58de3db105f9f2e4debbb3d5488113e.pdf','Billboard JAPAN / 阪急阪神');
const wikiJa=ext('wiki-ja','YOASOBI 日文條目','https://ja.wikipedia.org/wiki/YOASOBI','Wikipedia','ja','candidate');
const wikiEn=ext('wiki-en-discography','Yoasobi discography','https://en.wikipedia.org/wiki/Yoasobi_discography','Wikipedia','en','candidate');
const wikiLive=ext('wiki-en-live','List of Yoasobi live performances','https://en.wikipedia.org/wiki/List_of_Yoasobi_live_performances','Wikipedia','en','candidate');
const wikiZh=ext('wiki-zh','YOASOBI 中文條目','https://zh.wikipedia.org/wiki/YOASOBI','Wikipedia','zh-Hant','candidate');
const add=(title,type,date,description,refs,extra={})=>{
  const id=`history-${String(records.length+1).padStart(4,'0')}`;
  const row={id,title,type,date,year:date?Number(date.slice(0,4)):extra.year??null,location:null,venue:null,description,sources:refs,verified:true,datePrecision:date?.length===10?'day':date?.length===7?'month':date?'year':'unknown',dateBasis:'activity',status:'documented',verificationScope:'已核對來源正文中的本筆事實；不保證資料庫已窮盡所有活動。',...extra};
  records.push(row);return row;
};
const release=(title,date,refs,description='數位單曲配信。',extra={})=>add(title,'digital_single',date,description,refs,{status:'released',...extra});
const ep=(title,date,refs,description)=>add(title,'ep',date,description,refs,{status:'released'});
const cd=(title,date,refs)=>add(title,'physical_single',date,'實體 CD 單曲；與數位版日期分開記錄。',refs,{status:'released'});
add('YOASOBI 成立','milestone','2019-10-01','官方將10月1日列為結成紀念日；2026年公告結成7周年，回推成立日期為2019-10-01。由 Ayase 與 ikura 組成、將小說音樂化。',[n(587223),sonyOrigin],{dateBasis:'official_anniversary_inference',verificationScope:'紀念日及7周年由官方直接陳述；2019年為明示的周年回推，非獨立成立當日公告。'});
add('夜に駆ける MV 公開','mv','2019-11-16','Sony Music 專訪明載首支 MV 於此日公開；不同於12月15日數位發行。',[sonyOrigin]);
release('夜に駆ける','2019-12-15',[n(587094),riaj],'首支數位單曲；原作為星野舞夜《タナトスの誘惑》。');
release('あの夢をなぞって','2020-01-18',[riaj],'數位單曲配信。');
release('ハルジオン','2020-05-11',[riaj],'數位單曲配信。');
release('たぶん','2020-07-20',[riaj]);
release('群青','2020-09-01',[n(535015),riaj],'數位單曲，Bourbon Alfort Mini Chocolate 廣告歌曲。');
release('ハルカ','2020-12-18',[n(587242),riaj],'原作為鈴木おさむ《月王子》。');
ep('THE BOOK','2021-01-06',[thebook],'首張日語 EP；此來源直接確認數位配信日。');
release('怪物','2021-01-06',[bst,riaj],'BEASTARS 第2期片頭曲。');
add('アンコール：EP 初收錄','album_track','2021-01-06','RIAJ 的配信開始日為1月6日；7月另行單曲化的候選資料不等於首次發行。',[riaj]);
release('優しい彗星','2021-01-20',[bst],'BEASTARS 第2期片尾曲。');
cd('怪物 / 優しい彗星','2021-03-24',[bst]);
release('もう少しだけ','2021-05-10',[step]);
release('三原色','2021-07-02',[n(530677)],'NTT Docomo ahamo 廣告歌曲。');
release('Into The Night','2021-07-02',[n(530677)],'夜に駆ける英語版。',{language:'en'});
release('RGB','2021-07-16',[rc],'三原色英語版。',{language:'en'});
release('Monster','2021-07-30',[rc],'怪物英語版。',{language:'en'});
release('ラブレター','2021-08-09',[tfm,riaj,n(539669)],'TOKYO FM／日本郵便 Letter Song Project 歌曲。');
release('大正浪漫','2021-09-15',[riaj]);
release('ツバメ','2021-10-25',[n(535014)],'YOASOBI with ミドリーズ；NHK ひろがれ！いろとりどり主題曲。',{collaborators:['ミドリーズ']});
release('Blue','2021-10-29',[n(535015)],'群青英語版。',{language:'en'});
ep('E-SIDE','2021-11-12',[n(535007),n(534978)],'第一張英語 EP，8首曲目。');
ep('THE BOOK 2','2021-12-01',[thebook,n(535542)],'第二張日語 EP。');
add('もしも命が描けたら：EP 初收錄','album_track','2021-12-01','先收錄 THE BOOK 2；2022年8月12日再作數位單曲發行。',[n(543995)]);
release('ミスター','2022-02-16',[n(537832)],'はじめての企畫首曲；島本理生《私だけの所有者》原作。');
release('好きだ','2022-05-30',[n(541229)],'森絵都《ヒカリノタネ》原作。');
release('もしも命が描けたら','2022-08-12',[n(543995)],'THE BOOK 2 曲目單曲化；同名舞台劇主題曲。');
release('祝福','2022-10-01',[n(545177)],'機動戰士鋼彈 水星的魔女片頭曲。');
release('The Swallow','2022-11-04',[swallow],'ツバメ英語版；YOASOBI with Midories。',{language:'en'});
cd('祝福','2022-11-09',[n(545177),n(546801)]);
release('The Blessing','2022-11-09',[n(546801)],'祝福英語版。',{language:'en'});
ep('E-SIDE 2','2022-11-18',[n(546801),overseas2022],'第二張英語 EP，8首曲目。官方內文另有2021-11-12誤植，詳見矛盾稽核。');
release('海のまにまに','2022-11-18',[n(546730)],'辻村深月《ユーレイ》原作。');
release('アドベンチャー','2023-02-15',[n(549596)],'USJ ユニ春主題曲。');
release('セブンティーン','2023-03-27',[n(550910)],'宮部みゆき《色違いのトランプ》原作。');
release('アイドル','2023-04-12',[n(551361)],'我推的孩子片頭曲；REAL AKIBA BOYZ 參與 call 部分。');
ep('はじめての - EP','2023-05-10',[n(550910),hajimeteCatalog],'四位直木賞作家合作企畫曲目彙整；官方商品欄年份有誤植，保留稽核。');
release('Idol','2023-05-26',[n(552432)],'アイドル英語版。',{language:'en'});
cd('アイドル','2023-06-21',[n(552203)]);
release('勇者','2023-09-29',[yuusha],'葬送的芙莉蓮片頭曲。');
ep('THE BOOK 3','2023-10-04',[n(556528),thebook],'第三張日語 EP。');
release('Biri-Biri','2023-11-18',[biri],'寶可夢朱／紫靈感歌曲；日英版同日發行。');
release('Biri-Biri (English Version)','2023-11-18',[biri],'日英版同日發行。',{language:'en'});
release('The Brave','2023-11-24',[brave],'勇者英語版。',{language:'en'});
cd('勇者','2023-12-13',[n(557691)]);
add('中央フリーウェイ／YOASOBI cheers 松任谷由実','collaboration','2023-12-20','收錄松任谷由實50周年合作專輯《ユーミン乾杯!!》，加入新的詞曲段落。',[yumingOfficial,yuming],{status:'released'});
release('HEART BEAT','2023-12-26',[heartbeat],'NHK YOASOBI18祭主題曲；配信日期不能與節目錄製或播出混用。');
release('Adventure','2024-02-16',[adventure],'アドベンチャー英語版。',{language:'en'});
cd('Biri-Biri','2024-03-13',[n(560558)]);
ep('E-SIDE 3','2024-04-12',[eside3],'第三張英語 EP，8首曲目。');
release('UNDEAD','2024-07-01',[undead],'物語系列 Off & Monster Season 主題曲。');
release('舞台に立って','2024-07-26',[n(565374)],'NHK Sports Theme 2024。');
release('On the Stage','2024-08-11',[usa],'舞台に立って英語版。',{language:'en'});
release('モノトーン','2024-10-01',[n(567367),n(567172)],'電影《ふれる。》主題曲。');
release('Monotone','2024-10-02',[n(567172)],'モノトーン英語版。',{language:'en'});
cd('モノトーン','2024-10-02',[n(567367),n(566699)]);
release('New me','2024-11-11',[n(568611)],'Recruit わからないまま、それでも廣告歌曲。');
release('UNDEAD (English Version)','2025-02-28',[n(573872)],'UNDEAD 英語版。',{language:'en'});
release('PLAYERS','2025-03-21',[n(573876)],'PlayStation30周年 Project: MEMORY CARD 合作歌曲。');
release('Watch me!','2025-05-18',[n(574444)],'WITCH WATCH 片頭曲。');
release('PLAYERS (English Version)','2025-05-23',[n(574443)],'PLAYERS 英語版。',{language:'en'});
release('Watch me! (English Version)','2025-05-30',[n(574443)],'Watch me! 英語版。',{language:'en'});
cd('Watch me!','2025-06-25',[n(574438)]);
release('New me (English Version)','2025-07-11',[n(575234)],'New me 英語版。',{language:'en'});
add('the NOISE／LE SSERAFIM with YOASOBI','collaboration','2025-09-26','ZOZOTOWN20周年作品；Tokyo Coffee Break 取樣夜に駆ける並新增詞曲。明確商品欄標示9/26 13:00；新聞發布欄9/28與「本日」不一致。',[n(577358),n(577534)],{status:'released',conflictIds:['C02']});
release('劇上','2025-10-02',[n(577352)],'富士水10日劇《もしもこの世が舞台なら、楽屋はどこにあるのだろう》主題曲。');
add('会心の一撃／RADWIMPS tribute','collaboration','2025-11-19','收錄《Dear Jubilee -RADWIMPS TRIBUTE-》；ぷらそにか參與。',[n(578869)],{status:'released'});
release('アドレナ','2026-01-04',[n(580137)],'花樣少年少女動畫片頭曲。');
release('BABY','2026-01-11',[n(580137),n(580248)],'花樣少年少女動畫片尾曲；1/10「24時」為1/11 00:00，與日文維基候選日期不同。',{conflictIds:['C01']});
cd('アドレナ / BABY','2026-03-04',[n(581528)]);
ep('E-SIDE 4','2026-04-24',[n(582923)],'第四張英語 EP，9首曲目。');
ep('THE BOOK for,','2026-06-26',[n(584407),thebook],'第四張日語 EP，12首曲目；官方稱 THE BOOK 系列完結作。');
add('オリオン：THE BOOK for, 初收錄','album_track','2026-06-26','Overwatch 合作新曲先收錄 EP；不將 EP 發售擅自轉成獨立數位單曲。',[n(584407)]);
release('Orion','2026-07-10',[orion],'オリオン英語版。',{language:'en'});
release('オリオン (PSYQUI Remix)','2026-09-14',[n(586806)],'9/13新聞中的「今夜24時」換算為9/14 00:00。');
add('咲き誇れ：ブラッサム主題曲首次播出','tie_in','2026-09-28','NHK晨間劇首集08:00首播主題曲；目前所讀正文沒有數位配信日期，不建立單曲發行日。',[n(587191)],{dateBasis:'first_airing'});
add('KILLA 發行預告','release_announcement','2026','官方10/1宣布年內發行，尚無月日；原作魔猫よあ《センパイを殺したいので女装する》。',[n(587223)],{status:'announced',dateBasis:'announced_release_year',announcedAt:'2026-10-01'});
for(const [title,date,id] of [['THE FILM','2022-03-23',537383],['THE FILM 2','2024-04-10',561709],['THE FILM 3','2025-10-01',577665]])add(title,'video_album',date,'官方演出影像作品集。',[n(id)],{status:'released'});
add('THE BOOK / THE BOOK 2 / THE BOOK 3 日本黑膠版','vinyl_release','2024-10-23','三張 THE BOOK 系列日本國內黑膠版發行；與CD首版不同。',[n(566407)],{status:'released'});
add('THE BOOK for, 日本黑膠版','vinyl_release','2026-07-31','日本版黑膠發行；美國限定版另於6/26發行。',[n(585528)],{status:'released'});
const tie=(title,date,id,description,basis='campaign_start')=>add(title,'tie_in',date,description,[n(id)],{dateBasis:basis});
add('ハルジオン × ZONe','tie_in','2020-05-11','為ZONe IMMERSIVE SONG PROJECT創作；此日期為歌曲配信，飲料發售另於5/12。',[halzionReport],{dateBasis:'song_release'});
tie('群青 × Alfort Mini Chocolate','2020-09-01',535015,'Bourbon 電視廣告放映開始。');
tie('ツバメ × NHK SDGs','2021-10-25',535014,'ひろがれ！いろとりどり主題曲；此日期記錄歌曲配信，節目已先行播出。','song_release');
tie('あの夢をなぞって Ballade × CalorieMate','2021-11-27',535426,'Midnight Train 廣告開始；不能當成 Ballade Ver. 商業配信日。');
tie('はじめての：四位直木賞作家合作企畫公告','2021-12-01',535663,'公告2022年2月啟動；四位作家為島本理生、辻村深月、宮部みゆき、森絵都。','announcement');
tie('ラブレター × Pure Gummy WEB CM','2022-04-01',539669,'20周年 WEB CM 公開；TVCM 另於4/8開始。');
tie('好きだ × いち髪','2022-09-09',544860,'日本の四季篇電視廣告開始。');
tie('アドベンチャー × USJ ユニ春','2023-01-26',549078,'新 CM 與歌曲初次公開；配信另為2/15。');
tie('New me × Recruit WEB CM','2024-10-01',568611,'官方YouTube WEB公開；TVCM與數位配信另為11/11。');
tie('PlayStation × Project: MEMORY CARD','2024-12-03',569357,'30周年企畫募集遊戲回憶；PLAYERS 配信另為2025-03-21。');
tie('PLAYERS × PlayStation30周年 CM','2025-03-21',573876,'歌曲及30周年特別 CM 同日公開。');
tie('Samsung Galaxy S25 Ultra × 舞台に立って','2025-04-11',573879,'シンガポールライブ カメラズーム篇公開；另一支CM僅公告4月中下旬。');
tie('YOASOBEER PROJECT × UNDEAD','2025-07-18',575675,'Suntory 生啤酒新TVCM與WEBCM；新聞發布於7/19。');
tie('劇上 × 富士電視台水10日劇','2025-10-01',577352,'日劇首集與主題曲首次播出；配信另為10/2。','first_airing');
tie('Overwatch × YOASOBI 遊戲合作','2026-07-01',584686,'限定造型與オリオン舞蹈等合作內容上線。');
tie('ハルカ × Mynavi','2026-09-30',587242,'キミの信じるものは？WEB影片／廣告起用。');
for(const [title,date,id,desc] of [
 ['シュウ ウエムラ品牌大使','2025-04-08',573883,'公告出任品牌大使並公開合作視覺。'],
 ['ASICS × YOASOBI 商品發售','2026-03-19',581962,'合作鞋款與服飾發售；2024年的預告與實際發售日期分開。'],
 ['LINE FRIENDS 官方貼圖','2026-09-10',586686,'與LINE FRIENDS合作之官方貼圖發售。'],
 ['てくてくYOASOBI企畫','2026-09-20',587042,'巡演地方合作企畫，首波福岡もち吉及FBS福岡放送。']])add(title,'brand_collaboration',date,desc,[n(id)]);
add('夜に駆ける：2020 Billboard JAPAN 年榜冠軍','milestone','2020-12-04','首次有未發行實體單曲的作品取得 Hot 100 年榜冠軍；此為公布日期。',[bb2020],{dateBasis:'announcement'});
add('日本唱片大賞特別賞公告','milestone','2021-11-19','官方公告獲第63屆日本唱片大賞特別賞；不與頒獎典禮日期混用。',[n(535235)],{dateBasis:'announcement'});
add('首次音樂祭演出：ROCK IN JAPAN 2022','milestone','2022-08-06','官方事後發布喜歡你演出影像，明稱首次音樂祭演出。',[n(544860)]);
add('アイドル：Oricon 累計10億串流','milestone','2025-11-26','官方引用11/26公布的2025/12/1付榜單；同時報導怪物7億。保留公布日及榜單日的區別。',[n(579128)],{dateBasis:'chart_announcement',chartDate:'2025-12-01'});
add('夜に駆ける：Oricon 累計11億串流','milestone','2026-09-25','官方引用9/25公布的2026/9/28付榜單；Oricon史上首支累計11億作品。',[n(587094)],{dateBasis:'chart_announcement',chartDate:'2026-09-28'});
add('YOASOBI 結成7周年','milestone','2026-10-01','官方周年公告與KILLA年內發行預告。',[n(587223)]);
const liveApi='https://www.sonymusic.co.jp/json/v2/artist/YOASOBI/live/start/0/count/100/callback/liveCallcack';
const typeFor=t=>/HALL TOUR|ARENA TOUR|ZEPP TOUR|ASIA.*TOUR|NORTH AMERICA TOUR/.test(t)?'tour_show':/COLDPLAY|NewJeans|RADWIMPS/.test(t)?'guest_performance':/PENTATONIC|MUSIC STADIUM/.test(t)?'joint_concert':/FEST|SONIC|Lollapalooza|Clockenflap|Simple Life|Head In|ZOZO|BlizzCon|Coachella/i.test(t)?'festival':/KEEP OUT|SING YOUR WORLD/.test(t)?'online_concert':'one_man_concert';
for(const group of live){
 const lid=group.link.split('/').at(-1),sid='live-'+lid;
 source(sid,group.tourName.replace(/^\[終了\]|^［終了］/,'').trim(),`https://www.yoasobi-music.jp/live/${lid}`,'YOASOBI / Sony Music');
 sources[sid].auditUrl=liveApi;sources[sid].retrieval='官方liveItem逐場日期／地區／場館欄；[終了]本身不證明实际演出。';
 for(const entry of group.liveItem){
  if(lid==='50712'&&entry.date==='2023.08.05')continue;
  const title=group.tourName.replace(/^\[終了\]|^［終了］/,'').trim();
  const date=entry.date.replaceAll('.','-');let venue=entry.place.trim(),location=entry.area==='その他'?null:entry.area,refs=[sid],status=date>cutoff?'scheduled':'listed_past';
  const extra={parentEvent:lid,dateBasis:'official_schedule',status,verificationScope:'已核對官方排定日期與場館；listed_past 未逐場取得事後演出證明。',sourceLocation:entry.area,marketLabel:null};
  if(/IN SEOUL/.test(title)){extra.marketLabel='SEOUL';location=null;extra.locationNote='官方以SEOUL宣傳，但INSPIRE的行政位置須獨立核對，不直接填首爾。';}
  if(/TAIPEI|台湾/.test(title)){extra.marketLabel='TAIPEI';}
  if(/55798/.test(lid))location='新加坡';
  if(/55797/.test(lid))location='台北（官方市場名稱）';
  if(/55188/.test(lid)){refs.push(ln);extra.isFestival=['2026-07-31','2026-08-02'].includes(date);}
  if(lid==='54592'){location='横浜市西区';refs.push(n(577358));extra.conflictIds=['C06'];}
  if(lid==='49206'){status='cancelled';refs.push(n(543333));}
  if(lid==='49212'){status='cancelled';refs.push(n(544174));}
  if(lid==='49377'){status='cancelled';refs.push(wild);}
  if(lid==='50712'){extra.verified=false;extra.date=null;extra.year=2023;extra.status='unverified';extra.candidateDate='2023-08-06';extra.verificationScope='官方索引列音樂祭8/5–8/6全期；8/6來自百科候選，尚待個別日割核對。';refs.push(wikiLive);status='unverified';}
  if(lid==='51959'){extra.sourceVenueRaw=venue;venue=null;extra.venueNote='官方place欄只有Indio街道地址，不能當作已核對的正式場館名。';}
  if(lid==='50162'&&date==='2023-08-19'){extra.conflictIds=['C13'];extra.locationNote='東京都是來源的市場標籤；ZOZO Marine／幕張メッセ行政所在地待補場館官網。';location=null;}
  if(lid==='48608'){venue='新宿ミラノ座ビル跡地';location='新宿';refs.push(n(537383));status='performed';}
  if(lid==='48204'){venue='UNIQLO CITY TOKYO（有明總部）';location='有明';refs.push(n(537383));status='performed';}
  if(lid==='48609'){refs.push(n(537383));status='performed';}
  if(lid==='49180'){refs.push(n(544860));status='performed';}
  if(lid==='49221'){refs.push(n(550910));status='performed';}
  if(lid==='49198'){refs.push(n(550846));status='performed';}
  if(lid==='55690'){refs.push(n(586806));status='performed';}
  if(lid==='55188'){refs.push(n(586855));extra.verificationScope='官方日程與完走敘述支持巡演；未另逐場核對所有取消／變動通知。';status='performed';}
  add(title,typeFor(title),date,status==='cancelled'?'原排定出演，後取消；不可計入實際演出統計。':'官方演出清單所列場次。',refs,{venue,location,...extra,status});
 }
}
// Official video release body explicitly documents the otherwise missing second Seoul date.
add('YOASOBI ASIA TOUR 2023-2024 LIVE IN SEOUL KOREA（第2場）','tour_show','2023-12-17','THE FILM 2 正文明載12/17演出；官方live索引目前只列12/16。',[n(561709)],{location:'首爾（來源名稱）',venue:'KOREA UNIV. TIGER DOME',status:'performed',parentEvent:'51265',conflictIds:['C07']});
for(const [date,loc,venue] of [['2024-08-06','New York','Radio City Music Hall'],['2024-08-08','Boston','MGM Music Hall at Fenway']])add('YOASOBI LIVE IN THE USA','one_man_concert',date,'官方發行商事後演出報告。',[usa],{location:loc,venue,status:'performed'});
add('Coachella：88rising Futures','guest_performance','2024-04-14','另於4/12及4/19單獨舞台之外，公告參與88rising Futures；目前核對到的是事前公告。',[eside3],{status:'listed_past',location:'Coachella Valley',venue:null});
add('Billie Eilish HIT ME HARD AND SOFT: THE TOUR','guest_performance','2025-08-16','特別嘉賓；8/17嘉賓為藤井風，不追加第二日YOASOBI場次。',[n(576232)],{location:null,venue:'さいたまスーパーアリーナ',status:'listed_past'});
add('Grammy Museum 特別對談與演出','special_performance','2026-09-14','官方9/15事後報導明載前一天於洛杉磯Grammy Museum進行對談及五曲演出。',[n(586855)],{location:'Los Angeles',venue:'Grammy Museum',status:'performed'});
add('ユニ春！ライブ2023','special_performance','2023-03-11','官方公告於USJ園區出演；沒有由本文確認到舞台專名，venue維持園區層級。',[n(549078)],{location:null,venue:'Universal Studios Japan',status:'listed_past'});
add('TikTok LIVE at THEATER MILANO-Za','online_concert','2023-04-24','官方事後報告證實4/24演出，有現場觀眾且免費直播；回到首演所在建築的落成劇場。',[n(550782),milanoReport],{location:'新宿歌舞伎町',venue:'THEATER MILANO-Za',status:'performed'});
for(const [date,venue,status,id] of [['2022-08-10','豊洲PIT','listed_past',541613],['2022-08-14','Zepp Sapporo','listed_past',541613],['2022-08-19','Zepp Namba','postponed',544174],['2022-09-20','Shunan RISING HALL','listed_past',545071],['2022-10-31','Zepp Namba','listed_past',545071]])add('YOASOBIのOMUSUBI〜パクパクわんぱく夏休み〜','talk_event',date,'粉絲俱樂部限定對談；官方明示不安排音樂演出，不能計入歌曲演出統計。',[n(id)],{venue,status});
// Tour-level rows preserve grouping; they are never counted as extra performances.
for(const [title,parentIds] of [
 ['YOASOBI ARENA TOUR 2023 電光石火',['49695']],['YOASOBI ASIA TOUR 2023-2024',['51263','51264','51265','51467','51468','51462','51349']],
 ['YOASOBI ZEPP TOUR 2024 POP OUT',['51262']],['YOASOBI 5th ANNIVERSARY DOME LIVE 2024 超現実',['51958']],
 ['YOASOBI ASIA TOUR 2024-2025 超現実',['52763','52764','52765','52766','52767','52768','52769']],
 ['YOASOBI HALL TOUR 2025 WANDARA',['53094']],['YOASOBI NORTH AMERICA TOUR 2026 NEVER ENDING STORIES',['55188']],
 ['YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 超惑星',['54776','55797','55798']]
]){
 const children=records.filter(r=>parentIds.includes(r.parentEvent));
 const dates=children.map(r=>r.date).sort();
 add(title,'tour',dates[0],`已取得${children.length}筆逐場日程；本筆僅為巡演群組，不重複計算場次。`,[...new Set(children.flatMap(r=>r.sources))],{endDate:dates.at(-1),status:dates[0]>cutoff?'scheduled':'documented',showIds:children.map(r=>r.id),dateBasis:'official_schedule_range'});
}
const candidate=(title,type,claimedDate,description,refs=[wikiJa,wikiEn,wikiLive,wikiZh],extra={})=>add(title,type,null,description,refs,{verified:false,year:claimedDate?Number(claimedDate.slice(0,4)):null,candidateDate:claimedDate,status:'unverified',dateBasis:'unverified_candidate',verificationScope:'候選資料，尚未完成來源正文及日期／場館核對；不得公開為確定史實。',...extra});
candidate('アンコール：獨立單曲化','digital_single','2021-07-02','與2021-01-06 EP初收錄分開；需補官方獨立商品發行證據。');
release('あの夢をなぞって (Ballade Ver.)','2022-03-30',[ballade,n(535426)],'Ballade編曲版驚喜配信；2021廣告起用與2022電影／商業配信分開。');
candidate('夜に駆ける – From THE FIRST TAKE','digital_single','2023-09-21','需核對此錄音版本的獨立數位商品日期。');
candidate('THE BOOK 1–3 國際黑膠版','vinyl_release','2024-07-26','與10/23日本版不同，需核對海外發行商商品頁及地區。');
for(const [title,date,venue] of [
 ['Bubbling & Boiling 天津泡泡島音樂節','2024-05-02',null],['Kilogrow 閃千手音樂節','2024-05-04',null],['Summer Sonic Bangkok','2024-08-25','IMPACT Challenger'],['Melon Music Awards','2024-11-30','INSPIRE ARENA'],
 ['matsuri Los Angeles','2025-03-16','Peacock Theater'],['MUSIC AWARDS JAPAN','2025-05-22','ROHM Theatre Kyoto'],['Primavera Sound Barcelona','2025-06-06','Parc del Fòrum'],
 ])candidate(title,'festival',date,'已列入跨語言候選清單；尚待活動官方日割／事後紀錄核對。',undefined,{candidateVenue:venue});
for(const [title,date,location] of [['Head in the Clouds Jakarta','2022-12-04','Jakarta'],['Head in the Clouds Manila','2022-12-09','Manila']])add(title,'festival',date,'發行商事後報告確認出演日期與城市；正文未確認場館名稱，因此venue保留null。報告的相隔天數及星期另有矛盾，見C14。',[overseas2022],{location,status:'performed',conflictIds:['C14'],verificationScope:'正文直接列明日期與城市且有演出報告；未核對場館。'});
candidate('YOASOBI18祭：錄製活動','special_performance','2023-11-19','需分開錄製11/19、播出12/25與歌曲12/26配信；場館不能由百科轉為已驗證。',undefined,{candidateVenue:'片柳アリーナ'});
candidate('第71回 NHK 紅白歌合戰','broadcast_performance','2020-12-31','官方profile確認曾出演，但需補当日節目或事後報導以核對日期及場館。');
candidate('第72回 NHK 紅白歌合戰','broadcast_performance','2021-12-31','已核對官方出場預告，待事後節目紀錄。',[n(535248)]);
candidate('第74回 NHK 紅白歌合戰','broadcast_performance','2023-12-31','需核對正式節目紀錄及合作名單。',[n(579128)]);
candidate('アイドル Global Excl. U.S. 冠軍','milestone','2023-06-06','官方回顧確認成績；需補Billboard原始榜單，區分報導日及榜單日期。',[n(579128),ln]);
candidate('夜に駆ける Billboard JAPAN 累計10億串流','milestone','2023-09-13','不要與Oricon累計10億混用；需補完整統計口徑與集計日期。');
candidate('Echoes 品牌啟動','milestone','2024-09-12','需補Sony Music企業公告，確認品牌定位及日期。');
candidate('Crunchyroll Anime Awards 最佳動畫歌曲','milestone','2024-03-02','主辦方結果／頒獎日期待核對。');
for(const date of ['2025-04-05','2025-04-06'])add('CENTRAL／Echoes Baa','festival',date,'活動官方事後報告，YOASOBI擔任首日開場及第二日壓軸。',[echoes2025,n(573884)],{location:'横浜',venue:'横浜赤レンガ倉庫 赤レンガパーク特設会場',status:'performed'});
add('CENTRAL 2026／Echoes Baa','festival','2026-04-04','事後演出報告核對日期及會場；不使用周邊販售日期推定出演。',[echoes2026],{location:'横浜',venue:'横浜赤レンガ倉庫 赤レンガパーク特設会場',status:'performed'});
// Apply researched corrections after the original inventory, preserving public record IDs.
const review=JSON.parse(fs.readFileSync('research/wiki-review-2026-10-04.json','utf8'));
assert.equal(review.asOf,cutoff);
for(const id of review.officialNewsSources)n(id);
for(const s of review.sources){
 assert.ok(!sources[s.id],`Duplicate review source ${s.id}`);
 sources[s.id]={...s,accessedAt:cutoff};
}
for(const patch of review.patches){
 const row=records.find(r=>r.id===patch.id);
 assert.ok(row,`Unknown review record ${patch.id}`);
 for(const [key,value] of Object.entries(patch.expect))assert.deepEqual(row[key],value,`${patch.id}: original ${key} changed; recheck review`);
 Object.assign(row,patch.set);
 if(patch.addSources)row.sources=[...new Set([...row.sources,...patch.addSources])];
 if(row.verified){delete row.candidateDate;delete row.candidateVenue;}
 row.datePrecision=row.date?.length===10?'day':row.date?.length===7?'month':row.date?'year':'unknown';
 row.reviewedAt=cutoff;
}
for(const item of review.additions){
 const {id,title,type,date,description,sources:refs,...extra}=item;
 assert.ok(!records.some(r=>r.id===id),`Duplicate review addition ${id}`);
 const row=add(title,type,date,description,refs,extra);
 assert.equal(row.id,id,'Append-only review IDs must remain stable');
 row.reviewedAt=cutoff;
}
const announcements=news.map(r=>({id:'announcement-'+r.id,title:r.title,type:'official_news_entry',date:r.date.replaceAll('.','-'),year:Number(r.date.slice(0,4)),location:null,venue:null,description:'官方新聞索引條目；date為文章發布日，不能當成標題所提活動或發行日期。',sources:[{title:r.title,url:`https://www.yoasobi-music.jp/news/${r.id}`,publisher:'YOASOBI / Sony Music'}],verified:true,dateBasis:'publication',verificationScope:'僅確認官方索引及正文存在；本條目的事件內容未全部完成人工史實核對。'}));
records.sort((a,b)=>(a.date??a.candidateDate??'9999').localeCompare(b.date??b.candidateDate??'9999')||a.id.localeCompare(b.id));
fs.writeFileSync('research/history-data.json',JSON.stringify({schemaVersion:1,asOf:cutoff,status:'research_inventory_with_open_gaps',scope:'YOASOBI組合；個人單獨作品不默認列為組合作品。',verificationPolicy:'verified=true表示本筆描述及指定核對範圍有正文支持；過去的事前公告保持listed_past，不能計入實際演出。',sources,records},null,2)+'\n');
fs.writeFileSync('research/official-news-index.json',JSON.stringify({asOf:cutoff,note:'425則官方文章索引，date均為文章發布日；不是425個已驗證歷史事件。',records:announcements},null,2)+'\n');
const esc=s=>String(s??'未確認／不適用').replaceAll('|','\\|').replace(/[\r\n]+/g,' ');
const link=sid=>`[${sid}](${sources[sid].url})`;
const typeLabels={digital_single:'數位單曲',physical_single:'實體單曲',ep:'EP',album_track:'EP初收錄',video_album:'演出影像',vinyl_release:'黑膠',tour:'巡演群組',tour_show:'巡演場次',one_man_concert:'單獨演出',festival:'音樂祭／活動',guest_performance:'嘉賓演出',special_performance:'特別演出',online_concert:'線上演出',broadcast_performance:'電視演出',tie_in:'Tie-in',collaboration:'音樂合作',brand_collaboration:'品牌合作',milestone:'里程碑',mv:'MV',release_announcement:'發行預告',talk_event:'對談活動',joint_concert:'聯合演出'};
const statuses={performed:'有事後紀錄',listed_past:'排定／未逐場核對事後',scheduled:'未來預定',cancelled:'取消',postponed:'延期',released:'發行',documented:'正文支持',announced:'已公布，日期未定',unverified:'待驗證'};
const counts=records.reduce((o,r)=>(o[r.type]=(o[r.type]??0)+1,o),{});
const years=records.reduce((o,r)=>{const y=r.year??'未定';o[y]??={total:0,verified:0,pending:0};o[y].total++;o[y][r.verified?'verified':'pending']++;return o;},{});
let report=`# YOASOBI 活動歷史研究報告\n\n研究截止：${cutoff}（Asia/Taipei）。採即時日、英、中文搜尋，優先核對官方正文。初次研究僅建立 research/ 檔案；本版已納入2026-10-04維基百科對照修訂，確認資料由匯入腳本同步至網站內容。UI與部署設定不變。詳見 [wiki-comparison.md](wiki-comparison.md)。\n\n## 成果與使用限制\n\n- 正規化歷史資料 ${records.length} 筆，其中 verified=true ${records.filter(r=>r.verified).length} 筆、待驗證 ${records.filter(r=>!r.verified).length} 筆。\n- 官方新聞全文來源索引425則，官方live清單50組；新聞索引的發布日期不當成活動日期。\n- 涵蓋2019–2026歷史，另保留截至截止日已公布的2026年末／2027場次。\n- 這是一份帶有缺口稽核的研究資料庫，**尚不能宣稱已窮盡所有活動，亦不能直接當成完整LIVE頻率資料庫**。缺漏不以記憶補值。\n- 排定場次、實際演出、取消活動、發行、首次收錄、MV、合作起用日及文章發布日分開；巡演群組不重複算場次。\n- 未確認的 date / location / venue 用 null；候選日期及候選場館另放 candidateDate / candidateVenue，並令 verified=false。\n- verified=true的含義由 verificationScope 限定；listed_past只核對排定資訊，不代表取得實際演出證明。完整歌單另存 src/content/concerts/，僅以 setlistIds 連結已核對來源，不推算演唱形式。\n\n## 檔案與資料欄位\n\n[history-data.json](history-data.json)：sources來源登錄與records歷史資料。[official-news-index.json](official-news-index.json)：官方425則新聞索引。每筆至少有title、type、date、year、location、venue、description、sources、verified；另有status、dateBasis、datePrecision、verificationScope。來源ID均指向同檔sources中的可點擊原始網址。\n\nraw/保存本次官方公開回應供本機稽核，已以research/.gitignore排除，沒有送入Astro公開資產。build-report.cjs只生成研究JSON及報告，不讀寫網站UI。\n\n## 年度覆蓋\n\n| 年 | 筆數 | verified=true（含排定） | 待驗證 |\n|---|---:|---:|---:|\n${Object.entries(years).map(([y,c])=>`| ${y} | ${c.total} | ${c.verified} | ${c.pending} |`).join('\n')}\n\n| 類型 | 筆數 |\n|---|---:|\n${Object.entries(counts).map(([t,c])=>`| ${typeLabels[t]??t} | ${c} |`).join('\n')}\n\n## 搜尋方法與來源優先順序\n\n日文以成立、配信リリース、発売日、ライブ、出演辞退、日割り、会場等詞查核；英文以discography、tour dates、festival、live report；中文以簡單生活節、超現實巡演、台北場、天津泡泡島、杭州閃千手查找地區候選。日／英／中文Wikipedia提供候選清單，不作重要日期的唯一確定依據。\n\n官方網站有JavaScript渲染限制，使用瀏覽器讀取後，核對其實際使用的Sony Music公開JSONP article及liveItem正文。沒有將搜尋摘要、頁面標題或相關新聞卡片當作日期定論。The Orchard Japan於PR TIMES發布的新聞稿為發行商一手聲明，與一般媒體轉載區別。\n\n主要來源：${[wikiJa,wikiEn,wikiLive,wikiZh,riaj,bst,sonyOrigin,ln,wild].map(link).join('、')}。\n\n## 已整理時間線（全部正規化資料）\n\n表內「待驗證」日期僅顯示候選日期，JSON正式date維持null。空白地點代表來源不足或不適用。完整description、驗證範圍及巡演關係見JSON。\n`;
for(const year of [...new Set(records.map(r=>r.year))].sort()){
 const rows=records.filter(r=>r.year===year);
 report+=`\n### ${year??'年份未定'}\n\n| ID | 日期／候選日期 | title | type | location | venue | description | verified／狀態 | sources |\n|---|---|---|---|---|---|---|---|---|\n`;
 report+=rows.map(r=>`| ${r.id} | ${r.date??('候選 '+(r.candidateDate??'未定'))} | ${esc(r.title)} | ${typeLabels[r.type]??r.type} | ${esc(r.location)} | ${esc(r.venue)} | ${esc(r.description)} | ${r.verified?'true':'false'}／${statuses[r.status]??r.status} | ${r.sources.map(link).join('、')} |`).join('\n')+'\n';
}
report+='\n## 矛盾與時間缺口稽核\n\n詳見 [audit.md](audit.md)。所有尚待驗證項目保留於上表與JSON，不刪除成「沒有活動」。\n\n## 來源登錄\n\n| ID | 出版者 | 語言 | 性質 | 標題及網址 |\n|---|---|---|---|---|\n'+Object.values(sources).map(s=>`| ${s.id} | ${s.publisher} | ${s.language} | ${s.kind} | [${esc(s.title)}](${s.url}) |`).join('\n')+'\n';
fs.writeFileSync('research/research-report.md',report);
console.log(JSON.stringify({records:records.length,verified:records.filter(r=>r.verified).length,pending:records.filter(r=>!r.verified).length,sources:Object.keys(sources).length,counts,years},null,2));
