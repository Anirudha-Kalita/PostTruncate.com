// Pure helpers for tool-page section anchors — no DOM required.

const H2_RE = /<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi;

export interface SectionAnchor {
  id: string;
  label: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

/** Extract visible text from every <h2> in an HTML fragment, in document order. */
export function extractH2Texts(html: string): string[] {
  const texts: string[] = [];
  const re = new RegExp(H2_RE.source, 'gi');
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    texts.push(stripHtml(match[2]));
  }
  return texts;
}

/** Turn a heading label into a lowercase, URL-safe slug. */
export function slugifyHeading(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[''']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Assign unique slugs; duplicates get a numeric suffix (-2, -3, …). */
export function uniqueSlugs(texts: string[]): string[] {
  const seen = new Map<string, number>();
  return texts.map((text) => {
    const base = slugifyHeading(text) || 'section';
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  });
}

/** Stable slug list derived from the English tool body (canonical for all locales). */
export function buildCanonicalSlugs(enContentHtml: string): string[] {
  return uniqueSlugs(extractH2Texts(enContentHtml));
}

/**
 * Inject stable `id` attributes into <h2> tags and return jump-link metadata
 * using the current locale's heading labels.
 */
export function prepareToolContent(
  contentHtml: string,
  canonicalSlugs: string[],
): { html: string; sections: SectionAnchor[] } {
  const labels = extractH2Texts(contentHtml);
  const sections: SectionAnchor[] = labels.map((label, i) => ({
    id: canonicalSlugs[i] ?? uniqueSlugs([label])[0],
    label,
  }));

  let index = 0;
  const re = new RegExp(H2_RE.source, 'gi');
  const html = contentHtml.replace(re, (full, attrs = '', inner) => {
    const section = sections[index++];
    if (!section) return full;

    const idAttr = `id="${section.id}"`;
    if (/\bid\s*=/.test(attrs)) {
      return full.replace(/\bid\s*=\s*["'][^"']*["']/, idAttr);
    }

    const attrPart = attrs.trim() ? ` ${attrs.trim()}` : '';
    return `<h2${attrPart} ${idAttr}>${inner}</h2>`;
  });

  return { html, sections };
}
