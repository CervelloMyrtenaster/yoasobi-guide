# YOASOBI 繁體中文入門指南

Astro + TypeScript 的純靜態 GitHub Pages 網站。Mobile first、Markdown 與 JSON 內容分離，少量原生 JavaScript 提供歌曲篩選與點擊載入 YouTube。沒有 backend、database 或 authentication。

## 本機開發

Node.js 24、pnpm 11.19.0。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm test
pnpm build
pnpm preview
```

開發與預覽路徑皆為 `/yoasobi-guide/`。

## 內容管理

- `src/content/songs/*.md`：歌曲資料與背景、音樂特色章節。
- `src/content/members/*.md`、`guides/*.md`：成員與導覽文章。
- `src/content/releases/*.json`：發行作品與本站已收錄曲目。
- `src/content/concerts/*.json`：一場一檔；同巡演不同場次分開保存。
- `src/content/milestones/*.json`：歷史事件。
- `src/content/listening-paths/*.json`：編輯推薦及理由。
- `src/content/history/verified.json`：由研究資料匯入的已驗證歷史，透過 Astro Content Collections 載入；未驗證候選不發布。
- `src/content/history/metadata.json`：研究截止日期與資料範圍。
- `src/schemas/content.ts`：資料驗證；`src/lib/content.ts` 在建置時驗證已發布內容的跨檔引用。

檔名作為穩定 ASCII ID（JSON 的 id 必須和檔名相同）。未完成內容設 `status: draft`。正式建置不顯示草稿。

逐行學習檔存於 `lyrics/*.txt`，由 `src/lib/lyrics.ts` 在建置時解析、驗證，再由共用 `LyricsLearning.astro` 呈現；歌詞與讀音不放進歌曲 frontmatter，也不在 UI 硬編碼。選填 `japaneseLearning: { url, verifiedAt }` 保留外部學習入口，網址必須是已查核的 marumaru `/japanese-song/play-...` 歌曲頁。缺少對應連結時顯示一般查找入口，不能用一般入口假裝是歌曲連結。

影片可設 `externalOnly: true` 與 `restrictionNote`，用於已確認無法嵌入的官方影片，直接提供 YouTube 外連；其他影片維持點擊才載入播放器。

聆聽路線的每個項目需指定 `songId` 或 `historyId`，兩者擇一。`historyId` 必須指向已發布的配信單曲紀錄，建置時會驗證。演唱會路線用 `purpose: concert`，可用 `sourcePerformanceId` 參照已查核演出，`listenUrl` 提供已核對的官方 YouTube 影片，並在 sources 記錄依據。編輯優先順序與單場演出例子不會進入跨年演出頻率統計。

歷史、發行、LIVE 與歌曲目錄共用名稱／類型／年份篩選，條件保存於 URL；無 JavaScript 時仍提供完整靜態列表。歌曲介紹與歌曲／版本發行目錄分開標示，不把歷史紀錄假裝成完整歌曲文章。

歷史日期保留來源精度：`YYYY-MM-DD`、`YYYY-MM` 或 `YYYY`，不補未知月日。查核／更新日期需要完整日。研究修改後執行 `pnpm content:import-history`，再執行 check、test、build；匯入保留原日期與狀態，解析來源並附來源矛盾說明，禁止以候選来源作正式內容。UI僅渲染內容集合。

維基百科對照結果、確認修訂與仍待查證項目見 [research/wiki-comparison.md](research/wiki-comparison.md)。修訂資料維護在 `research/wiki-review-2026-10-04.json`，其中保留原值斷言與來源；執行 `node research/build-report.cjs`（需要本機 `research/raw/` 來源快照）、`node research/validate.cjs`，再匯入網站。既有歷史 ID 保持穩定，新增資料採接續 ID。GitHub Actions 使用已提交的內容 JSON，無需在部署時抓取外部來源。

LIVE 統計在建置時計算，只納入已完成、已發布且刊載歌單完整、日期精確到日的樣本。同曲同場最多一次；歌曲頁採發行後專場，總覽採全期間專場。`performance: listed` 表示來源僅列曲名，未區分完整演唱、節選或組曲，不納入完整演唱率。研究歷史與歌單樣本分開；歷史的官方排定不代表演出已完成，也不產生虛構歌單或排行。單場樣本不能用來聲稱歷年常演排名。

## 新增演出範例（請替換為有來源的真實資料）

```json
{
  "id": "event-id", "status": "draft", "updatedAt": "2026-10-04",
  "title": "演出名稱", "date": "2024-01-01", "country": "日本", "city": "城市", "venue": "場館",
  "eventType": "solo", "eventStatus": "completed", "setlistStatus": "partial",
  "setlist": [{ "position": 1, "songId": "yoru-ni-kakeru", "section": "main", "performance": "full" }],
  "verifiedAt": "2026-10-04",
  "sources": [{ "title": "資料來源", "url": "https://example.com/", "scope": "場次及歌單" }]
}
```

## GitHub Pages

目標網址：`https://cervellomyrtenaster.github.io/yoasobi-guide/`。

1. 使用有此 repository 管理權限的帳號開啟 [Settings → Pages](https://github.com/CervelloMyrtenaster/yoasobi-guide/settings/pages)，在 **Build and deployment → Source** 選擇 **GitHub Actions**。若目前是 `Deploy from a branch`，必須切換；不能讓 Jekyll 建置 Astro 原始碼。
2. 已有 `.github/workflows/deploy.yml`，不需要另外新增 GitHub 建議的 Jekyll 或 Static HTML workflow。
3. 將修改 commit 並 push 到 `main`。部署依序執行 Pages 設定查核、`pnpm install --frozen-lockfile`、`check`、`test`、`build`，只上傳並發布 `dist/`。
4. 若切換 Pages 來源時修改已經推送，開啟 [Deploy to GitHub Pages](https://github.com/CervelloMyrtenaster/yoasobi-guide/actions/workflows/deploy.yml) → **Run workflow** → 選擇 `main`。不要重跑舊 commit 的失敗紀錄，舊紀錄仍使用舊版 workflow。
5. `build` 與 `deploy` 皆成功後，確認首頁、歌曲詳細頁與 CSS 都可由目標網址開啟。PR 只做驗證，不發布。

部署權限限定於各 job：`build` 需要 `contents: read` 與 `pages: read`，供 checkout 與 `actions/configure-pages` 查詢；`deploy` 需要 `pages: write` 與 `id-token: write`，供 `actions/deploy-pages` 發布。不要為了解決 404 將整個 repository 的 workflow token 改成所有權限可寫。

`public/.nojekyll` 會複製至 `dist/.nojekyll`，標示建置產物不使用 Jekyll；它不能取代上述 Pages 來源設定，也不能讓 repository 根目錄的 Astro 原始碼直接變成網站。

### 部署錯誤排查

| 訊息 | 原因與處理 |
| --- | --- |
| `actions/configure-pages@v5` 的 `HttpError: Not Found` / `Get Pages site failed` | 這兩則通常是同一個查詢失敗。確認 Pages 已啟用、Source 是 GitHub Actions，並使用已補上 `build.permissions.pages: read` 的最新 workflow。 |
| `pages build and deployment` → `Build with Jekyll` | GitHub 的舊版分支發布流程仍在處理原始碼。將 Pages Source 切換成 GitHub Actions，再執行本站的 `Deploy to GitHub Pages`。歷史失敗紀錄會保留，無需刪除。 |
| `GitHub Pages source is 'legacy'` | 本站 workflow 主動阻止錯誤的發布來源；依錯誤中的 Settings 連結切換為 GitHub Actions。 |

不使用 `enablement: true` 搭配預設 `GITHUB_TOKEN`：`configure-pages` 官方說明此功能需要另外具有管理權限的 token，而且不會替已存在的 Pages 站點切換發布來源。一般部署只需一次正確的 Pages 設定，無需新增 PAT 或 secret。參考 [GitHub 發布來源文件](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) 與 [configure-pages 的 enablement 權限說明](https://github.com/actions/configure-pages/blob/v5/action.yml)。

若 repository 名稱或 owner 改變，更新 `astro.config.mjs`。站內連結統一使用 `src/lib/paths.ts`，勿硬編碼 `/songs/`。若使用自訂網域，需要另外更新 site、base 與 Pages 網域設定。

## 作品收錄範圍（2026-10-04）

已建置 79 篇作品介紹：35 首日文原曲、34 首英文版、3 首合作曲、3 個特殊版本與 4 首 EP 短曲。9 張 EP 有完整且可逐首閱讀的曲目表；38 個 marumaru 歌曲詳細頁已核對。78 篇作品提供官方 MV、音源或演出影片；中央フリーウェイ未確認官方 YouTube 影片，保留合作發行來源。

保留 296 筆歷史資料，另收錄一場已刊載完整 25 首曲序的東京巨蛋專場，提供演出與作品互連；目前不足以建立歷年常演排名。尚未完整發行的新作與 MIKUNOYOASOBI 相關發行見「新作與相關發行」，不猜測配信日期。伴奏版、動畫長度版、黑膠再版及一般現場錄影不各自計作新原曲。

內容查核與來源表見 [research/song-catalog/report.md](research/song-catalog/report.md)。此次驗收見 [docs/full-catalog-launch.md](docs/full-catalog-launch.md)。所有外部連結需定期人工確認。

`pnpm-workspace.yaml` 僅允許 Astro/Vite 需要的 esbuild 安裝腳本，修正 pnpm 11 乾淨安裝時的拒絕建置錯誤；並未新增依賴或第二個專案。

上線前稽核、修正前後結果與剩餘部署事項見 [docs/prelaunch-audit.md](docs/prelaunch-audit.md)。
