export const learningLayers = ['furigana', 'kana', 'romaji', 'translation'] as const;
export type LearningLayer = typeof learningLayers[number];
export type LearningPreferences = Record<LearningLayer, boolean>;
export const defaultLearningPreferences: Readonly<LearningPreferences> = {
  furigana: true, kana: false, romaji: false, translation: true,
};
export const learningPreferenceKey = 'yoasobi-guide:learning:v1';

export function parseLearningPreferences(value: string | null): LearningPreferences {
  const preferences = { ...defaultLearningPreferences };
  try {
    const parsed: unknown = value === null ? null : JSON.parse(value);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return preferences;
    for (const layer of learningLayers) {
      if (layer in parsed) {
        const value: unknown = Reflect.get(parsed, layer);
        if (typeof value === 'boolean') preferences[layer] = value;
      }
    }
  } catch { /* Invalid or outdated storage must not interrupt reading. */ }
  return preferences;
}

type PreferenceStorage = Pick<Storage, 'getItem' | 'setItem'>;
export function loadLearningPreferences(storage: () => PreferenceStorage): LearningPreferences {
  try { return parseLearningPreferences(storage().getItem(learningPreferenceKey)); }
  catch { return { ...defaultLearningPreferences }; }
}
export function saveLearningPreferences(storage: () => PreferenceStorage, preferences: LearningPreferences): void {
  try { storage().setItem(learningPreferenceKey, JSON.stringify(preferences)); }
  catch { /* Preferences remain usable in this page when storage is unavailable. */ }
}
