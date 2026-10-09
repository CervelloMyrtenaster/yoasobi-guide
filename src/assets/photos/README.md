# 照片來源與授權

來源與授權於 2026-10-09 核對。前台圖說與署名集中於 `src/data/photos.ts`；圖片隨靜態網站部署，不使用外部圖片熱連結。

| 本地檔案 | 作者 | 檔案來源 | 授權 |
| --- | --- | --- | --- |
| yoasobi-empire-state-2026.jpg | Colleen Sturtevant | [Yoasobi.jpg](https://commons.wikimedia.org/wiki/File:Yoasobi.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| ayase-podcast-2026.jpg | GOLDNRUSH PODCAST | [Ayase YOASOBI 2026.png](https://commons.wikimedia.org/wiki/File:Ayase_YOASOBI_2026.png) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| ikura-wembley-2025.jpg | DimensionalFusion | [Ikura at YOASOBI London.jpg](https://commons.wikimedia.org/wiki/File:Ikura_at_YOASOBI_London.jpg) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

- 團體合照：檔案頁標示 2026-06-26，拍攝地點為紐約帝國大廈。
- Ayase：2026 年 GOLDNRUSH PODCAST 訪談影片截圖，原影片為 <https://www.youtube.com/watch?v=-4qMryPyN7I>。檔案頁標示日期為 2026-09-13；本站不將此日期推定為實際錄影日期。
- ikura：檔案頁標示 2025-06-09，為倫敦 Wembley Arena 演出照片。

處理方式：依原始比例縮圖、壓縮為 JPEG；Ayase 的 PNG 截圖另轉為 JPEG。三張圖片均未裁切或修飾人物。Astro 在建置時另產生 280 / 560 / 840 px 的 WebP 版本。

上述授權各自適用於對應原圖、本地處理版本與建置輸出的圖片，不代表整個網站採用同一授權。團體合照及其處理版本沿用 CC BY-SA 4.0；兩張成員影像沿用 CC BY 4.0。前台保留作者、來源、授權連結與修改說明。

## LIVE 與活動影像補充（2026-10-09）

| 本地檔案 | 作者 | 檔案來源 | 授權 |
| --- | --- | --- | --- |
| ikura-seattle-monochrome-2026.jpg | David Lee | [20260812 Yoasobi in Seattle.jpg](https://commons.wikimedia.org/wiki/File:20260812_Yoasobi_in_Seattle.jpg) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| ikura-seattle-color-2026.jpg | David Lee | [20260812 Yoasobi.jpg](https://commons.wikimedia.org/wiki/File:20260812_Yoasobi.jpg) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| simple-life-taipei-2023.jpg | 三立娛樂星聞 | [Yoasobi's live show in Taiwan.jpg](https://commons.wikimedia.org/wiki/File:Yoasobi%27s_live_show_in_Taiwan.jpg) | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| white-house-dinner-2024.jpg | 内閣官房内閣広報室 | [Fumio Kishida visit to the United States 20240410 27.jpg](https://commons.wikimedia.org/wiki/File:Fumio_Kishida_visit_to_the_United_States_20240410_27.jpg) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

- 西雅圖：兩張照片均標示 2026-08-12，由 David Lee 提供，Commons 的 Flickr 授權審查確認 CC BY 4.0。原始相片分別為 [黑白照片](https://www.flickr.com/photos/davidjlee/55460386417/)與[彩色照片](https://www.flickr.com/photos/davidjlee/55460386432/)。日期與本站 `history-0129` 的北美巡演西雅圖場次相符；不從照片推測當時演唱的歌曲。黑白照片本身即為黑白，本站未另改色。
- 台灣：採用三立娛樂星聞[報導影片](https://www.youtube.com/watch?v=Zf89nkK_CBU)的既有截圖，Commons 於 2024-03-31 完成 CC BY 3.0 授權審查。來源檔案日期為 2023-12-04，而[官方簡單生活節日程](https://www.yoasobi-music.jp/live/51264)與本站 `history-0221` 為 2023-12-03。前台及本紀錄均保留差異，不把檔案日期推定為拍攝日期，也不更動已核對的演出日期。
- 白宮：2024-04-10 的晚宴全景，Commons 原始來源為日本首相官邸影像，標示日本政府標準利用規約 2.0 與相容的 CC BY 4.0。Ayase 與 Ikuta Lilas 的受邀身份另以[當日白宮賓客名單](https://www.presidency.ucsb.edu/documents/white-house-press-release-white-house-releases-state-dinner-guest-list-3)核對；[記者團報告](https://www.presidency.ucsb.edu/documents/pool-reports-april-10-2024)亦記錄兩人在主桌。此為活動全景，不標註無法辨認的成員座位，不宣稱 YOASOBI 在該晚宴演出。官邸原始頁現已回傳 404，前台保留可讀的 Commons 檔案頁與白宮公文存檔連結。

新增影像均已人工查看。僅等比例縮圖並壓縮為 JPEG，無人物修飾或新裁切，處理版本沿用各自授權。相簿使用 Astro 的響應式 WebP 與原生 lazy loading；總覽選輯採原生 `details` 展開，沒有新增 JavaScript 或依賴。

圖片與場次的對應集中於 `src/data/photos.ts`。倫敦 Wembley 2025-06-09 的既有照片另用於 `history-0177` 與 `wembley-2025-06-09`，共用同一資源及署名，不複製圖片檔案。既有歷史資料、活動狀態、歌單與統計維持原紀錄。

候選的 MMA2024 截圖在 Commons 仍標示待授權審查，本次未採用。
