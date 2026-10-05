import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parseFurigana, parseLyricsDocument, songIdForLyrics } from '../src/lib/lyrics';

const folder=new URL('../lyrics/',import.meta.url);
const files=readdirSync(folder).filter(name=>name.endsWith('.txt'));

test('provided learning files retain all five aligned columns and resolve to existing songs',()=>{
  const ids=new Set<string>();
  assert.ok(files.length>0);
  for(const filename of files){
    const document=parseLyricsDocument(readFileSync(new URL(filename,folder),'utf8'));
    const id=songIdForLyrics(document.catalogKey);
    assert.ok(!ids.has(id),`duplicate: ${id}`);ids.add(id);
    assert.ok(readFileSync(new URL(`../src/content/songs/${id}.md`,import.meta.url),'utf8'));
    assert.ok(document.lines.length>0);
    for(const note of [...document.vocabulary,...document.grammar])for(const ref of note.occurrences.match(/L\d+/g)??[])assert.ok(document.lines.some(line=>line.id===ref),`${filename}: ${note.id} → ${ref}`);
  }
});

test('ruby parsing preserves kana, punctuation and literal parentheses while rejecting mismatches',()=>{
  const segments=parseFurigana('音楽を聴きます（例）。','音楽（おんがく）を聴（き）きます（例）。');
  assert.deepEqual(segments,[{text:'音楽',reading:'おんがく'},{text:'を'},{text:'聴',reading:'き'},{text:'きます（例）。'}]);
  assert.throws(()=>parseFurigana('音楽','音（おと）'),/不一致/);
});

test('parser rejects missing columns, duplicate IDs and divergent integrated translations',()=>{
  const text=readFileSync(new URL(files[0],folder),'utf8');
  assert.throws(()=>parseLyricsDocument(text.replace('【全假名讀音】','【別的區段】')),/缺少區段/);
  const first=text.match(/^L001｜.+$/m)![0];
  assert.throws(()=>parseLyricsDocument(text.replace(first,`${first}\n${first}`)),/重複行號/);
  const integrated=text.indexOf('【逐行整合對照】');
  const corrupted=text.slice(0,integrated)+text.slice(integrated).replace(/繁中翻譯：[^\r\n]+/,'繁中翻譯：不一致的測試文字');
  assert.throws(()=>parseLyricsDocument(corrupted),/整合對照/);
});

test('parser rejects broken note return links and impossible processing dates at build time',()=>{
  const text=readFileSync(new URL(files[0],folder),'utf8');
  assert.match(text,/出現座標：[^\r\n]*L\d+/);
  assert.throws(()=>parseLyricsDocument(text.replace(/(出現座標：[^\r\n]*?)L\d+/,'$1L9999')),/筆記出現句不存在/);
  const invalidDate=text.replace('【日文原文】','【歌詞學習內容：使用者提供PDF】\n處理日：2026-02-30\n【日文原文】');
  assert.throws(()=>parseLyricsDocument(invalidDate),/無效處理日期/);
});

test('the supplied legacy Ballade title resolves only to its own arrangement page',()=>{
  const text=readFileSync(new URL('001_あの夢をなぞって (Ballade Ver.).txt',folder),'utf8');
  assert.equal(songIdForLyrics(parseLyricsDocument(text).catalogKey),'ano-yume-ballade');
  assert.throws(()=>parseLyricsDocument(text.replace('歌名：あの夢をなぞって (Ballade Ver.)','歌名：未識別版本')),/catalog_key/);
});
