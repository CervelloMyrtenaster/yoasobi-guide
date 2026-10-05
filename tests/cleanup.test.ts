import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSearch, normalizeSongSearch } from '../src/lib/search';
import { assertAcyclicReferences, assertBidirectionalReferences } from '../src/lib/references';

test('archive search preserves its width/case, accents, punctuation and whitespace policy', () => {
  assert.equal(normalizeSearch('ＹＯＡＳＯＢＩ ｶﾞ 怪物 群青'), 'yoasobi ガ 怪物 群青');
  assert.equal(normalizeSearch('Gunjō／THE BOOK 3'), 'gunjō/the book 3');
  assert.equal(normalizeSearch('  RIAJ  '), '  riaj  ');
  assert.notEqual(normalizeSearch('Gunjō'), normalizeSearch('Gunjo'));
});

test('song catalog keeps its distinct accent-insensitive Romaji behavior', () => {
  assert.equal(normalizeSongSearch('ＧＵＮＪŌ'), normalizeSongSearch('gunjo'));
  assert.equal(normalizeSongSearch('Taishō Roman'), normalizeSongSearch('TAISHO ROMAN'));
  assert.equal(normalizeSongSearch('群青／我推的孩子'), '群青/我推的孩子');
  assert.equal(normalizeSongSearch('ガ'), 'カ'); // Existing NFKD behavior, not a new phonetic policy.
});

test('reference validation accepts shared prerequisites and valid song/release links', () => {
  assert.doesNotThrow(()=>assertAcyclicReferences(new Map([
    ['core',[]],['two-hours',['core']],['three-days',['core','two-hours']],
  ]),'路線'));
  assert.doesNotThrow(()=>assertBidirectionalReferences(
    new Map([['song',['ep-a','ep-b']],['standalone',[]]]),
    new Map([['ep-a',['song']],['ep-b',['song']]]),'收錄',
  ));
});

test('self references, indirect cycles and missing prerequisites fail before rendering', () => {
  assert.throws(()=>assertAcyclicReferences(new Map([['self',['self']]]),'版本'),/self → self/);
  assert.throws(()=>assertAcyclicReferences(new Map([['a',['b']],['b',['c']],['c',['a']]]),'路線'),/a → b → c → a/);
  assert.throws(()=>assertAcyclicReferences(new Map([['route',['missing']]]),'路線'),/找不到參照：missing/);
});

test('missing reciprocal release membership and orphan targets are rejected in both directions', () => {
  for(const [songs,releases] of [
    [new Map([['song',['ep']]]),new Map([['ep',[]]])],
    [new Map([['song',[]]]),new Map([['ep',['song']]])],
    [new Map([['song',['missing']]]),new Map<string,string[]>()],
    [new Map<string,string[]>(),new Map([['ep',['missing']]])],
  ]) assert.throws(()=>assertBidirectionalReferences(songs,releases,'收錄'),/雙向參照不一致/);
});
