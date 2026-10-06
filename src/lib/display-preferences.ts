export const learningSizes = ['standard', 'large', 'extra-large'] as const;
export type LearningSize = typeof learningSizes[number];
export const learningSizeKey = 'yoasobi-guide:learning-size:v1';
export const themeKey = 'yoasobi-guide:theme:v1';
export const themes = ['system', 'light', 'dark'] as const;
export type Theme = typeof themes[number];

type PreferenceStorage = Pick<Storage, 'getItem' | 'setItem'>;
export function parseLearningSize(value: unknown): LearningSize {
  return learningSizes.find(size => size === value) ?? 'standard';
}
export function parseTheme(value: unknown): Theme {
  return themes.find(theme => theme === value) ?? 'system';
}
export function readDisplayPreference(storage: () => PreferenceStorage, key: string): string | null {
  try { return storage().getItem(key); }
  catch { return null; }
}
export function writeDisplayPreference(storage: () => PreferenceStorage, key: string, value: LearningSize | Theme): void {
  try { storage().setItem(key, value); }
  catch { /* The current page still works when storage is unavailable. */ }
}
