import { parseLyricsDocument, songIdForLyrics, type LearningText, type LyricsDocument } from '../lib/lyrics';
export type { LearningText } from '../lib/lyrics';

// Build-only import: the source TXT/PDF metadata never enters the client JavaScript bundle.
const files=import.meta.glob<string>('../../lyrics/*.txt',{query:'?raw',import:'default',eager:true});
const documents: Record<string,LyricsDocument>={};
for(const [filename,text] of Object.entries(files)){
  try{
    const document=parseLyricsDocument(text);
    const id=songIdForLyrics(document.catalogKey);
    if(documents[id])throw new Error(`歌曲對應重複：${id}`);
    documents[id]=document;
  }catch(error){throw new Error(`日語學習檔解析失敗：${filename}`,{cause:error});}
}
export const songLyrics: Readonly<Record<string,LyricsDocument|undefined>>=documents;

/** Original teaching sentence, not a quotation from any YOASOBI song. */
export const originalPractice: LearningText = {
  segments: [
    {text:'音楽',reading:'おんがく'},{text:'を'},{text:'聴',reading:'き'},
    {text:'きながら、'},{text:'日本語',reading:'にほんご'},{text:'を'},
    {text:'学',reading:'まな'},{text:'びます。'},
  ],
  kana:'おんがくをききながら、にほんごをまなびます。',
  romaji:'Ongaku o kikinagara, nihongo o manabimasu.',
  translation:'一邊聽音樂，一邊學習日語。',
  attribution:'本站原創日語練習句，並非歌曲歌詞。',
};
