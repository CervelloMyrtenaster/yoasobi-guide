# 完整作品建置與上線驗收

驗收日期：2026-10-04。既有 Astro 7.3.5／TypeScript 純靜態架構與紙色、紅色的編輯式視覺維持。GitHub Pages 目標為專案子路徑 /yoasobi-guide/，沒有新增框架、依賴、後端、登入或資料庫。

本機可部署版本已完成；正式網址尚未部署。遠端唯讀查核為 has_pages=false、repository size=0，正式網址 HTTP 404。因此不能宣稱已線上公開，也尚未實際跑過遠端 Linux Actions。

## 建置前後

| 項目 | 原本 | 現在 |
|---|---|---|
| 歌曲／版本介紹 | 1 篇 | 79 篇：35 日文原曲、34 英文版、3 合作、3 特殊版本、4 短曲 |
| EP 曲目 | THE BOOK 僅列本站已有曲目 | 9 張 EP 完整曲序且逐首有介紹 |
| 日語學習 | 單一外部入口 | 38 個已核對歌曲頁；英文版連回日文原曲，不保存歌詞 |
| 官方影片 | 單曲 MV | 78 篇有官方 MV、音源或演出入口，類型分開標示 |
| 導覽 | 小型歌曲列表 | 年代分組、搜尋、語言／類型／年份篩選、條件保留與版本互連 |
| 新手入口 | 簡短文章 | 五首聆聽路線、創作概念、成員分工與延伸閱讀 |
| 完整 LIVE 樣本 | 0 場 | 1 場有來源的 25 首歌單；未確認演唱長度不計完整演唱率 |
| SEO | 基本 metadata | 版本／日期區分頁標題、OG 圖、X metadata、sitemap、robots sitemap URL |

## 內容與資料可靠性

作品存於 src/content/songs/*.md；EP 與演出存於 JSON；UI 只渲染資料與通用標籤。schema、跨集合引用及測試防止遺失曲目、錯誤版本對應與未知日期補值。既有 296 筆已驗證歷史保留；history-0195 新增事後來源，setlistIds 連至歌單，showIds 仍僅供巡演與歷史場次關係。來源差異與公告中的 24:00 日期換算均在歌曲／EP 頁說明。

[完整查核報告與 79 筆來源表](../research/song-catalog/report.md)、[作品研究資料](../research/song-catalog/catalog.json)。研究檔不進入 public 或 dist。網站不複製外部學習歌詞、逐行拼音或翻譯。

## 已通過驗證

- **乾淨安裝**：另建 .qa/full-catalog-ci，無既有 node_modules，以 lockfile 安裝 270 套件，再執行與 Actions 相同的 check → test → build。從內容快取重用套件檔，不沿用上層安裝。
- **P0 修正**：pnpm 11 初次獨立安裝因 esbuild 未允許安裝腳本而失敗。新增 pnpm-workspace.yaml，只允許既有 esbuild，重跑 frozen install 成功，沒有放寬所有套件腳本。依據 [pnpm 11 官方說明](https://pnpm.io/blog/releases/11.0)。
- **型別／內容**：Astro check 0 errors、0 warnings、0 hints。14 項測試通過；research/validate.cjs 與研究重新產生、重新匯入均成功。
- **正式輸出**：399 個 HTML 頁面（含 404），398 個一般頁面列入 sitemap，另產生 robots.txt。修正了 public/robots.txt 與動態 route 同名覆蓋。
- **全站連結**：解析所有生成 HTML 的 href/src 與片段，按大小寫精確核對；0 個失效內部連結、0 個逸出 /yoasobi-guide/ 的站內資產。
- **Responsive**：320、375、390、430、768、1024、1280、1440、1920px 與手機橫向，235 個代表頁面案例；另逐一渲染 398 個一般頁面於 320px，0 個頁面橫向溢出。
- **Accessibility**：54 次代表頁面檢查，WCAG 2／2.1／2.2 AA 相關規則 0 次違規；人工查看截圖、鍵盤 skip／focus、外連提示與表格。自動檢查不等同完整人工 WCAG 認證。
- **Runtime**：0 個非預期 console 錯誤、0 個非預期站內資源失敗；9 筆 404 日誌均為九種寬度下刻意測試不存在的路徑。巢狀頁重新整理與 trailing slash 導向通過。
- **操作流程**：Romaji 去重音搜尋、原作／動畫搜尋、組合篩選與 reload、空狀態、返回保留條件、瀏覽器 Back、EP → 英文音源 → 日文學習、五首演唱會優先曲、25 首歌單連結均通過。
- **No JS**：79 篇作品仍可瀏覽，無作用的搜尋 controls 隱藏，YouTube 官方外連仍可用。
- **播放器**：九種寬度維持 16:9，點擊前無 iframe 或 YouTube 請求；點擊後 title、焦點與尺寸穩定。採用 youtube-nocookie 並明確設 strict-origin-when-cross-origin，依 [YouTube 官方要求](https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-player-api-client-identity)。

機器摘要：[full-catalog-summary.json](validation/full-catalog-summary.json)。

## YouTube 實播驗證限制

本機 Edge 在偶像、ハルジオン與英文 Monotone 的真實 iframe 收到「無法播放這部影片」。要求已帶 localhost Referer，沒有證據能將原因判定為歌曲權限、地區或本站程式；因此不把這三首誤標為年齡限制或永久禁止嵌入。播放器控制與版面已測試，但不能宣稱已驗證實際串流播放。所有入口都保留官方 YouTube 外連，並告知嵌入無法播放時可外開。夜に駆ける已確認的年齡限制則用專屬外連說明。

[實際播放器查核摘要](validation/youtube-smoke.json)。正式 HTTPS GitHub Pages 發布後需人工再驗證至少一首 MV、一首英文音源及年齡限制外連。

## 效能與分享

共享 CSS 約 9.3 KB（gzip 約 2.6 KB），分享圖約 45 KB／1200×630，沒有外部字型、圖片 CDN 或首屏第三方請求。互動採小型原生腳本，沒有 hydration 框架。canonical／OG／favicon／CSS／JS／sitemap 均保留專案 base。399 個 HTML 頁標題重複數為 0；版本標示與歷史日期用於區分同名作品。

## 發布步驟與剩餘改善

發布程式碼至 main，Repository Settings → Pages → Source 設為 GitHub Actions，再執行 Deploy to GitHub Pages workflow。build 使用 contents:read；deploy 使用 pages:write、id-token:write 與 github-pages environment。完成後確認 [正式網址](https://cervellomyrtenaster.github.io/yoasobi-guide/)、子頁 refresh、sitemap 和 YouTube 真實播放。/yoasobi-guide/robots.txt 是專案資產，搜尋引擎的 robots 規範仍讀 owner 網域根目錄，不把專案 robots 當成能控制根網域爬取。

P2：持續補入有事後來源的多場完整歌單；目前一場不足以支撐「最常演」排名。定期檢查 YouTube 與 marumaru 外連；新作正式配信後新增歌曲頁，保留公告與發行日期差別。中央フリーウェイ 尚未確認官方 YouTube 入口，不提供未查核影片。

P3：未來可補更多已查核中文別稱、原作中文書名與官方現場比較筆記。維持現有版面、無歌詞、純靜態與小型 JavaScript，不因風格偏好加入裝飾或框架。
