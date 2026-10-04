# 本輪查核與再現

查核日：2026-10-04。對照 `docs/persona-ux-content-audit.md`。本資料夾收錄新增研究主張、四筆演出狀態修正與六份歌單來源；既有事實依原研究資料保留。

## 檔案

- `source-manifest.json`：30 個本輪查核來源 URL、15 份 Sony／YOASOBI 公開新聞正文快照的標題／發布日期／SHA-256、三個來源誤植與一個未採用候選。
- `history-patches.json`：既有 ID／日期的預期值、四筆完成狀態修正，以及六份新歌單與歷史引用。先斷言日期，再更新範圍，不自行推測未知 venue 或 setlist。
- `apply-history-review.cjs`：將修正套用於研究母檔；`research/build-report.cjs` 重建資料也會執行本步。
- `build-content.cjs`：保存已讀來源後的審閱內容，產生歌曲研究 JSON、六份歌單、新增成績與聆聽路線。沒有執行網路搜尋，沒有把摘要轉成事實。
- `build-manifest.cjs`：從本輪主張和已保存官方新聞正文建立來源 manifest。
- `static-validation.json`：最近一次正式 build 的全部內部路徑、metadata、sitemap／404 與資源統計。

真正網站內容位於 `src/content/`。79 個 `song-research` 紀錄包含既有 metadata 摘要；本輪另讀來源補特定內容的作品為 20 個，不能混稱 79 篇新研究。

## 可再現步驟

由 repository root 執行，使用專案 Node 24／pnpm lockfile。先檢視腳本與既有變更；這些命令會更新相應 Markdown／JSON，不是唯讀稽核。

```powershell
node research/audit-improvements/build-content.cjs
node research/audit-improvements/apply-history-review.cjs
pnpm content:import-history
pnpm check
pnpm test
pnpm build
pnpm test:static
```

通常只需編輯／查核 `src/content/` 後執行 check、test、build。CI 不會重新跑研究 generator，也不依賴忽略的新聞快照。新增編輯內容後，應同步修改審閱腳本再重建，以免覆蓋人工補強。

`node research/audit-improvements/build-manifest.cjs` 另需本機忽略的 `research/raw/audit-improvements/news-*.jsonp`。未附原始 cache 的新 checkout 不應執行它；已提交 manifest 仍可讀。官方新聞另有公開 Sony JSON 正文 URL，保存在 manifest；重新取得時需讀正文、重新查核，不能只換 hash。

`src/content/live-guide.json` 管理穩定的預設比較場次與三組策展入口；新增場次不會因排序改變預設。build 檢查它們確實引用已完成、完整刊載的歌單。

## 來源使用與矛盾

官方來源優先，可靠事後報導用於它實際列出的曲序。官方影像商品所列セットリスト代表刊載順序，不宣稱影片未剪輯，也不自行標為完整演唱。Head In The Clouds 八首為 YOASOBI 正式時段，未把整個活動 finale 的合作算入同一時段。

四筆舊資料的矛盾是排定／listed_past 與已取得事後完整歌單不一致，依既有官方／可靠事後來源修正為 performed。不是日期過去就自動轉狀態；其他場次仍保留原驗證成熟度。

新讀資料的三個誤植逐一保存：清川製作頁第二張 EP 名稱缺少 2、2023 年官方文章內 EP 年份寫為 2022、Mister 公告的星期不符日期。職務／故事主張可用，發行名稱／日期仍交叉採用官方商品與既有查核資料。CALF 候選頁實際 404，未將搜尋摘要當作〈祝福〉製作名單。

榜單付日、文章發布日、首次音源收錄、獨立配信、MV 公開、演出日、認證年月各自保存。`2023` 和 `2025-03` 不補未知月日；英文／Remix 不繼承原曲成績。武道館 2021-12-05 影片不對應到本站 12-04 歌單；多日影片標題不抽第一日作精確日期。

仍未窮盡各曲的訪談、評論、認證、獎項、所有版本與現場影像。作品的 `gaps` 表示待查範圍，不表示現實沒有發生；頻率僅適用本站完整樣本，不能推出未來必演或全生涯罕演。
