/** Format an ISO date-only string (YYYY-MM-DD) for display in a locale. */
export function formatLocaleDate(isoDate: string, lang: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Normalize a date-only string to an ISO 8601 instant for sitemap lastmod. */
export function toLastmodIso(dateOnly: string): string {
  return new Date(`${dateOnly}T00:00:00Z`).toISOString();
}
