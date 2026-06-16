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
    /** Demo post injected by "Load a sample" on the homepage; URL kept verbatim. */
    sample: string;
    /**
     * Platform-specific demo posts injected by "Load a sample" on the scoped
     * tool pages. Each is written in that platform's native voice (SMS is short
     * and link-light; LinkedIn is long-form; etc.). URLs kept verbatim.
     */
    samples: {
      linkedin: string;
      twitter: string;
      instagram: string;
      facebook: string;
      threads: string;
      sms: string;
    };
  };
  workspace: {
    eyebrow: string;
    title: string;
    badgeEditor: string;
    hiddenBadge: Plural;
    placeholder: string;
    placeholders: {
      linkedin: string;
      facebook: string;
      instagram: string;
      twitter: string;
      threads: string;
      sms: string;
    };
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
    /** Status line under the editor actions, e.g. "Real-time analysis is on". */
    statusLine: string;
  };
  /**
   * Image upload control in the editor (in-memory preview only — never stored,
   * cleared on reload). Optional while rolling out; falls back to English when a
   * locale has not yet translated it.
   */
  imageUpload?: {
    /** Button label when no image is attached. */
    add: string;
    /** Button label when replacing an attached image. */
    replace: string;
    /** Remove-image button accessible label / tooltip. */
    remove: string;
    /** Helper line under the control. */
    hint: string;
  };
  /**
   * "AI Improve" feature — button, tone picker, progress, and result/error
   * states for the Gemini-backed rewrite. Tone keys mirror lib/aiImprove.ts.
   */
  aiImprove: {
    /** Editor action button label. */
    button: string;
    /** Tone-picker popover heading. */
    pickTone: string;
    /** Short helper line under the heading. */
    pickToneSub: string;
    /** Tone option labels (keys match the Tone union). */
    tones: {
      professional: string;
      casual: string;
      marketing: string;
      friendly: string;
      concise: string;
    };
    /** Cancel button in the tone popover. */
    cancel: string;
    /** Progress-bar label while the rewrite is in flight. */
    improving: string;
    /** Revert button shown after a successful rewrite. */
    undo: string;
    /** Confirmation after Undo restores the previous text. */
    reverted: string;
    /** "{n} of {max} AI improvements left" — remaining-quota line. */
    remaining: Plural;
    /** Shown when the per-window quota is spent. "{time}" → e.g. "11h 59m". */
    limitReached: string;
    /** Generic failure (Gemini error / network). */
    errorGeneric: string;
    /** Editor is empty. */
    errorEmpty: string;
    /** Input exceeds the cap. "{max}" → character limit. */
    errorTooLong: string;
    /** Feature key not configured on the server. */
    errorUnavailable: string;
  };
  /** Single-platform preview switcher (homepage workspace right column). */
  previewPanel: {
    /** Right-column heading, e.g. "Live platform preview". */
    title: string;
    /** Tab accessible name; "{platform}" → brand name. */
    tabAria: string;
    /** Toggle that switches to the all-platforms matrix view. */
    compareAll: string;
    /**
     * Switch label: when on (default), previews show the dimmed text that falls
     * below each platform's "…more" fold; off hides it, leaving just "…more".
     */
    showHidden: string;
  };
  /** Collapsed "Advanced insights" bar beneath the workspace container. */
  insights: {
    title: string;
    sub: string;
    subScoped: string;
  };
  /** Horizontal hook-visibility strip beneath the workspace container. */
  hookStrip: {
    heading: string;
    /** "View all platform limits" link label (arrow appended in markup). */
    viewAll: string;
    /** "{n}" → formatted hard cap, e.g. "3,000 limit". */
    limitLabel: string;
    /** "{n}" → per-segment cap, e.g. "160 per SMS". */
    perSms: string;
    /** Verdict badges — icon + text, never color alone. */
    survives: string;
    cut: string;
    risk: string;
    /** "{n}" → live SMS segment count. */
    smsNeeded: string;
    /** "{n}" → live character count secondary line. */
    chars: string;
  };
  common: {
    /** Author display name shown in every preview card's mock post header. */
    displayName: string;
    /** Bare username (no leading "@"); cards prepend "@" where the platform uses it. */
    handle: string;
    /** Neutral relative timestamp for the mock post header, e.g. "11h". */
    timestamp: string;
    /** "{n} chars" under each tweet/post card. */
    charsSuffix: string;
    /** Engagement-row action labels for the Facebook/LinkedIn mock posts. */
    actions: {
      like: string;
      comment: string;
      share: string;
    };
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
    /** Author headline/subtitle under the name (e.g. "Founder & CEO"). */
    headline: string;
    /** Connection-degree chip shown after the name (e.g. "3rd"). */
    connectionDegree: string;
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
    /** Facebook audience label shown after the timestamp (e.g. "Public"). */
    audiencePublic: string;
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
  /** Contextual links below each platform card header → sub-tool pages. */
  toolLinks: {
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
    threads: string;
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
  /**
   * Hook Visibility panel — does the opening hook (and CTA) survive each
   * platform's "…more" fold. Status pills + one-line reasons are keyed to the
   * analyzer's `verdict` / `reasonCode`; platform names stay untranslated in
   * markup, so the reason strings carry no platform token.
   */
  hook: {
    /** Card header large title. */
    eyebrow: string;
    /** Card header subtitle (function label). */
    title: string;
    /** Status pill — verdict 'pass'. */
    statusPass: string;
    /** Status pill — verdict 'warn'. */
    statusWarn: string;
    /** Status pill — verdict 'fail'. */
    statusFail: string;
    /** Status pill — empty editor (neutral). */
    statusIdle: string;
    /** Reason line — reasonCode 'empty'. */
    reasonEmpty: string;
    /** Reason line — reasonCode 'fits'. */
    reasonFits: string;
    /** Reason line — reasonCode 'hook-cut'. */
    reasonHookCut: string;
    /** Reason line — reasonCode 'cta-below'. */
    reasonCtaBelow: string;
    /** Reason line — reasonCode 'hook-only'. */
    reasonHookOnly: string;
    /** Reason line — reasonCode 'hook-and-cta'. */
    reasonHookAndCta: string;
    /** X specific reason codes */
    xReasonFits: string;
    xReasonHookCut: string;
    xReasonCtaBelow: string;
    xReasonHookOnly: string;
    xReasonHookAndCta: string;
    /** Tiny label on the fold divider drawn inside each preview card. */
    foldLabel: string;
    /** Accessible description of the fold divider. */
    foldAria: string;
    /** Panel summary line. "{pass}" / "{total}" tokens. */
    summary: string;
  };
  /**
   * Standalone utility calculators served under /[lang]/tools/. Each tool's
   * island UI strings live in its own sub-object keyed by the calculator id.
   */
  calculators: {
    /** "Words to Pages" page-count estimator. */
    wordsPerPage: {
      /** Card header large title. */
      eyebrow: string;
      /** Card header subtitle (function label). */
      title: string;
      /** Badge — no input yet. */
      badgeIdle: string;
      /** Badge — a result is shown. */
      badgeResult: string;
      /** Accessible label for the input-mode segmented control. */
      modeAria: string;
      /** Segmented option — paste/type text. */
      modeText: string;
      /** Segmented option — enter a raw word count. */
      modeCount: string;
      /** Textarea placeholder for the paste-text mode. */
      placeholder: string;
      /** Label for the numeric word-count input. */
      wordsLabel: string;
      /** Placeholder for the numeric word-count input. */
      wordsPlaceholder: string;
      /** Font-size selector label. */
      fontSizeLabel: string;
      /** Line-spacing selector label. */
      spacingLabel: string;
      /** Spacing option — single. */
      spacingSingle: string;
      /** Spacing option — 1.5 lines. */
      spacingOneAndHalf: string;
      /** Spacing option — double. */
      spacingDouble: string;
      /** Stat tile label — estimated pages. */
      pagesLabel: string;
      /** Stat tile label — word count. */
      wordsStatLabel: string;
      /** Caption under the result. "{n}" → words-per-page for the current setting. */
      perPageNote: string;
      /** Heading above the quick-reference table. */
      referenceHeading: string;
      /** Reference table column — words. */
      refWordsCol: string;
      /** Reference table column — pages. */
      refPagesCol: string;
      /** Font-family selector label. */
      fontLabel: string;
      /** Page-size selector label (A4 / Letter / Legal). */
      pageFormatLabel: string;
      /** Margins group label. */
      marginsLabel: string;
      /** Margin input labels. */
      marginTop: string;
      marginRight: string;
      marginBottom: string;
      marginLeft: string;
      /** Units selector label. */
      unitsLabel: string;
      /** Unit option — inches. */
      unitInch: string;
      /** Unit option — centimeters. */
      unitCm: string;
      /** Print button label. */
      printButton: string;
    };
    /** "Reading & Speaking Time" estimator. Reuses workspace.timers for the
     *  duration copy (min/sec) and the Reading/Speaking labels. */
    readingTime: {
      eyebrow: string;
      title: string;
      badgeIdle: string;
      badgeResult: string;
      modeAria: string;
      modeText: string;
      modeCount: string;
      placeholder: string;
      wordsLabel: string;
      wordsPlaceholder: string;
      /** Reading-speed selector label. */
      readingSpeedLabel: string;
      /** Speaking-speed selector label. */
      speakingSpeedLabel: string;
      /** Speed preset labels. */
      speedSlow: string;
      speedAverage: string;
      speedFast: string;
      /** Words-per-minute abbreviation (e.g. "wpm"). */
      wpmShort: string;
      /** Word-count stat tile label. */
      wordsStatLabel: string;
      /** Reference table heading + columns. */
      referenceHeading: string;
      refWordsCol: string;
      refReadingCol: string;
      refSpeakingCol: string;
    };
    /** "Byte Counter" — UTF-8 / UTF-16 / UTF-32 byte calculator. */
    byteCounter: {
      eyebrow: string;
      title: string;
      badgeIdle: string;
      badgeResult: string;
      placeholder: string;
      /** Stat tile labels (each includes its "bytes" unit where relevant). */
      utf8Label: string;
      utf16Label: string;
      utf32Label: string;
      charactersLabel: string;
      codePointsLabel: string;
      /** One-line explainer about UTF-8 variable width. */
      note: string;
    };
    /** "Emoji counter & invisible/zero-width character detector". The hidden-char
     *  warning reuses workspace.hiddenWarning ({codes}). */
    emojiDetector: {
      eyebrow: string;
      title: string;
      badgeIdle: string;
      badgeClean: string;
      badgeWarn: string;
      placeholder: string;
      emojiLabel: string;
      charactersLabel: string;
      hiddenLabel: string;
      /** Note shown when no hidden characters are present. */
      cleanNote: string;
      /** Button that strips hidden characters. */
      removeButton: string;
      /** Confirmation after removal. "{n}" → number removed. */
      removedNote: string;
      /** One-line explainer about invisible characters. */
      note: string;
    };
    /** Shared strings for the platform character-counter tools (YouTube, TikTok,
     *  Pinterest, Reddit, Bluesky, Discord, WhatsApp). Brand names stay in the
     *  config (untranslated); these are the chrome + field labels. */
    platformCounter: {
      /** Function-label subtitle under the platform name. */
      title: string;
      badgeIdle: string;
      badgeSafe: string;
      badgeOver: string;
      placeholder: string;
      /** "{n} / {limit}" caption per field. */
      counter: string;
      /** "{n}" characters remaining. */
      remaining: string;
      /** "{n}" characters over the limit. */
      over: string;
      /** Field labels, keyed to CounterFieldKey in platformCounters.ts. */
      fields: {
        title: string;
        description: string;
        caption: string;
        bio: string;
        post: string;
        message: string;
        status: string;
        about: string;
      };
    };
    /** Shared "Clear" button label for the calculator text inputs. */
    clear: string;
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
    links: {
      editor: string;
      guides: string;
      /** "All platform limits" entry shown at the top of the guides dropdown. */
      limits: string;
      /** "Tools" dropdown label — the utility/calculator suite. */
      tools: string;
      /** "Character Counters" dropdown label — the per-platform counters. */
      counters: string;
      faq: string;
      about: string;
      contact: string;
    };
    cta: string;
    themeToDark: string;
    themeToLight: string;
    /** Language switcher button + panel heading. */
    language: string;
    languageAria: string;
    menuAria: string;
    /** Accessible label for the floating back-to-top button. */
    backToTop: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    primary: string;
    secondary: string;
    badge: string;
    /** Muted reassurance line under the hero CTAs (free · private · coverage). */
    trust: string;
  };
  /** Three-step "How it works" explainer on the homepage. Steps must match
      the visible card content exactly — used for both rendering and HowTo JSON-LD. */
  howItWorks: {
    /** Screen-reader-only section heading. */
    heading: string;
    /** Exactly three ordered steps; order matches the on-page cards. */
    steps: [
      { name: string; text: string },
      { name: string; text: string },
      { name: string; text: string },
    ];
  };
  /** Shared strings for /[lang]/[tool]/ sub-tool pages. */
  toolPage: {
    /** Accessible label for the in-page H2 jump navigation. */
    onThisPage: string;
    /** "{date}" → locale-formatted date from tools.ts lastUpdated. */
    lastUpdated: string;
    /** Cross-promo block on standalone platform pages → drives users to the full home editor. */
    crossPromo: {
      heading: string;
      text: string;
      cta: string;
    };
    /**
     * CTA block on calculator/utility tool pages and classic-layout platform pages.
     * Shown above the "Start writing" button to give users context before clicking.
     */
    cta: {
      /** Section heading above the button, e.g. "Ready to check your post?" */
      heading: string;
      /** One-sentence marketing blurb explaining what clicking the button unlocks. */
      blurb: string;
      /** Button label. */
      button: string;
    };
  };
  /** Alt text for site images — logos, platform icons, etc. */
  images: {
    /** Site mark shown beside the wordmark in nav and footer. */
    logoAlt: string;
    /** "{platform}" → localized platform name, e.g. "X / Twitter logo". */
    platformLogo: string;
  };
  /** Labels for BreadcrumbList JSON-LD on tool sub-pages. */
  breadcrumbs: {
    home: string;
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
    /** "View all FAQs" link under the homepage subset (arrow appended in markup). */
    viewAll: string;
    items: FaqEntry[];
  };
  /**
   * Dedicated /[lang]/faq/ page. The Q&A text itself stays in `faq.items`
   * (single source of truth); these are only the page chrome strings.
   * Category labels are keyed by the ids in src/data/faq.ts.
   */
  faqPage: {
    /** Document <title>. */
    title: string;
    /** Meta description. */
    description: string;
    /** Mono eyebrow label above the H1. */
    eyebrow: string;
    /** Page <h1>. */
    heading: string;
    /** Lede paragraph under the heading. */
    lede: string;
    /** Category group headings, keyed by FaqCategoryId. */
    categories: {
      about: string;
      counting: string;
      cleanup: string;
      insights: string;
      privacy: string;
      sms: string;
    };
  };
  /**
   * Dedicated /[lang]/platform-limits/ page: the full limits table plus
   * per-platform truncation rules. All numbers are interpolated from
   * textTools.ts constants — only labels and prose live here.
   */
  limitsPage: {
    /** Document <title>. */
    title: string;
    /** Meta description. */
    description: string;
    /** Mono eyebrow label above the H1. */
    eyebrow: string;
    /** Page <h1>. */
    heading: string;
    /** Lede paragraph under the heading. */
    lede: string;
    /** Limits table column headers. */
    table: {
      caption: string;
      platform: string;
      limit: string;
      foldMobile: string;
      foldDesktop: string;
      notes: string;
    };
    /** "—" cell substitute when a platform has no fold. */
    noFold: string;
    /** Short per-row notes. Numeric tokens are injected from textTools. */
    notes: {
      linkedin: string;
      twitter: string;
      threads: string;
      instagram: string;
      facebook: string;
      smsGsm: string;
      smsUnicode: string;
    };
    /** Heading above the detailed per-platform rule sections. */
    rulesHeading: string;
    /** One detailed truncation-rules paragraph per platform. */
    rules: {
      linkedin: string;
      twitter: string;
      threads: string;
      instagram: string;
      facebook: string;
      sms: string;
    };
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
  /** Cross-promotion section shown on the dedicated Google SERP tool page. */
  serpPage: {
    crossPromo: {
      heading: string;
      editorLink: string;
      platforms: {
        twitter:   { name: string; desc: string };
        instagram: { name: string; desc: string };
        linkedin:  { name: string; desc: string };
        facebook:  { name: string; desc: string };
        threads:   { name: string; desc: string };
        sms:       { name: string; desc: string };
      };
    };
  };
  banner: {
    /** "{platform}" token is replaced with the translated platform name. */
    text: string;
    close: string;
  };
  whyPostTruncate: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    features: {
      realTime: { title: string; desc: string };
      insights: { title: string; desc: string };
      privacy: { title: string; desc: string };
      aiTone: { title: string; desc: string };
    };
  };
  howTruncationWorks: {
    eyebrow: string;
    description: string;
    platforms: {
      linkedin: { name: string; desc: string };
      twitter: { name: string; desc: string };
      instagram: { name: string; desc: string };
      facebook: { name: string; desc: string };
      threads: { name: string; desc: string };
      sms: { name: string; desc: string };
    };
  };
  platformCharacterLimits: {
    eyebrow: string;
    headers: {
      platform: string;
      characterLimit: string;
      shownInFeed: string;
      bestPractice: string;
      notes: string;
    };
    platforms: {
      linkedin: { name: string; limit: string; shown: string; bestPractice: string; notes: string };
      twitter: { name: string; limit: string; shown: string; bestPractice: string; notes: string };
      instagram: { name: string; limit: string; shown: string; bestPractice: string; notes: string };
      facebook: { name: string; limit: string; shown: string; bestPractice: string; notes: string };
      threads: { name: string; limit: string; shown: string; bestPractice: string; notes: string };
      sms: { name: string; limit: string; shown: string; bestPractice: string; notes: string };
    };
    viewAll: string;
  };
  /** "Who is it for?" persona grid — four audience cards on the homepage. */
  whoIsItFor: {
    eyebrow: string;
    title: string;
    roles: {
      marketers: { title: string; desc: string };
      creators: { title: string; desc: string };
      agencies: { title: string; desc: string };
      founders: { title: string; desc: string };
    };
  };
  /** Closing call-to-action banner above the footer on the homepage. */
  ctaBanner: {
    title: string;
    body: string;
    /** Button label (arrow appended in markup). */
    cta: string;
    /** Reassurance line, part 1 — "No credit card required". */
    noCard: string;
    /** Reassurance line, part 2 — "Free forever". */
    free: string;
  };
  island: IslandStrings;
}
