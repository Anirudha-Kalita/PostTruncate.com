// ──────────────────────────────────────────────────────────────────────────
// Translation dictionary shape. `en.ts` is the canonical implementation; every
// other locale file implements this exact interface, so a missing or misspelt
// key is a TypeScript error rather than a silent English fallback at runtime.
//
// Conventions:
//  • Strings with runtime values hold {named} tokens filled by interp() —
//    e.g. "{n} / {limit}". Keep tokens identical across every locale.
//  • Plural is { one, other }; the component picks by count (English-style
//    binary plural — adequate for these short UI strings across our locales).
//  • Brand names (PostTruncate, LinkedIn, X, Threads, Instagram, Facebook) are
//    intentionally NOT translated and live in markup, not here.
// ──────────────────────────────────────────────────────────────────────────

export interface Plural {
  one: string;
  other: string;
}

/** A platform guide card: heading, mono tag, prose, and three fact rows. */
export interface GuideEntry {
  name: string;
  tag: string;
  body: string;
  /** Exactly three [label, value] rows. */
  facts: [string, string][];
}

export interface FaqEntry {
  q: string;
  a: string;
}

/**
 * One headed block of the long-form SEO copy: an `<h2>` heading plus body
 * paragraphs. Paragraphs may contain inline `<strong>` keyword markup, so they
 * are rendered with `set:html`. Brand names (PostTruncate, X, Instagram, …)
 * stay untranslated inside the markup.
 */
export interface SeoSection {
  /** Heading text — plain (may include brand glyphs like 𝕏 and a literal "&"). */
  heading: string;
  /** Body paragraphs, each allowed to carry inline <strong> markup. */
  paragraphs: string[];
}

export interface FooterColumn {
  title: string;
  /** Link labels in render order; hrefs are wired in the component. */
  links: string[];
}

/**
 * A standalone informational page built from headed prose sections. `privacy`,
 * `terms`, and `about` all share this shape — a title, a lede intro paragraph,
 * and an ordered list of `SeoSection` blocks (each an `<h2>` + `set:html`
 * paragraphs). Brand names and the contact email stay untranslated in markup.
 */
export interface ContentPage {
  /** Page `<h1>` + document/OG title. */
  title: string;
  /** One-line meta description for this page. */
  description: string;
  /** Lede paragraph under the title. */
  intro: string;
  sections: SeoSection[];
}

/** The contact page: a lede, a message form, and an email/social fallback. */
export interface ContactPage {
  title: string;
  description: string;
  intro: string;
  form: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    /** Shown on the button while the async POST is in flight. */
    sending: string;
    /** Inline confirmation after a successful submit. */
    success: string;
    /** Inline error if the submit fails (network / service down). */
    error: string;
  };
  /** Heading + body for the "or just email us" fallback block. */
  altHeading: string;
  /** Body copy — "{email}" token is filled with the contact address. */
  altBody: string;
}

/**
 * One error page (404 / 500). Rendered through the shared ErrorPage component.
 * `title`/`description` drive <title> + meta; `heading`/`body`/`cta` are the
 * on-page copy. Brand names stay untranslated. No <strong> markup — these are
 * plain text, swapped client-side by the locale-detect script.
 */
export interface ErrorPageStrings {
  /** Big numeral aside, e.g. "404" — kept here so it could localize digits. */
  code: string;
  /** Document/OG title (brand suffix added in markup). */
  title: string;
  /** Meta description for the error page. */
  description: string;
  /** On-page <h1>. */
  heading: string;
  /** Reassuring body line under the heading. */
  body: string;
  /** "Back to the editor" CTA label. */
  cta: string;
}

/**
 * Strings consumed by the Preact islands. Split out from the rest because this
 * sub-object — and only this sub-object — is serialized into the client island
 * props, so it must stay free of any server-only values.
 */
export interface IslandStrings {
  dashboard: {
    loadSample: string;
    /** Demo post injected by "Load a sample"; URL kept verbatim. */
    sample: string;
  };
  workspace: {
    eyebrow: string;
    title: string;
    badgeEditor: string;
    hiddenBadge: Plural;
    placeholder: string;
    counters: {
      characters: string;
      words: string;
      lines: string;
      paragraphs: string;
    };
    timers: {
      reading: string;
      speaking: string;
      lessThan30Sec: string;
      minute: Plural;
      second: Plural;
    };
    formatterLabel: string;
    uppercase: string;
    lowercase: string;
    titleCase: string;
    sentenceCase: string;
    emojiStripper: string;
    hashtagExtractor: string;
    engineLabel: string;
    clean: string;
    sanitize: string;
    clear: string;
    /** "{codes}" → comma-joined code points. */
    hiddenWarning: string;
  };
  common: {
    profileName: string;
    handle: string;
    /** "{n} chars" under each tweet/post card. */
    charsSuffix: string;
  };
  sms: {
    eyebrow: string;
    title: string;
    characterCount: string;
    charactersLeft: string;
    parts: string;
    encoding: string;
    encodingGsm: string;
    encodingUnicode: string;
    /** "{n}" SMS segment count. */
    partsValue: string;
    gsmNote: string;
    unicodeNote: string;
  };
  linkedin: {
    title: string;
    viewAriaLabel: string;
    viewDesktop: string;
    viewMobile: string;
    badgeTruncated: string;
    badgeOverLimit: string;
    badgeSafe: string;
    /** "{total} / {limit} before fold". */
    beforeFold: string;
    /** "{total} / {limit} post limit". */
    postLimit: string;
    seeMore: string;
    profileMeta: string;
    placeholder: string;
    /** "{limit}", "{excess}". */
    overLimitNote: string;
    /** "{limit}". */
    truncatedNote: string;
    /** "{view}" → translated desktop/mobile label. */
    safeNote: string;
  };
  twitter: {
    title: string;
    badgeIdle: string;
    /** "{n}-tweet thread". */
    badgeThread: string;
    badgeSingle: string;
    /** "{n}" links · "{weight}" each. */
    links: Plural;
    weightedLength: string;
    /** "{limit}". */
    placeholder: string;
  };
  threads: {
    title: string;
    badgeIdle: string;
    /** "{n}-post chain". */
    badgeThread: string;
    badgeSingle: string;
    /** "{n}" links counted in full. */
    links: Plural;
    charLength: string;
    /** "{limit}". */
    placeholder: string;
  };
  meta: {
    title: string;
    badgeNeedsFix: string;
    badgeClean: string;
    badgeCaptionOver: string;
    /** "{total} / {limit} caption cap". */
    captionLimit: string;
    /** "{limit}", "{excess}". */
    captionOver: string;
    hashtagLabel: string;
    /** "{limit}" hard limit · remove "{excess}". */
    over: string;
    approaching: string;
    within: string;
    none: string;
    a11yLabel: string;
    /** "{n} flagged". */
    flagged: string;
    flaggedNone: string;
    /** "{n}" pseudo-Unicode characters. */
    fancyDetected: Plural;
    fancyClean: string;
    /** "{n}" characters · Facebook/Instagram caps. */
    footnote: string;
  };
  keywords: {
    eyebrow: string;
    title: string;
    badgeIdle: string;
    badgeStuffing: string;
    badgeBalanced: string;
    colKeyword: string;
    colUses: string;
    colDensity: string;
    /** Row flag on keywords over the density threshold. */
    overused: string;
    /** Shown before any rankable words exist. */
    empty: string;
    /** "{threshold}" — warning shown when a keyword is over the limit. */
    stuffingNote: string;
    /** "{total}" total words · "{threshold}" flag line. */
    footnote: string;
  };
  seoPreview: {
    /** Card header large title. */
    eyebrow: string;
    /** Card header subtitle (function label). */
    title: string;
    badgeIdle: string;
    badgeSafe: string;
    badgeWarn: string;
    /** Input label for the page title field. */
    titleLabel: string;
    /** "{n} / {limit}" — character counter caption. */
    titleCounter: string;
    /** "~{px}px · Google clips at ~{max}px" — pixel-width progress bar label. */
    pixelNote: string;
    /** Over-char-limit warning. "{limit}" token. */
    titleOverChar: string;
    /** Over-pixel-limit warning (only shown when char count is within limit). "{max}" token. */
    titleOverPixel: string;
    /** Input label for the meta description field. */
    descLabel: string;
    /** "{n} / {limit}" — character counter caption. */
    descCounter: string;
    /** Over-char-limit warning for description. "{limit}" token. */
    descOverChar: string;
    /** Section heading above the live SERP card. */
    previewLabel: string;
    titlePlaceholder: string;
    descPlaceholder: string;
  };
  readability: {
    /** Card header large title (e.g., "Readability"). */
    eyebrow: string;
    /** Card header subtitle — formula name (e.g., "Flesch Reading Ease"). */
    title: string;
    /** Label under the Flesch Ease score stat tile. */
    scoreLabel: string;
    /** Label under the Flesch-Kincaid Grade Level stat tile. */
    gradeLabel: string;
    /** Plain-language descriptors keyed by score band. */
    descriptors: {
      veryEasy: string;
      easy: string;
      fairlyEasy: string;
      standard: string;
      fairlyDifficult: string;
      difficult: string;
      veryDifficult: string;
    };
    /** Native browser tooltip / aria-label on the ℹ info icon. */
    tooltip: string;
    /**
     * Shown instead of scores for ja / zh locales where the Flesch formula
     * does not apply to the writing system.
     */
    notApplicable: string;
  };
  /** Strings for the stripped-down embeddable widget at /[lang]/embed/. */
  embed: {
    placeholder: string;
    /** Label under the character count stat tile. */
    charCount: string;
    /** Label under the word count stat tile. */
    wordCount: string;
    /** "{n} remaining" — shown when within the platform limit. */
    remaining: string;
    /** "{n} over" — shown when the character limit is exceeded. */
    overLimit: string;
    /** Platform selector button labels. */
    platforms: {
      twitter: string;
      linkedin: string;
      threads: string;
      instagram: string;
      sms: string;
    };
  };
}

export interface Translations {
  /** SEO + document-level. */
  seo: {
    title: string;
    description: string;
    skipLink: string;
  };
  nav: {
    brandAria: string;
    homeAria: string;
    links: { editor: string; guides: string; faq: string; about: string; contact: string };
    cta: string;
    themeToDark: string;
    themeToLight: string;
    /** Language switcher button + panel heading. */
    language: string;
    languageAria: string;
    menuAria: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    primary: string;
    secondary: string;
  };
  workspace: {
    title: string;
    sub: string;
  };
  /**
   * Long-form SEO body below the editor. Four headed sections of keyword copy;
   * paragraphs carry inline <strong> markup and render with set:html.
   */
  seoCopy: {
    /** Accessible label for the wrapping <section>. */
    ariaLabel: string;
    sections: SeoSection[];
  };
  guides: {
    eyebrow: string;
    title: string;
    lede: string;
    /** Keyed by platform id so order/markup stay stable across locales. */
    items: {
      linkedin: GuideEntry;
      twitter: GuideEntry;
      threads: GuideEntry;
      instagram: GuideEntry;
      facebook: GuideEntry;
    };
  };
  hookband: {
    eyebrow: string;
    title: string;
    body: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqEntry[];
  };
  footer: {
    homeAria: string;
    tag: string;
    columns: {
      tool: FooterColumn;
      platforms: FooterColumn;
      learn: FooterColumn;
      legal: FooterColumn;
      guides: FooterColumn;
    };
    /** "{year}". */
    copyright: string;
    disclaimer: string;
  };
  /**
   * Standalone informational routes (/{lang}/privacy/, /terms/, /about/,
   * /contact/). Each renders through the shared Layout as its own HTML page.
   */
  pages: {
    /** Strings shared by every standalone page. */
    common: {
      /** "{date}" → the last-updated date for the legal pages. */
      lastUpdated: string;
      lastUpdatedDate: string;
      backHome: string;
    };
    privacy: ContentPage;
    terms: ContentPage;
    about: ContentPage;
    contact: ContactPage;
  };
  /**
   * Error pages (404 / 500). Served as single root-level files for every
   * language, so all locales' copy ships in the page and the visitor's
   * language is selected client-side.
   */
  /**
   * Copy for the embed-widget landing page at /[lang]/embed-widget/.
   * Explains the embeddable character counter, shows a live preview, and
   * lets visitors copy the one-line iframe snippet.
   */
  embedWidget: {
    /** Document <title>. */
    title: string;
    /** Meta description. */
    description: string;
    /** Small mono eyebrow label (e.g. "Free embed"). */
    eyebrow: string;
    /** Page <h1>. */
    heading: string;
    /** Intro paragraph under the heading. */
    lede: string;
    /** Heading above the live iframe preview. */
    previewLabel: string;
    /** Copy-button default label. */
    copyButton: string;
    /** Copy-button label shown for 2 s after a successful copy. */
    copiedButton: string;
    /** Heading above the code snippet. */
    codeLabel: string;
    /** Heading above the three audience paragraphs. */
    audienceHeading: string;
    /** Paragraph addressed at bloggers / content creators. */
    forBloggers: string;
    /** Paragraph addressed at educators / course authors. */
    forEducators: string;
    /** Paragraph addressed at developers. */
    forDevelopers: string;
    /** Short link text used in the homepage hero (e.g. "Embed on your site →"). */
    homepageLinkLabel: string;
  };
  errors: {
    notFound: ErrorPageStrings;
    serverError: ErrorPageStrings;
  };
  island: IslandStrings;
}
