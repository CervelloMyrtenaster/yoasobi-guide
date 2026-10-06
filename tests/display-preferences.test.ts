import test from 'node:test';
import assert from 'node:assert/strict';
import { learningSizes, themes, parseLearningSize, parseTheme, readDisplayPreference, writeDisplayPreference, learningSizeKey, themeKey } from '../src/lib/display-preferences';

test('display preferences accept only known values',()=>{
  for(const size of learningSizes)assert.equal(parseLearningSize(size),size);
  for(const theme of themes)assert.equal(parseTheme(theme),theme);
  for(const invalid of [null,undefined,'',{},'LARGE','{"size":"large"}']){
    assert.equal(parseLearningSize(invalid),'standard');
    assert.equal(parseTheme(invalid),'system');
  }
});
test('font size and appearance persist independently and tolerate unavailable storage',()=>{
  const values=new Map<string,string>();
  const storage=()=>({getItem:(key:string)=>values.get(key)??null,setItem:(key:string,value:string)=>{values.set(key,value);}});
  writeDisplayPreference(storage,learningSizeKey,'extra-large');
  writeDisplayPreference(storage,themeKey,'dark');
  assert.equal(readDisplayPreference(storage,learningSizeKey),'extra-large');
  assert.equal(readDisplayPreference(storage,themeKey),'dark');
  const unavailable=()=>{throw new Error('blocked');};
  assert.equal(readDisplayPreference(unavailable,themeKey),null);
  assert.doesNotThrow(()=>writeDisplayPreference(unavailable,learningSizeKey,'large'));
});
