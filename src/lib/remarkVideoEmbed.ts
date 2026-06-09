// ──────────────────────────────────────────────────────────────────────────
// remark plugin: turn a YouTube/Vimeo URL on its own line into a responsive,
// lazy-loaded iframe. Lets editors embed video by simply pasting a URL — no
// MDX, no component import, works in plain .md.
//
// It only touches top-level paragraphs whose sole content is a single video
// URL (GFM autolinks bare URLs to a `link` node; a raw `text` URL is handled
// too). The src is rebuilt from the parsed id only — the original URL is never
// echoed into markup — and ids are charset-validated, so there's no injection
// surface. NOT for self-hosted video.
// ──────────────────────────────────────────────────────────────────────────

/** Build an embed `src` (+ provider) from a watch/share URL, or null if unsupported. */
function toEmbedSrc(rawUrl: string): string | null {
  let u: URL;
  try {
    u = new URL(rawUrl);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, '');
  const safeId = (id: string | undefined, re: RegExp) =>
    id && re.test(id) ? id : null;

  // ── YouTube ──────────────────────────────────────────────────────────
  if (host === 'youtube.com' || host === 'm.youtube.com') {
    let id = u.searchParams.get('v') ?? undefined;
    if (!id) {
      const m = u.pathname.match(/^\/(?:embed|shorts|v)\/([^/?#]+)/);
      if (m) id = m[1];
    }
    const ok = safeId(id, /^[A-Za-z0-9_-]+$/);
    return ok ? `https://www.youtube-nocookie.com/embed/${ok}` : null;
  }
  if (host === 'youtu.be') {
    const ok = safeId(u.pathname.slice(1).split(/[/?#]/)[0], /^[A-Za-z0-9_-]+$/);
    return ok ? `https://www.youtube-nocookie.com/embed/${ok}` : null;
  }

  // ── Vimeo ────────────────────────────────────────────────────────────
  if (host === 'vimeo.com') {
    const parts = u.pathname.split('/').filter(Boolean);
    const id = safeId(parts[0], /^\d+$/);
    if (!id) return null;
    const hash = safeId(parts[1], /^[A-Za-z0-9]+$/);
    return `https://player.vimeo.com/video/${id}${hash ? `?h=${hash}` : ''}`;
  }
  if (host === 'player.vimeo.com') {
    const m = u.pathname.match(/^\/video\/(\d+)/);
    return m ? `https://player.vimeo.com/video/${m[1]}` : null;
  }

  return null;
}

/** Wrap an embed src in the responsive, lazy-loaded iframe markup. */
function iframeHtml(src: string): string {
  return (
    '<div class="video-embed">' +
    `<iframe class="video-embed__iframe" src="${src}" title="Embedded video" loading="lazy" ` +
    'frameborder="0" referrerpolicy="strict-origin-when-cross-origin" ' +
    'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
    'allowfullscreen></iframe></div>'
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/** remark plugin — replaces lone-URL paragraphs with embed HTML. */
export function remarkVideoEmbed() {
  return (tree: any) => {
    const children: any[] = tree.children ?? [];
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (node.type !== 'paragraph' || !Array.isArray(node.children)) continue;

      // Ignore whitespace-only text nodes; the paragraph must be ONE url node.
      const meaningful = node.children.filter(
        (c: any) => !(c.type === 'text' && c.value.trim() === ''),
      );
      if (meaningful.length !== 1) continue;

      const only = meaningful[0];
      const url =
        only.type === 'link'
          ? only.url
          : only.type === 'text'
            ? only.value.trim()
            : null;
      if (!url) continue;

      const src = toEmbedSrc(url);
      if (!src) continue;

      children[i] = { type: 'html', value: iframeHtml(src) };
    }
  };
}
