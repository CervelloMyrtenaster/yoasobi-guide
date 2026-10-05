import { fullDate } from '../schemas/dates';

export interface LearningText {
  segments: readonly { text: string; reading?: string }[];
  kana: string;
  romaji: string;
  translation: string;
  attribution?: string;
  id?: string;
  vocabularyIds?: readonly string[];
  grammarIds?: readonly string[];
}
export interface LearningNote { id: string; title: string; description: string; occurrences: string }
export interface LyricsDocument {
  catalogKey: string;
  processedOn?: string;
  attribution: string;
  reviewScope: string;
  lines: LearningText[];
  vocabulary: LearningNote[];
  grammar: LearningNote[];
}

const layerNames=['日文原文','振假名／Furigana','全假名讀音','改良式赫本羅馬字','繁體中文逐行翻譯'] as const;
const keyAliases: Record<string,string>={'ano-yume-o-nazotte':'ano-yume-wo-nazotte','mo-sukoshi-dake':'mou-sukoshi-dake',yusha:'yuusha'};
// Older supplied files identify the version by an exact title instead of catalog_key.
const legacyTitles: Readonly<Record<string,string|undefined>>={'あの夢をなぞって (Ballade Ver.)':'ano-yume-ballade'};
export function songIdForLyrics(key: string) { return keyAliases[key]??key; }

/** Keep the supplied text intact; only turn explicit readings into native ruby segments. */
export function parseFurigana(original: string, annotated: string): LearningText['segments'] {
  const segments: {text:string;reading?:string}[]=[];
  let offset=0;
  for(const match of annotated.matchAll(/([\p{Script=Han}々〆ヶヵ]+)（([^（）]+)）/gu)){
    if(match.index>offset)segments.push({text:annotated.slice(offset,match.index)});
    segments.push({text:match[1],reading:match[2]});
    offset=match.index+match[0].length;
  }
  if(offset<annotated.length)segments.push({text:annotated.slice(offset)});
  if(segments.map(s=>s.text).join('')!==original)throw new Error('振假名與日文原文不一致');
  return segments;
}

/** Parse the supplied TXT format at build time, without including local PDF paths in HTML. */
export function parseLyricsDocument(input: string): LyricsDocument {
  const sections=new Map<string,string[]>();
  let current='metadata';
  sections.set(current,[]);
  for(const line of input.replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n').split('\n')){
    const heading=line.match(/^【(.+)】$/);
    if(heading){current=heading[1];if(sections.has(current))throw new Error(`重複區段：${current}`);sections.set(current,[]);}
    else sections.get(current)!.push(line);
  }
  const field=(rows: readonly string[],name: string)=>rows.find(l=>l.startsWith(`${name}：`))?.slice(name.length+1)??'';
  const metadata=sections.get('metadata')!;
  const catalogKey=field(metadata,'catalog_key')||legacyTitles[field(metadata,'歌名')]||'';
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(catalogKey))throw new Error('缺少有效 catalog_key');
  const columns=layerNames.map(name=>{
    const rows=sections.get(name);
    if(!rows)throw new Error(`缺少區段：${name}`);
    const values=new Map<string,string>();
    for(const row of rows){
      if(!row.trim())continue;
      const match=row.match(/^(L\d+)｜(.+)$/);
      if(!match||values.has(match[1]))throw new Error(`無效或重複行號：${name}`);
      values.set(match[1],match[2]);
    }
    return values;
  });
  const ids=[...columns[0].keys()];
  if(!ids.length)throw new Error('歌詞區沒有內容');
  for(const column of columns)if([...column.keys()].join(',')!==ids.join(','))throw new Error('五層文字行號或順序不一致');
  const parseNotes=(name:string,prefix:string): LearningNote[]=>{
    const notes: LearningNote[]=[];
    for(const row of sections.get(name)??[]){
      const match=row.match(new RegExp(`^(${prefix}\\d+)｜(.+)$`));
      if(match){
        if(notes.some(n=>n.id===match[1]))throw new Error(`筆記 ID 重複：${match[1]}`);
        const fields=match[2].split('｜');
        notes.push({id:match[1],title:fields.shift()!,description:fields.join('｜'),occurrences:''});
      }else if(row.trim()){
        const note=notes.at(-1);if(!note)throw new Error(`筆記缺少 ID：${name}`);
        if(row.startsWith('出現座標：'))note.occurrences=row.slice(5);
        else note.description+=`\n${row}`;
      }
    }
    return notes;
  };
  const vocabulary=parseNotes('歌詞單字筆記','V');
  const grammar=parseNotes('歌詞文法筆記','G');
  const integrated=new Map<string,string[]>();
  let lineId='';
  for(const row of sections.get('逐行整合對照')??[]){
    const match=row.match(/^(L\d+)｜來源PDF頁：/);
    if(match){lineId=match[1];if(integrated.has(lineId))throw new Error(`整合行號重複：${lineId}`);integrated.set(lineId,[]);}
    else if(lineId)integrated.get(lineId)!.push(row);
  }
  if([...integrated.keys()].join(',')!==ids.join(','))throw new Error('整合對照行號不一致');
  const header=sections.get('歌詞學習內容：使用者提供PDF')??[];
  const processedOn=field(header,'處理日');
  if(processedOn&&!fullDate.safeParse(processedOn).success)throw new Error('無效處理日期');
  for(const note of [...vocabulary,...grammar]){
    for(const ref of note.occurrences.match(/L\d+/g)??[]){
      if(!columns[0].has(ref))throw new Error(`筆記出現句不存在：${note.id} → ${ref}`);
    }
  }
  const readRefs=(rows:string[],name:string,prefix:string,notes:LearningNote[])=>{
    const refs=field(rows,name).match(new RegExp(`${prefix}\\d+`,'g'))??[];
    for(const ref of refs)if(!notes.some(n=>n.id===ref))throw new Error(`筆記參照缺漏：${ref}`);
    return [...new Set(refs)];
  };
  const lines=ids.map(id=>{
    const row=integrated.get(id)!;
    const values=columns.map(column=>column.get(id)!);
    for(const [index,name] of ['日文原文','振假名','全假名','羅馬字','繁中翻譯'].entries())if(field(row,name)!==values[index])throw new Error(`${id} 整合對照與${name}不一致`);
    return {id,segments:parseFurigana(values[0],values[1]),kana:values[2],romaji:values[3],translation:values[4],
      vocabularyIds:readRefs(row,'單字ID','V',vocabulary),grammarIds:readRefs(row,'文法ID','G',grammar)};
  });
  return {catalogKey,processedOn:processedOn||undefined,lines,vocabulary,grammar,
    attribution:header.length?`${field(header,'原PDF署名')}。${field(header,'譯文來源')}`:'使用者提供的逐行學習 TXT；檔案未列譯者署名。',
    reviewScope:field(header,'審校範圍')||'本站檢查行號、五層文字對齊及筆記引用；未另行與音源逐字審校或進行譯文語義全審。'};
}
