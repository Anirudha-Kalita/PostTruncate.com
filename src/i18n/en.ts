import type { Translations } from './types';

// ──────────────────────────────────────────────────────────────────────────
// English — the canonical dictionary. Every other locale mirrors this exact
// structure (enforced by the Translations type). When you add or rename a key,
// add it here first; TypeScript will then flag every locale that’s missing it.
// ──────────────────────────────────────────────────────────────────────────

export const en: Translations = {
  seo: {
    title:
      'Character Counter — Free Online Character & Word Count Tool | PostTruncate',
    description:
      'Free social media post previewer. See LinkedIn’s fold, split X/Twitter threads, catch hashtag limits and accessibility traps — live in your browser.',
    skipLink: 'Skip to the editor',
  },

  nav: {
    brandAria: 'PostTruncate home',
    homeAria: 'PostTruncate home',
    links: {
      editor: 'Editor',
      guides: 'Platform Guides',
      limits: 'All platform limits',
      tools: 'Tools',
      counters: 'Character Counters',
      faq: 'FAQ',
      about: 'About',
      contact: 'Contact',
    },
    cta: 'Open the editor',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    language: 'Language',
    languageAria: 'Select language',
    menuAria: 'Toggle navigation menu',
    backToTop: 'Back to top',
  },

  hero: {
    eyebrow: 'Social preview & truncation simulator',
    title: 'See exactly where every platform cuts your text.',
    lede: 'Write once and watch your post render in native LinkedIn, X, Threads, Instagram, and Facebook previews — with fold lines, thread splits, hashtag limits, and accessibility warnings live as you type, plus one-tap AI to improve your post on the spot.',
    primary: 'Start writing',
    secondary: 'See platform limits',
    badge: 'Real-time previews. No more guessing.',
    trust: '100% free — no sign-up · Text never leaves your browser · 10+ platform limits covered',
  },

  howItWorks: {
    heading: 'How it works',
    steps: [
      {
        name: 'Paste or type your text',
        text: 'Drop your draft into the editor and the live character count updates instantly as you type.',
      },
      {
        name: 'All platforms render at once',
        text: 'LinkedIn, X, Threads, Instagram, Facebook, and SMS preview cards all update simultaneously — no selection needed.',
      },
      {
        name: 'See exactly where it cuts off',
        text: 'The preview highlights the truncation point so you know precisely what readers will see.',
      },
    ],
  },

  toolPage: {
    onThisPage: 'On this page',
    lastUpdated: 'Last updated: {date}',
    crossPromo: {
      heading: 'Need to check other platforms?',
      text: "PostTruncate isn't just for {platform}. The full editor on the home page previews your post against LinkedIn, X, Instagram, Facebook, Threads, and SMS all at once — so you catch every platform's fold, limit, and encoding trap in one pass. Write it once, check it everywhere.",
      cta: 'Open the full editor',
    },
    cta: {
      heading: 'Ready to see how your post really looks?',
      blurb: 'Paste your draft into the PostTruncate editor and instantly see live previews across LinkedIn, X, Instagram, Facebook, Threads, and SMS — with fold lines, thread splits, and limit warnings updating as you type. Free, instant, and nothing ever leaves your browser.',
      button: 'Start writing — it\'s free',
    },
  },

  images: {
    logoAlt: 'PostTruncate logo',
    platformLogo: '{platform} logo',
  },

  breadcrumbs: {
    home: 'Home',
  },

  workspace: {
    title: 'Your live workspace',
    sub: 'Everything below updates instantly and stays on your device.',
  },

  seoCopy: {
    ariaLabel: 'About PostTruncate',
    sections: [
      {
        heading: 'A character counter built for social media',
        paragraphs: [
          '<strong>PostTruncate</strong> is a free, browser-based character counter that works entirely on your device — no uploads, no accounts needed. Paste or type any text and you instantly see character count, word count, reading time, and letter distribution update as you write.',
          'It’s built for anyone working with text under a limit: writers trimming an essay, marketers checking a headline, developers auditing a string. Because everything runs client-side, your drafts never leave your browser.',
        ],
      },
      {
        heading: 'SMS encoding and segment counting',
        paragraphs: [
          'SMS has two encoding modes and most tools ignore the difference. PostTruncate detects automatically whether your message uses standard <strong>GSM-7</strong> (160 characters per text) or <strong>Unicode</strong> (70 characters) — and the switch can happen the moment you type a single emoji or special character.',
          'It also flags extended GSM characters — things like the Euro sign (€), square brackets, and the pipe symbol — which stay in GSM-7 mode but each consume two character slots instead of one. That hidden cost is why messages sometimes segment unexpectedly.',
          'When your text spans multiple segments, the built-in <strong>segment calculator</strong> shows exactly how many texts your message will send, accounting for the User Data Header overhead that reduces per-segment limits to 153 characters (GSM) or 67 characters (Unicode).',
        ],
      },
      {
        heading: 'X (Twitter) limits and automatic thread splitting',
        paragraphs: [
          'X (Twitter) has two rules that catch people off guard: the 280-character limit, and the fact that every link — regardless of length — counts as exactly 23 characters. PostTruncate handles both, so the counter you see matches what X will actually report once the t.co wrapper is applied.',
          'When your draft runs long, the built-in <strong>thread splitter</strong> breaks it into numbered posts at natural sentence boundaries — never mid-word. Each card shows its character count and position, so you can review the full split before you post.',
        ],
      },
      {
        heading: 'Instagram and Facebook character limits',
        paragraphs: [
          'Instagram caps captions at 2,200 characters, but only shows roughly the first 125 before hiding the rest behind a “more” link. PostTruncate tracks exactly where that cutoff falls so your opening line — the part visible in the feed — says what you actually need it to say.',
          'The dashboard also monitors <strong>hashtag count</strong> in real time. Instagram silently fails to publish posts that exceed 5 hashtags, so a live warning fires before you hit that wall. Spaces are always counted, matching Instagram’s own behavior.',
        ],
      },
      {
        heading: 'Word count, readability, and platform analytics',
        paragraphs: [
          'Beyond platform limits, PostTruncate also counts words, sentences, paragraphs, and symbols — all updating live as you type. It’s useful for SEO meta descriptions, documentation reviews, or any writing workflow where you need more than a raw character tally.',
          'The dashboard handles multilingual text correctly, including CJK scripts where character count carries different semantic weight. Whether you’re writing in English, German, Japanese, or Chinese, the counts reflect what the target platform will actually see.',
        ],
      },
    ],
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
        body: 'Instagram captions run up to 2,200 characters but only show about the first 125 before a "more" link. The harder rule is hashtags: more than 5 in a single caption or comment and the post silently fails to publish. Stacking dozens of low-intent tags also reads as spam. Keep your tags tight and relevant, and watch the live meter so you never trip the 5-tag wall.',
        facts: [
          ['Caption cap', '2,200 characters'],
          ['Hashtag hard limit', '5 tags'],
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
    viewAll: 'View all FAQs',
    items: [
      {
        q: 'What is post truncation?',
        a: 'Truncation is what happens when a platform cuts your post short — either hiding everything past a visual fold behind a "…see more" link, or rejecting characters beyond a hard limit. PostTruncate shows you exactly where each platform makes that cut, live, while you write, so the part that matters never disappears below the fold.',
      },
      {
        q: 'Why do social media platforms truncate posts?',
        a: 'Feeds are built for scanning, so platforms collapse long posts to keep scrolling fast and fit more posts on screen. Each platform draws the line differently: LinkedIn folds at roughly 140–210 characters, Facebook at about 110–480 depending on device, Instagram at around 125, and X simply enforces a hard 280-character cap. Anything past the fold is only seen by people who actively tap "more" — which most readers never do.',
      },
      {
        q: 'Which platforms does PostTruncate support?',
        a: 'PostTruncate previews LinkedIn, X (Twitter), Threads, Instagram, Facebook, and SMS — with live character counts, fold markers, thread splitting, and SMS segment math for each. There is also a Google SERP preview for page titles and meta descriptions, and a free embeddable counter widget for your own site.',
      },
      {
        q: 'How accurate are the character limits?',
        a: 'PostTruncate counts against each platform’s published and widely-observed limits — 280 for X, 210/140 for the LinkedIn fold, 5 hashtags for Instagram, and a flat 23-character weight for links. Platforms occasionally adjust these, and rendering varies slightly by device, so treat the previews as a close estimate rather than a pixel-perfect guarantee.',
      },
      {
        q: 'Do spaces and punctuation count as characters?',
        a: 'Yes. Every space, line break, and punctuation mark counts as one character, and both PostTruncate’s counter and the platform limits include them. The only common exception is links on X/Twitter, which collapse to a flat 23 characters regardless of how many letters, symbols, or slashes the real URL contains.',
      },
      {
        q: 'How do emojis affect the character count?',
        a: 'PostTruncate counts by Unicode code points, so a simple emoji like 🙂 registers as one character. Many emoji are built from several joined code points — skin-tone variations, flags, and combined glyphs such as 👨‍👩‍👧 — and those register as two or more. The tool handles any script correctly, including CJK characters. Most platforms, X especially, also weight emoji more heavily than plain letters, so an emoji-heavy draft uses up a little more of your limit than the visible glyph count suggests.',
      },
      {
        q: 'What is the difference between character count and word count?',
        a: 'Character count is the total of every individual character — letters, spaces, punctuation, and emoji all included — and it is what platform limits are actually measured against. Word count is the number of whitespace-separated words, no matter how long each one is. PostTruncate shows both side by side, updating live as you type. A full 280-character tweet might be only 40 words, so watch the character count to stay under a limit and use word count as a readability gauge.',
      },
      {
        q: 'Why does my link count as 23 characters on X?',
        a: 'X automatically wraps every URL with its t.co shortener, which always occupies 23 characters regardless of how long or short the original link is. So a 5-character link and a 200-character link both cost you exactly 23 toward the 280 limit. PostTruncate reflects this in its counter, so the number you see matches what X will actually report.',
      },
      {
        q: 'What are “fancy fonts” and why are they flagged?',
        a: 'Those bold, italic, or script-style letters you paste from font generators aren’t real formatting — they’re pseudo-Unicode characters from the Mathematical Alphanumeric Symbols block. They look styled but screen readers either spell them out letter by letter or skip them, which hurts both accessibility and your organic reach. PostTruncate tallies them so you can see exactly how many characters they add, and the monitor flags them so you can swap back to plain text.',
      },
      {
        q: 'What does “Sanitize text” remove?',
        a: 'It strips invisible and zero-width characters — zero-width spaces, byte-order marks, bidirectional control marks, soft hyphens, and stray control codes. These often sneak in when you copy from other apps, and they silently break character counts and screen reader behavior without ever being visible. Sanitizing reveals the real, visible character total.',
      },
      {
        q: 'What is keyword density, and how does the Overuse Monitor protect my content?',
        a: 'Keyword density refers to the percentage of times a specific word appears in your text relative to your total word count. While maintaining a focused topic is essential for SEO copywriters, repeating the same keyword too many times triggers automated search engine filters for "keyword stuffing." Our dynamic Keyword Overuse Monitor tracks word frequency in real-time. If any unique word or phrase crosses a safe 3.0% density threshold, the platform automatically flags that specific row in alert orange, allowing you to instantly swap in synonyms and protect your content from algorithmic search penalties before you publish.',
      },
      {
        q: 'How do the Estimated Reading and Speaking timers calculate my post duration?',
        a: 'The reading timer divides your word count by 275 words per minute — a standard silent reading speed — which is useful for judging how long an article or newsletter will take to read. The speaking timer uses 150 words per minute, a comfortable conversational pace, which helps scriptwriters and video creators check timing for short-form content.',
      },
      {
        q: 'What does the Social Sanitizer do, and why should I strip emojis or extract hashtags?',
        a: 'The Emoji Stripper removes all emoji and graphical Unicode symbols from your text — useful when repurposing a social post into a clean email or document. The Hashtag Extractor pulls all # tags out of the body copy and groups them at the end of the text, giving you a cleaner caption layout.',
      },
      {
        q: 'Is my text sent anywhere?',
        a: 'No. The entire editor and every preview run locally in your browser — nothing is uploaded. Your text never leaves your device: there’s no account, no upload, and no server processing of your content.',
      },
      {
        q: 'Does the session auto-save feature mean my data is stored on a server?',
        a: 'No. The auto-save runs entirely in your browser using sessionStorage — a temporary, tab-scoped cache built into every browser. When you refresh the page in the same tab, the tool restores your draft from that local cache. When you close the tab, the draft is cleared. Nothing is sent to any server.',
      },
      {
        q: 'Is PostTruncate free?',
        a: 'Yes, completely free to use with no sign-up required and nothing to install. The tool is supported by unobtrusive ads placed in reserved spaces that never shift the layout while you’re working.',
      },
      {
        q: 'Why did my 160-character SMS suddenly count as two messages?',
        a: `This happens because of a change in your text's encoding. Standard SMS uses GSM 7-bit encoding, which fits up to 160 characters in a single message. The moment your text includes a non-GSM character — an emoji, a regional script, or certain symbols — the entire message switches to Unicode, which holds only 70 characters per segment. If a Unicode message exceeds 70 characters, a multi-part header is added and the usable space per segment drops to 67 characters. PostTruncate shows your current encoding and segment count live, so you always know where the break happens.`,
      },
      {
        q: 'Do special characters and emojis count as one character in an SMS?',
        a: 'Not always. Standard letters and numbers each count as one character. Symbols from the GSM extended table — including the Euro sign (€), square brackets, curly braces, and the pipe character | — count as two characters each, even though they keep the message in GSM 7-bit mode. Emoji are different: adding one forces the entire message into Unicode, which reduces the per-segment limit from 160 characters down to 70.',
      },
    ],
  },

  faqPage: {
    title: 'FAQ — PostTruncate Character Counter & Post Previews',
    description:
      'Every question about PostTruncate, answered: platform character limits, emoji and link counting, SMS segmentation, privacy, and how the live previews work.',
    eyebrow: 'FAQ',
    heading: 'Frequently Asked Questions',
    lede: 'Everything about how PostTruncate counts, previews, and protects your posts — grouped by topic. Click any question to expand the answer.',
    categories: {
      about: 'About the tool',
      counting: 'Counting & limits',
      cleanup: 'Cleanup & accessibility',
      insights: 'Insights & analytics',
      privacy: 'Privacy & data',
      sms: 'SMS',
    },
  },

  limitsPage: {
    title: 'Social Media Character Limits 2026 — Full Platform Table',
    description:
      'The complete character-limit table for LinkedIn, X (Twitter), Threads, Instagram, Facebook, and SMS — hard caps, truncation folds, and the rules behind them.',
    eyebrow: 'Reference',
    heading: 'Every platform limit, in one table',
    lede: 'Hard caps, visible-text folds, and overflow behavior for every platform PostTruncate previews. The numbers below are the same constants the live editor checks against.',
    table: {
      caption: 'Character limits and truncation points by platform',
      platform: 'Platform',
      limit: 'Hard limit',
      foldMobile: 'Fold (mobile)',
      foldDesktop: 'Fold (desktop)',
      notes: 'Notes',
    },
    noFold: 'No fold',
    notes: {
      linkedin: 'Text past the fold hides behind “…see more”.',
      twitter: 'No fold — over {limit} characters splits into a thread; every link counts as {url} characters.',
      threads: 'Links count in full; copy past {limit} characters chains as numbered replies.',
      instagram: 'Caption folds behind “more”; hard ceiling of {hashtags} hashtags per post.',
      facebook: 'Feed posts collapse behind “See more” well before the technical cap.',
      smsGsm: '{single} characters in a single message; {multi} per segment once it splits.',
      smsUnicode: 'One emoji or non-GSM character switches the whole message to Unicode.',
    },
    rulesHeading: 'Truncation rules, platform by platform',
    rules: {
      linkedin: 'LinkedIn allows {limit} characters per post but folds the feed view after roughly {mobile} characters on mobile and {desktop} on desktop — everything else hides behind “…see more”. Line breaks count, and the first sentence carries almost all of the click-through, so front-load the hook and keep links below the fold.',
      twitter: 'X enforces a hard {limit}-character cap per post and shows no fold at all. Every URL is wrapped by the t.co shortener and always costs {url} characters regardless of its real length, and many emoji weigh as two characters. Longer drafts must be split into a thread — PostTruncate does this automatically at word boundaries.',
      threads: 'Threads allows {limit} characters per post and, unlike X, counts links at their full length. On mobile the feed folds long posts at about {mobile} characters. Anything past the cap has to continue as numbered reply posts chained under the first one.',
      instagram: 'Instagram captions can run to {limit} characters, but the feed shows only about the first {mobile} before the “more” link. The stricter rule is hashtags: more than {hashtags} in a caption or first comment and the post can silently fail to publish.',
      facebook: 'Facebook’s technical cap is {limit} characters, but feed posts collapse behind “See more” at roughly {mobile} characters on mobile and {desktop} on desktop. Engagement drops sharply on long unbroken blocks, so the practical limit is the fold, not the cap.',
      sms: 'A single SMS holds {gsmSingle} characters in GSM 7-bit encoding, dropping to {gsmMulti} per segment once the message splits. Any emoji or non-GSM character switches the entire message to Unicode — {uniSingle} characters per single message, {uniMulti} per segment — and some GSM symbols (€, brackets, the pipe) count as two.',
    },
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
          'Embed widget',
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
        links: ['Privacy', 'Terms', 'About', 'Contact'],
      },
      guides: {
        title: 'Platform Guides',
        links: [
          'X / Twitter',
          'Instagram',
          'LinkedIn',
          'Facebook',
          'Threads',
        ],
      },
    },
    copyright: '© {year} PostTruncate. Built for creators everywhere.',
    disclaimer:
      'Not affiliated with LinkedIn, X, Meta, or Instagram. Limits are estimates and can change.',
  },

  pages: {
    common: {
      lastUpdated: 'Last updated: {date}',
      lastUpdatedDate: 'June 1, 2026',
      backHome: '← Back to the editor',
    },

    privacy: {
      title: 'Privacy Policy',
      description:
        'How PostTruncate handles your data: your text never leaves your browser, there are no accounts, and nothing you write is uploaded or stored.',
      intro:
        'PostTruncate is built privacy-first. Everything you type runs locally in your browser — your draft is never uploaded, stored, or seen by us. This policy explains exactly what that means and the few limited cases where third parties are involved.',
      sections: [
        {
          heading: 'Your text stays on your device',
          paragraphs: [
            'The editor, every platform preview, the thread splitter, and the Unicode sanitizer all run entirely in <strong>your browser</strong>. The text you write or paste is processed on your own device and is <strong>never transmitted to our servers</strong> — in fact, PostTruncate has no content server to send it to. When you close the tab, your draft is gone unless your browser chooses to keep it locally.',
            'Because nothing is uploaded, we cannot read, store, sell, or share what you write. There is <strong>no account, no sign-up, and no login</strong>, so we never ask for your name, email, or any personal detail to use the tool.',
          ],
        },
        {
          heading: 'What we store locally',
          paragraphs: [
            'A small number of preferences are saved in your browser’s <strong>localStorage</strong> so the site remembers how you like it — specifically your chosen theme (light or dark) and your preferred language. These values live only on your device, are readable only by PostTruncate, and never reach us. You can clear them at any time through your browser’s settings.',
          ],
        },
        {
          heading: 'Advertising',
          paragraphs: [
            'PostTruncate is supported by unobtrusive ads shown in fixed, reserved spaces that never shift the layout while you work. If third-party ad partners are used, they may set their own cookies or use device identifiers to display relevant ads, subject to their own privacy policies. These partners never receive the content of your draft, because that content never leaves your browser.',
          ],
        },
        {
          heading: 'The contact form',
          paragraphs: [
            'The only feature that sends data off your device is the <strong>contact form</strong>. When you choose to send us a message, the name, email, and message you enter are delivered to us through a third-party form-handling service so we can read and reply. We use that information solely to respond to you and do not use it for marketing. If you would rather not use a third party, you can email us directly instead.',
          ],
        },
        {
          heading: 'Changes & contact',
          paragraphs: [
            'We may update this policy as the product evolves; the “last updated” date above always reflects the current version. If you have any questions about privacy, email us at <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    terms: {
      title: 'Terms & Conditions',
      description:
        'The terms of use for PostTruncate: a free, as-is tool whose platform limits are estimates, provided without warranty and not affiliated with any social network.',
      intro:
        'By using PostTruncate you agree to these terms. They’re intentionally short and plain — the tool is free, runs in your browser, and is provided as-is.',
      sections: [
        {
          heading: 'Use of the service',
          paragraphs: [
            'PostTruncate is a free tool for previewing and optimizing social media posts. You may use it for any lawful purpose. You agree <strong>not to misuse the service</strong> — for example by attempting to disrupt it, reverse its protections, or use it to break the law or infringe someone else’s rights.',
          ],
        },
        {
          heading: 'Estimates, not guarantees',
          paragraphs: [
            'The character limits, fold points, and formatting rules shown here are based on each platform’s published and widely-observed behavior. Platforms <strong>change these limits without notice</strong>, and rendering varies by device and app version. Treat every preview and count as a close estimate, not a pixel-perfect guarantee. You are responsible for reviewing your own posts before publishing them.',
          ],
        },
        {
          heading: 'No affiliation',
          paragraphs: [
            'PostTruncate is an independent tool and is <strong>not affiliated with, endorsed by, or sponsored by</strong> LinkedIn, X (Twitter), Meta, Instagram, Facebook, or Threads. All product names, logos, and brands are the property of their respective owners and are used here only to describe each platform’s behavior.',
          ],
        },
        {
          heading: 'Provided “as is”',
          paragraphs: [
            'The service is provided <strong>“as is” and “as available,” without warranties of any kind</strong>, express or implied. To the fullest extent permitted by law, we are not liable for any loss or damage arising from your use of — or inability to use — the tool, including any decisions you make based on its previews or counts.',
          ],
        },
        {
          heading: 'Changes to these terms',
          paragraphs: [
            'We may revise these terms from time to time; the “last updated” date above reflects the current version, and continued use of the tool means you accept the latest terms. Questions? Email <strong>contact@posttruncate.com</strong>.',
          ],
        },
      ],
    },

    about: {
      title: 'About PostTruncate',
      description:
        'PostTruncate is a free, privacy-first tool that shows creators exactly where every social platform cuts off their text — before they hit post.',
      intro:
        'PostTruncate exists for one reason: the first line of your post is the only line most people read, and every platform cuts it off in a different place. We make those invisible limits visible.',
      sections: [
        {
          heading: 'What it does',
          paragraphs: [
            'Write or paste a draft once, and PostTruncate renders it the way <strong>LinkedIn, X, Threads, Instagram, and Facebook</strong> actually will — the “…see more” fold, the 280-character thread split, the 23-character link weighting, the 5-hashtag ceiling. You see exactly what survives above the fold before you commit to publishing.',
            'It also catches the quiet problems that shrink your reach: invisible zero-width characters that break counts and screen readers, and pseudo-Unicode “fancy fonts” that look styled but are unreadable to assistive tech.',
          ],
        },
        {
          heading: 'Why we built it',
          paragraphs: [
            'Most character counters tell you a single number. Creators need more than that — they need to know <strong>where</strong> the text gets cut on each network, because that’s where the hook lives or dies. We wanted one workspace that simulates every platform at once, runs instantly, and respects your privacy completely.',
          ],
        },
        {
          heading: 'Built privacy-first',
          paragraphs: [
            'Everything runs in your browser. Your text is never uploaded, there are no accounts, and the tool is free to use. It’s supported by unobtrusive ads in reserved spaces that never shift the layout. Read the full details in our <a href="../privacy/"><strong>Privacy Policy</strong></a>.',
          ],
        },
      ],
    },

    contact: {
      title: 'Contact Us',
      description:
        'Get in touch with the PostTruncate team — send us a message or email us directly with feedback, bug reports, or questions.',
      intro:
        'Found a bug, spotted a platform limit that’s drifted, or have an idea to make PostTruncate better? We’d love to hear from you.',
      form: {
        name: 'Your name',
        email: 'Your email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send message',
        sending: 'Sending…',
        success: 'Thanks — your message is on its way. We’ll get back to you soon.',
        error:
          'Something went wrong sending your message. Please try again, or email us directly.',
      },
      altHeading: 'Prefer email?',
      altBody:
        'You can reach us any time at {email}. We read every message and reply as quickly as we can.',
    },
  },

  embedWidget: {
    title: 'Free Character Counter Embed Widget — PostTruncate',
    description:
      'Add a free live character counter to any blog or website with one line of HTML. Tracks limits for X, LinkedIn, Threads, Instagram, and SMS.',
    eyebrow: 'Free embed',
    heading: 'Embed a live character counter on your site',
    lede:
      'Paste one line of HTML to add a real-time character counter to any page. It counts characters and words, tracks limits for X, LinkedIn, Threads, Instagram, and SMS — all without leaving your site.',
    previewLabel: 'Live preview',
    copyButton: 'Copy embed code',
    copiedButton: 'Copied!',
    codeLabel: 'Embed code',
    audienceHeading: 'Who is this for?',
    forBloggers:
      'Bloggers and content creators can add a live character counter directly to their write-up page so readers can check platform limits without switching tabs.',
    forEducators:
      'Educators and course authors can embed the counter inside a lesson, letting students practise writing to length constraints as part of the exercise.',
    forDevelopers:
      'Developers can drop the widget into any CMS, documentation page, or internal tool with a single <iframe> — no API key, no account, no build step required.',
    homepageLinkLabel: 'Embed on your site →',
  },

  errors: {
    notFound: {
      code: '404',
      title: 'Page not found',
      description:
        'The page you’re looking for doesn’t exist. Head back to the PostTruncate editor.',
      heading: 'This page got truncated',
      body: 'The page you’re looking for doesn’t exist, moved, or never did. The editor is still right where you left it.',
      cta: 'Back to the editor',
    },
    serverError: {
      code: '500',
      title: 'Something went wrong',
      description:
        'An unexpected error occurred. Head back to the PostTruncate editor and try again.',
      heading: 'Something went wrong on our end',
      body: 'That’s a server error, not you. Try again in a moment — the editor runs entirely in your browser, so your text is safe either way.',
      cta: 'Back to the editor',
    },
  },


  banner: {
    text: 'Your {platform} preview is below',
    close: 'Dismiss',
  },

  whyPostTruncate: {
    eyebrow: 'WHY POSTTRUNCATE?',
    title: 'Write with confidence.<br/>Post without worries.',
    p1: 'Every platform has different character limits and truncation rules. PostTruncate shows you exactly how your content will appear before you hit publish.',
    p2: 'Save time, increase engagement, and make every character count with real-time previews, smart insights, and one-tap AI tone rewriting.',
    features: {
      realTime: {
        title: 'Real-time Previews',
        desc: 'See exactly how your post will appear across 6+ platforms instantly.',
      },
      insights: {
        title: 'Smart Insights',
        desc: 'Get readability scores, keyword analysis, and content optimization tips.',
      },
      privacy: {
        title: 'Privacy First',
        desc: 'Your content is never stored or shared. Everything stays private.',
      },
      aiTone: {
        title: 'AI Tone Rewriter',
        desc: 'Instantly rewrite your post in a professional, casual, friendly, or concise tone with one tap — powered by AI.',
      },
    },
  },

  howTruncationWorks: {
    eyebrow: 'HOW TRUNCATION WORKS',
    description: 'Each platform has unique character limits and display rules. When your content exceeds these limits, it gets truncated with "..." or "See more". PostTruncate simulates exactly how your post will appear after publishing.',
    platforms: {
      linkedin: { name: 'LinkedIn', desc: 'Shows ~220 chars before "...see more"' },
      twitter: { name: 'X (Twitter)', desc: 'Shows ~125 chars before truncation (varies by device)' },
      instagram: { name: 'Instagram', desc: 'Shows ~125 chars, tap "more" to expand' },
      facebook: { name: 'Facebook', desc: 'Shows ~160 chars before "...see more"' },
      threads: { name: 'Threads', desc: 'Similar to Instagram with ~125 chars before truncation' },
      sms: { name: 'SMS (GSM)', desc: '160 chars per SMS for GSM, 70 for Unicode' },
    },
  },

  platformCharacterLimits: {
    eyebrow: "PLATFORM CHARACTER LIMITS",
    headers: {
      platform: "Platform",
      characterLimit: "Character Limit",
      shownInFeed: "Shown In Feed",
      bestPractice: "Best Practice",
      notes: "Notes"
    },
    viewAll: "View all platform limits",
    platforms: {
      linkedin: {
        name: "LinkedIn",
        limit: "3,000",
        shown: "~220 characters",
        bestPractice: "Keep key message early",
        notes: "Articles support up to 125,000 characters"
      },
      twitter: {
        name: "X (Twitter)",
        limit: "280",
        shown: "~125 characters",
        bestPractice: "Front-load important info",
        notes: "Links reduce available characters"
      },
      instagram: {
        name: "Instagram Caption",
        limit: "2,200",
        shown: "~125 characters",
        bestPractice: "Hook early, add CTA",
        notes: "Hashtags count toward limit"
      },
      facebook: {
        name: "Facebook Post",
        limit: "63,206",
        shown: "~160 characters",
        bestPractice: "Keep it concise",
        notes: "Images and links affect display"
      },
      threads: {
        name: "Threads",
        limit: "500",
        shown: "~125 characters",
        bestPractice: "Short & engaging",
        notes: "Meta's text-based platform"
      },
      sms: {
        name: "SMS (GSM)",
        limit: "160",
        shown: "160 per SMS",
        bestPractice: "Keep under 160",
        notes: "Longer texts split into multiple SMS"
      }
    }
  },

  whoIsItFor: {
      eyebrow: "WHO IS IT FOR?",
      title: "Perfect for every content creator",
      roles: {
          marketers: {
              title: "Marketers",
              desc: "Optimize campaigns, ad copy, and social posts for maximum reach and engagement."
          },
          creators: {
              title: "Creators",
              desc: "Write better captions and threads that get more likes, shares, and saves."
          },
          agencies: {
              title: "Agencies",
              desc: "Manage multiple clients and ensure every post is perfectly optimized."
          },
          founders: {
              title: "Founders",
              desc: "Share updates and build your brand with clear, impactful content."
          }
      }
  },

  ctaBanner: {
    title: 'Ready to optimize your content?',
    body: 'Join thousands of creators and marketers who write better, post smarter, and get more engagement.',
    cta: 'Start Writing Free',
    noCard: 'No credit card required',
    free: 'Free forever',
  },

  island: {
    dashboard: {
      loadSample: 'Load a sample post →',
      sample:
        'We shipped a tiny feature last week that quietly doubled our trial-to-paid rate.\n\n' +
        'No new pricing. No growth hack. Just one change to the onboarding flow that removed a single decision from the first screen.\n\n' +
        'Here’s exactly what we changed and the three things we measured before rolling it out to everyone → https://posttruncate.com/blog/onboarding\n\n' +
        '#saas #productled #growth #startups',
      samples: {
        linkedin:
          'We shipped a tiny feature last week that quietly doubled our trial-to-paid rate.\n\n' +
          'No new pricing. No growth hack. Just one change to the onboarding flow that removed a single decision from the first screen.\n\n' +
          'Here’s exactly what we changed and the three things we measured before rolling it out to everyone → https://posttruncate.com/blog/onboarding\n\n' +
          '#saas #productled #growth #startups',
        twitter:
          'We shipped one tiny onboarding change last week and our trial-to-paid rate doubled.\n\n' +
          'No new pricing. No growth hack. Just one less decision on the first screen.\n\n' +
          'Full write-up → https://posttruncate.com/blog/onboarding\n\n' +
          '#buildinpublic #saas',
        instagram:
          'One tiny change. Double the results. 🚀\n\n' +
          'Last week we removed a single decision from our onboarding flow — and watched our trial-to-paid rate double. No new pricing, no gimmicks. ✨\n\n' +
          'Full breakdown of what we changed (and the 3 things we measured) is in our bio. 👀\n\n' +
          '.\n.\n.\n' +
          '#saas #startup #productdesign #onboarding #growthtips #buildinpublic #entrepreneur #techstartup',
        facebook:
          'Quick story from last week 👇\n\n' +
          'We shipped one small change to our onboarding — just removed a single decision from the very first screen — and our trial-to-paid rate doubled. No new pricing, no fancy growth hack.\n\n' +
          'We wrote up exactly what we changed and the three things we measured before rolling it out. Have a read and let us know what you think → https://posttruncate.com/blog/onboarding',
        threads:
          'ok this is kind of wild — we removed ONE decision from the first screen of our onboarding last week and trial-to-paid literally doubled.\n\n' +
          'no new pricing. no growth hack. just less friction.\n\n' +
          'anyone else seen results this big from a change this small?',
        sms:
          'Hey! Quick one — that onboarding tweak we shipped last week doubled our trial-to-paid rate. Wrote up what changed + the 3 things we measured: https://posttruncate.com/blog/onboarding',
      },
    },
    workspace: {
      eyebrow: 'Workspace',
      title: 'Write your post',
      badgeEditor: 'Editor',
      hiddenBadge: { one: '{n} hidden char', other: '{n} hidden chars' },
      placeholder: 'Start typing your post. Paste a draft, drop in a few links and hashtags, and watch each platform’s preview update on the right…',
      placeholders: {
        linkedin: "Start typing your post. Paste a draft, drop in a few links and hashtags, and watch your post's live preview update in LinkedIn on the right…",
        facebook: "Start typing your post. Paste a draft, drop in a few links and hashtags, and watch your post's live preview update in Facebook on the right…",
        instagram: "Start typing your post. Paste a draft, drop in a few links and hashtags, and watch your post's live preview update in Instagram on the right…",
        twitter: "Start typing your post. Paste a draft, drop in a few links and hashtags, and watch your post's live preview update in X (Twitter) on the right…",
        threads: "Start typing your post. Paste a draft, drop in a few links and hashtags, and watch your post's live preview update in Threads on the right…",
        sms: "Start typing your post. Paste a draft, drop in a few links and hashtags, and watch your post's live preview update in SMS on the right…",
      },
      counters: {
        characters: 'Characters',
        words: 'Words',
        lines: 'Lines',
        paragraphs: 'Paragraphs',
      },
      timers: {
        reading: 'Reading',
        speaking: 'Speaking',
        lessThan30Sec: '< 30 sec',
        minute: { one: 'min', other: 'min' },
        second: { one: 'sec', other: 'sec' },
      },
      formatterLabel: 'Format toolkit',
      uppercase: 'UPPERCASE',
      lowercase: 'lowercase',
      titleCase: 'Title Case',
      sentenceCase: 'Sentence Case',
      emojiStripper: 'Emoji Stripper',
      hashtagExtractor: 'Hashtag Extractor',
      engineLabel: 'Optimization engine',
      clean: 'Clean excess space',
      sanitize: 'Sanitize text',
      clear: 'Clear editor',
      hiddenWarning:
        'Found invisible characters that break counts and screen readers: {codes}. Sanitize to strip them.',
      statusLine: 'Real-time analysis is on',
    },
    imageUpload: {
      add: 'Add image',
      replace: 'Replace image',
      remove: 'Remove image',
      hint: 'Preview only — never uploaded or stored. Clears on reload.',
    },
    aiImprove: {
      button: 'AI Improve',
      pickTone: 'Improve with AI',
      pickToneSub: 'Pick a tone — AI rewrites your post.',
      tones: {
        professional: 'Professional',
        casual: 'Casual',
        marketing: 'Marketing',
        friendly: 'Friendly',
        concise: 'Concise',
      },
      cancel: 'Cancel',
      improving: 'Improving your post…',
      undo: 'Undo',
      reverted: 'Reverted to your original text.',
      remaining: {
        one: '{n} of {max} AI improvement left',
        other: '{n} of {max} AI improvements left',
      },
      limitReached: 'You’ve used all your AI improvements. Try again in {time}.',
      errorGeneric: 'Couldn’t improve the text. Please try again.',
      errorEmpty: 'Write something first.',
      errorTooLong: 'Text is too long for AI Improve (max {max} characters).',
      errorUnavailable: 'AI Improve is temporarily unavailable.',
    },
    previewPanel: {
      title: 'Live platform preview',
      tabAria: '{platform} preview',
      compareAll: 'Compare all',
      showHidden: 'Show folded text',
    },
    insights: {
      title: 'Advanced insights',
      sub: 'Writing analysis, readability, keywords, and more',
      subScoped: 'Readability, Keywords density',
    },
    hookStrip: {
      heading: 'See how your post performs everywhere',
      viewAll: 'View all platform limits',
      limitLabel: '{n} limit',
      perSms: '{n} per SMS',
      survives: 'Hook survives',
      cut: 'Hook cut off',
      risk: 'Hook at risk',
      smsNeeded: '{n} SMS needed',
      chars: '{n} characters',
    },
    common: {
      displayName: 'Your Name',
      handle: 'you',
      timestamp: '11h',
      charsSuffix: '{n} chars',
      actions: {
        like: 'Like',
        comment: 'Comment',
        share: 'Share',
      },
    },
    sms: {
      placeholder: 'Type or paste your SMS message here — you’ll see its encoding (GSM-7 or Unicode), the live character count, and how many segments it will send.',
      eyebrow: 'SMS',
      title: 'Global character counter',
      characterCount: 'Character count',
      charactersLeft: 'Characters left',
      parts: 'SMS parts',
      encoding: 'Encoding',
      encodingGsm: 'GSM 7-bit',
      encodingUnicode: 'Unicode',
      partsValue: '{n} SMS',
      gsmNote:
        'GSM 7-bit: 160 characters for one SMS, then 153 per stitched SMS. Extension-table characters such as €, [, ], {, }, \\ and | count as 2.',
      unicodeNote:
        'Unicode UTF-16: 70 characters for one SMS, then 67 per stitched SMS. This applies when any emoji or non-GSM script is present.',
    },
    linkedin: {
      title: 'Hook zone preview',
      viewAriaLabel: 'LinkedIn fold view',
      viewDesktop: 'Desktop',
      viewMobile: 'Mobile',
      badgeTruncated: 'Truncated feed text',
      badgeOverLimit: 'Over post limit',
      badgeSafe: 'Safe hook line',
      beforeFold: '{total} / {limit} before fold',
      postLimit: '{total} / {limit} post limit',
      seeMore: '…see more',
      headline: 'Founder & CEO',
      connectionDegree: '3rd',
      placeholder: 'Your post’s opening lines appear here…',
      overLimitNote:
        'LinkedIn posts cap at {limit} characters. Shorten by {excess} before publishing.',
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
      badgeCaptionOver: 'Caption too long',
      captionLimit: '{total} / {limit} caption cap',
      captionOver:
        'Instagram captions cap at {limit} characters. Shorten by {excess} before publishing.',
      hashtagLabel: 'Hashtag concentration',
      over: 'Over Instagram’s hard limit of {limit} hashtags — the caption will fail to post. Remove {excess}.',
      approaching:
        'Approaching the 5-tag ceiling. Trim to your highest-intent tags.',
      within: 'Comfortably within Instagram’s 5-hashtag limit.',
      none: 'No hashtags detected yet.',
      a11yLabel: 'Accessibility · fancy fonts',
      audiencePublic: 'Public',
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
    keywords: {
      eyebrow: 'Keywords',
      title: 'Overuse monitor',
      badgeIdle: 'Idle',
      badgeStuffing: 'Keyword stuffing',
      badgeBalanced: 'Balanced',
      colKeyword: 'Keyword',
      colUses: 'Uses',
      colDensity: 'Density',
      overused: 'Overused',
      empty: 'Start typing to see your most-used keywords and their density.',
      stuffingNote:
        'Highlighted keywords exceed {threshold}% density — search engines may read this as keyword stuffing. Vary your wording.',
      footnote:
        '{total} words · keywords over {threshold}% density are flagged',
    },
    seoPreview: {
      eyebrow: 'SEO Preview',
      title: 'Google SERP simulator',
      badgeIdle: 'Idle',
      badgeSafe: 'Looks good',
      badgeWarn: 'Over limit',
      titleLabel: 'Page title',
      titleCounter: '{n} / {limit}',
      pixelNote: '~{px}px · Google clips at ~{max}px',
      titleOverChar:
        'Title exceeds {limit} characters — Google may truncate in search results.',
      titleOverPixel:
        'Title may be clipped in search results (~{max}px render limit).',
      descLabel: 'Meta description',
      descCounter: '{n} / {limit}',
      descOverChar: 'Description exceeds {limit} characters.',
      previewLabel: 'Google Search Preview',
      titlePlaceholder: 'Your page title…',
      descPlaceholder: 'A brief description of your page for search results…',
    },
    readability: {
      eyebrow: 'Readability',
      title: 'Flesch Reading Ease',
      scoreLabel: 'Reading Ease',
      gradeLabel: 'Grade Level',
      descriptors: {
        veryEasy: 'Very easy',
        easy: 'Easy',
        fairlyEasy: 'Fairly easy',
        standard: 'Standard',
        fairlyDifficult: 'Fairly difficult',
        difficult: 'Difficult',
        veryDifficult: 'Very difficult',
      },
      tooltip:
        'Flesch Reading Ease scores text on a 0–100 scale. Higher is easier to read. 60–70 is standard prose; below 30 is very difficult.',
      notApplicable:
        'The Flesch formula is designed for Latin-script text and does not apply to this language. Use word count as your primary readability measure.',
    },
    toolLinks: {
      linkedin: 'Learn about LinkedIn character limits →',
      twitter: 'Learn about X / Twitter character limits →',
      instagram: 'Learn about Instagram character limits →',
      facebook: 'Learn about Facebook character limits →',
      threads: 'Learn about Threads character limits →',
    },
    embed: {
      placeholder: 'Start typing to count characters…',
      charCount: 'Characters',
      wordCount: 'Words',
      remaining: '{n} remaining',
      overLimit: '{n} over',
      platforms: {
        twitter: 'X / Twitter',
        linkedin: 'LinkedIn',
        threads: 'Threads',
        instagram: 'Instagram',
        sms: 'SMS',
      },
    },
    hook: {
      eyebrow: 'Hook Visibility',
      title: 'Above-the-fold check',
      statusPass: 'Hook survives',
      statusWarn: 'CTA below fold',
      statusFail: 'Hook truncated',
      statusIdle: 'No text yet',
      reasonEmpty: 'Add text to see what survives the fold.',
      reasonFits: 'Your whole post fits above the fold — nothing is hidden.',
      reasonHookCut: 'Your opening hook is cut off by the “…more” fold.',
      reasonCtaBelow: 'Your CTA falls below the “…more” fold.',
      reasonHookOnly: 'Your hook clears the fold; no CTA detected.',
      reasonHookAndCta: 'Your hook and CTA both clear the fold.',
      xReasonFits: 'Your whole post fits in a single tweet.',
      xReasonHookCut: 'Your opening hook spills into a second tweet.',
      xReasonCtaBelow: 'Your CTA appears in a threaded tweet.',
      xReasonHookOnly: 'Your hook fits in the first tweet; no CTA detected.',
      xReasonHookAndCta: 'Your hook and CTA both fit in the first tweet.',
      foldLabel: 'fold',
      foldAria: 'Fold line — text below is hidden behind “…more”.',
      summary: '{pass} of {total} platforms keep your hook visible',
    },
    calculators: {
      wordsPerPage: {
        eyebrow: 'Words to Pages',
        title: 'Page count estimator',
        badgeIdle: 'Enter text',
        badgeResult: 'Estimated',
        modeAria: 'Choose how to enter your text',
        modeText: 'Paste text',
        modeCount: 'Word count',
        placeholder: 'Paste or type your text here to count the words…',
        wordsLabel: 'Number of words',
        wordsPlaceholder: 'e.g. 1500',
        fontSizeLabel: 'Font size',
        spacingLabel: 'Line spacing',
        spacingSingle: 'Single',
        spacingOneAndHalf: '1.5 lines',
        spacingDouble: 'Double',
        pagesLabel: 'Pages',
        wordsStatLabel: 'Words',
        perPageNote: '{n} words per page at this setting',
        referenceHeading: 'Common word counts',
        refWordsCol: 'Words',
        refPagesCol: 'Pages',
        fontLabel: 'Font',
        pageFormatLabel: 'Page size',
        marginsLabel: 'Margins',
        marginTop: 'Top',
        marginRight: 'Right',
        marginBottom: 'Bottom',
        marginLeft: 'Left',
        unitsLabel: 'Units',
        unitInch: 'inches',
        unitCm: 'cm',
        printButton: 'Print',
      },
      readingTime: {
        eyebrow: 'Reading & Speaking Time',
        title: 'Reading time calculator',
        badgeIdle: 'Enter text',
        badgeResult: 'Estimated',
        modeAria: 'Choose how to enter your text',
        modeText: 'Paste text',
        modeCount: 'Word count',
        placeholder: 'Paste or type your text here to estimate reading and speaking time…',
        wordsLabel: 'Number of words',
        wordsPlaceholder: 'e.g. 1500',
        readingSpeedLabel: 'Reading speed',
        speakingSpeedLabel: 'Speaking speed',
        speedSlow: 'Slow',
        speedAverage: 'Average',
        speedFast: 'Fast',
        wpmShort: 'wpm',
        wordsStatLabel: 'Words',
        referenceHeading: 'Common lengths',
        refWordsCol: 'Words',
        refReadingCol: 'Reading',
        refSpeakingCol: 'Speaking',
      },
      byteCounter: {
        eyebrow: 'Byte Counter',
        title: 'UTF-8 byte calculator',
        badgeIdle: 'Enter text',
        badgeResult: 'Counted',
        placeholder: 'Paste or type text to count its size in bytes…',
        utf8Label: 'UTF-8 bytes',
        utf16Label: 'UTF-16 bytes',
        utf32Label: 'UTF-32 bytes',
        charactersLabel: 'Characters',
        codePointsLabel: 'Code points',
        note: 'UTF-8 uses 1–4 bytes per character: ASCII is 1 byte, accented Latin 2, most CJK 3, and emoji 4.',
      },
      emojiDetector: {
        eyebrow: 'Emoji & Hidden Characters',
        title: 'Emoji counter & invisible character detector',
        badgeIdle: 'Enter text',
        badgeClean: 'Clean',
        badgeWarn: 'Hidden found',
        placeholder: 'Paste or type text to count emoji and detect invisible characters…',
        emojiLabel: 'Emoji',
        charactersLabel: 'Characters',
        hiddenLabel: 'Hidden characters',
        cleanNote: 'No invisible or zero-width characters detected.',
        removeButton: 'Remove hidden characters',
        removedNote: 'Removed {n} hidden character(s).',
        note: 'Invisible characters like zero-width spaces can break copy-paste, search, and screen readers. Use Remove to strip them.',
      },
      platformCounter: {
        title: 'Character counter',
        badgeIdle: 'Enter text',
        badgeSafe: 'Within limits',
        badgeOver: 'Over limit',
        placeholder: 'Type or paste your text…',
        counter: '{n} / {limit}',
        remaining: '{n} left',
        over: '{n} over',
        fields: {
          title: 'Title',
          description: 'Description',
          caption: 'Caption',
          bio: 'Bio',
          post: 'Post',
          message: 'Message',
          status: 'Status',
          about: 'About',
        },
      },
      sentenceCounter: {
        eyebrow: 'Sentences & Paragraphs',
        title: 'Sentence & paragraph counter',
        badgeIdle: 'Enter text',
        badgeResult: 'Counted',
        placeholder: 'Paste or type text to count sentences and paragraphs…',
        sentencesLabel: 'Sentences',
        note: 'Sentence counts are an estimate — abbreviations and decimals can shift the total slightly.',
      },
      clear: 'Clear',
    },
  },
};
