import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultLearningPreferences, learningPreferenceKey, loadLearningPreferences, parseLearningPreferences, saveLearningPreferences } from '../src/lib/learning-preferences';

test('learning preferences accept only booleans and safely recover invalid storage', () => {
  for (const value of [null, '', '{', 'null', '[]', 'true', '"romaji"']) {
    assert.deepEqual(parseLearningPreferences(value), defaultLearningPreferences);
  }
  assert.deepEqual(parseLearningPreferences('{"furigana":false,"romaji":true,"kana":"true","translation":0}'), {
    furigana:false, romaji:true, kana:false, translation:true,
  });
  assert.equal(defaultLearningPreferences.furigana, true);
});

test('learning choices persist together under one shared key, including Japanese-only', () => {
  const values = new Map<string,string>();
  const storage = () => ({getItem:(key:string)=>values.get(key)??null, setItem:(key:string,value:string)=>{values.set(key,value);}});
  const preferences = {furigana:false, kana:false, romaji:false, translation:false};
  saveLearningPreferences(storage, preferences);
  assert.deepEqual(loadLearningPreferences(storage), preferences);
  assert.equal(values.size, 1);
  assert.ok(values.has(learningPreferenceKey));
});

test('blocked storage never prevents learning or changes default preferences', () => {
  const unavailable = () => { throw new Error('storage unavailable'); };
  assert.deepEqual(loadLearningPreferences(unavailable), defaultLearningPreferences);
  assert.doesNotThrow(()=>saveLearningPreferences(unavailable, {...defaultLearningPreferences}));
});
