import { z } from 'astro/zod';

// ISO date precision is retained: never pad an unknown month or day.
export const isoDate = z.string().regex(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/).refine(value => {
  if (Number(value.slice(0, 4)) < 1) return false;
  if (value.length === 4) return true;
  const month = Number(value.slice(5, 7));
  if (month < 1 || month > 12) return false;
  if (value.length === 7) return true;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}, '請使用有效的 YYYY、YYYY-MM 或 YYYY-MM-DD，保留已知精度');

export const fullDate = isoDate.refine(value => value.length === 10, '查核／更新日期必須為 YYYY-MM-DD');
export function datePrecision(value: string): 'year' | 'month' | 'day' {
  return value.length === 4 ? 'year' : value.length === 7 ? 'month' : 'day';
}
