/** Only known, same-origin pages can become a return destination. */
export function returnContext(value: string | null, origin: string, base: string, allowed: string[]) {
  if (!value || value.length > 1800 || /[\\\u0000-\u001f]/.test(value)) return null;
  try {
    const url = new URL(value, origin);
    if (url.origin !== origin || url.username || url.password || !url.pathname.startsWith(base) || !allowed.includes(url.pathname)) return null;
    if (url.hash && !/^#[a-z0-9-]+$/.test(url.hash)) return null;
    url.searchParams.delete('from');
    return url.pathname + url.search + url.hash;
  } catch { return null; }
}
export function withContext(destination: string, from: string) {
  const url = new URL(destination, 'https://context.invalid');
  url.searchParams.set('from', from);
  return url.pathname + url.search + url.hash;
}
