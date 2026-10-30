# 2026-10-30 本機更新驗證

未 commit、push 或部署 GitHub Pages。

## 自動檢查

- pnpm check：88 個檔案，0 errors / warnings / hints。
- pnpm test：50 / 50 通過。
- pnpm build：446 頁。
- pnpm test:static：27,228 個站內資源／連結引用、14,494 個錨點引用，0 unresolved。
- JavaScript：15 個檔案，17,803 bytes；gzip 9,165 bytes，與更新前一致。
- /yoasobi-guide/ 子路徑、canonical、sitemap、.nojekyll、自訂 404 檢查通過。

## HTTP 頁面驗證

正式預覽：http://127.0.0.1:4341/yoasobi-guide/

- /：HTTP 200；必要更新內容皆存在。
- songs/：HTTP 200；必要更新內容皆存在。
- songs/sakihokore/：HTTP 200；必要更新內容皆存在。
- releases/：HTTP 200；必要更新內容皆存在。
- releases/sakihokore/：HTTP 200；必要更新內容皆存在。
- history/：HTTP 200；必要更新內容皆存在。
- new-works/：HTTP 200；必要更新內容皆存在。
- about/：HTTP 200；必要更新內容皆存在。
- eras/：HTTP 200；必要更新內容皆存在。
- live/：HTTP 200；必要更新內容皆存在。
- live/prepare/：HTTP 200；必要更新內容皆存在。
- songs/umi-no-manimani/：HTTP 200；必要更新內容皆存在。
- history/history-0311/：HTTP 200；必要更新內容皆存在。
- japanese-learning/：HTTP 200；必要更新內容皆存在。

## 學習內容完整性

39 份學習檔逐行比對原文、讀音、羅馬拼音、譯文及筆記 ID，通過。
〈咲き誇れ〉：61 句、91 項單字筆記、21 項文法筆記。來源檔不改寫。

## 瀏覽器驗證

待完成。computer-use 自動審核拒絕還原目前唯一的 Edge 視窗，因其正在顯示私人 Outlook 郵件，可能讀取與網站驗證無關的資訊。未繞過此限制；已請使用者在獨立視窗開啟本機預覽。

HTTP 與靜態 HTML 驗證不能替代視覺、學習控制、偏好保存或影片播放的瀏覽器實測。

## 全站 HTTP 資源

501 個已建置頁面／靜態資源 HEAD 回應全部 200；不存在的頁面回應 404。
