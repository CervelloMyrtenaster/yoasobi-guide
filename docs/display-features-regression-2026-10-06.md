# 字級、外觀與 Spotify 功能驗證

日期：2026-10-06。測試對象為本機 Astro 正式建置，網址 `/yoasobi-guide/`；未推送或更新 GitHub Pages 線上版本。

## 實作範圍

- 學習字級：標準／大／特大。日文分別為 20／24／28px，輔助文字為 15／18／21px，以 rem 實作；振假名維持相對比例。只調整逐行閱讀文字，導覽、控制與註解維持原本大小。
- 全站外觀：跟隨系統／淺色／深色。延用紙色、墨色與紅色的既有設計；品牌圖案與播放器仍保留原本色彩。選擇跨頁保存，載入前套用手動偏好，避免先顯示錯誤外觀。
- Spotify：79 個歌曲／版本頁都有專屬曲目連結，位於 MV 附近。日文、英文、Ballade、合作、Remix、THE FIRST TAKE 與間奏版本分開核對；沒有使用搜尋連結代替曲目。未加入 Spotify iframe 或客戶端 API。

共用元件為 `LyricsLearning.astro`、`ThemeControl.astro`、`SpotifyLink.astro`；偏好白名單與儲存容錯放在 `display-preferences.ts`。歌曲只增加選填 `spotify.url` 與 ISO 日期 `verifiedAt`；原有資料結構與公開路由保留。來源紀錄見 `research/spotify-links.json`。79 份歌曲原有欄位與正文均與修改前 Git HEAD 比對相同。

## 測試矩陣與結果

使用 Codex in-app browser（Chromium），操作實際正式輸出頁面。先保存 30 組修改前基準，再執行以下 304 組版面與控制狀態檢查：

| 範圍 | 矩陣 | 結果 |
|---|---|---|
| 首頁、入門、團體、歌曲索引、Idol、發行、歷史、LIVE、演唱會準備、日語導覽 | 10 頁 × 390／768／1440px × 淺／深色 = 60 | 無水平溢出；圖片正常 |
| Idol、怪物逐行閱讀 | 2 首 × 3 寬度 × 2 外觀 × 3 字級 × 5 閱讀組合 = 180 | 字級與勾選狀態正確；控制不超出畫面 |
| 補充螢幕與橫向手機 | 320／375／430／1024／1280／1920px × 首頁／Idol × 淺／深色，另 844×390px = 25 | 無水平溢出 |
| 成員、發行詳情、LIVE 比較／統計／影片、成績、作品關係、英文版、Ballade、間奏、404、頁尾 | 13 個情境 × 390／768／1440px = 39 | 原有內容與導覽正常 |

五種閱讀組合為：振假名＋中文、振假名＋羅馬拼音＋中文、只讀日文、全假名、全部輔助層。截圖與聯絡表用於人工視覺檢視；304 組是幾何與互動狀態檢查數，並非每一組皆做人工逐像素比較。

首頁淺色版的指定正文矩形（x=24 至 width−30、y=200 至 880）在 390／768／1440px 的修改前後像素完全一致。新增外觀控制位於標頭，手機排序讓它與品牌共用一列，既有導覽仍完整保留。逐行閱讀截圖確認 ruby 可讀，特大字級可自然換行，日文仍比輔助文字突出。

另已驗證：

- 改成大字級、深色及只讀日文後，前往另一首歌與重新載入均保留偏好。
- 「只讀日文」不重設字級；跟隨系統時符合當前系統的淺色偏好。
- 鍵盤可操作原生控制，Tab 移動後有可見焦點。
- 390px 將標準改為特大時，當前 L001 的位置維持 160.45px，測得位移 0px；閱讀控制列與回頂端按鈕不重疊。
- 回頂端後 scrollY=0、按鈕隱藏、焦點回到品牌連結。
- Spotify 連結使用 HTTPS 曲目頁、`target="_blank"`、`rel="noopener noreferrer"`；實際外部頁確認顯示《アイドル》、YOASOBI 與 THE BOOK 3。其餘連結從 Spotify 公開專輯／曲目中繼資料核對。
- 本站測試分頁未記錄 console error 或 warning。

## 可讀性與偏好容錯

實際渲染色值的文字對比：

| 顏色配對 | 淺色 | 深色 |
|---|---:|---:|
| 正文／頁面背景 | 13.79:1 | 14.91:1 |
| 次要文字／頁面背景 | 5.37:1 | 8.91:1 |
| 次要文字／面板 | 5.76:1 | 7.85:1 |
| 紅色文字／頁面背景 | 5.28:1 | 7.28:1 |
| 紅色文字／面板 | 5.66:1 | 6.41:1 |

以上文字配對均超過 WCAG AA 的 4.5:1。不宣稱這是完整 WCAG 認證。非法偏好值與儲存不可用的回退行為由單元測試驗證；未在瀏覽器內強制關閉 localStorage。

## 正式輸出與 GitHub Pages

- `pnpm check`：0 errors、0 warnings、0 hints。
- `pnpm test`：44／44 通過，包含資料、歌詞結構、偏好容錯及 Spotify 網址／版本來源驗證。
- `pnpm build`：431 個靜態頁，與基準相同。
- `pnpm test:static`：26,076 個站內參照、13,922 個錨點參照，未解析參照 0；430 個可索引頁、sitemap、canonical、OG URL、`.nojekyll`、404 均通過。
- 原有 `site=https://cervellomyrtenaster.github.io`、`base=/yoasobi-guide`、trailing slash 與 GitHub Actions 工作流程保留。
- 15 個產出 JavaScript 檔，合計 17,803 bytes／gzip 9,165 bytes。這是全部產出檔案總量，不是每頁的下載量；沒有新增依賴或 hydration framework。
- 專案沒有 lint 指令，本次未新增 lint 工具。

## 後續回歸方式與限制

重複測試時先執行 check、test、build、test:static，啟動 preview，再依矩陣操作外觀、字級與五種勾選狀態。跨頁／重新載入、鍵盤焦點、回頂端、Spotify 版本應列為發布前必測項目。結構化結果位於 `docs/validation/display-features.json`；截圖存於該檔記錄的本機 artifacts 目錄，不加入 Git 以避免大量圖片。

本次實際視覺測試涵蓋 Chromium；Safari／Firefox、實體 iOS safe-area、系統外觀在頁面開啟期間切換與螢幕閱讀器尚未實測。跟隨系統使用 CSS media query；第三方播放器的登入、播放權限與地區限制由 Spotify／YouTube 控制，未進行登入或完整播放測試。
