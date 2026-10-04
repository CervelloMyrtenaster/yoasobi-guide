import test from 'node:test';
import assert from 'node:assert/strict';
import { liveStats } from '../src/lib/live-stats';
import type { Concert } from '../src/schemas/content';
const base: Concert = { id: 'test', status: 'published', updatedAt: '2026-10-04', sources: [], title: 'test', date: '2024-01-01', country: 'JP', city: 'test', venue: 'test', eventType: 'solo', eventStatus: 'completed', setlistStatus: 'complete', setlist: [], verifiedAt: '2026-10-04', notes: [] };
const full = { position: 1, songId: 'song', section: 'main' as const, performance: 'full' as const };
test('同曲同場不重複計數，節選另外計數', () => {
  const result = liveStats([{ ...base, setlist: [full, { ...full, position: 2 }] }, { ...base, setlist: [{ ...full, performance: 'medley' }] }], 'song');
  assert.equal(result.total, 2); assert.equal(result.full, 1); assert.equal(result.shortened, 1); assert.equal(result.rate, .5);
});
test('排除不完整、取消、草稿與發行前場次，尊重期間及類型', () => {
  const invalid: Concert[] = [{...base,setlistStatus:'partial'}, {...base,eventStatus:'cancelled'}, {...base,status:'draft'}, {...base,eventType:'festival'}, {...base,date:'2022-01-01'}, {...base,date:'2025-01-01'}];
  const result = liveStats([base,...invalid], 'song', { eventType: 'solo', releasedOn: '2023-01-01', from: '2023-06-01', to: '2024-12-31' });
  assert.equal(result.total, 1); assert.equal(result.full, 0); assert.equal(result.rate, 0);
});
test('無樣本時頻率為 null，非零百分比', () => { assert.equal(liveStats([], 'song').rate, null); });
test('刊載歌名不等於完整演唱或節選，不能產生錯誤頻率',()=>{
  const c={...base,setlist:[{...full,performance:'listed' as const}]};
  const result=liveStats([c,c],'song');
  assert.equal(result.total,2);assert.equal(result.appearances,2);assert.equal(result.unspecified,2);assert.equal(result.full,0);assert.equal(result.shortened,0);assert.equal(result.rate,null);
  assert.equal(liveStats([c],'absent').rate,null);
});
test('不以年／月日期推定演出日或發行後場次', () => {
  assert.equal(liveStats([{...base,date:'2024'},{...base,date:'2024-01'}],'song').total,0);
  assert.equal(liveStats([base],'song',{releasedOn:'2024-01'}).rate,null);
});
