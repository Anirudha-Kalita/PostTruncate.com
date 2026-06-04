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
    links: { editor: 'Editor', guides: 'Platform Guides', faq: 'FAQ', about: 'About', contact: 'Contact' },
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

  seoCopy: {
    ariaLabel: 'About PostTruncate',
    sections: [
      {
        heading: 'Master Online Character Counter & Text Length Checker',
        paragraphs: [
          'Writing high-impact copy for digital platforms requires absolute precision. <strong>PostTruncate</strong> is a premium, free <strong>character counter tool</strong> designed to analyze your <strong>character count online</strong>, track letter distribution, and optimize reading metrics in real-time. Whether you are balancing an academic essay length, checking an <strong>sms character counter</strong> limit, or cleaning up a professional draft, our instant string analyzer operates completely client-side as a high-performance <strong>online char counter</strong>.',
          'As a comprehensive <strong>character and word counter</strong>, it allows creators to <strong>count characters of text</strong> instantly. Unlike a basic <strong>char counter online</strong>, this system functions seamlessly as an <strong>online character counter</strong> and <strong>character checker</strong> that processes your data with 100% privacy, executing entirely within your web browser. Use it as your go-to <strong>character number counter</strong> to <strong>count amount of characters</strong>, ensure accurate <strong>character length</strong>, and run a quick <strong>character count check</strong> before you publish anywhere on the web.',
        ],
      },
      {
        heading: '𝕏 (Twitter) Character Counter & Automatic Thread Splitter',
        paragraphs: [
          'Navigating the strict <strong>character count limit</strong> on free 𝕏 (Twitter) accounts can be incredibly frustrating. Our dedicated <strong>twitter character counter</strong> engine handles the heavy lifting for you by integrating the platform’s native link-counting rules. While pasting a web URL normally takes up a massive block of text, our <strong>char length counter</strong> automatically calculates any link as exactly 23 characters, reflecting the precise <strong>character length count</strong> it will hold once published.',
          'If your thoughts spill past the standard <strong>text character counter</strong> boundaries, the built-in smart thread manager seamlessly segments your prose. It avoids cutting words in half, splitting sentences cleanly at the nearest period, comma, or space break. It acts as a <strong>free character counter</strong> and <strong>word text counter</strong> combined, formatting your draft into a beautifully numbered sequential thread layout so your messaging remains continuous, engaging, and perfectly optimized for high engagement metrics.',
        ],
      },
      {
        heading: 'Instagram & Facebook Character Counter Including Spaces',
        paragraphs: [
          'To hook your target audience on highly visual networks, you have to win the battle against feed truncation algorithms. Instagram allows a generous caption limit, but it brutally cuts off your text behind a hidden link after the first 125 characters. Our <strong>instagram character counter</strong> tracks your exact input length <strong>character counter including spaces</strong> to ensure your core call-to-action sits safely above the fold.',
          'By analyzing your <strong>character counter with spaces</strong> and evaluating your <strong>character count in text</strong> parameters, you can format your copy layout perfectly. Furthermore, the dashboard displays a real-time monitor for your hashtag concentration. If your profile layout exceeds 30 hashtags, our system flags an immediate warning to protect your profile from accidental algorithmic shadowbans. It serves as an all-in-one <strong>words and characters counter</strong> and <strong>word counter tool online</strong> for social growth.',
        ],
      },
      {
        heading: 'Advanced Word Count, Symbols, and Platform Copy Analytics',
        paragraphs: [
          'Beyond standard social profiles, PostTruncate serves as a robust <strong>word counter tool</strong> and <strong>symbol counter</strong> for developers, copywriters, and SEO specialists. If you are assessing meta tags using a <strong>moz character counter</strong>, cleaning up documentation with a <strong>macos character counter</strong>, tracking localization with a <strong>chinese character counter</strong>, or polishing drafts with a <strong>grammarly character counter</strong>, our platform delivers a localized, multi-utility experience.',
          'It functions as an advanced <strong>word count character count</strong> system that allows you to calculate characters online, <strong>count letter online</strong>, <strong>count symbol online</strong>, and run an <strong>online count letters</strong> analysis instantly. Avoid the clutter of an outdated <strong>on line word counter</strong>. Use our responsive, modern <strong>word counter+</strong> dashboard to handle <strong>word to character count</strong> conversions, audit <strong>character count in word</strong> documents, and utilize a high-performance <strong>character counter word</strong> engine engineered to elevate your digital copywriting workflow across the USA, UK, Australia, and globally.',
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
        a: 'PostTruncate works as a live character counter against each platform’s published and widely-observed limits — 280 for X, 210/140 for the LinkedIn fold, 30 hashtags for Instagram, and a flat 23-character weight for links. The same engine doubles as a Twitter character counter, Instagram character counter, and general character checker, so one character count check covers every network. Platforms occasionally adjust these character count limits, and rendering varies slightly by device, so treat the previews as a close estimate rather than a pixel-perfect guarantee.',
      },
      {
        q: 'Do spaces and punctuation count as characters?',
        a: 'Yes. Every space, line break, and punctuation mark counts as one character, and both PostTruncate’s counter and the platform limits include them. That makes it a true character counter with spaces — a character counter including spaces — so when you count amount of characters or count no of characters here, the total matches what each platform actually measures. The only common exception is links on X/Twitter, which collapse to a flat 23 characters regardless of how many letters, symbols, or slashes the real URL contains.',
      },
      {
        q: 'How do emojis affect the character count?',
        a: 'PostTruncate counts by Unicode code points, so as a symbol counter it treats a simple emoji like 🙂 as a single character. Many emoji are built from several joined code points, though — skin-tone variations, flags, and combined glyphs such as 👨‍👩‍👧 — and those register as two or more. The same code-point logic lets it work as a Chinese character counter and a letter counter for any script, so you can count symbol online or count letters online with the same accuracy. Most platforms, X especially, also weight emoji more heavily than plain letters, so an emoji-heavy draft uses up a little more of your limit than the visible glyph count suggests.',
      },
      {
        q: 'What is the difference between character count and word count?',
        a: 'Character count is the total of every individual character — letters, spaces, punctuation, and emoji all included — and it is what platform limits are actually measured against. Word count is the number of whitespace-separated words, no matter how long each one is. Because PostTruncate is a character and word counter in one, you can count words and characters together and read the word count character count side by side; it doubles as a word counter tool and a word to character count converter when you need both numbers. A full 280-character tweet might be only 40 words, so watch the character count to stay under a limit and use word count as a readability gauge.',
      },
      {
        q: 'Why does my link count as 23 characters on X?',
        a: 'X automatically wraps every URL with its t.co shortener, which always occupies 23 characters regardless of how long or short the original link is. So a 5-character link and a 200-character link both cost you exactly 23 toward the 280 limit. PostTruncate mirrors this in its weighted Twitter character counter, and because it also tracks plain character length it works as an SMS character counter when you need to fit a message into a single text. Either way you get an exact character length count for the medium you are posting to.',
      },
      {
        q: 'What are “fancy fonts” and why are they flagged?',
        a: 'Those bold, italic, or script-style letters you paste from font generators aren’t real formatting — they’re pseudo-Unicode characters from the Mathematical Alphanumeric Symbols block. They look styled but screen readers either spell them out letter by letter or skip them, which hurts both accessibility and your organic reach. As a character number counter PostTruncate still tallies them so you can see exactly how many characters they add, and the monitor flags them so you can swap back to plain text.',
      },
      {
        q: 'What does “Sanitize text” remove?',
        a: 'It strips invisible and zero-width characters — zero-width spaces, byte-order marks, bidirectional control marks, soft hyphens, and stray control codes. These often sneak in when you copy from other apps, and they silently break character counts and accessibility on older mobile clients without ever being visible. Run a character count check after sanitizing and the char length counter drops to the real, visible total — handy whenever your character count in word processors and your social drafts disagree.',
      },
      {
        q: 'Is my text sent anywhere?',
        a: 'No. The entire editor and every preview run locally in your browser, so even though it works as an online character counter, nothing is uploaded — it can calculate characters online without your draft ever leaving the page. Your text never leaves your device: there’s no account, no upload, and no server processing of your content, yet you still get an instant character count in text as you type.',
      },
      {
        q: 'Is PostTruncate free?',
        a: 'Yes, it’s completely free to use with no sign-up required — a free character counter and word counter tool online that’s ready the moment the page loads. Whether you want a quick char counter online, a character count online free, or a full character count tool for every platform, there’s nothing to install. The tool is supported by unobtrusive ads placed in reserved spaces that never shift the layout while you’re working.',
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
        links: ['Privacy', 'Terms', 'About', 'Contact'],
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
            'Write or paste a draft once, and PostTruncate renders it the way <strong>LinkedIn, X, Threads, Instagram, and Facebook</strong> actually will — the “…see more” fold, the 280-character thread split, the 23-character link weighting, the 30-hashtag ceiling. You see exactly what survives above the fold before you commit to publishing.',
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
            'Everything runs in your browser. Your text is never uploaded, there are no accounts, and the tool is free to use. It’s supported by unobtrusive ads in reserved spaces that never shift the layout. Read the full details in our <strong>Privacy Policy</strong>.',
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
  },
};
