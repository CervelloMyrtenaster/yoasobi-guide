# YOASOBI Guide — 上線前稽核

稽核日期：2026-10-04。下列「修正前」評估於修改任何 production code 前完成。
目標網址：`https://cervellomyrtenaster.github.io/yoasobi-guide/`。

## Executive assessment — 修正前

架構可靠且適合 GitHub Pages。現有紙色、深色文字、紅色重點與編輯式版面值得保留，沒有改版或引入框架的必要。乾淨安裝、型別檢查、測試和 311 頁靜態產出均成功；全站產出連結與資源符合 repository base。

主要落差在「資料已存在，但核心使用流程還不能充分使用它」。54 筆配信單曲紀錄沒有進入歌曲查找入口；演唱會準備只有一首歌；296 筆歷史只能逐年長捲動；唯一歌曲頁的官方 MV 實際無法嵌入。另有全站小字對比問題。這些可用局部修正解決。

公開 GitHub repository 回應顯示 `size: 0`、`has_pages: false`，本機分支尚無 commit。因此目前沒有已部署的站點或成功 Actions run 可供驗證。這是外部部署前置事項，不是 Astro build failure。

| 分類 | 分數 / 10 | 判斷依據 |
| --- | ---: | --- |
| GitHub Pages readiness | 6 | 本機產出符合子路徑；遠端尚未啟用 Pages／有發布內容 |
| Technical reliability | 9 | clean build、8 測試、型別檢查通過；沒有網站 JS exception |
| Mobile usability | 7 | 320–430 無水平溢出；導覽偏高、長清單與播放器比例需改善 |
| Desktop usability | 8 | 內容寬度受控、閱讀舒服；長清單缺少查找工具 |
| Visual design | 8 | 克制、一致、有音樂與編輯感；不需換風格 |
| Navigation / information architecture | 5 | 主入口清楚，但歌曲資料覆蓋與返回年份流程有落差 |
| Accessibility | 6 | 語意、標籤、skip link、focus 良好；紅字未達 AA |
| Performance | 9 | 約 7.1 KB CSS，系統字型、無 hydration、播放器點擊才載入 |
| SEO | 4 | canonical 正確；多筆重複 metadata，缺 sitemap 與分享 metadata |
| YOASOBI beginner experience | 5 | 有路線，但首頁未清楚交代成員分工，多個閱讀步驟無直接連結 |
| Concert preparation experience | 2 | 只有一首入門推薦，不能回答「先熟悉哪些歌」 |
| Japanese-learning experience | 7 | 日文／Romaji／中文清楚、marumaru 詳細頁有效；MV 不能在站內播放 |

**修正前結論：NOT READY FOR GITHUB PAGES。**

解決 P1 後，本機網站可進入部署階段；仍須完成遠端 repository 發布與 Pages 設定，才能確認實際 production 上線。

## 1. Project architecture

- Astro **7.3.5**、TypeScript **5.9.3**、Vite **8.3.2**、pnpm **11.19.0**；本機 Node **24.19.0**，CI 指定 Node 24。
- `astro build` 純靜態輸出，`trailingSlash: 'always'`，沒有 server adapter、backend、authentication 或 database。
- File routing：首頁；start/about/sources；兩位成員；歌曲列表與 detail；發行列表與 detail；歷史列表與 296 筆 detail；LIVE／prepare／stats；404。共 **311 HTML 檔**。
- Content Collections：歌曲、成員、指南用 Markdown；發行、演出、里程碑、聆聽路線用 JSON。`verified.json` 有 296 筆經查核歷史，未查核候選不發布。ISO 年／月／日精度與狀態由 Zod 驗證。
- 目前 1 篇完整歌曲介紹、1 個專輯介紹入口、2 篇成員簡介、3 篇指南。歷史 JSON 有 **54 筆配信單曲、181 筆各類 LIVE 紀錄**。這不等於 54 篇完整歌曲文章或 181 份完整歌單。
- `concerts` 尚無完整專場歌單，統計刻意留空。不可把歷史活動日期或單場音樂祭清單轉成跨年專場頻率。
- CSS：自製 tokens + global/song CSS、720 px 斷點、1200 px container、系統字型。沒有 Tailwind／UI framework／外部字型。
- Client JS 僅歌曲搜尋與點擊載入 YouTube，Astro 產出為小型 inline module；`_astro` 沒有 `.js` 檔不代表零 JavaScript。沒有 client hydration 或 SPA router。

## 2. GitHub Pages compatibility

| 項目 | 結果／證據 |
| --- | --- |
| clean install / workflow parity | 在 `.qa/prelaunch/clean` 建立無 node_modules 的獨立 source copy，執行 frozen-lockfile install → check → test → build；全部成功。270 packages 從既有 pnpm cache 安裝，不是重用原專案 node_modules |
| deployment workflow | push main／workflow_dispatch；checkout、pnpm setup、Node 24、configure-pages、檢查／測試／build、upload dist、deploy-pages；流程順序合理 |
| PR workflow | 獨立 `ci.yml` 於 pull_request 執行 install／check／test／build，沒有部署權限 |
| permissions | build `contents: read`；deploy job `pages: write`、`id-token: write`；github-pages environment、concurrency 均存在 |
| site / base | site 是正式 GitHub Pages origin，base 是 `/yoasobi-guide`；不是 `/` |
| links / database links | 解析所有 311 HTML，站內 href／src／fragment 與檔案精確大小寫比對，**0 broken references**；歷史 ID、年份 anchors、專輯／歌曲關聯可解析 |
| navigation / dynamic paths | `path()` 加 base；MD 的 `../history/`、`../releases/`、`../live/` 在實際頁面正確解析；database links 使用相同 helper |
| assets | CSS、favicon 都有 `/yoasobi-guide/`；無圖片下載、無 root-relative JS asset；所有 local 資源成功載入 |
| canonical | 311 頁都有 production origin + repository base；沒有 localhost URL；404 canonical 無 noindex 是 P2 |
| Open Graph / X | 尚未實作；P2，不影響部署 |
| sitemap / robots | 沒有 sitemap。robots 產出在 `/yoasobi-guide/robots.txt`，內容 Allow `/`；爬蟲 robots 協定使用 origin 的 `/robots.txt`，不能把 project 子目錄檔案當成控制整個 origin 的 robots |
| trailing slash | directory/index.html 輸出符合 slash 設定；本機 static server 無 slash redirect 後可載入。GitHub CDN redirect 尚未實地測試 |
| nested navigation / refresh | 真實瀏覽器直接載入成員、歌曲、活動 detail 並 reload 成功；不依賴 SPA fallback |
| 404 | `dist/404.html` 存在；模擬 `/missing/nested/` 回傳 HTTP 404，仍能載入 CSS／favicon／base 導覽並回首頁 |
| case / Unicode | 路由／本機 asset 檔名均 ASCII；精確 case-sensitive manifest 比對通過。日文外部 URL 存在，但不是本機檔名 |
| root assumptions | 元件、layouts、scripts、產出全數檢查，未發現 root-hosting assumption |
| external launch status | 公開 REST repository 資訊為空 repo、has_pages false；Pages endpoint 回傳 404。本機也尚無 commit。沒有成功部署／線上 refresh 驗證 |

部署依據：[Astro GitHub Pages 指南](https://docs.astro.build/en/guides/deploy/github/)要求 repository base 並於 Pages 選擇 GitHub Actions。[GitHub 404 指南](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)說明 custom 404 的發布方式。

## 3. Production runtime / responsive evidence

使用 Edge Chromium、真正 HTTP static server，從乾淨 build 的 `dist` 執行，server 強制 `/yoasobi-guide/`、精確檔名與 404 status。不是只看 dev server 或 source code。

- 15 個代表路徑 × 9 個指定寬度，再加 844 × 390 landscape，共 **136 組頁面／尺寸檢查**。高度通常 900，導航流程另用 390 × 844。
- 九種寬度：**320、375、390、430、768、1024、1280、1440、1920**。首頁與歌曲頁每個尺寸留圖，歷史／LIVE／prepare／start／最長活動名稱於 390、768、1440 留圖；另檢視歌曲本文、頁尾、keyboard focus 與播放器錯誤圖。
- **所有 310 個正常產出頁面於 320 px 實際 render，0 水平 overflow**。未知頁另外驗證 404。日文與最長英文巡演名稱沒有裁切。
- 首頁 CTA → start → Ayase、歌曲搜尋 → detail → 專輯連結、marumaru href、年份跳轉與瀏覽器 Back、nested reload、slash redirect 均有實際操作。
- 主要頁面、九尺寸於初始載入觀測 CLS 為 **0**；這是本機觀測，不是 field Core Web Vitals 或慢速網路 benchmark。
- 正常 local 頁面無 pageerror／未預期資源 404。9 次預期未知頁 HTTP 404 不列為資源故障。
- 載入 YouTube 後播放器回覆「影片有年齡限制，且只能在 YouTube 觀看」。外部 telemetry request 有 ERR_ABORTED；iframe allow／allowFullscreen 有冗餘 warning；Windows GPU powerPreference warning 來自播放器。不是網站 JS exception。
- 無 JS 時完整歌曲卡可讀，搜尋工具隱藏，YouTube 與 marumaru 外部連結仍存在。
- 鍵盤 first Tab 顯示 skip link；Enter 跳 main，next Tab 到 main 的 CTA，確實跳過 header；focus outline 明顯。
- 320–390 導覽會換行，高度約 225 px；所有項目仍可用，沒有重疊或遮住內容。768 px 三欄 card 偏窄、歌曲兩欄偏擠，但未破版。1280–1920 內容受限於 1200 px，有合理邊界。
- history 在 390 px 高 **94,008 px**，1440 px 高 **35,092 px**。用瀏覽器 Back 可保留滾動，但 detail 的「返回歷史時間軸」會回最上方。
- 播放器在 320 px 為 **272 × 200**，768 px 為 **292 × 200**，因 min-height 非 16:9。430／1024+ 才符合預期比例。
- 沒有現存 modal、dropdown、dark/light 切換或歌詞 switching UI；沒有為稽核而加入這些功能。統計表因無樣本未 render，只能 source-review overflow wrapper，不能宣稱真實內容表已測試。

本機原始證據在 ignored `.qa/prelaunch/`：clean build logs、source SHA-256 manifest、before/results.json、before-aux/results.json、各尺寸 screenshots。正式可追蹤報告為本文件。

## 4. Personas / YOASOBI-specific UX

| 使用者 | 有效設計 | 摩擦與判斷 |
| --- | --- | --- |
| A 初次入門 | 小說轉音樂主題、三條路線、start CTA 與兩位成員入口明確 | 頁首沒有一句清楚交代 Ayase／ikura 分工；start 1、2、4、5 部分步驟是文字提示而非目的地。成員傳記仍短，P2 後續內容工作 |
| B 探索作品 | 發行資料按年份、版本分開，來源與日期精度透明 | 「歌曲」搜尋只有 1 篇，無法找到已在 JSON 的其他 53 筆配信作品；發行與歷史無名稱／類型篩選；detail 返回位置不連續 |
| C 準備演唱會 | 首頁与 LIVE 有準備入口，統計沒有捏造排名 | prepare 主要內容為「整理中」與一首歌；需要短而有依據的優先清單、聆聽／背景入口、適用範圍。可用單場已刊載演出作為編輯路線，不能說是最常演唱排行 |
| D 唱歌學日語 | 日文 h1 > Romaji > 中文，marumaru song detail 外連清楚且另開分頁；不展示歌詞 | MV 實際無法嵌入；手機先顯示播放器再本文，合理但應預先告知限制。未查核的其他歌曲不應捏造 Romaji／中文或學習網址 |

歌曲資訊順序是標題 → 日期／收錄／原作／tie-in → MV 與正文 → 外部日語學習 → LIVE 口徑 → 來源，基本合理。Desktop 本文左側、MV 右側 sticky；mobile 線性排列。本文約 2,765 px（390）不算失控，來源與空統計占比偏高是 P2。沒有 related songs，但現階段只有一篇 detail，不應創造不存在的文章。

發行紀錄保留 EP／配信／實體／影像／黑膠的差別；LIVE 卡片有文字型別，但巡演群組與實際場次不易快速分開。型別篩選比新增裝飾 icon 更有實用價值。

## 5. Accessibility / performance / SEO

- axe-core **4.10.3**（只存稽核工具，不加入 production dependency），8 個代表頁 × 390／768／1440：**24 次檢查皆只有 color-contrast 規則失敗**。其他 automated rules 未發現違規；不等於完整 WCAG certification。
- `#c94738` 對 paper 約 **4.33:1**、callout 約 **3.93:1**；小字最低須 4.5:1。[WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- main/header/nav/footer、h1、section h2、cards h3、labels、button vs link、source links 與 iframe title 合理。日文歌曲 h1/card 設 `lang=ja`；內文原作／混合語言可繼續改善。裝飾 cover/hero aria-hidden，無 content img 缺 alt。
- 導覽 target 約 41 px 高，年分 target 40+ px；間距合理，尚未發現不符 24 px minimum 的獨立控制。44 px 是可考慮的使用性目標，不要誤寫成 WCAG 2.2 AA 一律要求。[WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- reduced-motion 已取消 smooth scrolling。沒有花俏 transition、固定 header 或擋住內容的 overlay。focus red outline 與明確 active border 要保留。
- 全站只有 **7,100 bytes CSS（gzip 2,200）**、240-byte SVG favicon、23-byte robots。無額外字型、圖片、runtime framework、重複 CSS 檔或 hydration。點擊前沒有第三方 request；點擊後才支付 YouTube 成本。
- history HTML 約 91,201 characters（不是 UTF-8 bytes），是最大頁；主要問題是閱讀／DOM 密度，尚無必要引入 virtualization、search backend 或資料庫。
- 所有頁面有 title、description、canonical 和 zh-Hant。日本內容保持該段 lang，整頁是繁體中文，不應把網站全域設 ja。
- **110 個非首筆重複 title，166 個非首筆重複 description**。同一活動多場、MV 與配信同名造成 title 重複，部分模板採通用 description；建議後續加入日期／類型／場地作區別。
- 沒有 OG、Twitter/X card、sitemap、404 noindex；列 P2。canonical／URL 本身正確，不是 deployment blocker。

## 6. Findings — 修改前登錄

每項範圍為估計工時，並非排程承諾。僅先實作可在本地解決的 P0／P1。

| ID / 優先序 | 頁面／元件 | 問題與影響 | 建議修正 | 範圍 | 改變視覺？ |
| --- | --- | --- | --- | --- | --- |
| DEP-01 **P0** | GitHub repository / Pages 設定 | 遠端空 repo、Pages 未啟用，沒有 production URL 或 Actions run；不能聲稱已可公開瀏覽 | 完成首次 commit/push，Pages Source 選 GitHub Actions，確認 workflow 成功及正式域名的 nested reload／404／資源。設定位於遠端，不是本地 config 能修好 | 15–30 分鐘＋Actions 等待；需要 repository 發布與設定權限 | 否 |
| A11Y-01 **P1** | tokens / 全站 eyebrow、active nav、callout | 紅色小字 contrast 4.33／3.93，AA 失敗，影響閱讀 | 小幅加深既有 red token，在 paper/panel/callout/hover 重測 | 15–30 分鐘 | 是，僅同色系微調 |
| DISC-01 **P1** | songs/index + history JSON | 歌曲搜尋只查 1 篇，而 54 筆配信紀錄已存在，使用者誤以為站內無其他作品 | 保留 detail cards，增加由 verified history 產生的歌曲／版本目錄與搜尋、類型／年份控制，清楚區分詳細介紹與發行紀錄 | 1–2 小時 | 是，功能控制／現有卡片 |
| PREP-01 **P1** | live/prepare + listening path data | 只有一首，核心惡補需求無法成立 | 依已刊載演出歌曲提供精簡編輯优先路線，資料放 JSON、曲名／日期參照歷史 ID；附來源與「非頻率排行、非未來歌單保證」範圍 | 1–2 小時 | 是，增加實用清單 |
| ARCH-01 **P1** | HistoryArchive + history/[id] | 296 筆／手機 94,008 px 長，缺查找；detail 返回列表頂端，作品／LIVE 也無 context | 共用漸進增強搜尋／類型／年份篩選、可分享的 query 與結果數；返回所屬年份／發行／LIVE，browser Back 保留查找狀態 | 1–2 小時 | 是，小型 form／返回 links |
| MV-01 **P1** | YouTubeEmbed + song video metadata | 唯一 MV 點擊後實際被年齡限制拒絕；小尺寸比例錯誤 | 資料記錄外部觀看限制，該片直接提供官方 YouTube 入口與說明；保留其他片的 click-to-load embed，移除 min-height 比例限制 | 30–60 分鐘 | 是，限制說明與正常比例 |
| START-01 **P1** | home / about / start Markdown | 初學者無法立即知道两位成員分工，步驟部分沒有可點目的地 | 用現有查核來源補一句團體分工；首頁讀 content summary；所有閱讀步驟連到現有頁面 | 30 分鐘 | 是，短文字與連結，版型不變 |
| SEO-01 **P2** | BaseLayout / history detail / templates | title、description 大量重複，搜尋結果難區別各場次 | 由日期、型別、場地生成唯一 metadata，補各模板 description | 30–60 分鐘 | 否 |
| SEO-02 **P2** | build / public / layout | 無 sitemap、OG、X card、404 noindex；shareability 弱 | 靜態 sitemap、production absolute URLs、適當分享圖、404 noindex；勿誤認子路徑 robots 控制 origin | 1–2 小時 | 否（另需分享圖） |
| RESP-01 **P2** | 768 px card / song grids | 720 即三欄，tablet 卡片過窄／高度偏高，閱讀節奏弱 | 評估 tablet 兩欄、desktop 三欄；song aside 斷點另行選擇，不擴大改版 | 30–60 分鐘 | 是 |
| NAV-01 **P2** | mobile header | 320–390 換行 header 偏高，LIVE 常落單 | 調整導覽 gap／target 或兩列布局；不必為六個 links 新增 hamburger JS | 30 分鐘 | 是 |
| CONTENT-01 **P2** | members / songs / releases | 個人傳記、原作／tie-in 與完整專輯曲目仍少；現在不是完整百科 | 按既有 source-first 原則逐步補 Markdown 與相互關聯，保留未查核標示 | 持續內容工作 | 是，內容增加 |
| LANG-01 **P2** | source-work metadata / mixed-language content | 日文段落未全面 lang=ja；Romaji 的語音讀法也需考量 | 以資料語言標記適當段落，勿替 mixed 中文段落整體指定 ja | 30–60 分鐘 | 否 |
| BUILD-01 **P2** | empty concerts loader / build logs | 空 collection 的 warning 重複很多，掩蓋未來重要 warning | 保留無歌單的真實狀態，日後以空 JSON file loader 或集中載入減少 warning | 30 分鐘 | 否 |
| PERF-01 **P2** | long archives | 296 cards 全部 render、手機文件很長；篩選不會降低初始 HTML bytes | 先觀察真實流量；必要時按年份靜態分頁，保留可索引內容；無需 backend | 1–2 小時（需要 evidence 後才做） | 是 |
| CONTENT-02 **P2** | HistoryNotice | 「官方排定」字樣與現有多種 source/status 用語不完全一致 | 對齊已列日程／事後紀錄的資料定義 | 15 分鐘 | 是，文字 |
| POLISH-01 **P3** | source links / novel link | 新分頁提示不完全一致 | 統一另開分頁的可及文字與箭頭 | 15–30 分鐘 | 極少 |
| POLISH-02 **P3** | iframe construction | allowFullscreen 與 fullscreen allow 有冗餘 warning | 選一種 permission 宣告，保留 fullscreen 功能 | 15 分鐘 | 否 |
| POLISH-03 **P3** | song detail | 來源與空統計占比偏高，無相關作品入口 | 在已新增更多完整 detail 後補 related links，再評估來源呈現密度 | 30–60 分鐘 | 是 |

PREP-01 的可用研究依據：[2023-08-06 Head In The Clouds 演出報導與歌曲清單](https://lp.p.pia.jp/article/news/284424/index.html)。它支持當天演唱哪些曲目，不支持跨年頻率或下一場必演。引用曲名與編輯聆聽提示即可，不轉載整篇文字。

## 7. Keep / Change

**保留**：純靜態 Astro、內容與 UI 分離、base helper、Markdown／JSON／Zod、ISO 精度、取消／預定／事後紀錄區分、來源與矛盾揭露、沒有樣本不顯示頻率；紙色、深色文字、紅色重點、系統字型、合理留白、簡單 border、克制的封面藝術；點擊才載入可嵌影片；marumaru 外連取代歌詞；skip link／focus／reduced-motion。

**改善**：既有資料的可查找性、年份與列表 context、可執行的入門步驟、可直接使用的演唱會準備清單、已知 MV 限制、AA 對比。

**不為風格偏好而更動**：不換 palette／字型、不加 gradient／glassmorphism／animation／decorative cards、不建立 dark mode、不加入 SPA framework、backend、authentication、database；不猜完整歌詞、Romaji、日期、venue、setlist 或演唱頻率。

## 8. 驗證界線

本次以 Windows Edge Chromium 的 CSS viewports、keyboard 與 automated accessibility 檢查，加上 screenshot 視覺審查。沒有 iOS Safari／Android 實機、螢幕閱讀器人工測試、真實行動網路 benchmark 或 GitHub hosted workflow execution。外部網站可隨時間改變；MV 年齡限制為本次真實播放器的觀測。公開 GitHub API 無法代替 repository owner 的完整 Pages Settings 檢視。

P0 遠端發布不是此次「audit + 本地修正」中的自動 publish 動作。完成本地 P1 後列出部署步驟與實際驗證界線，不會在沒有成功 Actions 的情況下宣稱已部署。

## 9. P1 修正與重新驗證 — 完成後

本節於初始報告完成後追加；初始報告已先保存為稽核快照，SHA-256：`6D386B8708C4ED1DCDF488FFD7EC5874683BDE6495C68B8D55EC09A3DE811111`。原先評分與 findings 保留，未改寫成修正後的表現。

| 問題 | 修正前 | 修正後／驗證 |
| --- | --- | --- |
| A11Y-01 | 紅字在紙色／callout 不達 AA，24 次掃描失敗 | red 由 #c94738 微調為 #b43d30；相同 24 次掃描及新增功能的 12 次掃描，**0 automated violations** |
| DISC-01 | 歌曲入口只搜尋 1 篇介紹 | 保留原介紹，另由查核 JSON 產生 **60 筆歌曲／版本／合作目錄**，包含全部 54 筆配信單曲；日期、名稱、類型、來源仍來自既有資料 |
| PREP-01 | 優先推薦只有 1 首 | 新增 JSON 編輯路線：夜に駆ける、群青、怪物、祝福、アイドル。保留原入門路線；五首都有已核對的官方 MV 外連、閱讀入口與推薦理由；用單場演出例子，不宣稱常演排名 |
| ARCH-01 | 歷史 296／LIVE 181／發行 83 筆需長捲動，返回頂端 | 共用名稱／類型／年份 controls、結果提示、empty/reset；query 存在 URL；detail 返回帶查找條件及年份的原列表。無 JS 保留完整列表 |
| MV-01 | 官方播放器實際回報年齡限制，窄尺寸非 16:9 | 該片直接顯示限制說明與官方 YouTube 外連，無無效 iframe／第三方 request；其他影片維持 click-to-load；獨立 component fixture 九尺寸均 16:9，點擊前後高度一致、iframe title 與 focus 有效 |
| START-01 | 分工不清楚、閱讀步驟部分無目的地 | 團體分工放 about Markdown、首頁讀其 summary；start 各步驟連至實際頁面，base／relative links 重新檢查通過 |

官方聆聽入口以公開影片頁／發布者連結建立候選，再於 **2026-10-04** 核對 YouTube oEmbed 的 title、author_name 與 `@YOASOBI_Official` author_url。資料的 sources 保存五個官方影片連結。參考：[群青](https://www.youtube.com/watch?v=Y4nEEZwckuU)、[怪物](https://www.youtube.com/watch?v=dy90tA3TT1c)、[祝福](https://www.youtube.com/watch?v=3eytpBOkOFA)、[The Orchard 公告中的アイドル MV 入口](https://prtimes.jp/main/html/rd/p/000000672.000055377.html)。沒有增加未查核歌曲文章、歌詞、marumaru 連結或演出統計。

### 修正後測試結果

- 相同獨立安裝 workspace 重新執行 production check → test → build：**35 files，0 errors／warnings／hints；9 tests passed；311 pages built**。原本的 8 項日期／歷史／LIVE 統計測試保留；增加路線跨檔參照、歌曲需早於所據演出、聆聽網址需記錄來源、互斥 ID 驗證。
- 實際工作目錄 production build 也成功，與乾淨 workspace 的 311 頁產出一致；沒有 fixture 混入正式輸出。
- 完整瀏覽器重新驗證 **136 組頁面／尺寸**，全站 **310 個正常頁面於 320 px** render；0 overflow；所有 **5,110 個 local URL／fragment references** 有效。
- 新增流程另驗證 **27 組頁面／尺寸**：目錄、優先清單與已篩選歷史在所有九寬度無溢出；新增 controls 的 12 次 axe 檢查零違規。總計 **163 組正常／404／landscape／篩選頁測試**，另加九尺寸 player fixture。
- 實際操作：「找不到 → empty → clear」、「日文名稱＋配信＋2023 → 日／英兩個版本」、「點 detail → reload → 返回保留 q/type/year」、「Romaji → 既有完整歌曲頁」、「prepare CTA → 五首清單」、「無 JS → 完整目錄／五首可讀」均通過。
- 外部／javascript／錯誤格式／錯誤 base 的 `from` return URL 被拒絕，保持靜態 fallback，沒有 JS exception。
- 正常頁面 **0 console warnings／errors、0 failed requests／resource 404、初始 CLS 0**；僅測試未知頁的九個 HTTP 404，為預期結果。
- CSS **7,100 → 8,029 bytes**、gzip **2,200 → 2,394 bytes**。共用篩選 inline module 約 **1,756 characters**，detail 返回處理約 **541 characters**；沒有新增 dependency、framework、hydration、字型或圖片請求。
- 非受限影片的 responsive sizing／focus 用 isolated Astro component fixture 測試，iframe 網路由測試控制；這不代表已驗證其他影片實際可播放。正式站的《夜に駆ける》限制則是修正前真實 YouTube 的觀測。
- Source SHA-256 對照確認：**history/verified.json、metadata.json、所有既有日期／source／status、package.json、lockfile、Astro config、兩份 workflows 均未更動**。既有歌曲資料僅添加 MV 限制欄位，原有 ID／MV URL／marumaru／發行資訊保留。

### 修正後評分

| 分類 | 修正前 → 修正後 / 10 |
| --- | ---: |
| GitHub Pages readiness | 6 → 8（本地相容；遠端仍未發布） |
| Technical reliability | 9 → 9 |
| Mobile usability | 7 → 8 |
| Desktop usability | 8 → 8 |
| Visual design | 8 → 8 |
| Navigation / information architecture | 5 → 8 |
| Accessibility | 6 → 8（自動與鍵盤檢查，非完整認證） |
| Performance | 9 → 9 |
| SEO | 4 → 4（P2 尚未實作） |
| YOASOBI beginner experience | 5 → 7 |
| Concert preparation experience | 2 → 7（已有準備路線，未有常演統計） |
| Japanese-learning experience | 7 → 8（保留外部學習範圍） |

### 剩餘事項

**DEP-01 P0：仍是遠端部署前置事項。** 2026-10-04 08:49（Asia/Taipei）再次核對，公開 repository size 仍 0、has_pages false，正式網址實際 **HTTP 404**。此次未 commit、push、啟用遠端 Pages 或宣稱上線；本地修正已無已知 code-level deployment blocker。

遠端執行步驟：

1. 將正式 source、content、lockfile、workflows 與報告提交／推送至 main；排除 ignored `.qa`、node_modules、dist、cache。
2. Repository **Settings → Pages → Source：GitHub Actions**。若有 owner policy／environment protection，依現有 repository policy 設定，不擴大 workflow 權限。
3. 確認 Validate／Deploy 的 install、check、test、build、artifact、deploy job 成功；Pages environment URL 為 `/yoasobi-guide/`。
4. 在正式域名驗證首頁、`/songs/yoru-ni-kakeru/`、`/history/history-0037/`、帶篩選 query 的 `/live/`、nested refresh、未知網址 404、CSS／favicon、canonical。GitHub hosted run 與 CDN 行為仍需這一步實證。

**剩餘 P2（本次未做）**：SEO-01 唯一 metadata；SEO-02 sitemap／OG／X／404 noindex；RESP-01 tablet grid；NAV-01 mobile header；CONTENT-01 成員／完整歌曲／專輯內容；LANG-01 段落語言；BUILD-01 空 collection warnings；PERF-01 視真實資料／流量需求的靜態分頁；CONTENT-02 狀態用語。

**剩餘 P3（本次未做）**：POLISH-01 外連提示一致性；POLISH-02 generic iframe 冗餘 fullscreen 宣告；POLISH-03 更多歌曲完成後的相關作品入口與資訊密度調整。

**最終 recommendation：NOT READY FOR GITHUB PAGES。剩餘阻擋僅 DEP-01 遠端首次發布與 Pages 設定；本地 P1 修正完成並通過 production 回歸驗證。**
