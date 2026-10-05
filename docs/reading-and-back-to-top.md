# 回頂端與日語閱讀控制

2026-10-04。保留既有 routes、song schema、編輯文字、影片和 marumaru 連結。

## 全站回頂端

`BackToTop.astro` 由 `BaseLayout` 載入。頁首完全離開 viewport 才顯示右下角48px按鈕；回頂端後隱藏。IntersectionObserver監看實際header尺寸，不使用固定scroll threshold或持續scroll listener。點擊先將鍵盤焦點移回品牌連結，再smooth scroll；prefers-reduced-motion下使用instant。沒有新dependency或framework hydration。無JS時按鈕不顯示。

## 日語閱讀

`LyricsLearning.astro` 在歌曲既有 `#learning` 區域使用，日文原文一直顯示；四個原生checkbox控制振假名、全假名、Hepburn與繁體中文，初始全部關閉。ruby/rt表示振假名；各語層附lang，勾選後直接顯示內容，不重複顯示layer-label。無JS時details仍能逐項展開，全假名／romaji／翻譯不會遺失。

2026-10-05：接入使用者放置於 `lyrics/` 的38份TXT學習檔。歌曲頁保留來源檔的五層表示、句序、單字與文法，沒有抓取外部歌詞或補寫來源未提供的段落。未有學習檔時仍明確標示原創示範，marumaru入口保留。英文版本保持回到日文原曲；專輯短曲保持無日語歌詞區。

文字與UI分離於 `lyrics/*.txt`、`src/data/lyrics-learning.ts` 與 `src/lib/lyrics.ts`，沒有改既有歌曲資料庫模型。TXT以build-only raw import讀入，只有頁面需要的HTML輸出，不把原始TXT/PDFmetadata打包進client JS。`songLyrics` 以既有song ID索引；catalog_key的三個既有拼字差異有明確alias，英文版不沿用日文歌詞。

解析器檢查五個區段行號與順序、整合對照一致性、ruby原文重組、筆記ID、筆記返回行與有效處理日期。失敗會中止build並指出檔案，而不是悄悄忽略。不存在的歌曲也會在song route建置時拋錯。讀音與翻譯依提供檔案，沒有與官方音源作逐字或譯文語義全審。

`/japanese-learning/`新增由同一份資料推導的38首入口；歌曲學習區有逐行／單字／文法／來源段落導覽，句子與筆記可雙向跳轉。native details與共用BaseLayout hash reveal讓收合筆記在跳轉時自動展開。輔助閱讀沒有layer-label，四個checkbox獨立作用，日文常駐。舊版Ballade檔未列catalog_key，以明確歌名對應到ano-yume-ballade，不混入原曲頁。

## 2026-10-05 驗證結果

- 38份TXT／1,600句／2,167項單字／556項文法。逐頁比對全部原文重組與輔助表示，保留來源文字，無自行補寫。資料統計見 `docs/validation/lyrics-learning.json`。
- `pnpm check`：0 errors／warnings／hints；`pnpm test`：34 pass；`pnpm build`：423 pages；`pnpm test:static`：25,111內部引用／13,824段落引用，0 unresolved。
- 實際production preview測試：Idol初始全部輔助層隱藏，四層可独立勾選／取消；筆記連結自動展開，返回行號正確；38個學習索引入口生成；Ballade連到其28句改編版學習檔。英文版及尚未提供檔案的歌曲降級正確。
- 390／768／1440 px全部輔助層開啟仍無水平overflow，checkbox label高44px，console無warn／error；原有MV與回頂端保留。瀏覽器測試不等同對檔案讀音或譯文的語義審校。
- 既有song schema、公開routes、dependencies、GitHub Pages site/base/workflow不變；本輪沒有commit／push／部署。
