# Production code review 與保守清理

日期：2026-10-04。範圍為現有已部署網站的程式審查，不改版、不重寫內容、不重構資料庫或公開網址。開始時 git 工作目錄乾淨，HEAD 為 `f812ace`；repository 與適用父目錄未找到 AGENTS.md。

## 修改前基準

Node 24.19.0／pnpm 11.19.0；依 pnpm-lock.yaml 執行 frozen install、check、test、build、test:static。Astro 7.3.5、TypeScript；production dependency 只有 Astro，四個 devDependencies 均用於現有檢查或測試。

- check：0 errors／warnings／hints；24 tests pass。
- build：423 HTML、422 可索引頁；12,931 內部引用、1,648 段落引用，0 缺漏。
- 外部 JS：9 檔，10,928 bytes；逐檔 gzip 合計 5,760 bytes。沒有 client:* hydration。
- 沒有 lint 指令；沒有獨立 package data-validation 指令。資料由 collections schema、loadContent 參照檢查、現有 tests 和 test:static 驗證。未引入 lint／search dependency。

## 修改前分類表

| 類別 | 項目 | 判斷與範圍 |
|---|---|---|
| A SAFE CLEANUP | SongCard 舊搜尋 data attributes | 首頁卡片仍使用，不能刪元件；data-song-card／其 data-search 已無任何 consumer，僅刪死資料屬性 |
| A SAFE CLEANUP | 未使用 CSS 與被完整覆寫的格線設定 | 先查 source、動態 script、content 和全部生成 HTML；只刪證實沒有使用的 stats／timeline-item／song-video-label，以及在後段相同 media query 被覆寫的兩項 grid declarations |
| A SAFE CLEANUP | 未指定 Props 的共享元件 | ArticleLayout 與 JapaneseLearningLink 加 schema／collection 推導型別；不改 markup |
| B REFACTOR | 搜尋正規化 | 四處 NFKC 大小寫處理共用純函式；歌曲目錄保留 NFKD 去聲調的另一明確政策；不改空白、標點、facet 或 URL 行為 |
| B REFACTOR | 成績類型標籤、歌曲類型標籤 | 成績索引與單曲區共用相同標籤；以 schema 推導 union 限制合法索引，不複製 enum、不改文字 |
| B REFACTOR | 比較頁 client payload／型別 | 只传 client 確實需要的 id、title、date、setlist；比較 helper 接受所需的 setlist，而非宣稱 DTO 具有未傳入的完整 LiveSample 欄位 |
| B REFACTOR | 關係 build 驗證 | 將已有 tests 的雙向 EP 收錄等不變量補到 build，檢查前置路線／版本循環；不改資料模型或資料 |
| C REPORT ONLY | loadContent 重複載入／驗證、component 資料查詢 | 靜態建置可工作；不引入可能令開發期資料過時的全域 Promise cache，不全面改成大量透傳 props |
| C REPORT ONLY | 大型 filter 控制器／弱 DOM 假設 | 搜尋、統計、比較有不同資料與 URL 任務，保留用途；不為共用表單而造大型控制框架 |
| C REPORT ONLY | 研究 generator／測試 JSON 的 any、人工衍生欄位 | 保存資料再現與來源的腳本不是死碼；不因未加入 npm scripts 就刪除。需要較大調整時另做獨立工作 |
| D 不實作 | 視覺、導覽、內容策略、database 正規化、路由變更 | 無本次必要性，保留現狀 |

## Executive summary

完成 A 與低風險 B 清理。保留視覺、公開路由、編輯文字、資料模型及部署流程；未發現必須改動架構的部署阻擋。新增必要資料的 build-time 參照檢查，集中搜尋政策和成績標籤，移除有證據的死屬性、CSS 與 export。沒有換套件、新增 framework、hydration 或依賴。

## 實際架構與依賴流

- `src/pages`：Astro 檔案路由；歌曲、成員、導讀、EP、歷史事件、LIVE 與聆聽路線以 `getStaticPaths` 生成。首頁、開始入門、歌曲索引、發行索引、時間軸、統計、比較、影片、成績與作品關係提供不同深度入口。
- `src/content.config.ts`／`src/schemas/content.ts`：Markdown 與 JSON collections、Zod validation。歌曲／成員／導讀文字和 UI 分離；演出及研究資料由 JSON 管理。
- `src/lib/content.ts`：集合載入、發布狀態和必要參照 validation。其後由 `history.ts`、`timeline.ts`、`listening.ts`、`live-stats.ts`、`setlist-comparison.ts`、`video-dates.ts` 處理各自領域。
- `paths.ts` 負責 BASE_URL；`navigation.ts` 負責返回上下文。`songs.ts` 為 schema 推導的標籤；`search.ts` 為兩個刻意不同的 Unicode 搜尋政策；`references.ts` 為必要資料不變量。
- `BaseLayout` 集中 head／SEO／header／footer，`ArticleLayout` 包覆成員與導讀。全域 CSS 使用 `tokens.css` 的紙色、panel、ink、muted、紅色與線條六個 tokens，歌曲 CSS 保留既有設計。

資料流：Song → 歌曲索引／详情 → Release tracklist → History 的歌曲／發行參照 → Concert setlist → LIVE 統計／比較與 concert preparation。原作、tie-in、MV、來源與成績由歌曲或研究 collection 持有，journey／關係頁於 build 推導。聆聽路線以 ID 連回同一批歌曲，沒有四套重複內容。79 篇歌曲、9 個 EP、296 筆歷史、12 場歌單、6 條路線、79 筆研究與42項成績均保存。

## 全部共用元件盤點

實際共有 **13 個**共用元件，全部有 route／layout／component 消費者，沒有可以安全整檔刪除的元件。

| 元件 | 責任與判斷 |
|---|---|
| ContextNavigation | 返回查詢／路線上下文；KEEP AS-IS，實際返回驗證通過 |
| HistoryArchive | 年表搜尋與分年展開；B，僅共用搜尋政策 |
| HistoryNotice | 資料範圍與狀態說明；KEEP AS-IS |
| JapaneseLearningLink | 外部歌曲學習入口；A，加 schema 推導 Props |
| LiveClips | 官方現場片段呈現；KEEP AS-IS |
| LiveStats | 歌曲相關演出樣本統計；KEEP AS-IS |
| SongAchievements | 歌曲成績與来源；B，共用成績標籤 |
| SongCard | 首頁代表作品卡；A，刪無 consumer 的兩個 data attributes，保留元件 |
| SongCatalog | 完整作品搜尋；B，共用既有 NFKD 政策，每次查詢僅正規化一次 |
| SongJourney | 推導歌曲歷程；KEEP AS-IS |
| SongResearch | 研究資料及漸進展開；KEEP AS-IS |
| SourceList | 來源與統計範圍；A，schema import 改 type-only |
| YouTubeEmbed | 點擊後才建立播放器；KEEP AS-IS，無 API／hydration |

## Changes made／Refactors

| 問題 | 解法與檔案 | 安全性 |
|---|---|---|
| 五處搜尋正規化重複 | `search.ts`、HistoryArchive、SongCatalog、stats、records、videos 共用純函式；三個索引預先保存搜尋文字 | NFKC archive 與 NFKD catalog 分開，保留聲調、日文、空白及標點原行為；測試與 rendered 操作前後一致 |
| 成績標籤與種類索引缺少型別限制 | `songs.ts` 共用 achievementLabels；SongAchievements／records 使用相同標籤；schema 匯出推導 Song type | 不新增 schema 欄位或另造 enum；標籤原文不變 |
| Props／client DTO 宣稱比實際資料更寬 | ArticleLayout、JapaneseLearningLink 加 Props；compare 與 setlist-comparison 改為實際需要的 Pick 型別 | 不變 markup；比較 payload 省 country／eventType 兩個未讀欄位，保留 server 顯示資訊 |
| localStorage parse 無元素型別保護 | `listen/[id].astro` 將 JSON 先視為 unknown，僅接受 string 元素 | key、有效進度、不可存取時降級行為不變；正常進度與返回驗證通過 |
| 必要參照僅部分在 build 檢查 | `references.ts`／`content.ts` 檢查 EP 雙向收錄、版本鏈與路線前置的間接循環 | 目前資料全部通過，日後不一致會在 build 拋明確錯誤；測試覆蓋孤兒、循環與合法共享前置 |

新增 `tests/cleanup.test.ts` 五項有實際資料錯誤／Unicode 行為風險的回歸測試；沒有為單純刪樣式另造依賴或 mirror tests。

## Removed code 與證據

- 檔案／元件／依賴：**0 移除**。13 個元件及五個套件均仍使用；研究／import 腳本不是因未列入 scripts 就可判定 dead code。
- Export：`live-stats.ts` 的 `isJapan` 只有同檔 consumer，全 repository 無外部 import，僅取消 export，函式保留。
- CSS：刪 6 條 `.stats`／`.timeline-item`／`.song-video-label` 舊規則，source／content／scripts 與全部423生成頁沒有使用；再刪2條於後段相同 media query 完整覆寫的 grid declarations。其餘卡片、table、compact、影片與 breakpoint 樣式保留。
- SongCard：刪 `data-song-card`／`data-search`，目前目錄由 SongCatalog 自己的 rows 篩選，沒有 script consumer。不是刪首頁卡片。
- compare client payload：刪兩個 client 未使用欄位；仍以完整 server data 產生場次標籤。
- 沒有刪 CLI logging、資料、來源、圖片或合法待辦。沒有生產 `console.log`／`console.debug` 可移除。

## Data／type／JS／CSS／dependency review

Collection schema 為主要合法類別來源。日期年／月精度與 research 的來源範圍有用途，沒有擅自正規化或刪 derived 欄位；history 的擴充 type 與 fallback label 保留。必要 ID 及已發布參照在載入／build 拒絕無效資料，optional 資訊仍使用既有乾淨空狀態。schema 欄位、所有 factual data、原作、MV 與 editorial content 都沒有變動。

11 個 source `<script>` 區塊均有既有功能：共用資訊／上下文／YouTube，及索引、history detail、listen、stats、compare、records、videos。0 個 framework hydrated components；沒有 SPA transition、重複 navigation initialization 或可安全取消的 hydration。details 使用 native HTML；搜尋、統計、比較與 localStorage 需要 browser JS，沒有以新控制框架取代。

共用 helper 讓兩個原本內嵌的 controller 被 Astro 輸出為可快取外部檔案。這是維護性改善，不是 JS 縮小：外部檔增加3個，連 inline 合計的唯一程式量增加214 bytes。首頁 JS 不變；本次沒有引入第三方 runtime 請求。

保留既有6個設計 tokens，沒有新增任意新 spacing／radius 系統或改變視覺。靜態資產3個：`.nojekyll`、favicon、social card，均被部署／metadata 使用，最大約45 KB；沒有證明為未使用的 assets。依賴仍只有 Astro 加4個 check／test／types devDependencies，lockfile 與 versions 不變。

## GitHub Pages／routing／SEO

針對 `https://cervellomyrtenaster.github.io/yoasobi-guide/`：

| 項目 | 結果 |
|---|---|
| site | 正確：`https://cervellomyrtenaster.github.io` |
| base | 正確：`/yoasobi-guide`；`path()` 使用 Astro BASE_URL |
| links／動態連結 | generated423頁與所有內部引用通過；返回 query／anchor 保留；未改公開 slug |
| assets | build CSS／JS／favicon／social image 路徑符合 project subpath，沒有發現不相容 root-relative reference |
| generated metadata | canonical／OG 由 BaseLayout 集中生成；422 可索引頁及 sitemap 正確；robots 的 origin Allow:/ 是刻意指令；404 noindex |
| trailingSlash／直接開啟／refresh | always；實際歌曲巢狀頁與部署版刷新通過；本地自訂404及首頁返回可用 |
| workflow | Node24、pnpm11.19、frozen install、check／test／build／static validation → upload dist → deploy；Pages／OIDC permissions 分工正確，保留現有 Pages setup preflight |

沒有必要改 functioning workflow，沒有觸發本輪 GitHub Actions／發布／更改 GitHub 設定；線上對照驗證的是既有部署版，不是宣稱本次已部署。

## Browser 與 accessibility／media 驗證

使用實際 Astro production preview，before 保存原始 dist、after 使用新 dist，各自獨立 origin；不是從 dev server 推測。13個代表路由：首頁、Ayase、歌曲目錄、ミスター、EP、history、LIVE、prepare、stats、records、videos、compare、30分鐘路線；各390／768／1440 px 共39組。全部主要文字、layout rect、CSS style signature一致，無水平 overflow。38／39原始PNG逐檔相同；唯一平板首頁初次PNG存在像素差，但位置／style一致且肉眼無差。重新依序截取同頁後PNG SHA256完全相同，未再現視覺回歸。

15種功能操作在before／after的rendered main文字完全一致：全形Gunjo搜尋、歌曲返回、英文facet、海外統計、Orion零樣本、倒置日期、勾選進度、歌曲返回保存進度、RIAJ篩選、成績返回、全形JASRAC、history年份、未明載年份影片搜尋、海外／日本比較、比較後返回。测试進度透過既有清除按鈕復原，未注入 localStorage。

手机390：Tab後品牌焦點有3px紅色outline、六個nav link高度44px、LIVE link能導航。現有skiplink、native form labels、button/link semantics、details、日文lang、iframe title、減少motion樣式保留。沒有此次需改markup的清楚缺陷；未聲稱完成全套WCAG／axe或screen-reader認證。

ミスター直接開啟與reload正常。按播放前0 iframe，按後正確建立youtube-nocookie URL及title，480×270（16:9）；保留原有click-to-load、aspect-ratio、外部fallback。這驗證播放器建立，不是保證YouTube所有區域／帳戶可串流。瀏覽器只暴露console而無完整network panel／Performance API，沒有把console無錯當作所有網路請求皆成功。

線上GitHub Pages首頁與ミスター直接開啟／refresh正常，canonical含project subpath，播放器按鈕存在、手機無overflow，console無warn／error。兩份本地39組及功能操作觀察亦未見console warn／error。

## Validation results／Metrics

| 驗證／量測 | Before | After |
|---|---|---|
| frozen lockfile install | 成功 | lockfile及依賴hash不變 |
| pnpm check | 0 errors／warnings／hints | 0 errors／warnings／hints |
| pnpm test | 24 pass | 29 pass，0 fail／skip |
| pnpm build | pass，423 HTML | pass，423 HTML |
| pnpm test:static | 12,931 references／1,648 anchors／0 unresolved | 12,935 references／1,648 anchors／0 unresolved |
| sitemap 可索引頁 | 422 | 422 |
| 檔案／dependencies 移除 | — | 0／0 |
| exported helper 移除 | — | 1（函式保留） |
| 搜尋重複邏輯 | 5處 | 2個明確政策 helper |
| client source script blocks／hydration | 11／0 | 11／0 |
| 外部 JS | 9檔／10,928 bytes | 12檔／14,908 bytes |
| 外部逐檔 gzip 合計 | 5,760 bytes | 7,720 bytes |
| unique inline JS | 5,176 bytes | 1,410 bytes |
| external + unique inline raw JS | 16,104 bytes | 16,318 bytes（+214） |
| CSS | 13,242 bytes | 12,861 bytes（−381） |
| route／semantic HTML比較 | — | 423／423一致 |
| 保護檔案hash | — | 209／209不變 |
| browser版面／功能比較 | — | 39／39、15／15一致 |

JS數值為唯一檔案／片段合計，不等同使用者一次瀏覽的network transfer；逐頁未快取raw JS增加0～171 bytes。没有supported lint script或獨立data-validation指令，未臨時安裝工具。內容import是資料修改工具，不是validation，本次未執行。最終git diff --check通過；Git的LF→CRLF提示是repository line-ending警告，不是Astro build warning。

Machine summary：`docs/validation/code-cleanup.json`。原始logs、protected hashes、before dist、screenshots與browser signatures保存在ignored `.qa/code-cleanup/`，未加入生產資產。

## Remaining technical debt

**P1：本次未發現尚未處理的明確部署或功能阻擋。**

**P2 — 值得後續獨立清理**

- stats／compare等較長client handler仍使用部分DOM non-null assertions及server JSON DTO信任邊界。可逐頁拆純計算／必要DOM guard，保持原功能並補有價值的資料錯誤測試；不此次全面重寫。
- 一些form同時監聽input與change，select可能重算兩次。應先量測／依控制類型驗證後收斂事件，避免直接刪除而失去日期／鍵盤支援。
- tests／research generator還有部分any或unchecked JSON；腳本仍用於資料再現，適合另做typed parser，而不是刪掉。
- loadContent在多頁／元件重複於build載入與驗證，未發現runtime成本；若build時間形成問題，再量測並設計不使dev內容過期的cache或明確資料傳遞。

**P3 — 可選**

- milestones collection有validation／load consumer但未直接展現，應先確認其編輯意圖再決定是否簡化，不能當無用事實直接刪除。
- 持續追蹤產物中inline與external JS共同成本；目前共有helper的維護收益伴隨極小bundle增加，不需為數十bytes採用難懂技巧。

本輪沒有C類架構重寫或D類設計建議被實作。改動仍待正常git review與發布流程，未commit／push／部署。
