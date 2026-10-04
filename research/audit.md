# YOASOBI 歷史資料：缺口與矛盾稽核

截止日期：2026-10-04。這份稽核與 research-report.md、history-data.json 一起使用。資料涵蓋各年度，但仍有待查證候選，不能將年度有資料解讀為該年所有活動均已收齊。

## 日期、名稱與統計矛盾

| ID | 發現 | 資料處理與依據 | 後續需求 |
|---|---|---|---|
| C01 | BABY：日文百科候選日期與官方午夜發行說法不同 | 使用 2026-01-11；[1/6 官方預告](https://www.yoasobi-music.jp/news/580137)及[1/10 公告](https://www.yoasobi-music.jp/news/580248)商品資訊與「本日24時」支持翌日日期。[日文百科](https://ja.wikipedia.org/wiki/YOASOBI)僅作候選來源 | 日後以正式商品目錄再核對 |
| C02 | the NOISE 公告發布日期與商品發行日期不同 | 使用明載的 2025-09-26 13:00 配信；[預告](https://www.yoasobi-music.jp/news/577358)與[後續文章](https://www.yoasobi-music.jp/news/577534)商品欄支持此日，後者文章日期9/28不改寫為配信日 | 保留文章日期差異，不宣稱文章發布日即發行日 |
| C03 | E-SIDE 2 官方同一文內出現2022-11-18及2021-11-12 | [官方文章](https://www.yoasobi-music.jp/news/546801)主要預告為2022-11-18，商品欄似沿用前作日期；另有[發行商正文](https://prtimes.jp/main/html/rd/p/000000521.000055377.html)直接確認2022-11-18，因此採此日 | 不把錯置商品欄當第二次發行 |
| C04 | はじめての EP 官方商品欄將年份寫成2022，文章預告在2023 | [官方2023公告](https://www.yoasobi-music.jp/news/550910)及[Oricon 商品目錄 XSCL-70/2](https://www.oricon.co.jp/prof/760597/products/1470842/1/)支持2023-05-10 | 保留原始錯字說明 |
| C05 | 2026官方回顧称「はじめての」2023開始，較早官方資料為2022 | 分開2021-12-01企畫預告、2022-02啟動與2023 EP；[預告](https://www.yoasobi-music.jp/news/535663)、[企畫專頁](https://www.yoasobi-music.jp/hajimeteno/)、[2026回顧](https://www.yoasobi-music.jp/news/587223)並列 | 2023可能指EP，不能把它默默替換為企畫起點 |
| C06 | ZOZOFES live索引地區東京都與Kアリーナ場館不符 | [官方文章](https://www.yoasobi-music.jp/news/577358)明列横浜市西区地址；location採此行政所在地，保留sourceLocation。Sony live公開索引見來源登錄 | 官方索引地區欄不能一律當作行政地理 |
| C07 | 2023首爾官方live索引只有12/16，但影像商品公告記載12/17演出 | [THE FILM 2 官方正文](https://www.yoasobi-music.jp/news/561709)支持12/17第2場，另建紀錄；不由巡演總數猜補 | 索引不是完整事後演出名冊 |
| C08 | 官方live標「終了」仍含取消／辭退活動 | Fuji Rock 2022-07-29見[辭退通知](https://www.yoasobi-music.jp/news/543333)；Summer Sonic大阪2022-08-21見[辭退通知](https://www.yoasobi-music.jp/news/544174)；WILD BUNCH 2022-09-19見[主辦歷史](https://www.wildbunchfest.jp/history/)取消18、19日 | 三筆標cancelled，不計實際演出 |
| C09 | MV、配信、錄製與播出日期混用；午夜時刻跨日 | 夜に駆ける[MV日期來源](https://cocotame.jp/series/015030/)為2019-11-16，數位發行為12/15；[アイドル官方](https://www.yoasobi-music.jp/news/551361)4/12 24:30為4/13；HEART BEAT配信12/26，18祭錄製候選11/19、播出12/25各自分開 | 不使用YouTube因時區顯示的日期推翻日本正式配信日；18祭錄製日期仍待驗證 |
| C10 | 日文百科敘事中的Coldplay嘉賓日期與其表格、官方日程不同 | [日文百科](https://ja.wikipedia.org/wiki/YOASOBI)候選敘事有11/17；官方live 50783支持2023-11-06、07東京巨蛋；本資料僅採官方排定場次 | 仍需逐場事後報告；目前listed_past不等於performed |
| C11 | アイドル連續Hot100冠軍週數：21與22不同 | [YOASOBI官方回顧](https://www.yoasobi-music.jp/news/579128)為21週；[Live Nation簡介](https://news.livenationentertainment.com/news/j-pop-superstars-yoasobi-confirm-north-american-never-ending-stories-headline-tour-powered-by-crunchyroll)為22週 | 未裁定連續週數，需Billboard原始逐週榜；不同機構串流累計也不合併 |
| C12 | WANDARA「14道縣」「15場館」「40場」表面不同 | [官方完整日程](https://www.yoasobi-music.jp/news/574929)以不同單位計數，北海道有兩場館；不是互斥總數。巡演群組與逐場資料分開 | 場次統計不可再加巡演群組；亞洲巡演亦要區分音樂祭、單獨演出 |
| C13 | Summer Sonic 2023 Tokyo官方索引地區東京都、場館名稱幕張／ZOZO | 保留官方venue字串及sourceLocation；正式location留null，未以「Tokyo」品牌名推定行政所在地。來源為Sony live索引 | 補主辦方場館地址後再填行政位置 |
| C14 | 首次海外演出官方報告自身星期及相隔日數矛盾 | [發行商報告](https://prtimes.jp/main/html/rd/p/000000521.000055377.html)明列Jakarta 12/4、Manila 12/9，且正文再次寫12/4；但開頭將12/9寫成土曜日、後段寫相隔6日。資料採重複明列的日期，明示保留內部矛盾；venue未由百科候選填入 | 需要88rising當年日割交叉驗證；不由「6日後」倒推出12/3 |
| C15 | CalorieMate廣告名稱有異譯／異寫 | [官方](https://www.yoasobi-music.jp/news/535426)用「Midnight Train」，[CDJournal Ballade報導](https://www.cdjournal.com/news/yoasobi/96544)用「Midnight Express」；目前保留官方名稱，並揭露差異 | 補大塚製藥原始廣告頁核定名稱；不影響2022-03-30配信日期核對 |
| C16 | 天津泡泡島出演日：百科有5月1日與5月2日兩種記載 | 採2024-05-02；YOASOBI [當日出演公告](https://x.com/YOASOBI_staff/status/1785976334797426830)及[演後致謝](https://x.com/YOASOBI_staff/status/1786033379923910928)的 X 官方 oEmbed 正文均標5月2日，公告明言當天出演。[中文百科](https://zh.wikipedia.org/wiki/YOASOBI)及[英文演出表](https://en.wikipedia.org/wiki/List_of_Yoasobi_live_performances)有5月1日版本；百科修訂與搜尋快取也有差異，不以語言數量投票 | 本庫日期依原始貼文修正；尚未取得場地主辦原始資訊，venue留null |
| C17 | THE BOOK國際黑膠候選首版日期7月26日與7月29日不同 | [英文百科](https://en.wikipedia.org/wiki/Yoasobi_discography)候選為2024-07-26；[MusicBrainz德國版資料](https://musicbrainz.org/release/3402db82-7e97-4568-acb5-417555a16dbc/details)為2024-07-29；[Black Screen Records商品](https://blackscreenrecords.com/products/the-book)可確認商品存在但正文未明載首版發行日。本筆維持verified=false、date=null | 需發行商首版歷史公告，並按市場與品番區分；不把商品存在當成日期證明 |
| C18 | Milan Idol國際12inch黑膠11月15日與通路11月14日差異 | [Milan官方](https://milanrecords.com/pre-order-now-yoasobi-idol-opening-theme-song-for-tv-anime-oshi-no-ko-on-vinyl/)確認版本；[發行預告報導](https://www.anitrendz.com/news/2024/09/06/oshi-no-ko-opening-idol-by-yoasobi-gets-vinyl-release-treatment)及[YES24海外購買商品](https://www.yes24.com/product/goods/133251255)共同列2024-11-15；另一[YES24進口版頁](https://www.yes24.com/Product/Goods/133710522)列11月14日。本庫採國際公告日期，公開頁同時顯示差異，不宣稱所有市場同日 | 韓國通路差異尚無發行商說明；不得把日期差異直接斷言為時區或誤植 |
| C19 | 洛杉磯場館官方索引及發行商公告拼為SHRINE EXPE HALL | 日期採[發行商公告](https://prtimes.jp/main/html/rd/p/000000947.000055377.html)4月18日；名稱依[場館官網](https://www.shrineauditorium.com/the-venue/)校正為Shrine Expo Hall，保留sourceVenueRaw與原始來源 | 場館拼字已校正；這項更正不代表另已取得當日完場證據 |

## 時間缺口

- **2019–2020**：現行官方新聞索引沒有涵蓋這段；成立及早期配信已由官方回顧、Sony專訪與RIAJ補查，但每支MV、早期合作宣傳、訪談與電視出演並未窮盡。成立2019-10-01是官方2026七周年明示回推，JSON標明推導依據。
- **2021**：425則新聞的最早項目在6/28，下一段從10/22開始。這是現行索引缺口，不能解讀為期間沒有活動。Encore獨立單曲已由OTOTOY商品正文確認7月2日；ROCK IN JAPAN原排定8月8日及取消亦已補入。紅白節目當日紀錄仍待補。
- **2022**：主要作品、首次有觀眾後續活动、音樂祭與海外首演已建檔；取消活動另列。海外首演場館仍未確認，及完整每場事後紀錄不足。
- **2023**：電光石火日程已逐場整理；美國Head in the Clouds已由Natalie事後報導核對8月6日。From THE FIRST TAKE獨立配信及アイドル7inch商品已補。18祭錄製、紅白、榜單里程碑原始集計仍有缺口。
- **2024**：天津已取得藝人當日及事後原始公告；杭州、MMA取得日割／轉播公告但仍為listed_past。Summer Sonic Bangkok個別日程及出演報告已交叉核對。Biri-Biri及Milan Idol黑膠補入；THE BOOK國際黑膠首版日期仍待裁定。天津場地與部分行政位置仍留空。
- **2025**：WANDARA完整40場官方日程已整理；matsuri、Primavera、Wembley、MUSIC AWARDS JAPAN已由主辦／轉播事後正文確認。其他過去日程仍不全等於完場證據。
- **2026至10/4**：已整理最新作品、北美巡演、BlizzCon、Grammy Museum及新合作；新聞公告已取到10/1。仍不能宣稱已搜盡所有廣播、嘉賓、媒體及地方活動。
- **2026年末與2027**：只收截至截止日已公布日期。未來巨蛋／體育場演出標scheduled；不以「10城市」猜填尚未確認的其餘城市或場次。KILLA配信僅確認2026年份，沒有猜月日。

## 分類缺口與後續查核順序

1. **逐場實際演出證據**：以performed、listed_past、cancelled、postponed區分；目前listed_past僅確認官方排定日程。先補取消／改期通知，再補主辦或藝人事後報告。
2. **跨語言地方活動**：中國、泰國、韓國及歐美候選需回到主辦方日割與場館原始資訊。三語搜尋是候選發現方式，不是讓三語百科互相投票驗證。
3. **作品版本**：日語／英語、Ballade、Remix、From THE FIRST TAKE、EP初收錄與獨立商品分開。歌曲版本數不是獨立創作總數；黑膠不同地區發行亦分開。
4. **Tie-in完整性**：動畫、戲劇、電影、廣告、遊戲／品牌已收主要項目，仍需逐首作品對照客戶官方頁及開始播出日；不把歌曲配信日直接當廣告上線日。聯名商品與音樂合作分開。
5. **里程碑**：排行榜、認證、串流累計需寫明機構、榜單及集計週。Echoes成立、Crunchyroll結果等目前候選，不能把報導日當活動日。
6. **MV與YouTube**：本輪使用官方頻道線索交叉找作品，但沒有建立全部MV公布年表。後續逐支核對正式MV、teaser、live clip與英語版，避免相互混用。
7. **Setlist與歌曲LIVE頻率**：本輪沒有建立setlist，亦未推算常演曲目。即使來源演出報告提及若干歌，片段不代表完整setlist。

## 待驗證清單的讀法

所有未完成核對的候選都保存在history-data.json的verified=false記錄；正式date=null，候選日期另存candidateDate。場館候選另存candidateVenue，不能直接呈現在產品為已確定資料。空值不代表沒有場館或沒有活動。

資料完整性檢查只檢驗欄位、ID、日期格式、來源引用及狀態一致性；不等於外部事實全部正確。研究報告、索引及來源登錄仍須保留，讓後續修正可追溯。
