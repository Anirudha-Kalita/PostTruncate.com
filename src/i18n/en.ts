import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// English — the canonical dictionary. Every other locale mirrors this exact
// structure (enforced by the Translations type). When you add or rename a key,
// add it here first; TypeScript will then flag every locale that's missing it.
// ──────────────────────────────────────────────────────────────────────────

export const en: Translations = {
  seo: {
    title:
      'PostTruncate — See exactly where social platforms cut off your text',
    description:
      'Free social media preview tool. See LinkedIn’s “…see more” fold, auto-split long copy into clean X/Twitter threads, and catch hashtag overload or screen-reader-breaking fonts before you post.',
    skipLink: 'Skip to the editor',
  },

  nav: {
    brandAria: 'PostTruncate home',
    homeAria: 'PostTruncate home',
    links: { editor: 'Editor', guides: 'Platform Guides', faq: 'FAQ' },
    cta: 'Open the editor',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    language: 'Language',
    languageAria: 'Select language',
    menuAria: 'Toggle navigation menu',
  },

  hero: {
    eyebrow: 'Social preview & truncation simulator',
    title: 'See exactly where every platform cuts your text.',
    lede: 'Write once and watch your post render in native LinkedIn, X, Instagram, and Facebook previews — fold lines, thread splits, hashtag limits, and accessibility warnings, all live as you type.',
    primary: 'Start writing',
    secondary: 'See platform limits',
  },

  workspace: {
    title: 'Your live workspace',
    sub: 'Everything below updates instantly and stays on your device.',
  },

  guides: {
    eyebrow: 'Platform guides',
    title: 'Know every limit before you post.',
    lede: 'A quick reference for the truncation points, hard limits, and formatting traps that quietly cap your reach on each network.',
    items: {
      linkedin: {
        name: 'LinkedIn',
        tag: 'The “…see more” fold',
        body: 'LinkedIn collapses posts after roughly 210 characters on desktop and 140 on mobile, hiding everything else behind a "…see more" link. Whatever sits above that fold is your entire pitch in the feed — if your hook doesn’t land there, most people never expand it. Front-load the tension, the result, or the question, and push hashtags and links below the fold.',
        facts: [
          ['Desktop fold', '~210 characters'],
          ['Mobile fold', '~140 characters'],
          ['Post hard cap', '3,000 characters'],
        ],
      },
      twitter: {
        name: 'X / Twitter',
        tag: 'Threads & link weighting',
        body: 'X counts a single post against 280 characters, but every link is wrapped by t.co and charged a flat 23 characters no matter how long the real URL is. Go over 280 and you need a thread. Good threads break on sentence boundaries, never mid-word, and number each tweet so readers can follow the order. PostTruncate splits your draft automatically and tags each card with its position.',
        facts: [
          ['Per-tweet limit', '280 characters'],
          ['Every link counts as', '23 characters'],
          ['Thread tweets', 'Unlimited'],
        ],
      },
      threads: {
        name: 'Threads',
        tag: 'Post chaining',
        body: 'Threads, Meta’s text app, gives each post 500 characters — almost double X — and counts links in full rather than shortening them. Go past 500 and the rest has to chain on as numbered replies. The first post still carries the feed, so front-load the hook just like everywhere else. PostTruncate measures by full character count and chains long copy into a clean numbered sequence.',
        facts: [
          ['Per-post limit', '500 characters'],
          ['Links counted', 'In full'],
          ['Overflow', 'Chains as replies'],
        ],
      },
      instagram: {
        name: 'Instagram',
        tag: 'Hashtag ceiling',
        body: 'Instagram captions run up to 2,200 characters but only show about the first 125 before a "more" link. The harder rule is hashtags: more than 30 in a single caption or comment and the post silently fails to publish. Stacking dozens of low-intent tags also reads as spam. Keep your tags tight and relevant, and watch the live meter so you never trip the 30-tag wall.',
        facts: [
          ['Caption cap', '2,200 characters'],
          ['Hashtag hard limit', '30 tags'],
          ['Caption preview', '~125 characters'],
        ],
      },
      facebook: {
        name: 'Facebook',
        tag: 'Feed truncation',
        body: 'Facebook truncates feed posts at roughly 480 characters with a "See more" link, and engagement drops sharply on long unbroken blocks. Shorter posts with a clear first line consistently outperform. The same accessibility rule applies everywhere: pseudo-Unicode "fancy fonts" look bold or cursive but are read out character-by-character — or skipped entirely — by screen readers, so they quietly shrink your reach.',
        facts: [
          ['Feed fold', '~480 characters'],
          ['Best-performing length', 'Under 80 characters'],
          ['Fancy fonts', 'Break screen readers'],
        ],
      },
    },
  },

  hookband: {
    eyebrow: 'Writing the hook',
    title: 'The first line is the only line most people read.',
    body: 'On every feed, the text above the fold does all the work. Open with a result, a tension, or a question — not a warm-up. Move links and hashtags below the fold, keep your opening under the platform’s cut-off, and let the preview confirm the hook survives before you publish.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered.',
    items: [
      {
        q: 'How accurate are the character limits?',
        a: 'PostTruncate uses each platform’s published and widely-observed limits — 280 for X, 210/140 for the LinkedIn fold, 30 hashtags for Instagram, and a flat 23-character weight for links. Platforms occasionally adjust these, and rendering varies slightly by device, so treat the previews as a close estimate rather than a pixel-perfect guarantee.',
      },
      {
        q: 'Do spaces and punctuation count as characters?',
        a: 'Yes. Every space, line break, and punctuation mark counts as one character, and both PostTruncate’s counter and the platform limits include them. The only common exception is links on X/Twitter, which collapse to a flat 23 characters regardless of how many letters, symbols, or slashes the real URL contains.',
      },
      {
        q: 'How do emojis affect the character count?',
        a: 'PostTruncate counts by Unicode code points, so a simple emoji like 🙂 counts as a single character. Many emoji are built from several joined code points, though — skin-tone variations, flags, and combined glyphs such as 👨‍👩‍👧 — and those register as two or more. Most platforms, X especially, also weight emoji more heavily than plain letters, so an emoji-heavy draft uses up a little more of your limit than the visible glyph count suggests.',
      },
      {
        q: 'What is the difference between character count and word count?',
        a: 'Character count is the total of every individual character — letters, spaces, punctuation, and emoji all included — and it is what platform limits are actually measured against. Word count is the number of whitespace-separated words, no matter how long each one is. A full 280-character tweet might be only 40 words, so watch the character count to stay under a limit and use word count as a readability gauge.',
      },
      {
        q: 'Why does my link count as 23 characters on X?',
        a: 'X automatically wraps every URL with its t.co shortener, which always occupies 23 characters regardless of how long or short the original link is. So a 5-character link and a 200-character link both cost you exactly 23 toward the 280 limit. PostTruncate mirrors this in the weighted counter.',
      },
      {
        q: 'What are “fancy fonts” and why are they flagged?',
        a: 'Those bold, italic, or script-style letters you paste from font generators aren’t real formatting — they’re pseudo-Unicode characters from the Mathematical Alphanumeric Symbols block. They look styled but screen readers either spell them out letter by letter or skip them, which hurts both accessibility and your organic reach. The monitor flags them so you can swap back to plain text.',
      },
      {
        q: 'What does “Sanitize text” remove?',
        a: 'It strips invisible and zero-width characters — zero-width spaces, byte-order marks, bidirectional control marks, soft hyphens, and stray control codes. These often sneak in when you copy from other apps, and they silently break character counts and accessibility on older mobile clients without ever being visible.',
      },
      {
        q: 'Is my text sent anywhere?',
        a: 'No. The entire editor and every preview run locally in your browser. Your draft never leaves your device — there’s no account, no upload, and no server processing of your content.',
      },
      {
        q: 'Is PostTruncate free?',
        a: 'Yes, it’s completely free to use with no sign-up required. The tool is supported by unobtrusive ads placed in reserved spaces that never shift the layout while you’re working.',
      },
    ],
  },

  footer: {
    homeAria: 'PostTruncate home',
    tag: 'See exactly where every platform cuts your copy — before you post.',
    columns: {
      tool: {
        title: 'Tool',
        links: [
          'Text editor',
          'Live previews',
          'Thread splitter',
          'Unicode sanitizer',
        ],
      },
      platforms: {
        title: 'Platforms',
        links: ['LinkedIn', 'X / Twitter', 'Threads', 'Instagram', 'Facebook'],
      },
      learn: {
        title: 'Learn',
        links: [
          'Character limits',
          'FAQ',
          'Hook writing',
          'Accessibility',
        ],
      },
      legal: {
        title: 'Legal',
        links: ['Privacy', 'Terms', 'Contact'],
      },
    },
    copyright: '© {year} PostTruncate. Built for creators everywhere.',
    disclaimer:
      'Not affiliated with LinkedIn, X, Meta, or Instagram. Limits are estimates and can change.',
  },

  island: {
    dashboard: {
      loadSample: 'Load a sample post →',
      sample:
        'We shipped a tiny feature last week that quietly doubled our trial-to-paid rate.\n\n' +
        'No new pricing. No growth hack. Just one change to the onboarding flow that removed a single decision from the first screen.\n\n' +
        'Here’s exactly what we changed and the three things we measured before rolling it out to everyone → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
    },
    workspace: {
      eyebrow: 'Workspace',
      title: 'Write your post',
      badgeEditor: 'Editor',
      hiddenBadge: { one: '{n} hidden char', other: '{n} hidden chars' },
      placeholder:
        'Start typing your post. Paste a draft, drop in a few links and hashtags, and watch each platform’s preview update on the right…',
      counters: {
        characters: 'Characters',
        words: 'Words',
        lines: 'Lines',
        paragraphs: 'Paragraphs',
      },
      engineLabel: 'Optimization engine',
      clean: 'Clean excess space',
      sanitize: 'Sanitize text',
      clear: 'Clear editor',
      hiddenWarning:
        'Found invisible characters that break counts and screen readers: {codes}. Sanitize to strip them.',
    },
    common: {
      profileName: 'Your Name',
      handle: '@you',
      charsSuffix: '{n} chars',
    },
    linkedin: {
      title: 'Hook zone preview',
      viewAriaLabel: 'LinkedIn fold view',
      viewDesktop: 'Desktop',
      viewMobile: 'Mobile',
      badgeTruncated: 'Truncated feed text',
      badgeSafe: 'Safe hook line',
      beforeFold: '{total} / {limit} before fold',
      seeMore: '…see more',
      profileMeta: 'Founder · 1st · Just now',
      placeholder: 'Your post’s opening lines appear here…',
      truncatedNote:
        'Readers see only the first {limit} characters in-feed. Front-load your hook before the fold.',
      safeNote:
        'Your whole post fits above LinkedIn’s {view} fold — no "…see more" truncation.',
    },
    twitter: {
      title: 'Thread splitter',
      badgeIdle: 'Idle',
      badgeThread: '{n}-tweet thread',
      badgeSingle: 'Single tweet',
      links: {
        one: '{n} link · counted as {weight} each',
        other: '{n} links · counted as {weight} each',
      },
      weightedLength: 'Weighted length',
      placeholder:
        'Your tweet preview appears here. Go past {limit} characters and it auto-splits into a thread.',
    },
    threads: {
      title: 'Post & chain preview',
      badgeIdle: 'Idle',
      badgeThread: '{n}-post chain',
      badgeSingle: 'Single post',
      links: {
        one: '{n} link · counted in full',
        other: '{n} links · counted in full',
      },
      charLength: 'Character length',
      placeholder:
        'Your Threads preview appears here. Go past {limit} characters and it chains into a numbered post sequence.',
    },
    meta: {
      title: 'Formatting monitor',
      badgeNeedsFix: 'Needs a fix',
      badgeClean: 'Looks clean',
      hashtagLabel: 'Hashtag concentration',
      over: 'Over Instagram’s hard limit of {limit} hashtags — the caption will fail to post. Remove {excess}.',
      approaching:
        'Approaching the 30-tag ceiling. Trim to your highest-intent tags.',
      within: 'Comfortably within Instagram’s 30-hashtag limit.',
      none: 'No hashtags detected yet.',
      a11yLabel: 'Accessibility · fancy fonts',
      flagged: '{n} flagged',
      flaggedNone: 'None',
      fancyDetected: {
        one: 'Detected {n} pseudo-Unicode “font” character (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). These look styled but screen readers skip or spell them out — they hurt reach and accessibility.',
        other:
          'Detected {n} pseudo-Unicode “font” characters (𝖁𝖔𝖑𝖉 / 𝓼𝓬𝓻𝓲𝓹𝓽). These look styled but screen readers skip or spell them out — they hurt reach and accessibility.',
      },
      fancyClean:
        'No pseudo-font characters detected. Your text reads cleanly on assistive tech.',
      footnote:
        '{n} characters · Facebook fold ≈ 480 · Instagram caption cap 2,200',
    },
  },
};
