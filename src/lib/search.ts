/** Archives retain accents and punctuation, while folding width and case. */
export function normalizeSearch(value: string) {
  return value.normalize('NFKC').toLowerCase();
}

/** Preserve the song catalog's existing accent-insensitive Romaji matching. */
export function normalizeSongSearch(value: string) {
  return value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
}
