
export function ssrSafeLocalStorage(): Storage | null {
  if (typeof window !== 'undefined') {
    return localStorage;
  }
  return null;
}