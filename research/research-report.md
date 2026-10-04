# YOASOBI 活動歷史研究報告

研究截止：2026-10-04（Asia/Taipei）。採即時日、英、中文搜尋，優先核對官方正文。初次研究僅建立 research/ 檔案；本版已納入2026-10-04維基百科對照修訂，確認資料由匯入腳本同步至網站內容。UI與部署設定不變。詳見 [wiki-comparison.md](wiki-comparison.md)。

## 成果與使用限制

- 正規化歷史資料 305 筆，其中 verified=true 296 筆、待驗證 9 筆。
- 官方新聞全文來源索引425則，官方live清單50組；新聞索引的發布日期不當成活動日期。
- 涵蓋2019–2026歷史，另保留截至截止日已公布的2026年末／2027場次。
- 這是一份帶有缺口稽核的研究資料庫，**尚不能宣稱已窮盡所有活動，亦不能直接當成完整LIVE頻率資料庫**。缺漏不以記憶補值。
- 排定場次、實際演出、取消活動、發行、首次收錄、MV、合作起用日及文章發布日分開；巡演群組不重複算場次。
- 未確認的 date / location / venue 用 null；候選日期及候選場館另放 candidateDate / candidateVenue，並令 verified=false。
- verified=true的含義由 verificationScope 限定；listed_past只核對排定資訊，不代表取得實際演出證明。完整歌單另存 src/content/concerts/，僅以 setlistIds 連結已核對來源，不推算演唱形式。

## 檔案與資料欄位

[history-data.json](history-data.json)：sources來源登錄與records歷史資料。[official-news-index.json](official-news-index.json)：官方425則新聞索引。每筆至少有title、type、date、year、location、venue、description、sources、verified；另有status、dateBasis、datePrecision、verificationScope。來源ID均指向同檔sources中的可點擊原始網址。

raw/保存本次官方公開回應供本機稽核，已以research/.gitignore排除，沒有送入Astro公開資產。build-report.cjs只生成研究JSON及報告，不讀寫網站UI。

## 年度覆蓋

| 年 | 筆數 | verified=true（含排定） | 待驗證 |
|---|---:|---:|---:|
| 2019 | 3 | 3 | 0 |
| 2020 | 9 | 8 | 1 |
| 2021 | 28 | 27 | 1 |
| 2022 | 27 | 27 | 0 |
| 2023 | 52 | 48 | 4 |
| 2024 | 62 | 59 | 3 |
| 2025 | 78 | 78 | 0 |
| 2026 | 43 | 43 | 0 |
| 2027 | 3 | 3 | 0 |

| 類型 | 筆數 |
|---|---:|
| 里程碑 | 11 |
| MV | 1 |
| 數位單曲 | 54 |
| Tie-in | 17 |
| 電視演出 | 3 |
| EP | 9 |
| EP初收錄 | 3 |
| 線上演出 | 3 |
| 實體單曲 | 8 |
| 音樂祭／活動 | 34 |
| 單獨演出 | 12 |
| 演出影像 | 3 |
| 對談活動 | 5 |
| 特別演出 | 5 |
| 巡演場次 | 105 |
| 巡演群組 | 9 |
| 黑膠 | 6 |
| 嘉賓演出 | 6 |
| 音樂合作 | 3 |
| 聯合演出 | 3 |
| 品牌合作 | 4 |
| 發行預告 | 1 |

## 搜尋方法與來源優先順序

日文以成立、配信リリース、発売日、ライブ、出演辞退、日割り、会場等詞查核；英文以discography、tour dates、festival、live report；中文以簡單生活節、超現實巡演、台北場、天津泡泡島、杭州閃千手查找地區候選。日／英／中文Wikipedia提供候選清單，不作重要日期的唯一確定依據。

官方網站有JavaScript渲染限制，使用瀏覽器讀取後，核對其實際使用的Sony Music公開JSONP article及liveItem正文。沒有將搜尋摘要、頁面標題或相關新聞卡片當作日期定論。The Orchard Japan於PR TIMES發布的新聞稿為發行商一手聲明，與一般媒體轉載區別。

主要來源：[wiki-ja](https://ja.wikipedia.org/wiki/YOASOBI)、[wiki-en-discography](https://en.wikipedia.org/wiki/Yoasobi_discography)、[wiki-en-live](https://en.wikipedia.org/wiki/List_of_Yoasobi_live_performances)、[wiki-zh](https://zh.wikipedia.org/wiki/YOASOBI)、[riaj-202111](https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418)、[beastars](https://bst-anime.com/sp/)、[sony-origin](https://cocotame.jp/series/015030/)、[livenation-2026](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll)、[wild-history](https://www.wildbunchfest.jp/history/)。

## 已整理時間線（全部正規化資料）

表內「待驗證」日期僅顯示候選日期，JSON正式date維持null。空白地點代表來源不足或不適用。完整description、驗證範圍及巡演關係見JSON。

### 2019

| ID | 日期／候選日期 | title | type | location | venue | description | verified／狀態 | sources |
|---|---|---|---|---|---|---|---|---|
| history-0001 | 2019-10-01 | YOASOBI 成立 | 里程碑 | 未確認／不適用 | 未確認／不適用 | 官方將10月1日列為結成紀念日；2026年公告結成7周年，回推成立日期為2019-10-01。由 Ayase 與 ikura 組成、將小說音樂化。 | true／正文支持 | [news-587223](https://www.yoasobi-music.jp/news/587223)、[sony-origin](https://cocotame.jp/series/015030/) |
| history-0002 | 2019-11-16 | 夜に駆ける MV 公開 | MV | 未確認／不適用 | 未確認／不適用 | Sony Music 專訪明載首支 MV 於此日公開；不同於12月15日數位發行。 | true／正文支持 | [sony-origin](https://cocotame.jp/series/015030/) |
| history-0003 | 2019-12-15 | 夜に駆ける | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 首支數位單曲；原作為星野舞夜《タナトスの誘惑》。 | true／發行 | [news-587094](https://www.yoasobi-music.jp/news/587094)、[riaj-202111](https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418) |

### 2020

| ID | 日期／候選日期 | title | type | location | venue | description | verified／狀態 | sources |
|---|---|---|---|---|---|---|---|---|
| history-0004 | 2020-01-18 | あの夢をなぞって | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 數位單曲配信。 | true／發行 | [riaj-202111](https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418) |
| history-0005 | 2020-05-11 | ハルジオン | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 數位單曲配信。 | true／發行 | [riaj-202111](https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418) |
| history-0084 | 2020-05-11 | ハルジオン × ZONe | Tie-in | 未確認／不適用 | 未確認／不適用 | 為ZONe IMMERSIVE SONG PROJECT創作；此日期為歌曲配信，飲料發售另於5/12。 | true／正文支持 | [billboard-halzion](https://www.billboard-japan.com/d_news/detail/87866/2) |
| history-0006 | 2020-07-20 | たぶん | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 數位單曲配信。 | true／發行 | [riaj-202111](https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418) |
| history-0007 | 2020-09-01 | 群青 | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 數位單曲，Bourbon Alfort Mini Chocolate 廣告歌曲。 | true／發行 | [news-535015](https://www.yoasobi-music.jp/news/535015)、[riaj-202111](https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418) |
| history-0085 | 2020-09-01 | 群青 × Alfort Mini Chocolate | Tie-in | 未確認／不適用 | 未確認／不適用 | Bourbon 電視廣告放映開始。 | true／正文支持 | [news-535015](https://www.yoasobi-music.jp/news/535015) |
| history-0104 | 2020-12-04 | 夜に駆ける：2020 Billboard JAPAN 年榜冠軍 | 里程碑 | 未確認／不適用 | 未確認／不適用 | 首次有未發行實體單曲的作品取得 Hot 100 年榜冠軍；此為公布日期。 | true／正文支持 | [billboard-2020](https://www.hankyu-hanshin.co.jp/release/docs/317e7269e58de3db105f9f2e4debbb3d5488113e.pdf) |
| history-0008 | 2020-12-18 | ハルカ | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 原作為鈴木おさむ《月王子》。 | true／發行 | [news-587242](https://www.yoasobi-music.jp/news/587242)、[riaj-202111](https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418) |
| history-0291 | 候選 2020-12-31 | 第71回 NHK 紅白歌合戰 | 電視演出 | 未確認／不適用 | 未確認／不適用 | 官方profile確認曾出演，但需補当日節目或事後報導以核對日期及場館。 | false／待驗證 | [wiki-ja](https://ja.wikipedia.org/wiki/YOASOBI)、[wiki-en-discography](https://en.wikipedia.org/wiki/Yoasobi_discography)、[wiki-en-live](https://en.wikipedia.org/wiki/List_of_Yoasobi_live_performances)、[wiki-zh](https://zh.wikipedia.org/wiki/YOASOBI) |

### 2021

| ID | 日期／候選日期 | title | type | location | venue | description | verified／狀態 | sources |
|---|---|---|---|---|---|---|---|---|
| history-0009 | 2021-01-06 | THE BOOK | EP | 未確認／不適用 | 未確認／不適用 | 首張日語 EP；此來源直接確認數位配信日。 | true／發行 | [orchard-1811](https://prtimes.jp/main/html/rd/p/000001811.000055377.html) |
| history-0010 | 2021-01-06 | 怪物 | 數位單曲 | 未確認／不適用 | 未確認／不適用 | BEASTARS 第2期片頭曲。 | true／發行 | [beastars](https://bst-anime.com/sp/)、[riaj-202111](https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418) |
| history-0011 | 2021-01-06 | アンコール：EP 初收錄 | EP初收錄 | 未確認／不適用 | 未確認／不適用 | RIAJ 的配信開始日為1月6日；7月另行單曲化的候選資料不等於首次發行。 | true／正文支持 | [riaj-202111](https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418) |
| history-0012 | 2021-01-20 | 優しい彗星 | 數位單曲 | 未確認／不適用 | 未確認／不適用 | BEASTARS 第2期片尾曲。 | true／發行 | [beastars](https://bst-anime.com/sp/) |
| history-0255 | 2021-02-14 | YOASOBI 1st LIVE 『KEEP OUT THEATER』 | 線上演出 | 新宿 | 新宿ミラノ座ビル跡地 | 官方演出清單所列場次。 | true／有事後紀錄 | [live-48608](https://www.yoasobi-music.jp/live/48608)、[news-537383](https://www.yoasobi-music.jp/news/537383) |
| history-0013 | 2021-03-24 | 怪物 / 優しい彗星 | 實體單曲 | 未確認／不適用 | 未確認／不適用 | 實體 CD 單曲；與數位版日期分開記錄。 | true／發行 | [beastars](https://bst-anime.com/sp/) |
| history-0014 | 2021-05-10 | もう少しだけ | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 數位單曲配信。 | true／發行 | [recochoku-step](https://prtimes.jp/main/html/rd/p/000001384.000002747.html) |
| history-0015 | 2021-07-02 | 三原色 | 數位單曲 | 未確認／不適用 | 未確認／不適用 | NTT Docomo ahamo 廣告歌曲。 | true／發行 | [news-530677](https://www.yoasobi-music.jp/news/530677) |
| history-0016 | 2021-07-02 | Into The Night | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 夜に駆ける英語版。 | true／發行 | [news-530677](https://www.yoasobi-music.jp/news/530677) |
| history-0277 | 2021-07-02 | アンコール：獨立單曲化 | 數位單曲 | 未確認／不適用 | 未確認／不適用 | THE BOOK 收錄曲於7月2日另行獨立單曲配信；首次EP收錄仍記為1月6日。 | true／發行 | [ototoy-encore](https://ototoy.jp/_/default/p/812801) |
| history-0254 | 2021-07-04 | UT×YOASOBI 『SING YOUR WORLD』 | 線上演出 | 有明 | UNIQLO CITY TOKYO（有明總部） | 官方演出清單所列場次。 | true／有事後紀錄 | [live-48204](https://www.yoasobi-music.jp/live/48204)、[news-537383](https://www.yoasobi-music.jp/news/537383) |
| history-0017 | 2021-07-16 | RGB | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 三原色英語版。 | true／發行 | [recochoku-202107](https://prtimes.jp/main/html/rd/p/000001411.000002747.html) |
| history-0018 | 2021-07-30 | Monster | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 怪物英語版。 | true／發行 | [recochoku-202107](https://prtimes.jp/main/html/rd/p/000001411.000002747.html) |
| history-0304 | 2021-08-08 | ROCK IN JAPAN FESTIVAL 2021（原排定出演，活動取消） | 音樂祭／活動 | 茨城県ひたちなか市 | 国営ひたち海浜公園 | 原排定8月8日壓軸出演，主辦於7月7日宣布全活動取消；不列為實際演出或首次有觀眾演出。 | true／取消 | [rijf-2021-lineup](https://www.billboard-japan.com/d_news/detail/101436/2)、[rijf-2021-cancel](https://rijfes.jp/2021/info/)、[rijf-history](https://rijfes.jp/2025/history/)、[rijf-2021-home](https://rijfes.jp/2021/) |
| history-0019 | 2021-08-09 | ラブレター | 數位單曲 | 未確認／不適用 | 未確認／不適用 | TOKYO FM／日本郵便 Letter Song Project 歌曲。 | true／發行 | [tfm-letter](https://www.tfm.co.jp/post/archive/59316)、[riaj-202111](https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418)、[news-539669](https://www.yoasobi-music.jp/news/539669) |
| history-0020 | 2021-09-15 | 大正浪漫 | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 數位單曲配信。 | true／發行 | [riaj-202111](https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418) |
| history-0021 | 2021-10-25 | ツバメ | 數位單曲 | 未確認／不適用 | 未確認／不適用 | YOASOBI with ミドリーズ；NHK ひろがれ！いろとりどり主題曲。 | true／發行 | [news-535014](https://www.yoasobi-music.jp/news/535014) |
| history-0086 | 2021-10-25 | ツバメ × NHK SDGs | Tie-in | 未確認／不適用 | 未確認／不適用 | ひろがれ！いろとりどり主題曲；此日期記錄歌曲配信，節目已先行播出。 | true／正文支持 | [news-535014](https://www.yoasobi-music.jp/news/535014) |
| history-0022 | 2021-10-29 | Blue | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 群青英語版。 | true／發行 | [news-535015](https://www.yoasobi-music.jp/news/535015) |
| history-0023 | 2021-11-12 | E-SIDE | EP | 未確認／不適用 | 未確認／不適用 | 第一張英語 EP，8首曲目。 | true／發行 | [news-535007](https://www.yoasobi-music.jp/news/535007)、[news-534978](https://www.yoasobi-music.jp/news/534978) |
| history-0105 | 2021-11-19 | 日本唱片大賞特別賞公告 | 里程碑 | 未確認／不適用 | 未確認／不適用 | 官方公告獲第63屆日本唱片大賞特別賞；不與頒獎典禮日期混用。 | true／正文支持 | [news-535235](https://www.yoasobi-music.jp/news/535235) |
| history-0087 | 2021-11-27 | あの夢をなぞって Ballade × CalorieMate | Tie-in | 未確認／不適用 | 未確認／不適用 | Midnight Train 廣告開始；不能當成 Ballade Ver. 商業配信日。 | true／正文支持 | [news-535426](https://www.yoasobi-music.jp/news/535426) |
| history-0024 | 2021-12-01 | THE BOOK 2 | EP | 未確認／不適用 | 未確認／不適用 | 第二張日語 EP。 | true／發行 | [orchard-1811](https://prtimes.jp/main/html/rd/p/000001811.000055377.html)、[news-535542](https://www.yoasobi-music.jp/news/535542) |
| history-0025 | 2021-12-01 | もしも命が描けたら：EP 初收錄 | EP初收錄 | 未確認／不適用 | 未確認／不適用 | 先收錄 THE BOOK 2；2022年8月12日再作數位單曲發行。 | true／正文支持 | [news-543995](https://www.yoasobi-music.jp/news/543995) |
| history-0088 | 2021-12-01 | はじめての：四位直木賞作家合作企畫公告 | Tie-in | 未確認／不適用 | 未確認／不適用 | 公告2022年2月啟動；四位作家為島本理生、辻村深月、宮部みゆき、森絵都。 | true／正文支持 | [news-535663](https://www.yoasobi-music.jp/news/535663) |
| history-0252 | 2021-12-04 | YOASOBI『NICE TO MEET YOU』 | 單獨演出 | 東京都 | 日本武道館 | 官方演出清單所列場次。 | true／有事後紀錄 | [live-48609](https://www.yoasobi-music.jp/live/48609)、[news-537383](https://www.yoasobi-music.jp/news/537383) |
| history-0253 | 2021-12-05 | YOASOBI『NICE TO MEET YOU』 | 單獨演出 | 東京都 | 日本武道館 | 官方演出清單所列場次。 | true／有事後紀錄 | [live-48609](https://www.yoasobi-music.jp/live/48609)、[news-537383](https://www.yoasobi-music.jp/news/537383) |
| history-0292 | 候選 2021-12-31 | 第72回 NHK 紅白歌合戰 | 電視演出 | 未確認／不適用 | 未確認／不適用 | 已核對官方出場預告，待事後節目紀錄。 | false／待驗證 | [news-535248](https://www.yoasobi-music.jp/news/535248) |

### 2022

| ID | 日期／候選日期 | title | type | location | venue | description | verified／狀態 | sources |
|---|---|---|---|---|---|---|---|---|
| history-0026 | 2022-02-16 | ミスター | 數位單曲 | 未確認／不適用 | 未確認／不適用 | はじめての企畫首曲；島本理生《私だけの所有者》原作。 | true／發行 | [news-537832](https://www.yoasobi-music.jp/news/537832) |
| history-0079 | 2022-03-23 | THE FILM | 演出影像 | 未確認／不適用 | 未確認／不適用 | 官方演出影像作品集。 | true／發行 | [news-537383](https://www.yoasobi-music.jp/news/537383) |
| history-0278 | 2022-03-30 | あの夢をなぞって (Ballade Ver.) | 數位單曲 | 未確認／不適用 | 未確認／不適用 | Ballade編曲版驚喜配信；2021廣告起用與2022電影／商業配信分開。 | true／發行 | [cdjournal-ballade](https://www.cdjournal.com/news/yoasobi/96544)、[news-535426](https://www.yoasobi-music.jp/news/535426) |
| history-0089 | 2022-04-01 | ラブレター × Pure Gummy WEB CM | Tie-in | 未確認／不適用 | 未確認／不適用 | 20周年 WEB CM 公開；TVCM 另於4/8開始。 | true／正文支持 | [news-539669](https://www.yoasobi-music.jp/news/539669) |
| history-0027 | 2022-05-30 | 好きだ | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 森絵都《ヒカリノタネ》原作。 | true／發行 | [news-541229](https://www.yoasobi-music.jp/news/541229) |
| history-0251 | 2022-07-29 | FUJI ROCK FESTIVAL'22 | 音樂祭／活動 | 新潟県 | 新潟県湯沢町苗場スキー場 | 原排定出演，後取消；不可計入實際演出統計。 | true／取消 | [live-49206](https://www.yoasobi-music.jp/live/49206)、[news-543333](https://www.yoasobi-music.jp/news/543333) |
| history-0106 | 2022-08-06 | 首次音樂祭演出：ROCK IN JAPAN 2022 | 里程碑 | 未確認／不適用 | 未確認／不適用 | 官方事後發布喜歡你演出影像，明稱首次音樂祭演出。 | true／正文支持 | [news-544860](https://www.yoasobi-music.jp/news/544860) |
| history-0250 | 2022-08-06 | ROCK IN JAPAN FESTIVAL 2022 | 音樂祭／活動 | 千葉県 | 千葉市蘇我スポーツ公園 | 官方演出清單所列場次。 | true／有事後紀錄 | [live-49180](https://www.yoasobi-music.jp/live/49180)、[news-544860](https://www.yoasobi-music.jp/news/544860) |
| history-0264 | 2022-08-10 | YOASOBIのOMUSUBI〜パクパクわんぱく夏休み〜 | 對談活動 | 未確認／不適用 | 豊洲PIT | 粉絲俱樂部限定對談；官方明示不安排音樂演出，不能計入歌曲演出統計。 | true／排定／未逐場核對事後 | [news-541613](https://www.yoasobi-music.jp/news/541613) |
| history-0028 | 2022-08-12 | もしも命が描けたら | 數位單曲 | 未確認／不適用 | 未確認／不適用 | THE BOOK 2 曲目單曲化；同名舞台劇主題曲。 | true／發行 | [news-543995](https://www.yoasobi-music.jp/news/543995) |
| history-0249 | 2022-08-12 | RISING SUN ROCK FESTIVAL 2022 in EZO | 音樂祭／活動 | 北海道 | 石狩湾新港樽川ふ頭横野外特設ステージ | 官方 live 索引活動名稱的 FESTIVEL 依官方影像公告校正為 FESTIVAL。 | true／有事後紀錄 | [live-49198](https://www.yoasobi-music.jp/live/49198)、[news-550846](https://www.yoasobi-music.jp/news/550846) |
| history-0265 | 2022-08-14 | YOASOBIのOMUSUBI〜パクパクわんぱく夏休み〜 | 對談活動 | 未確認／不適用 | Zepp Sapporo | 粉絲俱樂部限定對談；官方明示不安排音樂演出，不能計入歌曲演出統計。 | true／排定／未逐場核對事後 | [news-541613](https://www.yoasobi-music.jp/news/541613) |
| history-0266 | 2022-08-19 | YOASOBIのOMUSUBI〜パクパクわんぱく夏休み〜 | 對談活動 | 未確認／不適用 | Zepp Namba | 粉絲俱樂部限定對談；官方明示不安排音樂演出，不能計入歌曲演出統計。 | true／延期 | [news-544174](https://www.yoasobi-music.jp/news/544174) |
| history-0248 | 2022-08-21 | SUMMER SONIC 2022 OSAKA | 音樂祭／活動 | 大阪府 | 舞洲SONIC PARK | 原排定出演，後取消；不可計入實際演出統計。 | true／取消 | [live-49212](https://www.yoasobi-music.jp/live/49212)、[news-544174](https://www.yoasobi-music.jp/news/544174) |
| history-0247 | 2022-08-28 | SWEET LOVE SHOWER 2022 | 音樂祭／活動 | 山梨県 | 山中湖交流プラザ きらら | 官方演出清單所列場次。 | true／有事後紀錄 | [live-49221](https://www.yoasobi-music.jp/live/49221)、[news-550910](https://www.yoasobi-music.jp/news/550910) |
| history-0090 | 2022-09-09 | 好きだ × いち髪 | Tie-in | 未確認／不適用 | 未確認／不適用 | 日本の四季篇電視廣告開始。 | true／正文支持 | [news-544860](https://www.yoasobi-music.jp/news/544860) |
| history-0246 | 2022-09-19 | WILD BUNCH FEST. 2022 | 音樂祭／活動 | 山口県 | 山口きらら博記念公園 | 原排定出演，後取消；不可計入實際演出統計。 | true／取消 | [live-49377](https://www.yoasobi-music.jp/live/49377)、[wild-history](https://www.wildbunchfest.jp/history/) |
| history-0267 | 2022-09-20 | YOASOBIのOMUSUBI〜パクパクわんぱく夏休み〜 | 對談活動 | 未確認／不適用 | Shunan RISING HALL | 粉絲俱樂部限定對談；官方明示不安排音樂演出，不能計入歌曲演出統計。 | true／排定／未逐場核對事後 | [news-545071](https://www.yoasobi-music.jp/news/545071) |
| history-0029 | 2022-10-01 | 祝福 | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 機動戰士鋼彈 水星的魔女片頭曲。 | true／發行 | [news-545177](https://www.yoasobi-music.jp/news/545177) |
| history-0268 | 2022-10-31 | YOASOBIのOMUSUBI〜パクパクわんぱく夏休み〜 | 對談活動 | 未確認／不適用 | Zepp Namba | 粉絲俱樂部限定對談；官方明示不安排音樂演出，不能計入歌曲演出統計。 | true／排定／未逐場核對事後 | [news-545071](https://www.yoasobi-music.jp/news/545071) |
| history-0030 | 2022-11-04 | The Swallow | 數位單曲 | 未確認／不適用 | 未確認／不適用 | ツバメ英語版；YOASOBI with Midories。 | true／發行 | [sony-swallow](https://cocotame.jp/series/038638/) |
| history-0031 | 2022-11-09 | 祝福 | 實體單曲 | 未確認／不適用 | 未確認／不適用 | 實體 CD 單曲；與數位版日期分開記錄。 | true／發行 | [news-545177](https://www.yoasobi-music.jp/news/545177)、[news-546801](https://www.yoasobi-music.jp/news/546801) |
| history-0032 | 2022-11-09 | The Blessing | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 祝福英語版。 | true／發行 | [news-546801](https://www.yoasobi-music.jp/news/546801) |
| history-0033 | 2022-11-18 | E-SIDE 2 | EP | 未確認／不適用 | 未確認／不適用 | 第二張英語 EP，8首曲目。官方內文另有2021-11-12誤植，詳見矛盾稽核。 | true／發行 | [news-546801](https://www.yoasobi-music.jp/news/546801)、[orchard-521](https://prtimes.jp/main/html/rd/p/000000521.000055377.html) |
| history-0034 | 2022-11-18 | 海のまにまに | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 辻村深月《ユーレイ》原作。 | true／發行 | [news-546730](https://www.yoasobi-music.jp/news/546730) |
| history-0288 | 2022-12-04 | Head in the Clouds Jakarta | 音樂祭／活動 | Jakarta | 未確認／不適用 | 發行商事後報告確認出演日期與城市；正文未確認場館名稱，因此venue保留null。報告的相隔天數及星期另有矛盾，見C14。 | true／有事後紀錄 | [orchard-521](https://prtimes.jp/main/html/rd/p/000000521.000055377.html) |
| history-0289 | 2022-12-09 | Head in the Clouds Manila | 音樂祭／活動 | Manila | 未確認／不適用 | 發行商事後報告確認出演日期與城市；正文未確認場館名稱，因此venue保留null。報告的相隔天數及星期另有矛盾，見C14。 | true／有事後紀錄 | [orchard-521](https://prtimes.jp/main/html/rd/p/000000521.000055377.html) |

### 2023

| ID | 日期／候選日期 | title | type | location | venue | description | verified／狀態 | sources |
|---|---|---|---|---|---|---|---|---|
| history-0091 | 2023-01-26 | アドベンチャー × USJ ユニ春 | Tie-in | 未確認／不適用 | 未確認／不適用 | 新 CM 與歌曲初次公開；配信另為2/15。 | true／正文支持 | [news-549078](https://www.yoasobi-music.jp/news/549078) |
| history-0035 | 2023-02-15 | アドベンチャー | 數位單曲 | 未確認／不適用 | 未確認／不適用 | USJ ユニ春主題曲。 | true／發行 | [news-549596](https://www.yoasobi-music.jp/news/549596) |
| history-0262 | 2023-03-11 | ユニ春！ライブ2023 | 特別演出 | 未確認／不適用 | Universal Studios Japan | 官方公告於USJ園區出演；沒有由本文確認到舞台專名，venue維持園區層級。 | true／排定／未逐場核對事後 | [news-549078](https://www.yoasobi-music.jp/news/549078) |
| history-0036 | 2023-03-27 | セブンティーン | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 宮部みゆき《色違いのトランプ》原作。 | true／發行 | [news-550910](https://www.yoasobi-music.jp/news/550910) |
| history-0232 | 2023-04-05 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 愛知県 | 日本ガイシホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0269 | 2023-04-05 | YOASOBI ARENA TOUR 2023 電光石火 | 巡演群組 | 未確認／不適用 | 未確認／不適用 | 已取得14筆逐場日程；本筆僅為巡演群組，不重複計算場次。 | true／正文支持 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0233 | 2023-04-06 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 愛知県 | 日本ガイシホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0234 | 2023-04-08 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 大阪府 | 大阪城ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0235 | 2023-04-09 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 大阪府 | 大阪城ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0037 | 2023-04-12 | アイドル | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 我推的孩子片頭曲；REAL AKIBA BOYZ 參與 call 部分。 | true／發行 | [news-551361](https://www.yoasobi-music.jp/news/551361) |
| history-0236 | 2023-04-15 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 北海道 | 北海道立総合体育センター 北海きたえーる | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0237 | 2023-04-16 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 北海道 | 北海道立総合体育センター 北海きたえーる | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0263 | 2023-04-24 | TikTok LIVE at THEATER MILANO-Za | 線上演出 | 新宿歌舞伎町 | THEATER MILANO-Za | 官方事後報告證實4/24演出，有現場觀眾且免費直播；回到首演所在建築的落成劇場。 | true／有事後紀錄 | [news-550782](https://www.yoasobi-music.jp/news/550782)、[milano-report](https://note.com/yoasobi_staff/n/n800259469f78) |
| history-0238 | 2023-05-04 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 宮城県 | ゼビオアリーナ仙台 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0239 | 2023-05-05 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 宮城県 | ゼビオアリーナ仙台 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0038 | 2023-05-10 | はじめての - EP | EP | 未確認／不適用 | 未確認／不適用 | 四位直木賞作家合作企畫曲目彙整；官方商品欄年份有誤植，保留稽核。 | true／發行 | [news-550910](https://www.yoasobi-music.jp/news/550910)、[oricon-hajimete](https://www.oricon.co.jp/prof/760597/products/1470842/1/) |
| history-0240 | 2023-05-20 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 福岡県 | 西日本総合展示場 新館 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0241 | 2023-05-21 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 福岡県 | 西日本総合展示場 新館 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0039 | 2023-05-26 | Idol | 數位單曲 | 未確認／不適用 | 未確認／不適用 | アイドル英語版。 | true／發行 | [news-552432](https://www.yoasobi-music.jp/news/552432) |
| history-0242 | 2023-06-03 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 埼玉県 | さいたまスーパーアリーナ | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0243 | 2023-06-04 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 埼玉県 | さいたまスーパーアリーナ | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0294 | 候選 2023-06-06 | アイドル Global Excl. U.S. 冠軍 | 里程碑 | 未確認／不適用 | 未確認／不適用 | 官方回顧確認成績；需補Billboard原始榜單，區分報導日及榜單日期。 | false／待驗證 | [news-579128](https://www.yoasobi-music.jp/news/579128)、[livenation-2026](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll) |
| history-0040 | 2023-06-21 | アイドル | 實體單曲 | 未確認／不適用 | 未確認／不適用 | 實體 CD 單曲；與數位版日期分開記錄。 | true／發行 | [news-552203](https://www.yoasobi-music.jp/news/552203) |
| history-0244 | 2023-06-23 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 神奈川県 | ぴあアリーナMM | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0245 | 2023-06-24 | YOASOBI ARENA TOUR 2023 “電光石火” | 巡演場次 | 神奈川県 | ぴあアリーナMM | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-49695](https://www.yoasobi-music.jp/live/49695) |
| history-0301 | 2023-07-26 | アイドル：日本7inch黑膠版 | 黑膠 | 未確認／不適用 | 未確認／不適用 | 數量限定7inch黑膠 XSKL-2；與6月21日 CD 及4月數位配信分開。 | true／發行 | [news-553579](https://www.yoasobi-music.jp/news/553579) |
| history-0231 | 2023-08-06 | Head In The Clouds Los Angeles | 音樂祭／活動 | Los Angeles（報導地區名稱） | Rose Bowl in Pasadena | 事後報導明載8月6日出演，為 YOASOBI 首次美國演出。官方索引僅列音樂祭全期，現以個別出演日建檔；場館保留官方原文，未細分園區舞台。 | true／有事後紀錄 | [live-50712](https://www.yoasobi-music.jp/live/50712)、[hitc-2023-report](https://lp.p.pia.jp/article/news/284424/index.html) |
| history-0230 | 2023-08-13 | ROCK IN JAPAN FESTIVAL 2023 | 音樂祭／活動 | 千葉県 | 千葉市蘇我スポーツ公園（千葉市中央区） | 主辦方歷屆出演名單記載8月13日 LOTUS STAGE 的 YOASOBI 演出。 | true／有事後紀錄 | [live-50779](https://www.yoasobi-music.jp/live/50779)、[rijf-history](https://rijfes.jp/2025/history/) |
| history-0228 | 2023-08-19 | SUMMER SONIC 2023 | 音樂祭／活動 | 未確認／不適用 | ZOZOマリンスタジアム”＆“幕張メッセ | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-50162](https://www.yoasobi-music.jp/live/50162) |
| history-0229 | 2023-08-20 | SUMMER SONIC 2023 | 音樂祭／活動 | 大阪府 | 舞洲ソニックパーク | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-50162](https://www.yoasobi-music.jp/live/50162) |
| history-0295 | 候選 2023-09-13 | 夜に駆ける Billboard JAPAN 累計10億串流 | 里程碑 | 未確認／不適用 | 未確認／不適用 | 不要與Oricon累計10億混用；需補完整統計口徑與集計日期。 | false／待驗證 | [wiki-ja](https://ja.wikipedia.org/wiki/YOASOBI)、[wiki-en-discography](https://en.wikipedia.org/wiki/Yoasobi_discography)、[wiki-en-live](https://en.wikipedia.org/wiki/List_of_Yoasobi_live_performances)、[wiki-zh](https://zh.wikipedia.org/wiki/YOASOBI) |
| history-0227 | 2023-09-18 | WILD BUNCH FEST.2023 | 音樂祭／活動 | 山口県 | 山口きらら博記念公園 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-50778](https://www.yoasobi-music.jp/live/50778) |
| history-0279 | 2023-09-21 | 夜に駆ける – From THE FIRST TAKE | 數位單曲 | 未確認／不適用 | 未確認／不適用 | THE HOME TAKE 公開的特別編曲錄音，以 From THE FIRST TAKE 名稱獨立配信；與2019原版及2020影片分開。 | true／發行 | [ototoy-firsttake](https://ototoy.jp/_/default/p/1822049) |
| history-0041 | 2023-09-29 | 勇者 | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 葬送的芙莉蓮片頭曲。 | true／發行 | [orchard-773](https://prtimes.jp/main/html/rd/p/000000773.000055377.html) |
| history-0042 | 2023-10-04 | THE BOOK 3 | EP | 未確認／不適用 | 未確認／不適用 | 第三張日語 EP。 | true／發行 | [news-556528](https://www.yoasobi-music.jp/news/556528)、[orchard-1811](https://prtimes.jp/main/html/rd/p/000001811.000055377.html) |
| history-0226 | 2023-11-03 | NEX_FEST | 音樂祭／活動 | 千葉県 | 幕張メッセ | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-50924](https://www.yoasobi-music.jp/live/50924) |
| history-0225 | 2023-11-04 | FULL POWER FEST'23 | 音樂祭／活動 | 広島県 | 広島マリーナホップ特設会場 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51161](https://www.yoasobi-music.jp/live/51161) |
| history-0223 | 2023-11-06 | COLDPLAY “MUSIC OF THE SPHERES WORLD TOUR” | 嘉賓演出 | 東京都 | 東京ドーム | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-50783](https://www.yoasobi-music.jp/live/50783) |
| history-0224 | 2023-11-07 | COLDPLAY “MUSIC OF THE SPHERES WORLD TOUR” | 嘉賓演出 | 東京都 | 東京ドーム | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-50783](https://www.yoasobi-music.jp/live/50783) |
| history-0043 | 2023-11-18 | Biri-Biri | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 寶可夢朱／紫靈感歌曲；日英版同日發行。 | true／發行 | [orchard-821](https://prtimes.jp/main/html/rd/p/000000821.000055377.html) |
| history-0044 | 2023-11-18 | Biri-Biri (English Version) | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 日英版同日發行。 | true／發行 | [orchard-821](https://prtimes.jp/main/html/rd/p/000000821.000055377.html) |
| history-0290 | 候選 2023-11-19 | YOASOBI18祭：錄製活動 | 特別演出 | 未確認／不適用 | 未確認／不適用 | 需分開錄製11/19、播出12/25與歌曲12/26配信；場館不能由百科轉為已驗證。 | false／待驗證 | [wiki-ja](https://ja.wikipedia.org/wiki/YOASOBI)、[wiki-en-discography](https://en.wikipedia.org/wiki/Yoasobi_discography)、[wiki-en-live](https://en.wikipedia.org/wiki/List_of_Yoasobi_live_performances)、[wiki-zh](https://zh.wikipedia.org/wiki/YOASOBI) |
| history-0045 | 2023-11-24 | The Brave | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 勇者英語版。 | true／發行 | [firsttimes-brave](https://www.thefirsttimes.jp/news/0000353719/) |
| history-0222 | 2023-12-01 | Clockenflap (香港) | 音樂祭／活動 | 未確認／不適用 | Central Harbourfront Event Space, Hong Kong Island. | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51263](https://www.yoasobi-music.jp/live/51263) |
| history-0270 | 2023-12-01 | YOASOBI ASIA TOUR 2023-2024 | 巡演群組 | 未確認／不適用 | 未確認／不適用 | 已取得8筆逐場日程；本筆僅為巡演群組，不重複計算場次。 | true／正文支持 | [live-51349](https://www.yoasobi-music.jp/live/51349)、[live-51462](https://www.yoasobi-music.jp/live/51462)、[live-51468](https://www.yoasobi-music.jp/live/51468)、[live-51467](https://www.yoasobi-music.jp/live/51467)、[live-51265](https://www.yoasobi-music.jp/live/51265)、[live-51264](https://www.yoasobi-music.jp/live/51264)、[live-51263](https://www.yoasobi-music.jp/live/51263)、[news-561709](https://www.yoasobi-music.jp/news/561709) |
| history-0221 | 2023-12-03 | 2023 Simple Life 簡單生活節 (台北) | 音樂祭／活動 | 未確認／不適用 | 華山1914文化創意產業園區 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51264](https://www.yoasobi-music.jp/live/51264) |
| history-0046 | 2023-12-13 | 勇者 | 實體單曲 | 未確認／不適用 | 未確認／不適用 | 實體 CD 單曲；與數位版日期分開記錄。 | true／發行 | [news-557691](https://www.yoasobi-music.jp/news/557691) |
| history-0220 | 2023-12-16 | YOASOBI ASIA TOUR 2023-2024韓国公演 | 巡演場次 | 未確認／不適用 | KOREA UNIV. TIGER DOME (韓国・ソウル) | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51265](https://www.yoasobi-music.jp/live/51265) |
| history-0256 | 2023-12-17 | YOASOBI ASIA TOUR 2023-2024 LIVE IN SEOUL KOREA（第2場） | 巡演場次 | 首爾（來源名稱） | KOREA UNIV. TIGER DOME | THE FILM 2 正文明載12/17演出；官方live索引目前只列12/16。 | true／有事後紀錄 | [news-561709](https://www.yoasobi-music.jp/news/561709) |
| history-0047 | 2023-12-20 | 中央フリーウェイ／YOASOBI cheers 松任谷由実 | 音樂合作 | 未確認／不適用 | 未確認／不適用 | 收錄松任谷由實50周年合作專輯《ユーミン乾杯!!》，加入新的詞曲段落。 | true／發行 | [universal-yuming](https://sp.universal-music.co.jp/yuming/kanpai/)、[oricon-yuming](https://www.oricon.co.jp/news/2299286/full/) |
| history-0048 | 2023-12-26 | HEART BEAT | 數位單曲 | 未確認／不適用 | 未確認／不適用 | NHK YOASOBI18祭主題曲；配信日期不能與節目錄製或播出混用。 | true／發行 | [orchard-845](https://prtimes.jp/main/html/rd/p/000000845.000055377.html) |
| history-0293 | 候選 2023-12-31 | 第74回 NHK 紅白歌合戰 | 電視演出 | 未確認／不適用 | 未確認／不適用 | 需核對正式節目紀錄及合作名單。 | false／待驗證 | [news-579128](https://www.yoasobi-music.jp/news/579128) |

### 2024

| ID | 日期／候選日期 | title | type | location | venue | description | verified／狀態 | sources |
|---|---|---|---|---|---|---|---|---|
| history-0219 | 2024-01-11 | YOASOBI ASIA TOUR 2023-2024 シンガポール公演 | 巡演場次 | 未確認／不適用 | Resorts World Sentosa | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51467](https://www.yoasobi-music.jp/live/51467) |
| history-0218 | 2024-01-14 | YOASOBI ASIA TOUR 2023-2024 マレーシア公演 | 巡演場次 | 未確認／不適用 | Zepp Kuala Lumpur | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51468](https://www.yoasobi-music.jp/live/51468) |
| history-0217 | 2024-01-16 | YOASOBI ASIA TOUR 2023-2024 ジャカルタ公演 | 巡演場次 | 未確認／不適用 | ISTORA SENAYAN | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51462](https://www.yoasobi-music.jp/live/51462) |
| history-0216 | 2024-01-21 | YOASOBI ASIA TOUR 2023-2024台湾公演 | 巡演場次 | 未確認／不適用 | Zepp New Taipei | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51349](https://www.yoasobi-music.jp/live/51349) |
| history-0204 | 2024-01-25 | YOASOBI ZEPP TOUR 2024 “POP OUT” | 巡演場次 | 東京都 | Zepp Haneda(TOKYO) | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0271 | 2024-01-25 | YOASOBI ZEPP TOUR 2024 POP OUT | 巡演群組 | 未確認／不適用 | 未確認／不適用 | 已取得12筆逐場日程；本筆僅為巡演群組，不重複計算場次。 | true／正文支持 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0205 | 2024-01-26 | YOASOBI ZEPP TOUR 2024 “POP OUT” | 巡演場次 | 東京都 | Zepp Haneda(TOKYO) | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0206 | 2024-02-01 | YOASOBI ZEPP TOUR 2024 “POP OUT” | 巡演場次 | 北海道 | Zepp Sapporo | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0207 | 2024-02-02 | YOASOBI ZEPP TOUR 2024 “POP OUT” | 巡演場次 | 北海道 | Zepp Sapporo | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0208 | 2024-02-08 | YOASOBI ZEPP TOUR 2024 “POP OUT” | 巡演場次 | 神奈川県 | KT Zepp Yokohama | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0209 | 2024-02-09 | YOASOBI ZEPP TOUR 2024 “POP OUT” | 巡演場次 | 神奈川県 | KT Zepp Yokohama | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0210 | 2024-02-15 | YOASOBI ZEPP TOUR 2024 “POP OUT” | 巡演場次 | 福岡県 | Zepp Fukuoka | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0049 | 2024-02-16 | Adventure | 數位單曲 | 未確認／不適用 | 未確認／不適用 | アドベンチャー英語版。 | true／發行 | [orchard-889](https://prtimes.jp/main/html/rd/p/000000889.000055377.html) |
| history-0211 | 2024-02-16 | YOASOBI ZEPP TOUR 2024 “POP OUT” | 巡演場次 | 福岡県 | Zepp Fukuoka | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0212 | 2024-02-22 | YOASOBI ZEPP TOUR 2024 “POP OUT” | 巡演場次 | 大阪府 | Zepp Osaka Bayside | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0213 | 2024-02-23 | YOASOBI ZEPP TOUR 2024 “POP OUT” | 巡演場次 | 大阪府 | Zepp Osaka Bayside | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0297 | 候選 2024-03-02 | Crunchyroll Anime Awards 最佳動畫歌曲 | 里程碑 | 未確認／不適用 | 未確認／不適用 | 主辦方結果／頒獎日期待核對。 | false／待驗證 | [wiki-ja](https://ja.wikipedia.org/wiki/YOASOBI)、[wiki-en-discography](https://en.wikipedia.org/wiki/Yoasobi_discography)、[wiki-en-live](https://en.wikipedia.org/wiki/List_of_Yoasobi_live_performances)、[wiki-zh](https://zh.wikipedia.org/wiki/YOASOBI) |
| history-0214 | 2024-03-08 | YOASOBI ZEPP TOUR 2024 “POP OUT” | 巡演場次 | 愛知県 | Zepp Nagoya | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0215 | 2024-03-09 | YOASOBI ZEPP TOUR 2024 “POP OUT” | 巡演場次 | 愛知県 | Zepp Nagoya | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51262](https://www.yoasobi-music.jp/live/51262) |
| history-0050 | 2024-03-13 | Biri-Biri | 實體單曲 | 未確認／不適用 | 未確認／不適用 | 實體 CD 單曲；與數位版日期分開記錄。 | true／發行 | [news-560558](https://www.yoasobi-music.jp/news/560558) |
| history-0302 | 2024-03-13 | Biri-Biri：日本12inch黑膠版 | 黑膠 | 未確認／不適用 | 未確認／不適用 | スカーレット盤 XSJL-1、バイオレット盤 XSJL-2 兩種12inch LP；與同日 CD 為不同商品格式。 | true／發行 | [news-560558](https://www.yoasobi-music.jp/news/560558) |
| history-0080 | 2024-04-10 | THE FILM 2 | 演出影像 | 未確認／不適用 | 未確認／不適用 | 官方演出影像作品集。 | true／發行 | [news-561709](https://www.yoasobi-music.jp/news/561709) |
| history-0051 | 2024-04-12 | E-SIDE 3 | EP | 未確認／不適用 | 未確認／不適用 | 第三張英語 EP，8首曲目。 | true／發行 | [orchard-947](https://prtimes.jp/main/html/rd/p/000000947.000055377.html) |
| history-0202 | 2024-04-12 | Coachella Valley Music and Arts Festival | 音樂祭／活動 | 未確認／不適用 | 未確認／不適用 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51959](https://www.yoasobi-music.jp/live/51959) |
| history-0259 | 2024-04-14 | Coachella：88rising Futures | 嘉賓演出 | Coachella Valley | 未確認／不適用 | 另於4/12及4/19單獨舞台之外，公告參與88rising Futures；目前核對到的是事前公告。 | true／排定／未逐場核對事後 | [orchard-947](https://prtimes.jp/main/html/rd/p/000000947.000055377.html) |
| history-0200 | 2024-04-18 | YOASOBI LIVE IN THE USA | 單獨演出 | Los Angeles | Shrine Expo Hall | 藝人與發行商公告原排定4月18日洛杉磯公演；場館名稱 EXPE 依場館官網校正為 Expo。 | true／排定／未逐場核對事後 | [live-51960](https://www.yoasobi-music.jp/live/51960)、[orchard-947](https://prtimes.jp/main/html/rd/p/000000947.000055377.html)、[shrine-venue](https://www.shrineauditorium.com/the-venue/) |
| history-0305 | 2024-04-18 | YOASOBI LIVE IN THE USA 2024 | 巡演群組 | USA | 未確認／不適用 | 既有洛杉磯、舊金山、紐約及波士頓4筆公演的巡演群組；沒有增加新場次，亦不重複計算 Coachella。 | true／正文支持 | [orchard-947](https://prtimes.jp/main/html/rd/p/000000947.000055377.html)、[orchard-1056](https://prtimes.jp/main/html/rd/p/000001056.000055377.html)、[live-51960](https://www.yoasobi-music.jp/live/51960) |
| history-0203 | 2024-04-19 | Coachella Valley Music and Arts Festival | 音樂祭／活動 | 未確認／不適用 | 未確認／不適用 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51959](https://www.yoasobi-music.jp/live/51959) |
| history-0201 | 2024-04-21 | YOASOBI LIVE IN THE USA | 單獨演出 | San Francisco | THE WARFIELD | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51960](https://www.yoasobi-music.jp/live/51960)、[orchard-947](https://prtimes.jp/main/html/rd/p/000000947.000055377.html) |
| history-0281 | 2024-05-02 | Bubbling & Boiling 天津泡泡島音樂節 | 音樂祭／活動 | 天津 | 未確認／不適用 | YOASOBI 官方當日公告與演出後致謝均為5月2日；百科存在5月1日候選，差異保留於 C16。場地尚未取得主辦原始佐證，保留空值。 | true／有事後紀錄 | [tianjin-official-announcement](https://x.com/YOASOBI_staff/status/1785976334797426830)、[tianjin-official-report](https://x.com/YOASOBI_staff/status/1786033379923910928) |
| history-0282 | 2024-05-04 | 夢想未來・閃千手音樂節 | 音樂祭／活動 | 杭州 | 杭州未来科技城学术交流中心大草坪 | 余杭時報3月20日第4版明列 YOASOBI 於5月4日的日割與杭州場地；目前核對的是事前日程。 | true／排定／未逐場核對事後 | [hangzhou-newspaper](https://yhcb.eyh.cn/resfile/2024-03-20/04/yhcb-20240320-004.pdf) |
| history-0199 | 2024-06-15 | AliExpress 2024 Weverse Con Festival | 音樂祭／活動 | 未確認／不適用 | INSPIRE ENTERTAINMENT RESORT | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52299](https://www.yoasobi-music.jp/live/52299) |
| history-0198 | 2024-06-26 | NewJeans Fan Meeting 'Bunnies Camp 2024 Tokyo Dome' | 嘉賓演出 | 東京都 | 東京ドーム | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52298](https://www.yoasobi-music.jp/live/52298) |
| history-0197 | 2024-06-30 | DEAD POP FESTiVAL 2024 | 音樂祭／活動 | 神奈川県 | 川崎市東扇島東公園特設会場 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52300](https://www.yoasobi-music.jp/live/52300) |
| history-0052 | 2024-07-01 | UNDEAD | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 物語系列 Off & Monster Season 主題曲。 | true／發行 | [orchard-1017](https://prtimes.jp/main/html/rd/p/000001017.000055377.html) |
| history-0053 | 2024-07-26 | 舞台に立って | 數位單曲 | 未確認／不適用 | 未確認／不適用 | NHK Sports Theme 2024。 | true／發行 | [news-565374](https://www.yoasobi-music.jp/news/565374) |
| history-0280 | 候選 2024-07-26 | THE BOOK 1–3 國際黑膠版 | 黑膠 | 未確認／不適用 | 未確認／不適用 | 海外商品頁可確認 THE BOOK 國際黑膠版存在，但未明載首版發行日期；百科7月26日與其他商品資料7月29日的差異仍未裁定，見 C17。 | false／待驗證 | [wiki-ja](https://ja.wikipedia.org/wiki/YOASOBI)、[wiki-en-discography](https://en.wikipedia.org/wiki/Yoasobi_discography)、[wiki-en-live](https://en.wikipedia.org/wiki/List_of_Yoasobi_live_performances)、[wiki-zh](https://zh.wikipedia.org/wiki/YOASOBI)、[bsr-book](https://blackscreenrecords.com/products/the-book) |
| history-0196 | 2024-08-03 | Lollapalooza 2024 | 音樂祭／活動 | 未確認／不適用 | Chicago Grant Park | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52605](https://www.yoasobi-music.jp/live/52605) |
| history-0257 | 2024-08-06 | YOASOBI LIVE IN THE USA | 單獨演出 | New York | Radio City Music Hall | 官方發行商事後演出報告。 | true／有事後紀錄 | [orchard-1056](https://prtimes.jp/main/html/rd/p/000001056.000055377.html) |
| history-0258 | 2024-08-08 | YOASOBI LIVE IN THE USA | 單獨演出 | Boston | MGM Music Hall at Fenway | 官方發行商事後演出報告。 | true／有事後紀錄 | [orchard-1056](https://prtimes.jp/main/html/rd/p/000001056.000055377.html) |
| history-0054 | 2024-08-11 | On the Stage | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 舞台に立って英語版。 | true／發行 | [orchard-1056](https://prtimes.jp/main/html/rd/p/000001056.000055377.html) |
| history-0283 | 2024-08-25 | SUMMER SONIC BANGKOK 2024 | 音樂祭／活動 | Bangkok 周邊（活動市場名稱） | IMPACT Challenger | Pollstar 8月25日出演名單含 YOASOBI；官方售票資料確認場地，Real Sound 現場報告確認曾出演。Bangkok 為活動市場名稱，未當作精確行政位置。 | true／有事後紀錄 | [bangkok-ticket](https://www.thaiticketmajor.com/concert/summer-sonic-bangkok-2024.html?direct=true)、[bangkok-day](https://www.pollstar.com/events/-8687181)、[bangkok-report](https://realsound.jp/2024/09/post-1773512.html)、[bangkok-report-2](https://realsound.jp/2024/09/post-1773512_2.html) |
| history-0296 | 候選 2024-09-12 | Echoes 品牌啟動 | 里程碑 | 未確認／不適用 | 未確認／不適用 | 需補Sony Music企業公告，確認品牌定位及日期。 | false／待驗證 | [wiki-ja](https://ja.wikipedia.org/wiki/YOASOBI)、[wiki-en-discography](https://en.wikipedia.org/wiki/Yoasobi_discography)、[wiki-en-live](https://en.wikipedia.org/wiki/List_of_Yoasobi_live_performances)、[wiki-zh](https://zh.wikipedia.org/wiki/YOASOBI) |
| history-0055 | 2024-10-01 | モノトーン | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 電影《ふれる。》主題曲。 | true／發行 | [news-567367](https://www.yoasobi-music.jp/news/567367)、[news-567172](https://www.yoasobi-music.jp/news/567172) |
| history-0092 | 2024-10-01 | New me × Recruit WEB CM | Tie-in | 未確認／不適用 | 未確認／不適用 | 官方YouTube WEB公開；TVCM與數位配信另為11/11。 | true／正文支持 | [news-568611](https://www.yoasobi-music.jp/news/568611) |
| history-0056 | 2024-10-02 | Monotone | 數位單曲 | 未確認／不適用 | 未確認／不適用 | モノトーン英語版。 | true／發行 | [news-567172](https://www.yoasobi-music.jp/news/567172) |
| history-0057 | 2024-10-02 | モノトーン | 實體單曲 | 未確認／不適用 | 未確認／不適用 | 實體 CD 單曲；與數位版日期分開記錄。 | true／發行 | [news-567367](https://www.yoasobi-music.jp/news/567367)、[news-566699](https://www.yoasobi-music.jp/news/566699) |
| history-0082 | 2024-10-23 | THE BOOK / THE BOOK 2 / THE BOOK 3 日本黑膠版 | 黑膠 | 未確認／不適用 | 未確認／不適用 | 三張 THE BOOK 系列日本國內黑膠版發行；與CD首版不同。 | true／發行 | [news-566407](https://www.yoasobi-music.jp/news/566407) |
| history-0192 | 2024-10-26 | YOASOBI DOME LIVE 2024 | 單獨演出 | 大阪府 | 京セラドーム | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51958](https://www.yoasobi-music.jp/live/51958) |
| history-0272 | 2024-10-26 | YOASOBI 5th ANNIVERSARY DOME LIVE 2024 超現実 | 巡演群組 | 未確認／不適用 | 未確認／不適用 | 已取得4筆逐場日程；本筆僅為巡演群組，不重複計算場次。 | true／正文支持 | [live-51958](https://www.yoasobi-music.jp/live/51958) |
| history-0193 | 2024-10-27 | YOASOBI DOME LIVE 2024 | 單獨演出 | 大阪府 | 京セラドーム | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51958](https://www.yoasobi-music.jp/live/51958) |
| history-0194 | 2024-11-09 | YOASOBI DOME LIVE 2024 | 單獨演出 | 東京都 | 東京ドーム | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-51958](https://www.yoasobi-music.jp/live/51958) |
| history-0195 | 2024-11-10 | YOASOBI DOME LIVE 2024 | 單獨演出 | 東京都 | 東京ドーム | 五週年巨蛋專場東京場；事後報導刊載 11 月 10 日全 25 首曲序，包含安可兩首。 | true／有事後紀錄 | [live-51958](https://www.yoasobi-music.jp/live/51958)、[oricon-tokyo-dome-2024-setlist](https://www.oricon.co.jp/news/2353583/full/) |
| history-0058 | 2024-11-11 | New me | 數位單曲 | 未確認／不適用 | 未確認／不適用 | Recruit わからないまま、それでも廣告歌曲。 | true／發行 | [news-568611](https://www.yoasobi-music.jp/news/568611) |
| history-0303 | 2024-11-15 | Idol：Milan Records 國際12inch黑膠版 | 黑膠 | 未確認／不適用 | 未確認／不適用 | Milan 國際12inch商品，收錄 Idol 與 Tabun 多個版本；不同於2023日本7inch。國際公告及商品目錄採11月15日，另有韓國通路11月14日差異，見 C18。 | true／發行 | [milan-idol](https://milanrecords.com/pre-order-now-yoasobi-idol-opening-theme-song-for-tv-anime-oshi-no-ko-on-vinyl/)、[milan-idol-date](https://www.anitrendz.com/news/2024/09/06/oshi-no-ko-opening-idol-by-yoasobi-gets-vinyl-release-treatment)、[milan-idol-catalog](https://www.yes24.com/product/goods/133251255) |
| history-0284 | 2024-11-30 | MMA2024（第16屆 Melon Music Awards） | 特別演出 | 未確認／不適用 | INSPIRE ARENA | 轉播方 U-NEXT 明列11月30日、INSPIRE ARENA 及 YOASOBI 出演；本筆為頒獎典禮特別演出，尚僅核對排定資料。 | true／排定／未逐場核對事後 | [mma-unext](https://prtimes.jp/main/html/rd/p/000002088.000031998.html) |
| history-0093 | 2024-12-03 | PlayStation × Project: MEMORY CARD | Tie-in | 未確認／不適用 | 未確認／不適用 | 30周年企畫募集遊戲回憶；PLAYERS 配信另為2025-03-21。 | true／正文支持 | [news-569357](https://www.yoasobi-music.jp/news/569357) |
| history-0190 | 2024-12-07 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN SEOUL | 巡演場次 | 未確認／不適用 | INSPIRE ARENA | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52763](https://www.yoasobi-music.jp/live/52763) |
| history-0273 | 2024-12-07 | YOASOBI ASIA TOUR 2024-2025 超現実 | 巡演群組 | 未確認／不適用 | 未確認／不適用 | 已取得14筆逐場日程；本筆僅為巡演群組，不重複計算場次。 | true／正文支持 | [live-52769](https://www.yoasobi-music.jp/live/52769)、[live-52768](https://www.yoasobi-music.jp/live/52768)、[live-52767](https://www.yoasobi-music.jp/live/52767)、[live-52766](https://www.yoasobi-music.jp/live/52766)、[live-52765](https://www.yoasobi-music.jp/live/52765)、[live-52764](https://www.yoasobi-music.jp/live/52764)、[live-52763](https://www.yoasobi-music.jp/live/52763) |
| history-0191 | 2024-12-08 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN SEOUL | 巡演場次 | 未確認／不適用 | INSPIRE ARENA | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52763](https://www.yoasobi-music.jp/live/52763) |
| history-0188 | 2024-12-26 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN HONG KONG | 巡演場次 | 未確認／不適用 | AsiaWorld–Arena | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52764](https://www.yoasobi-music.jp/live/52764) |
| history-0189 | 2024-12-27 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN HONG KONG | 巡演場次 | 未確認／不適用 | AsiaWorld–Arena | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52764](https://www.yoasobi-music.jp/live/52764) |

### 2025

| ID | 日期／候選日期 | title | type | location | venue | description | verified／狀態 | sources |
|---|---|---|---|---|---|---|---|---|
| history-0186 | 2025-01-25 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN BANGKOK | 巡演場次 | 未確認／不適用 | BITEC LIVE | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52765](https://www.yoasobi-music.jp/live/52765) |
| history-0187 | 2025-01-26 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN BANGKOK | 巡演場次 | 未確認／不適用 | BITEC LIVE | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52765](https://www.yoasobi-music.jp/live/52765) |
| history-0184 | 2025-02-08 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN TAIPEI | 巡演場次 | 未確認／不適用 | TAIPEI ARENA | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52766](https://www.yoasobi-music.jp/live/52766) |
| history-0185 | 2025-02-09 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN TAIPEI | 巡演場次 | 未確認／不適用 | TAIPEI ARENA | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52766](https://www.yoasobi-music.jp/live/52766) |
| history-0182 | 2025-02-15 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN SHANGHAI | 巡演場次 | 未確認／不適用 | 海梅赛德斯-奔驰文化中心 SHANGHAI MERCEDES-BENZ ARENA | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52767](https://www.yoasobi-music.jp/live/52767) |
| history-0183 | 2025-02-16 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN SHANGHAI | 巡演場次 | 未確認／不適用 | 海梅赛德斯-奔驰文化中心 SHANGHAI MERCEDES-BENZ ARENA | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52767](https://www.yoasobi-music.jp/live/52767) |
| history-0180 | 2025-02-22 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN SINGAPORE | 巡演場次 | 未確認／不適用 | Singapore Indoor Stadium | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52768](https://www.yoasobi-music.jp/live/52768) |
| history-0181 | 2025-02-23 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN SINGAPORE | 巡演場次 | 未確認／不適用 | Singapore Indoor Stadium | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52768](https://www.yoasobi-music.jp/live/52768) |
| history-0178 | 2025-02-26 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN JAKARTA | 巡演場次 | 未確認／不適用 | Istora Senayan | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52769](https://www.yoasobi-music.jp/live/52769) |
| history-0179 | 2025-02-27 | YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN JAKARTA | 巡演場次 | 未確認／不適用 | Istora Senayan | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-52769](https://www.yoasobi-music.jp/live/52769) |
| history-0059 | 2025-02-28 | UNDEAD (English Version) | 數位單曲 | 未確認／不適用 | 未確認／不適用 | UNDEAD 英語版。 | true／發行 | [news-573872](https://www.yoasobi-music.jp/news/573872) |
| history-0285 | 2025-03-16 | matsuri '25: Japanese Music Experience LOS ANGELES | 聯合演出 | Los Angeles | Peacock Theater | Ado、新しい学校のリーダーズ、YOASOBI 三組聯合演出；WOWOW 明載當地3月16日與 Peacock Theater 收錄資料。 | true／有事後紀錄 | [matsuri-wowow](https://prtimes.jp/main/html/rd/p/000008183.000001355.html) |
| history-0060 | 2025-03-21 | PLAYERS | 數位單曲 | 未確認／不適用 | 未確認／不適用 | PlayStation30周年 Project: MEMORY CARD 合作歌曲。 | true／發行 | [news-573876](https://www.yoasobi-music.jp/news/573876) |
| history-0094 | 2025-03-21 | PLAYERS × PlayStation30周年 CM | Tie-in | 未確認／不適用 | 未確認／不適用 | 歌曲及30周年特別 CM 同日公開。 | true／正文支持 | [news-573876](https://www.yoasobi-music.jp/news/573876) |
| history-0298 | 2025-04-05 | CENTRAL／Echoes Baa | 音樂祭／活動 | 横浜 | 横浜赤レンガ倉庫 赤レンガパーク特設会場 | 活動官方事後報告，YOASOBI擔任首日開場及第二日壓軸。 | true／有事後紀錄 | [echoes-report](https://ototoy.jp/news/123311)、[news-573884](https://www.yoasobi-music.jp/news/573884) |
| history-0299 | 2025-04-06 | CENTRAL／Echoes Baa | 音樂祭／活動 | 横浜 | 横浜赤レンガ倉庫 赤レンガパーク特設会場 | 活動官方事後報告，YOASOBI擔任首日開場及第二日壓軸。 | true／有事後紀錄 | [echoes-report](https://ototoy.jp/news/123311)、[news-573884](https://www.yoasobi-music.jp/news/573884) |
| history-0100 | 2025-04-08 | シュウ ウエムラ品牌大使 | 品牌合作 | 未確認／不適用 | 未確認／不適用 | 公告出任品牌大使並公開合作視覺。 | true／正文支持 | [news-573883](https://www.yoasobi-music.jp/news/573883) |
| history-0095 | 2025-04-11 | Samsung Galaxy S25 Ultra × 舞台に立って | Tie-in | 未確認／不適用 | 未確認／不適用 | シンガポールライブ カメラズーム篇公開；另一支CM僅公告4月中下旬。 | true／正文支持 | [news-573879](https://www.yoasobi-music.jp/news/573879) |
| history-0061 | 2025-05-18 | Watch me! | 數位單曲 | 未確認／不適用 | 未確認／不適用 | WITCH WATCH 片頭曲。 | true／發行 | [news-574444](https://www.yoasobi-music.jp/news/574444) |
| history-0286 | 2025-05-22 | MUSIC AWARDS JAPAN 2025 Grand Ceremony | 特別演出 | 京都 | ロームシアター京都 | 主辦方確認5月22日 Grand Ceremony 的 YOASOBI 演出，並公開當日 PLAYERS 演出影像；屬頒獎典禮特別演出。 | true／有事後紀錄 | [maj-2025-announcement](https://www.ceipa.net/newsletter/pdf/340/detail/19)、[maj-2025-report](https://www.ceipa.net/newsletter/pdf/340/detail/30) |
| history-0062 | 2025-05-23 | PLAYERS (English Version) | 數位單曲 | 未確認／不適用 | 未確認／不適用 | PLAYERS 英語版。 | true／發行 | [news-574443](https://www.yoasobi-music.jp/news/574443) |
| history-0063 | 2025-05-30 | Watch me! (English Version) | 數位單曲 | 未確認／不適用 | 未確認／不適用 | Watch me! 英語版。 | true／發行 | [news-574443](https://www.yoasobi-music.jp/news/574443) |
| history-0287 | 2025-06-06 | Primavera Sound Barcelona | 音樂祭／活動 | Barcelona, Spain | Parc del Fòrum | WOWOW 事後公告明列6月6日 Primavera Sound Barcelona 出演；LOS40 当日日割與場地報導交叉核對。 | true／有事後紀錄 | [europe-wowow](https://prtimes.jp/main/html/rd/p/000008273.000001355.html)、[primavera-los40](https://los40.com/2025/06/06/primavera-sound-2025-a-que-hora-actuan-sabrina-carpenter-y-carolina-durante-hoy-viernes-6-de-junio/) |
| history-0176 | 2025-06-08 | YOASOBI LIVE AT WEMBLEY ARENA | 單獨演出 | London, UK | OVO Arena Wembley | WOWOW 明載2025年6月8、9日倫敦公演的收錄日期與場館。 | true／有事後紀錄 | [live-53399](https://www.yoasobi-music.jp/live/53399)、[europe-wowow](https://prtimes.jp/main/html/rd/p/000008273.000001355.html) |
| history-0177 | 2025-06-09 | YOASOBI LIVE AT WEMBLEY ARENA | 單獨演出 | London, UK | OVO Arena Wembley | WOWOW 明載2025年6月8、9日倫敦公演的收錄日期與場館。 | true／有事後紀錄 | [live-53399](https://www.yoasobi-music.jp/live/53399)、[europe-wowow](https://prtimes.jp/main/html/rd/p/000008273.000001355.html) |
| history-0064 | 2025-06-25 | Watch me! | 實體單曲 | 未確認／不適用 | 未確認／不適用 | 實體 CD 單曲；與數位版日期分開記錄。 | true／發行 | [news-574438](https://www.yoasobi-music.jp/news/574438) |
| history-0065 | 2025-07-11 | New me (English Version) | 數位單曲 | 未確認／不適用 | 未確認／不適用 | New me 英語版。 | true／發行 | [news-575234](https://www.yoasobi-music.jp/news/575234) |
| history-0136 | 2025-07-13 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 熊本県 | 熊本城ホール メインホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0274 | 2025-07-13 | YOASOBI HALL TOUR 2025 WANDARA | 巡演群組 | 未確認／不適用 | 未確認／不適用 | 已取得40筆逐場日程；本筆僅為巡演群組，不重複計算場次。 | true／正文支持 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0137 | 2025-07-16 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 熊本県 | 熊本城ホール メインホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0096 | 2025-07-18 | YOASOBEER PROJECT × UNDEAD | Tie-in | 未確認／不適用 | 未確認／不適用 | Suntory 生啤酒新TVCM與WEBCM；新聞發布於7/19。 | true／正文支持 | [news-575675](https://www.yoasobi-music.jp/news/575675) |
| history-0138 | 2025-07-18 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 熊本県 | 熊本城ホール メインホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0139 | 2025-07-19 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 熊本県 | 熊本城ホール メインホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0140 | 2025-08-05 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 石川県 | 本多の森 北電ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0141 | 2025-08-06 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 石川県 | 本多の森 北電ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0142 | 2025-08-08 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 石川県 | 本多の森 北電ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0143 | 2025-08-09 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 石川県 | 本多の森 北電ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0260 | 2025-08-16 | Billie Eilish HIT ME HARD AND SOFT: THE TOUR | 嘉賓演出 | 未確認／不適用 | さいたまスーパーアリーナ | 特別嘉賓；8/17嘉賓為藤井風，不追加第二日YOASOBI場次。 | true／排定／未逐場核對事後 | [news-576232](https://www.yoasobi-music.jp/news/576232) |
| history-0144 | 2025-08-18 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 静岡県 | 静岡市清水文化会館 マリナート大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0145 | 2025-08-19 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 静岡県 | 静岡市清水文化会館 マリナート大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0146 | 2025-08-21 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 静岡県 | 静岡市清水文化会館 マリナート大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0147 | 2025-08-22 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 静岡県 | 静岡市清水文化会館 マリナート大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0148 | 2025-09-02 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 新潟県 | 新潟県民会館　大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0149 | 2025-09-03 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 新潟県 | 新潟県民会館　大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0150 | 2025-09-05 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 新潟県 | 新潟県民会館　大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0151 | 2025-09-06 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 新潟県 | 新潟県民会館　大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0152 | 2025-09-09 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 三重県 | 三重県文化会館大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0153 | 2025-09-11 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 三重県 | 三重県文化会館大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0154 | 2025-09-12 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 三重県 | 三重県文化会館大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0155 | 2025-09-17 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 鳥取県 | 米子コンベンションセンター BiG SHiP | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0156 | 2025-09-18 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 鳥取県 | 米子コンベンションセンター BiG SHiP | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0157 | 2025-09-25 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 和歌山県 | 和歌山県民文化会館 大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0066 | 2025-09-26 | the NOISE／LE SSERAFIM with YOASOBI | 音樂合作 | 未確認／不適用 | 未確認／不適用 | ZOZOTOWN20周年作品；Tokyo Coffee Break 取樣夜に駆ける並新增詞曲。明確商品欄標示9/26 13:00；新聞發布欄9/28與「本日」不一致。 | true／發行 | [news-577358](https://www.yoasobi-music.jp/news/577358)、[news-577534](https://www.yoasobi-music.jp/news/577534) |
| history-0158 | 2025-09-27 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 和歌山県 | 和歌山県民文化会館 大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0159 | 2025-09-28 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 和歌山県 | 和歌山県民文化会館 大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0081 | 2025-10-01 | THE FILM 3 | 演出影像 | 未確認／不適用 | 未確認／不適用 | 官方演出影像作品集。 | true／發行 | [news-577665](https://www.yoasobi-music.jp/news/577665) |
| history-0097 | 2025-10-01 | 劇上 × 富士電視台水10日劇 | Tie-in | 未確認／不適用 | 未確認／不適用 | 日劇首集與主題曲首次播出；配信另為10/2。 | true／正文支持 | [news-577352](https://www.yoasobi-music.jp/news/577352) |
| history-0067 | 2025-10-02 | 劇上 | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 富士水10日劇《もしもこの世が舞台なら、楽屋はどこにあるのだろう》主題曲。 | true／發行 | [news-577352](https://www.yoasobi-music.jp/news/577352) |
| history-0160 | 2025-10-10 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 岩手県 | トーサイクラシックホール岩手 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0161 | 2025-10-11 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 岩手県 | トーサイクラシックホール岩手 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0135 | 2025-10-13 | ZOZO FES | 音樂祭／活動 | 横浜市西区 | Kアリーナ | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-54592](https://www.yoasobi-music.jp/live/54592)、[news-577358](https://www.yoasobi-music.jp/news/577358) |
| history-0162 | 2025-10-16 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 岡山県 | 倉敷市民会館 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0163 | 2025-10-17 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 岡山県 | 倉敷市民会館 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0164 | 2025-10-24 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 北海道 | 帯広市民文化ホール 大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0165 | 2025-10-25 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 北海道 | 帯広市民文化ホール 大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0166 | 2025-10-27 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 北海道 | 函館市民会館  大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0167 | 2025-10-28 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 北海道 | 函館市民会館  大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0168 | 2025-10-30 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 福島県 | いわき芸術文化交流会館 アリオス アルパイン大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0169 | 2025-10-31 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 福島県 | いわき芸術文化交流会館 アリオス アルパイン大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0170 | 2025-11-12 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 愛媛県 | 松山市民会館 大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0171 | 2025-11-13 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 愛媛県 | 松山市民会館 大ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0172 | 2025-11-15 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 山口県 | 山口 KDDI維新ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0173 | 2025-11-16 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 山口県 | 山口 KDDI維新ホール | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0068 | 2025-11-19 | 会心の一撃／RADWIMPS tribute | 音樂合作 | 未確認／不適用 | 未確認／不適用 | 收錄《Dear Jubilee -RADWIMPS TRIBUTE-》；ぷらそにか參與。 | true／發行 | [news-578869](https://www.yoasobi-music.jp/news/578869) |
| history-0134 | 2025-11-24 | RADWIMPS 20th ANNIVERSARY LIVE TOUR | 嘉賓演出 | 神奈川県 | 横浜アリーナ | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-54593](https://www.yoasobi-music.jp/live/54593) |
| history-0107 | 2025-11-26 | アイドル：Oricon 累計10億串流 | 里程碑 | 未確認／不適用 | 未確認／不適用 | 官方引用11/26公布的2025/12/1付榜單；同時報導怪物7億。保留公布日及榜單日的區別。 | true／正文支持 | [news-579128](https://www.yoasobi-music.jp/news/579128) |
| history-0174 | 2025-11-29 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 沖縄県 | 沖縄コンベンションセンター展示棟 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |
| history-0175 | 2025-11-30 | YOASOBI HALL TOUR 2025 WANDARA | 巡演場次 | 沖縄県 | 沖縄コンベンションセンター展示棟 | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-53094](https://www.yoasobi-music.jp/live/53094) |

### 2026

| ID | 日期／候選日期 | title | type | location | venue | description | verified／狀態 | sources |
|---|---|---|---|---|---|---|---|---|
| history-0078 | 2026 | KILLA 發行預告 | 發行預告 | 未確認／不適用 | 未確認／不適用 | 官方10/1宣布年內發行，尚無月日；原作魔猫よあ《センパイを殺したいので女装する》。 | true／已公布，日期未定 | [news-587223](https://www.yoasobi-music.jp/news/587223) |
| history-0069 | 2026-01-04 | アドレナ | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 花樣少年少女動畫片頭曲。 | true／發行 | [news-580137](https://www.yoasobi-music.jp/news/580137) |
| history-0070 | 2026-01-11 | BABY | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 花樣少年少女動畫片尾曲；1/10「24時」為1/11 00:00，與日文維基候選日期不同。 | true／發行 | [news-580137](https://www.yoasobi-music.jp/news/580137)、[news-580248](https://www.yoasobi-music.jp/news/580248) |
| history-0133 | 2026-01-24 | PENTATONIC | 聯合演出 | 神奈川県 | 横浜BUNTAI | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-54711](https://www.yoasobi-music.jp/live/54711) |
| history-0071 | 2026-03-04 | アドレナ / BABY | 實體單曲 | 未確認／不適用 | 未確認／不適用 | 實體 CD 單曲；與數位版日期分開記錄。 | true／發行 | [news-581528](https://www.yoasobi-music.jp/news/581528) |
| history-0101 | 2026-03-19 | ASICS × YOASOBI 商品發售 | 品牌合作 | 未確認／不適用 | 未確認／不適用 | 合作鞋款與服飾發售；2024年的預告與實際發售日期分開。 | true／正文支持 | [news-581962](https://www.yoasobi-music.jp/news/581962) |
| history-0300 | 2026-04-04 | CENTRAL 2026／Echoes Baa | 音樂祭／活動 | 横浜 | 横浜赤レンガ倉庫 赤レンガパーク特設会場 | 事後演出報告核對日期及會場；不使用周邊販售日期推定出演。 | true／有事後紀錄 | [central-2026-report](https://www.thefirsttimes.jp/report/0000789645/) |
| history-0132 | 2026-04-05 | docomo presents THE MUSIC STADIUM 2026 organized by ONE OK ROCK | 聯合演出 | 東京都 | MUFG STADIUM（国立競技場） | 官方演出清單所列場次。 | true／排定／未逐場核對事後 | [live-54594](https://www.yoasobi-music.jp/live/54594) |
| history-0072 | 2026-04-24 | E-SIDE 4 | EP | 未確認／不適用 | 未確認／不適用 | 第四張英語 EP，9首曲目。 | true／發行 | [news-582923](https://www.yoasobi-music.jp/news/582923) |
| history-0073 | 2026-06-26 | THE BOOK for, | EP | 未確認／不適用 | 未確認／不適用 | 第四張日語 EP，12首曲目；官方稱 THE BOOK 系列完結作。 | true／發行 | [news-584407](https://www.yoasobi-music.jp/news/584407)、[orchard-1811](https://prtimes.jp/main/html/rd/p/000001811.000055377.html) |
| history-0074 | 2026-06-26 | オリオン：THE BOOK for, 初收錄 | EP初收錄 | 未確認／不適用 | 未確認／不適用 | Overwatch 合作新曲先收錄 EP；不將 EP 發售擅自轉成獨立數位單曲。 | true／正文支持 | [news-584407](https://www.yoasobi-music.jp/news/584407) |
| history-0098 | 2026-07-01 | Overwatch × YOASOBI 遊戲合作 | Tie-in | 未確認／不適用 | 未確認／不適用 | 限定造型與オリオン舞蹈等合作內容上線。 | true／正文支持 | [news-584686](https://www.yoasobi-music.jp/news/584686) |
| history-0075 | 2026-07-10 | Orion | 數位單曲 | 未確認／不適用 | 未確認／不適用 | オリオン英語版。 | true／發行 | [orchard-1821](https://prtimes.jp/main/html/rd/p/000001821.000055377.html) |
| history-0083 | 2026-07-31 | THE BOOK for, 日本黑膠版 | 黑膠 | 未確認／不適用 | 未確認／不適用 | 日本版黑膠發行；美國限定版另於6/26發行。 | true／發行 | [news-585528](https://www.yoasobi-music.jp/news/585528) |
| history-0124 | 2026-07-31 | OSHEAGA 2026 | 音樂祭／活動 | Montréal, Canada | Parc Jean-Drapeau | 北美巡演行程中的 OSHEAGA 音樂祭出演；巡演群組保留關聯，不計作單獨演唱會。 | true／有事後紀錄 | [live-55188](https://www.yoasobi-music.jp/live/55188)、[livenation-2026](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll)、[news-586855](https://www.yoasobi-music.jp/news/586855) |
| history-0275 | 2026-07-31 | YOASOBI NORTH AMERICA TOUR 2026 NEVER ENDING STORIES | 巡演群組 | 未確認／不適用 | 未確認／不適用 | 官方行程共8筆，含6場單獨公演與2場音樂祭出演；本筆僅為巡演群組，不重複計算場次。 | true／正文支持 | [live-55188](https://www.yoasobi-music.jp/live/55188)、[livenation-2026](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll)、[news-586855](https://www.yoasobi-music.jp/news/586855) |
| history-0125 | 2026-08-02 | Lollapalooza 2026 | 音樂祭／活動 | Chicago, USA | Grant Park | 北美巡演行程中的 Lollapalooza 音樂祭出演；巡演群組保留關聯，不計作單獨演唱會。 | true／有事後紀錄 | [live-55188](https://www.yoasobi-music.jp/live/55188)、[livenation-2026](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll)、[news-586855](https://www.yoasobi-music.jp/news/586855) |
| history-0126 | 2026-08-04 | YOASOBI NORTH AMERICA TOUR 2026 “NEVER ENDING STORIES” | 巡演場次 | 未確認／不適用 | ボストン／TD Garden（アメリカ） | 官方演出清單所列場次。 | true／有事後紀錄 | [live-55188](https://www.yoasobi-music.jp/live/55188)、[livenation-2026](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll)、[news-586855](https://www.yoasobi-music.jp/news/586855) |
| history-0127 | 2026-08-06 | YOASOBI NORTH AMERICA TOUR 2026 “NEVER ENDING STORIES” | 巡演場次 | 未確認／不適用 | ブルックリン／Barclays Center（アメリカ） | 官方演出清單所列場次。 | true／有事後紀錄 | [live-55188](https://www.yoasobi-music.jp/live/55188)、[livenation-2026](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll)、[news-586855](https://www.yoasobi-music.jp/news/586855) |
| history-0128 | 2026-08-08 | YOASOBI NORTH AMERICA TOUR 2026 “NEVER ENDING STORIES” | 巡演場次 | 未確認／不適用 | ハミルトン／TD Coliseum（カナダ） | 官方演出清單所列場次。 | true／有事後紀錄 | [live-55188](https://www.yoasobi-music.jp/live/55188)、[livenation-2026](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll)、[news-586855](https://www.yoasobi-music.jp/news/586855) |
| history-0129 | 2026-08-12 | YOASOBI NORTH AMERICA TOUR 2026 “NEVER ENDING STORIES” | 巡演場次 | 未確認／不適用 | シアトル／Climate Pledge Arena（アメリカ） | 官方演出清單所列場次。 | true／有事後紀錄 | [live-55188](https://www.yoasobi-music.jp/live/55188)、[livenation-2026](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll)、[news-586855](https://www.yoasobi-music.jp/news/586855) |
| history-0130 | 2026-08-14 | YOASOBI NORTH AMERICA TOUR 2026 “NEVER ENDING STORIES” | 巡演場次 | 未確認／不適用 | オークランド／Oakland Arena（アメリカ） | 官方演出清單所列場次。 | true／有事後紀錄 | [live-55188](https://www.yoasobi-music.jp/live/55188)、[livenation-2026](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll)、[news-586855](https://www.yoasobi-music.jp/news/586855) |
| history-0131 | 2026-08-16 | YOASOBI NORTH AMERICA TOUR 2026 “NEVER ENDING STORIES” | 巡演場次 | 未確認／不適用 | ロサンゼルス／Hollywood Bowl（アメリカ） | 官方演出清單所列場次。 | true／有事後紀錄 | [live-55188](https://www.yoasobi-music.jp/live/55188)、[livenation-2026](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll)、[news-586855](https://www.yoasobi-music.jp/news/586855) |
| history-0102 | 2026-09-10 | LINE FRIENDS 官方貼圖 | 品牌合作 | 未確認／不適用 | 未確認／不適用 | 與LINE FRIENDS合作之官方貼圖發售。 | true／正文支持 | [news-586686](https://www.yoasobi-music.jp/news/586686) |
| history-0123 | 2026-09-13 | BlizzCon 2026 | 音樂祭／活動 | 未確認／不適用 | アナハイム・コンベンションセンター | 官方演出清單所列場次。 | true／有事後紀錄 | [live-55690](https://www.yoasobi-music.jp/live/55690)、[news-586806](https://www.yoasobi-music.jp/news/586806) |
| history-0076 | 2026-09-14 | オリオン (PSYQUI Remix) | 數位單曲 | 未確認／不適用 | 未確認／不適用 | 9/13新聞中的「今夜24時」換算為9/14 00:00。 | true／發行 | [news-586806](https://www.yoasobi-music.jp/news/586806) |
| history-0261 | 2026-09-14 | Grammy Museum 特別對談與演出 | 特別演出 | Los Angeles | Grammy Museum | 官方9/15事後報導明載前一天於洛杉磯Grammy Museum進行對談及五曲演出。 | true／有事後紀錄 | [news-586855](https://www.yoasobi-music.jp/news/586855) |
| history-0103 | 2026-09-20 | てくてくYOASOBI企畫 | 品牌合作 | 未確認／不適用 | 未確認／不適用 | 巡演地方合作企畫，首波福岡もち吉及FBS福岡放送。 | true／正文支持 | [news-587042](https://www.yoasobi-music.jp/news/587042) |
| history-0108 | 2026-09-25 | 夜に駆ける：Oricon 累計11億串流 | 里程碑 | 未確認／不適用 | 未確認／不適用 | 官方引用9/25公布的2026/9/28付榜單；Oricon史上首支累計11億作品。 | true／正文支持 | [news-587094](https://www.yoasobi-music.jp/news/587094) |
| history-0077 | 2026-09-28 | 咲き誇れ：ブラッサム主題曲首次播出 | Tie-in | 未確認／不適用 | 未確認／不適用 | NHK晨間劇首集08:00首播主題曲；目前所讀正文沒有數位配信日期，不建立單曲發行日。 | true／正文支持 | [news-587191](https://www.yoasobi-music.jp/news/587191) |
| history-0099 | 2026-09-30 | ハルカ × Mynavi | Tie-in | 未確認／不適用 | 未確認／不適用 | キミの信じるものは？WEB影片／廣告起用。 | true／正文支持 | [news-587242](https://www.yoasobi-music.jp/news/587242) |
| history-0109 | 2026-10-01 | YOASOBI 結成7周年 | 里程碑 | 未確認／不適用 | 未確認／不適用 | 官方周年公告與KILLA年內發行預告。 | true／正文支持 | [news-587223](https://www.yoasobi-music.jp/news/587223) |
| history-0113 | 2026-10-24 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “超惑星” | 巡演場次 | 大阪府 | 京セラドーム大阪 | 官方演出清單所列場次。 | true／未來預定 | [live-54776](https://www.yoasobi-music.jp/live/54776) |
| history-0276 | 2026-10-24 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 超惑星 | 巡演群組 | 未確認／不適用 | 未確認／不適用 | 已取得13筆逐場日程；本筆僅為巡演群組，不重複計算場次。 | true／未來預定 | [live-55798](https://www.yoasobi-music.jp/live/55798)、[live-55797](https://www.yoasobi-music.jp/live/55797)、[live-54776](https://www.yoasobi-music.jp/live/54776) |
| history-0114 | 2026-10-25 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “超惑星” | 巡演場次 | 大阪府 | 京セラドーム大阪 | 官方演出清單所列場次。 | true／未來預定 | [live-54776](https://www.yoasobi-music.jp/live/54776) |
| history-0115 | 2026-11-07 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “超惑星” | 巡演場次 | 愛知県 | バンテリンドーム ナゴヤ | 官方演出清單所列場次。 | true／未來預定 | [live-54776](https://www.yoasobi-music.jp/live/54776) |
| history-0116 | 2026-11-08 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “超惑星” | 巡演場次 | 愛知県 | バンテリンドーム ナゴヤ | 官方演出清單所列場次。 | true／未來預定 | [live-54776](https://www.yoasobi-music.jp/live/54776) |
| history-0117 | 2026-11-14 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “超惑星” | 巡演場次 | 北海道 | 大和ハウス プレミストドーム | 官方演出清單所列場次。 | true／未來預定 | [live-54776](https://www.yoasobi-music.jp/live/54776) |
| history-0118 | 2026-11-15 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “超惑星” | 巡演場次 | 北海道 | 大和ハウス プレミストドーム | 官方演出清單所列場次。 | true／未來預定 | [live-54776](https://www.yoasobi-music.jp/live/54776) |
| history-0119 | 2026-11-28 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “超惑星” | 巡演場次 | 福岡県 | みずほpaypayドーム福岡 | 官方演出清單所列場次。 | true／未來預定 | [live-54776](https://www.yoasobi-music.jp/live/54776) |
| history-0120 | 2026-11-29 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “超惑星” | 巡演場次 | 福岡県 | みずほpaypayドーム福岡 | 官方演出清單所列場次。 | true／未來預定 | [live-54776](https://www.yoasobi-music.jp/live/54776) |
| history-0121 | 2026-12-05 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “超惑星” | 巡演場次 | 東京都 | 東京ドーム | 官方演出清單所列場次。 | true／未來預定 | [live-54776](https://www.yoasobi-music.jp/live/54776) |
| history-0122 | 2026-12-06 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “超惑星” | 巡演場次 | 東京都 | 東京ドーム | 官方演出清單所列場次。 | true／未來預定 | [live-54776](https://www.yoasobi-music.jp/live/54776) |

### 2027

| ID | 日期／候選日期 | title | type | location | venue | description | verified／狀態 | sources |
|---|---|---|---|---|---|---|---|---|
| history-0111 | 2027-01-09 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 超惑星 “SUPER PLANET” IN TAIPEI | 巡演場次 | 台北（官方市場名稱） | 台北ドーム | 官方演出清單所列場次。 | true／未來預定 | [live-55797](https://www.yoasobi-music.jp/live/55797) |
| history-0112 | 2027-01-10 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 超惑星 “SUPER PLANET” IN TAIPEI | 巡演場次 | 台北（官方市場名稱） | 台北ドーム | 官方演出清單所列場次。 | true／未來預定 | [live-55797](https://www.yoasobi-music.jp/live/55797) |
| history-0110 | 2027-02-20 | YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 超惑星 “SUPER PLANET” IN SINGAPORE | 巡演場次 | 新加坡 | シンガポール・ナショナルスタジアム | 官方演出清單所列場次。 | true／未來預定 | [live-55798](https://www.yoasobi-music.jp/live/55798) |

## 矛盾與時間缺口稽核

詳見 [audit.md](audit.md)。所有尚待驗證項目保留於上表與JSON，不刪除成「沒有活動」。

## 來源登錄

| ID | 出版者 | 語言 | 性質 | 標題及網址 |
|---|---|---|---|---|
| riaj-202111 | 日本唱片協會 | ja | primary | [2021年11月度串流認證及配信開始日](https://prtimes.jp/a/?c=10908&f=d10908-418-ee751c6a8c9b1fd47c70daa8955d6753.pdf&r=418) |
| beastars | BEASTARS 製作委員會 | ja | primary | [BEASTARS 第2期音樂與 CD 資訊](https://bst-anime.com/sp/) |
| recochoku-202107 | RecoChoku | ja | primary | [2021年7月月間獎及 RGB / Monster 發行資訊](https://prtimes.jp/main/html/rd/p/000001411.000002747.html) |
| recochoku-step | RecoChoku | ja | primary | [2021年5月月間獎及もう少しだけ發行日](https://prtimes.jp/main/html/rd/p/000001384.000002747.html) |
| tfm-letter | TOKYO FM | ja | primary | [Letter Song Project 對談與ラブレター發行日](https://www.tfm.co.jp/post/archive/59316) |
| sony-origin | Sony Music Cocotame | ja | primary | [Ayase 與 A&R 討論 YOASOBI 成立及首支 MV](https://cocotame.jp/series/015030/) |
| sony-swallow | Sony Music Cocotame | ja | primary | [ツバメ創作專訪與 The Swallow 配信日期](https://cocotame.jp/series/038638/) |
| orchard-821 | The Orchard Japan | ja | primary | [Biri-Biri 日英版本同日配信](https://prtimes.jp/main/html/rd/p/000000821.000055377.html) |
| orchard-947 | The Orchard Japan | ja | primary | [E-SIDE 3 及 Coachella 三場演出公告](https://prtimes.jp/main/html/rd/p/000000947.000055377.html) |
| orchard-1017 | The Orchard Japan | ja | primary | [UNDEAD 配信日期公告](https://prtimes.jp/main/html/rd/p/000001017.000055377.html) |
| orchard-889 | The Orchard Japan | ja | primary | [Adventure 英語版配信公告](https://prtimes.jp/main/html/rd/p/000000889.000055377.html) |
| orchard-1056 | The Orchard Japan | ja | primary | [紐約、波士頓演出報告及 On the Stage 發行公告](https://prtimes.jp/main/html/rd/p/000001056.000055377.html) |
| orchard-845 | The Orchard Japan | ja | primary | [HEART BEAT 配信與 MV 公開](https://prtimes.jp/main/html/rd/p/000000845.000055377.html) |
| orchard-773 | The Orchard Japan | ja | primary | [勇者配信與 MV 公開](https://prtimes.jp/main/html/rd/p/000000773.000055377.html) |
| orchard-1821 | The Orchard Japan | ja | primary | [Orion 英語版配信與 MV 公開](https://prtimes.jp/main/html/rd/p/000001821.000055377.html) |
| orchard-1811 | The Orchard Japan | ja | primary | [THE BOOK 系列全四作及配信日期](https://prtimes.jp/main/html/rd/p/000001811.000055377.html) |
| orchard-521 | The Orchard Japan | ja | primary | [首次海外演出事後報告及 E-SIDE 2 配信日期](https://prtimes.jp/main/html/rd/p/000000521.000055377.html) |
| oricon-hajimete | Oricon | ja | secondary | [はじめての EP 商品目錄及發行日期](https://www.oricon.co.jp/prof/760597/products/1470842/1/) |
| firsttimes-brave | THE FIRST TIMES | ja | secondary | [The Brave 配信資訊](https://www.thefirsttimes.jp/news/0000353719/) |
| oricon-yuming | Oricon | ja | secondary | [中央フリーウェイ合作製作及專輯資訊](https://www.oricon.co.jp/news/2299286/full/) |
| universal-yuming | Universal Music | ja | primary | [ユーミン乾杯!! 商品與合作資訊](https://sp.universal-music.co.jp/yuming/kanpai/) |
| cdjournal-ballade | CDJournal | ja | secondary | [Ballade Ver. 配信當日報導](https://www.cdjournal.com/news/yoasobi/96544) |
| echoes-report | CENTRAL 官方報告／OTOTOY | ja | secondary | [CENTRAL Echoes Baa 官方演出報告](https://ototoy.jp/news/123311) |
| central-2026-report | THE FIRST TIMES | ja | secondary | [CENTRAL 2026第二日演出報告](https://www.thefirsttimes.jp/report/0000789645/) |
| milano-report | YOASOBI official note | ja | primary | [TikTok LIVE 官方事後報告](https://note.com/yoasobi_staff/n/n800259469f78) |
| billboard-halzion | Billboard JAPAN | ja | secondary | [ハルジオン配信與ZONe企畫](https://www.billboard-japan.com/d_news/detail/87866/2) |
| wild-history | WILD BUNCH FEST. | ja | primary | [WILD BUNCH 歷屆紀錄（含2022取消）](https://www.wildbunchfest.jp/history/) |
| livenation-2026 | Live Nation | en | primary | [Never Ending Stories 北美八場日程](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll) |
| billboard-2020 | Billboard JAPAN / 阪急阪神 | ja | primary | [2020年榜官方新聞稿](https://www.hankyu-hanshin.co.jp/release/docs/317e7269e58de3db105f9f2e4debbb3d5488113e.pdf) |
| wiki-ja | Wikipedia | ja | candidate | [YOASOBI 日文條目](https://ja.wikipedia.org/wiki/YOASOBI) |
| wiki-en-discography | Wikipedia | en | candidate | [Yoasobi discography](https://en.wikipedia.org/wiki/Yoasobi_discography) |
| wiki-en-live | Wikipedia | en | candidate | [List of Yoasobi live performances](https://en.wikipedia.org/wiki/List_of_Yoasobi_live_performances) |
| wiki-zh | Wikipedia | zh-Hant | candidate | [YOASOBI 中文條目](https://zh.wikipedia.org/wiki/YOASOBI) |
| news-587223 | YOASOBI / Sony Music | ja | primary | [結成7周年！ 作家発掘・育成プロジェクト“『はじめての』文芸部”発の新曲「KILLA」年内リリース決定！＆原作小説『センパイを殺したいので女装する』が10/16(金)に発売決定！](https://www.yoasobi-music.jp/news/587223) |
| news-587094 | YOASOBI / Sony Music | ja | primary | [「夜に駆ける」がオリコン週間ストリーミングランキング、オリコン史上初の累積再生数11億回突破! ](https://www.yoasobi-music.jp/news/587094) |
| news-535015 | YOASOBI / Sony Music | ja | primary | [明日10/26(火)24時からの『YOASOBIのオールナイトニッポンX』にて、英語版第4弾となる「Blue」(「群青」英語Ver.)を初オンエア！](https://www.yoasobi-music.jp/news/535015) |
| news-587242 | YOASOBI / Sony Music | ja | primary | [楽曲「ハルカ」がマイナビ新WEBムービー『キミの信じるものは？』に起用！ 稲垣来泉、陣野小和 W主演。門脇麦が姉役で出演する、高校生のエモーショナルな葛藤を描いた作品。 ](https://www.yoasobi-music.jp/news/587242) |
| news-530677 | YOASOBI / Sony Music | ja | primary | [NTTドコモ「ahamo」CMソングの新曲「三原色」7/2(金)リリース決定！同日、英語版リリース第1弾として「Into The Night」(夜に駆ける English Ver.)リリース！6/29(火)「YOASOBIのANN X」にて初フルオンエア解禁決定。](https://www.yoasobi-music.jp/news/530677) |
| news-539669 | YOASOBI / Sony Music | ja | primary | [楽曲「ラブレター」が「ピュレグミ」20周年記念CMに起用！楽曲と共に伊藤万理華さんが踊るCM本日より公開。](https://www.yoasobi-music.jp/news/539669) |
| news-535014 | YOASOBI / Sony Music | ja | primary | [本日新曲「ツバメ」配信リリース！同曲の歌唱にも参加しているSDGsこどもユニット「ミドリーズ」が“ツバメダンス”を踊る映像のフルバージョンも公開！](https://www.yoasobi-music.jp/news/535014) |
| news-535007 | YOASOBI / Sony Music | ja | primary | [初の英語版第一弾EP『E-SIDE』が11/12(金)に配信リリース決定！](https://www.yoasobi-music.jp/news/535007) |
| news-534978 | YOASOBI / Sony Music | ja | primary | [11月12(金)配信リリース英語版第一弾EP『E-SIDE』のクロスフェード映像を公開！](https://www.yoasobi-music.jp/news/534978) |
| news-535542 | YOASOBI / Sony Music | ja | primary | [12月1日(水)発売 YOASOBI『THE BOOK 2』 リリース記念店頭キャンペーン決定！!](https://www.yoasobi-music.jp/news/535542) |
| news-543995 | YOASOBI / Sony Music | ja | primary | [2nd EP『THE BOOK 2』収録曲「もしも命が描けたら」、テーマ曲となった鈴木おさむ作・演出の舞台「もしも命が描けたら」初演から1年を記念してシングルカットで配信リリース！](https://www.yoasobi-music.jp/news/543995) |
| news-537832 | YOASOBI / Sony Music | ja | primary | [2/16(水)直木賞作家コラボプロジェクト第1弾・新曲「ミスター」配信リリース決定！今夜の『YOASOBIのオールナイトニッポンX(クロス)』にて初フルオンエア！](https://www.yoasobi-music.jp/news/537832) |
| news-541229 | YOASOBI / Sony Music | ja | primary | [直木賞作家コラボプロジェクト第2弾楽曲、森絵都さん小説を原作とした新曲「好きだ」5/30(月)配信リリース決定！明日5/23(月)より、全国セブン‐イレブン店内にて音源先行解禁！](https://www.yoasobi-music.jp/news/541229) |
| news-545177 | YOASOBI / Sony Music | ja | primary | [10/1(土)『機動戦士ガンダム 水星の魔女』のオープニングテーマ 新曲「祝福」配信リリース決定！本日25時放送の『YOASOBIのオールナイトニッポン』にて同曲アニメサイズ初解禁＆重大発表あり。](https://www.yoasobi-music.jp/news/545177) |
| news-546801 | YOASOBI / Sony Music | ja | primary | [本日『祝福』CDリリース！「The Blessing」(「祝福」英語版)のMV公開＆配信開始！そして英語版EP第2弾となる『E-SIDE 2』の配信リリースも決定！](https://www.yoasobi-music.jp/news/546801) |
| news-546730 | YOASOBI / Sony Music | ja | primary | [直木賞作家コラボプロジェクト『はじめての』第三弾、辻村深月『ユーレイ』原作曲｢海のまにまに｣が11/18(金)配信決定！](https://www.yoasobi-music.jp/news/546730) |
| news-549596 | YOASOBI / Sony Music | ja | primary | [ユニバーサル･スタジオ･ジャパン『ユニ春』テーマソングの「アドベンチャー」が2/15(水)配信リリース！ティザー映像＆配信ジャケット、そして一般公募の中からグランプリとなった原作エピソードを公開！](https://www.yoasobi-music.jp/news/549596) |
| news-550910 | YOASOBI / Sony Music | ja | primary | [本日、直木賞作家コラボプロジェクト『はじめての』のラストを飾る宮部みゆき原作の第4弾楽曲「セブンティーン」配信開始！＆MVも20時プレミア公開！そして、5/10(水)には本プロジェクト楽曲4曲と小説をまとめた『はじめての - EP』数量限定CDリリース決定！本日より予約開始！](https://www.yoasobi-music.jp/news/550910) |
| news-551361 | YOASOBI / Sony Music | ja | primary | [本日TVアニメ『【推しの子】』オープニング主題歌「アイドル」配信開始！楽曲のコールパートにはREAL AKIBA BOYZが参加！本日24時半には、動画工房制作のMVプレミア公開＆赤坂アカ書き下ろしの楽曲原作小説「45510」も公開！](https://www.yoasobi-music.jp/news/551361) |
| news-552432 | YOASOBI / Sony Music | ja | primary | [5/26(金)に「アイドル」の英語版「Idol」配信リリース決定＆ジャケット写真解禁！](https://www.yoasobi-music.jp/news/552432) |
| news-552203 | YOASOBI / Sony Music | ja | primary | [6/21(水)に、TVアニメ『【推しの子】』オープニング主題歌「アイドル」CDリリース決定！アニメ描き下ろしイラストが彩る、ジャケット写真も公開！](https://www.yoasobi-music.jp/news/552203) |
| news-556528 | YOASOBI / Sony Music | ja | primary | [本日結成4周年！2024年1月から国内6カ所12公演を回る自身初のZeppツアー開催決定！10月4日発売3rd EP『THE BOOK 3』にFC限定チケット最速先行シリアル封入決定＆全曲トレーラーが公開！さらに、タワーレコード全店にて、期間中に対象商品をお買い上げのお客様に、直筆メッセージが印字された特別レシートのお渡しが決定](https://www.yoasobi-music.jp/news/556528) |
| news-557691 | YOASOBI / Sony Music | ja | primary | [TVアニメ『葬送のフリーレン』オープニングテーマ「勇者」CDが豪華宝箱仕様の完全生産限定盤で、12月13日(水)にリリース決定＆予約開始！店舗購入特典絵柄も公開！ ](https://www.yoasobi-music.jp/news/557691) |
| news-560558 | YOASOBI / Sony Music | ja | primary | [「Biri-Biri」のTシャツ付きCD＆12inch LPが完全生産限定盤にて3月13日(水)にリリース決定、予約開始！店舗購入特典絵柄も公開！](https://www.yoasobi-music.jp/news/560558) |
| news-565374 | YOASOBI / Sony Music | ja | primary | [“NHKスポーツテーマ2024“となる新曲「舞台に立って」が本日配信リリース＆MVティザーが公開！そして、タイザン５、桐島由紀、春野昼下が楽曲のために執筆したマンガ3作品が「少年ジャンプ+」にて本日より連日公開！](https://www.yoasobi-music.jp/news/565374) |
| news-567367 | YOASOBI / Sony Music | ja | primary | [結成5周年記念日となる本日、オリジナル長編アニメーション映画『ふれる。』主題歌「モノトーン」を配信リリース＆20時にMV公開決定！](https://www.yoasobi-music.jp/news/567367) |
| news-567172 | YOASOBI / Sony Music | ja | primary | [オリジナル長編アニメーション映画『ふれる。』主題歌「モノトーン」が、YOASOBI結成5周年記念日となる10/1(火)に、英語版「Monotone」が10/2(水)に2日連続配信リリース決定！さらにJK写が公開！](https://www.yoasobi-music.jp/news/567172) |
| news-566699 | YOASOBI / Sony Music | ja | primary | [10/2(水)発売 オリジナル長編アニメーション映画『ふれる。』主題歌「モノトーン」CDの映画公式描き下ろしジャケット写真＆店舗特典絵柄を解禁！](https://www.yoasobi-music.jp/news/566699) |
| news-568611 | YOASOBI / Sony Music | ja | primary | [リクルート新TVCM「わからないまま、それでも」篇に起用の新曲「New me」が、11/11(月)に配信リリース決定、さらにJK写が公開！ ](https://www.yoasobi-music.jp/news/568611) |
| news-573872 | YOASOBI / Sony Music | ja | primary | [「UNDEAD」英語版楽曲が本日配信リリース！さらに、20時にMV公開が決定！](https://www.yoasobi-music.jp/news/573872) |
| news-573876 | YOASOBI / Sony Music | ja | primary | [PlayStation®の30周年を記念して書き下ろした新曲「PLAYERS」配信リリース！ 楽曲を使用した30周年特別CMが本日公開 ](https://www.yoasobi-music.jp/news/573876) |
| news-574444 | YOASOBI / Sony Music | ja | primary | [TVアニメ『ウィッチウォッチ』オープニングテーマ「Watch me!」を本日配信リリース！さらに、Music Videoが本日5/18(日)PM17:30にYouTubeプレミア公開！](https://www.yoasobi-music.jp/news/574444) |
| news-574443 | YOASOBI / Sony Music | ja | primary | [MUSIC AWARDS JAPAN Grand Ceremonyにてパフォーマンスを行った、PlayStation®30周年記念プロジェクト「Project: MEMORY CARD」コラボ楽曲「PLAYERS」英語版を本日配信リリース！さらに、TVアニメ『ウィッチウォッチ』オープニングテーマ「Watch me! 」英語版を5/30(金)に、2週連続配信リリース決定！](https://www.yoasobi-music.jp/news/574443) |
| news-574438 | YOASOBI / Sony Music | ja | primary | [TVアニメ『ウィッチウォッチ』オープニングテーマ「Watch me! 」CDが、描き下ろしイラストが彩る豪華BOX仕様にて6/25(水)に発売決定！](https://www.yoasobi-music.jp/news/574438) |
| news-575234 | YOASOBI / Sony Music | ja | primary | [7/11(金)に「New me」英語版の配信リリース決定！同日22時にはミュージックビデオも公開！](https://www.yoasobi-music.jp/news/575234) |
| news-577358 | YOASOBI / Sony Music | ja | primary | [ZOZOTOWN20周年を記念して、LE SSERAFIM with YOASOBI「the NOISE (Contains a Samples of 夜に駆ける)」を9⽉26⽇にリリース︕](https://www.yoasobi-music.jp/news/577358) |
| news-577534 | YOASOBI / Sony Music | ja | primary | [ZOZOTOWN20周年を記念して、Tokyo Coffee Breakが「夜に駆ける」をサンプリングした楽曲、LE SSERAFIM with YOASOBI 「the NOISE (Contains a Samples of 夜に駆ける)」が本日配信リリース！さらに、結成6周年となる10/1(水)に生配信トーク番組実施決定！](https://www.yoasobi-music.jp/news/577534) |
| news-577352 | YOASOBI / Sony Music | ja | primary | [フジテレビ 10月期水10ドラマ 『もしもこの世が舞台なら、楽屋はどこにあるのだろう』主題歌を担当！三谷幸喜書き下ろし私小説を元に制作した新曲「劇上」を10/2(木)に配信リリース決定！](https://www.yoasobi-music.jp/news/577352) |
| news-578869 | YOASOBI / Sony Music | ja | primary | [RADWIMPSのトリビュートアルバム「Dear Jubilee -RADWIMPS TRIBUTE-」の参加を発表！](https://www.yoasobi-music.jp/news/578869) |
| news-580137 | YOASOBI / Sony Music | ja | primary | [TVアニメ『花ざかりの君たちへ』のエンディングテーマとなる新曲「BABY」を、1/11(日)配信リリース決定&ジャケット写真が公開！](https://www.yoasobi-music.jp/news/580137) |
| news-580248 | YOASOBI / Sony Music | ja | primary | [TVアニメ『花ざかりの君たちへ』エンディングテーマ「BABY」の原作小説『My Dear……』が公開！そして、本日24時楽曲配信リリース！](https://www.yoasobi-music.jp/news/580248) |
| news-581528 | YOASOBI / Sony Music | ja | primary | [TVアニメ『花ざかりの君たちへ』オープニング&エンディングテーマ『アドレナ / BABY』完全生産限定盤CDが本日発売！](https://www.yoasobi-music.jp/news/581528) |
| news-582923 | YOASOBI / Sony Music | ja | primary | [自身4作目の英語版EP『E-SIDE 4』を本日配信リリース！ さらに、本日22時より3夜連続で英語版Music VideoをYouTubeプレミア公開決定！](https://www.yoasobi-music.jp/news/582923) |
| news-584407 | YOASOBI / Sony Music | ja | primary | [6/26(金)リリース 4th EP『THE BOOK for,』 収録曲&店舗別購入者特典 絵柄解禁！](https://www.yoasobi-music.jp/news/584407) |
| news-586806 | YOASOBI / Sony Music | ja | primary | [本日、世界最大級のゲームイベント「BlizzCon 2026」に出演！ さらに今夜24時、PSYQUIによる「オリオン」Remixバージョンを配信リリース！ ](https://www.yoasobi-music.jp/news/586806) |
| news-587191 | YOASOBI / Sony Music | ja | primary | [連続テレビ小説『ブラッサム』主題歌「咲き誇れ」　9/28(月)あさ8時初回放送にて初オンエア  綿矢りさ書き下ろしの原作小説「桜（はな）の命は不滅なり」も同日あさ7時に公開決定！](https://www.yoasobi-music.jp/news/587191) |
| news-537383 | YOASOBI / Sony Music | ja | primary | [初のライブ映像作品集『THE FILM』3/23(水)リリース＆ジャケ写・収録内容解禁！](https://www.yoasobi-music.jp/news/537383) |
| news-561709 | YOASOBI / Sony Music | ja | primary | [4/10(水)発売ライブ映像作品集『THE FILM 2』商品画像＆店舗別特典内容解禁！YOASOBI ZEPP TOUR 2024 "POP OUT"東京公演も収録されたBlu-ray内容も発表。さらに、初のドーム公演のチケット先行受付シリアル封入も決定！](https://www.yoasobi-music.jp/news/561709) |
| news-577665 | YOASOBI / Sony Music | ja | primary | [10月期 水10ドラマ 『もしもこの世が舞台なら、楽屋はどこにあるのだろう』主題歌となる新曲「劇上」の原作小説 三谷幸喜書き下ろし『劇場ものがたり』が本日18時に公開！ 結成6周年となる本日20時、ライブ映像作品集『THE FILM 3』発売＆「モノトーン」リリース1周年を記念して、作品収録のロンドン公演「モノトーン」ライブ映像をYouTube公開！ さらに、21時には“YOASOBI 結成6周年記念 生配信”をYouTubeにて開催！](https://www.yoasobi-music.jp/news/577665) |
| news-566407 | YOASOBI / Sony Music | ja | primary | [10月に迎える結成5周年を記念して、EP『THE BOOK』シリーズ3作品のアナログ盤を10/23(水)に発売決定！国内外で活躍するイラストレーター3名による描き下ろしイラストジャケットデザイン＆カラーバイナル仕様。本日より予約開始！](https://www.yoasobi-music.jp/news/566407) |
| news-585528 | YOASOBI / Sony Music | ja | primary | [明日7/31(金)、4th EP『THE BOOK for,』国内限定アナログ盤を数量限定リリース！](https://www.yoasobi-music.jp/news/585528) |
| news-535426 | YOASOBI / Sony Music | ja | primary | [楽曲「あの夢をなぞって」がバラードアレンジで大塚製薬「カロリーメイト」の受験生を応援する新CM『Midnight Train』篇に起用！11/27(土)よりオンエアスタート！](https://www.yoasobi-music.jp/news/535426) |
| news-535663 | YOASOBI / Sony Music | ja | primary | [島本理生・辻村深月・宮部みゆき・森絵都“直木賞作家”4名とのコラボ企画始動。「はじめて」をモチーフに描く4つの小説を音楽に。2/16(水)には、4作を1冊にまとめた書籍『はじめての』(水鈴社)を刊行。](https://www.yoasobi-music.jp/news/535663) |
| news-544860 | YOASOBI / Sony Music | ja | primary | [楽曲「好きだ」がヘアケアブランド「いち髪」の新CMソングに決定＆9/9(金)より全国で放映スタート！本日、「ROCK IN JAPAN FESTIVAL 2022」での同曲ライブ映像をYouTubeに公開！](https://www.yoasobi-music.jp/news/544860) |
| news-549078 | YOASOBI / Sony Music | ja | primary | [USJとのコラボ企画で一般公募から選出された“パークでの学生時代の忘れられない思い出”を基に制作された『ユニ春』テーマソング「アドベンチャー」が新CMと共に本日初解禁！2/1(水)より「ハリウッド・ドリーム・ザ・ライド」に本楽曲の搭載も決定](https://www.yoasobi-music.jp/news/549078) |
| news-569357 | YOASOBI / Sony Music | ja | primary | [プレイステーション®30周年を記念し、YOASOBI×PlayStation®︎のコラボプロジェクト「Project : MEMORY CARD」が始動！YOASOBIの書き下ろし楽曲の原作となる 「#記憶を消してもう一度やりたいゲーム」のエピソードを募集！](https://www.yoasobi-music.jp/news/569357) |
| news-573879 | YOASOBI / Sony Music | ja | primary | [「Samsung Galaxy S25 Ultra」とコラボする「＃ライブ撮影ならGalaxy」プロジェクトが始動。 楽曲「舞台に立って」を起用、今年2月に実施した『YOASOBI ASIA TOUR 2024-2025 “超現実｜cho-genjitsu”』シンガポール公演のライブ映像を使用した新CMが順次公開！](https://www.yoasobi-music.jp/news/573879) |
| news-575675 | YOASOBI / Sony Music | ja | primary | [「サントリー生ビール」とのコラボプロジェクト「YOASOBEER PROJECT」として、新楽曲「UNDEAD」を使用した新CMが公開！](https://www.yoasobi-music.jp/news/575675) |
| news-584686 | YOASOBI / Sony Music | ja | primary | [世界的人気ゲーム『オーバーウォッチ』とのコラボが本日スタート！全6種の限定コラボスキンや、新曲「オリオン」のダンス・エモートなど、コラボコンテンツがゲーム内に登場！](https://www.yoasobi-music.jp/news/584686) |
| news-573883 | YOASOBI / Sony Music | ja | primary | [日本発のメイクアップ アーティストブランド『シュウ ウエムラ』ブランド アンバサダーに就任！“シュウ ウエムラ”と“YOASOBI”が作り出す新ビジュアル＆ムービーも公開！](https://www.yoasobi-music.jp/news/573883) |
| news-581962 | YOASOBI / Sony Music | ja | primary | [【ASICS×YOASOBI】コラボレーションアイテムが本日3/19(木)発売！ ASICS原宿店舗では、3/29(日)までコラボ記念装飾を展開中！](https://www.yoasobi-music.jp/news/581962) |
| news-586686 | YOASOBI / Sony Music | ja | primary | [公式LINEスタンプ本日発売！ アーティストキービジュアルをモチーフにしたLINE FRIENDSとのコラボデザイン。](https://www.yoasobi-music.jp/news/586686) |
| news-587042 | YOASOBI / Sony Music | ja | primary | [ドーム&スタジアムツアーを記念した、各地でのコラボ企画“てくてくYOASOBI”が始動！ 第一弾は福岡・おせんべいの老舗「もち吉」、FBS福岡放送「地元検証バラエティ 福岡くん。」とコラボレーション！ ](https://www.yoasobi-music.jp/news/587042) |
| news-535235 | YOASOBI / Sony Music | ja | primary | [「第63回輝く！日本レコード大賞」特別賞を受賞！](https://www.yoasobi-music.jp/news/535235) |
| news-579128 | YOASOBI / Sony Music | ja | primary | [「アイドル」がオリコン史上最速で10億回再生を突破し、「夜に駆ける」の最速記録を自ら更新！さらに「怪物」も7億回再生を突破！](https://www.yoasobi-music.jp/news/579128) |
| live-55798 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 超惑星 “SUPER PLANET” IN SINGAPORE](https://www.yoasobi-music.jp/live/55798) |
| live-55797 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 超惑星 “SUPER PLANET” IN TAIPEI](https://www.yoasobi-music.jp/live/55797) |
| live-54776 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA 10-CITY DOME & STADIUM TOUR 2026-2027 “超惑星”](https://www.yoasobi-music.jp/live/54776) |
| live-55690 | YOASOBI / Sony Music | ja | primary | [BlizzCon 2026](https://www.yoasobi-music.jp/live/55690) |
| live-55188 | YOASOBI / Sony Music | ja | primary | [YOASOBI NORTH AMERICA TOUR 2026 “NEVER ENDING STORIES”](https://www.yoasobi-music.jp/live/55188) |
| news-586855 | YOASOBI / Sony Music | ja | primary | [ロサンゼルス・ダウンタウンにあるGrammy Museumで、スペシャルトーク＆パフォーマンスを実施！最新曲「オリオン」含む5曲をパフォーマンス！ さらに、映画『ふれる。』の主題歌「モノトーン」原作小説の英語版をHPに公開！ ](https://www.yoasobi-music.jp/news/586855) |
| live-54594 | YOASOBI / Sony Music | ja | primary | [docomo presents THE MUSIC STADIUM 2026 organized by ONE OK ROCK](https://www.yoasobi-music.jp/live/54594) |
| live-54711 | YOASOBI / Sony Music | ja | primary | [PENTATONIC](https://www.yoasobi-music.jp/live/54711) |
| live-54593 | YOASOBI / Sony Music | ja | primary | [RADWIMPS 20th ANNIVERSARY LIVE TOUR](https://www.yoasobi-music.jp/live/54593) |
| live-54592 | YOASOBI / Sony Music | ja | primary | [ZOZO FES](https://www.yoasobi-music.jp/live/54592) |
| live-53094 | YOASOBI / Sony Music | ja | primary | [YOASOBI HALL TOUR 2025 WANDARA](https://www.yoasobi-music.jp/live/53094) |
| live-53399 | YOASOBI / Sony Music | ja | primary | [YOASOBI LIVE AT WEMBLEY ARENA](https://www.yoasobi-music.jp/live/53399) |
| live-52769 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN JAKARTA](https://www.yoasobi-music.jp/live/52769) |
| live-52768 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN SINGAPORE](https://www.yoasobi-music.jp/live/52768) |
| live-52767 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN SHANGHAI](https://www.yoasobi-music.jp/live/52767) |
| live-52766 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN TAIPEI](https://www.yoasobi-music.jp/live/52766) |
| live-52765 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN BANGKOK](https://www.yoasobi-music.jp/live/52765) |
| live-52764 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN HONG KONG](https://www.yoasobi-music.jp/live/52764) |
| live-52763 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA TOUR 2024-2025 “超現実 cho-genjitsu” IN SEOUL](https://www.yoasobi-music.jp/live/52763) |
| live-51958 | YOASOBI / Sony Music | ja | primary | [YOASOBI DOME LIVE 2024](https://www.yoasobi-music.jp/live/51958) |
| live-52605 | YOASOBI / Sony Music | ja | primary | [Lollapalooza 2024](https://www.yoasobi-music.jp/live/52605) |
| live-52300 | YOASOBI / Sony Music | ja | primary | [DEAD POP FESTiVAL 2024](https://www.yoasobi-music.jp/live/52300) |
| live-52298 | YOASOBI / Sony Music | ja | primary | [NewJeans Fan Meeting 'Bunnies Camp 2024 Tokyo Dome'](https://www.yoasobi-music.jp/live/52298) |
| live-52299 | YOASOBI / Sony Music | ja | primary | [AliExpress 2024 Weverse Con Festival](https://www.yoasobi-music.jp/live/52299) |
| live-51960 | YOASOBI / Sony Music | ja | primary | [YOASOBI LIVE IN THE USA](https://www.yoasobi-music.jp/live/51960) |
| live-51959 | YOASOBI / Sony Music | ja | primary | [Coachella Valley Music and Arts Festival](https://www.yoasobi-music.jp/live/51959) |
| live-51262 | YOASOBI / Sony Music | ja | primary | [YOASOBI ZEPP TOUR 2024 “POP OUT”](https://www.yoasobi-music.jp/live/51262) |
| live-51349 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA TOUR 2023-2024台湾公演](https://www.yoasobi-music.jp/live/51349) |
| live-51462 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA TOUR 2023-2024 ジャカルタ公演](https://www.yoasobi-music.jp/live/51462) |
| live-51468 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA TOUR 2023-2024 マレーシア公演](https://www.yoasobi-music.jp/live/51468) |
| live-51467 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA TOUR 2023-2024 シンガポール公演](https://www.yoasobi-music.jp/live/51467) |
| live-51265 | YOASOBI / Sony Music | ja | primary | [YOASOBI ASIA TOUR 2023-2024韓国公演](https://www.yoasobi-music.jp/live/51265) |
| live-51264 | YOASOBI / Sony Music | ja | primary | [2023 Simple Life 簡單生活節 (台北)](https://www.yoasobi-music.jp/live/51264) |
| live-51263 | YOASOBI / Sony Music | ja | primary | [Clockenflap (香港)](https://www.yoasobi-music.jp/live/51263) |
| live-50783 | YOASOBI / Sony Music | ja | primary | [COLDPLAY “MUSIC OF THE SPHERES WORLD TOUR”](https://www.yoasobi-music.jp/live/50783) |
| live-51161 | YOASOBI / Sony Music | ja | primary | [FULL POWER FEST'23](https://www.yoasobi-music.jp/live/51161) |
| live-50924 | YOASOBI / Sony Music | ja | primary | [NEX_FEST](https://www.yoasobi-music.jp/live/50924) |
| live-50778 | YOASOBI / Sony Music | ja | primary | [WILD BUNCH FEST.2023](https://www.yoasobi-music.jp/live/50778) |
| live-50162 | YOASOBI / Sony Music | ja | primary | [SUMMER SONIC 2023](https://www.yoasobi-music.jp/live/50162) |
| live-50779 | YOASOBI / Sony Music | ja | primary | [ROCK IN JAPAN FES.2023](https://www.yoasobi-music.jp/live/50779) |
| live-50712 | YOASOBI / Sony Music | ja | primary | [Head In The Clouds Los Angeles](https://www.yoasobi-music.jp/live/50712) |
| live-49695 | YOASOBI / Sony Music | ja | primary | [YOASOBI ARENA TOUR 2023 “電光石火”](https://www.yoasobi-music.jp/live/49695) |
| live-49377 | YOASOBI / Sony Music | ja | primary | [WILD BUNCH FEST. 2022](https://www.yoasobi-music.jp/live/49377) |
| live-49221 | YOASOBI / Sony Music | ja | primary | [SWEET LOVE SHOWER 2022](https://www.yoasobi-music.jp/live/49221) |
| live-49212 | YOASOBI / Sony Music | ja | primary | [SUMMER SONIC 2022 OSAKA](https://www.yoasobi-music.jp/live/49212) |
| news-544174 | YOASOBI / Sony Music | ja | primary | [新型コロナウイルス感染のご報告](https://www.yoasobi-music.jp/news/544174) |
| live-49198 | YOASOBI / Sony Music | ja | primary | [RISING SUN ROCK FESTIVEL 2022 in EZO](https://www.yoasobi-music.jp/live/49198) |
| news-550846 | YOASOBI / Sony Music | ja | primary | [ドコモの新映像配信サービス「Lemino」にてYOASOBIのライブ映像を4月より3ヶ月連続配信決定！4月に2022年8月開催の『RISING SUN ROCK FESTIVAL 2022 in EZO』の出演パートを 、5月には2021年12月開催の初有観客ライブ『NICE TO MEET YOU』を独占配信！ ](https://www.yoasobi-music.jp/news/550846) |
| live-49180 | YOASOBI / Sony Music | ja | primary | [ROCK IN JAPAN FESTIVAL 2022](https://www.yoasobi-music.jp/live/49180) |
| live-49206 | YOASOBI / Sony Music | ja | primary | [FUJI ROCK FESTIVAL'22](https://www.yoasobi-music.jp/live/49206) |
| news-543333 | YOASOBI / Sony Music | ja | primary | [新型コロナウイルス感染のご報告](https://www.yoasobi-music.jp/news/543333) |
| live-48609 | YOASOBI / Sony Music | ja | primary | [YOASOBI『NICE TO MEET YOU』](https://www.yoasobi-music.jp/live/48609) |
| live-48204 | YOASOBI / Sony Music | ja | primary | [UT×YOASOBI 『SING YOUR WORLD』](https://www.yoasobi-music.jp/live/48204) |
| live-48608 | YOASOBI / Sony Music | ja | primary | [YOASOBI 1st LIVE 『KEEP OUT THEATER』](https://www.yoasobi-music.jp/live/48608) |
| news-576232 | YOASOBI / Sony Music | ja | primary | [ビリー・アイリッシュ3年ぶりの単独来日公演に、スペシャルゲストとしてパフォーマンス出演決定！](https://www.yoasobi-music.jp/news/576232) |
| news-550782 | YOASOBI / Sony Music | ja | primary | [4/24(月)20時、４月開業の東急歌舞伎町タワー内「THEATER MILANO-Za」のこけら落としライブをTikTok LIVE配信！抽選で現地ライブ観覧が当たる投稿チャレンジスタート！そして直木賞作家コラボ『はじめての』プロジェクトのラストを飾る宮部みゆき原作曲「セブンティーン」3/27(月)配信開始＆同日20時MVプレミア公開決定！](https://www.yoasobi-music.jp/news/550782) |
| news-541613 | YOASOBI / Sony Music | ja | primary | [オフィシャルファンクラブ「CLUB夜遊」トークイベント『YOASOBIのOMUSUBI～パクパクわんぱく夏休み～』開催決定！](https://www.yoasobi-music.jp/news/541613) |
| news-545071 | YOASOBI / Sony Music | ja | primary | [ファンクラブ限定トークイベント『YOASOBIのOMUSUBI〜パクパクわんぱく夏休み〜』8月19日(金)大阪・Zepp Namba 公演延期に伴う振替公演および払い戻し方法のお知らせ。9月20日(火)山口・Shunan RISING HALLチケット追加販売決定。 ](https://www.yoasobi-music.jp/news/545071) |
| news-535248 | YOASOBI / Sony Music | ja | primary | [12月31日(金)放送「第72回NHK紅白歌合戦」出場決定！](https://www.yoasobi-music.jp/news/535248) |
| news-573884 | YOASOBI / Sony Music | ja | primary | [4月に横浜・赤レンガ倉庫で開催されたイベント”Echoes Baa”にて、ライブ初披露となった新曲「PLAYERS」のライブ映像をYouTube公開！](https://www.yoasobi-music.jp/news/573884) |
| news-553579 | YOASOBI / Sony Music | ja | primary | [「アイドル」の数量限定7inch アナログ盤が7月26日発売決定！ジャケット写真も公開！](https://www.yoasobi-music.jp/news/553579) |
| ototoy-encore | OTOTOY 商品目錄 | ja | primary | [アンコール 獨立配信商品：2021-07-02](https://ototoy.jp/_/default/p/812801) |
| ototoy-firsttake | OTOTOY 商品目錄 | ja | primary | [夜に駆ける - From THE FIRST TAKE 商品原始發行日](https://ototoy.jp/_/default/p/1822049) |
| hitc-2023-report | 音樂 Natalie／ぴあ音楽 | ja | secondary | [Head In The Clouds LA 2023：8月6日演出報告](https://lp.p.pia.jp/article/news/284424/index.html) |
| rijf-history | ROCK IN JAPAN FESTIVAL | ja | primary | [ROCK IN JAPAN 官方歷屆日期、場館及出演名單](https://rijfes.jp/2025/history/) |
| rijf-2021-cancel | ROCK IN JAPAN FESTIVAL | ja | primary | [ROCK IN JAPAN 2021 取消公告](https://rijfes.jp/2021/info/) |
| rijf-2021-lineup | Billboard JAPAN | ja | secondary | [ROCK IN JAPAN 2021 日割：YOASOBI 原排定8月8日](https://www.billboard-japan.com/d_news/detail/101436/2) |
| shrine-venue | Shrine / Goldenvoice | en | primary | [Shrine Auditorium & Expo Hall 官方場館名稱與地址](https://www.shrineauditorium.com/the-venue/) |
| tianjin-official-announcement | YOASOBI official X | ja | primary | [YOASOBI 天津出演當日公告（2024-05-02）](https://x.com/YOASOBI_staff/status/1785976334797426830) |
| tianjin-official-report | YOASOBI official X | ja/zh | primary | [YOASOBI 天津演出後致謝（2024-05-02）](https://x.com/YOASOBI_staff/status/1786033379923910928) |
| tianjin-ticket-lineup | 大河票務網 | zh-Hans | secondary | [天津泡泡島2024日割與場地](https://www.dahepiao.com/news1/yanchu/20240328454425.html) |
| hangzhou-newspaper | 余杭時報 | zh-Hans | secondary | [余杭時報2024-03-20第4版：閃千手日割與場館](https://yhcb.eyh.cn/resfile/2024-03-20/04/yhcb-20240320-004.pdf) |
| bangkok-ticket | ThaiTicketMajor | th/en | primary | [SUMMER SONIC BANGKOK 2024 官方售票資訊](https://www.thaiticketmajor.com/concert/summer-sonic-bangkok-2024.html?direct=true) |
| bangkok-day | Pollstar | en | secondary | [2024-08-25 Summer Sonic Bangkok 出演名單](https://www.pollstar.com/events/-8687181) |
| bangkok-report | Real Sound | ja | secondary | [Summer Sonic Bangkok 2024 現場報告與場地](https://realsound.jp/2024/09/post-1773512.html) |
| bangkok-report-2 | Real Sound | ja | secondary | [Summer Sonic Bangkok 2024 現場報告：YOASOBI 出演](https://realsound.jp/2024/09/post-1773512_2.html) |
| mma-unext | U-NEXT | ja | primary | [MMA2024 轉播方公告日期、INSPIRE ARENA 及 YOASOBI 出演](https://prtimes.jp/main/html/rd/p/000002088.000031998.html) |
| matsuri-wowow | WOWOW | ja | primary | [matsuri '25 洛杉磯演出與收錄日期、場館](https://prtimes.jp/main/html/rd/p/000008183.000001355.html) |
| maj-2025-announcement | CEIPA / MUSIC AWARDS JAPAN | ja | primary | [MUSIC AWARDS JAPAN 2025 Grand Ceremony 日程、出演與場館](https://www.ceipa.net/newsletter/pdf/340/detail/19) |
| maj-2025-report | CEIPA / MUSIC AWARDS JAPAN | ja | primary | [MUSIC AWARDS JAPAN 官方當日演出影像公告](https://www.ceipa.net/newsletter/pdf/340/detail/30) |
| europe-wowow | WOWOW | ja | primary | [YOASOBI 歐洲演出：Primavera 6月6日及 Wembley 6月8、9日](https://prtimes.jp/main/html/rd/p/000008273.000001355.html) |
| primavera-los40 | LOS40 | es | secondary | [Primavera Sound 2025 6月6日日割與 Parc del Forum 場地](https://los40.com/2025/06/06/primavera-sound-2025-a-que-hora-actuan-sabrina-carpenter-y-carolina-durante-hoy-viernes-6-de-junio/) |
| milan-idol | Milan Records / Sony Music Masterworks | en | primary | [Milan Records：Idol 國際黑膠版官方預購公告](https://milanrecords.com/pre-order-now-yoasobi-idol-opening-theme-song-for-tv-anime-oshi-no-ko-on-vinyl/) |
| milan-idol-date | Anime Trending | en | secondary | [Milan Idol 黑膠發行公告：2024年11月15日](https://www.anitrendz.com/news/2024/09/06/oshi-no-ko-opening-idol-by-yoasobi-gets-vinyl-release-treatment) |
| milan-idol-catalog | YES24 海外購買商品目錄 | ko | secondary | [Idol 國際版黑膠海外購買商品發行日](https://www.yes24.com/product/goods/133251255) |
| bsr-book | Black Screen Records | en | primary | [THE BOOK 國際黑膠商品（未明載首版發行日）](https://blackscreenrecords.com/products/the-book) |
| rijf-2021-home | ROCK IN JAPAN FESTIVAL | ja | primary | [ROCK IN JAPAN 2021 原排定日期與場館地址](https://rijfes.jp/2021/) |
| oricon-tokyo-dome-2024-setlist | ORICON NEWS | ja | media | [ORICON NEWS：超現實東京巨蛋公演與 11 月 10 日歌單](https://www.oricon.co.jp/news/2353583/full/) |
