// ──────────────────────────────────────────────────────────────────────────
// Ad Previews & Simulators registry — the "Ad Previews" silo.
//
// Parallel to src/data/tools.ts and src/data/calculators.ts, but for
// platform-accurate ad preview simulators. Each entry drives one page per
// locale at /[lang]/ad-previews/<slug>/, rendered by
// src/components/AdPreviewPageContent.astro with a live Preact simulator island
// chosen by `id` in the route's component map.
//
// Reuses the ToolDefinition shape so it composes with the same content helpers
// (prepareToolContent / buildCanonicalSlugs), StructuredData component, and the
// astro.config.mjs sitemap/hreflang machinery (added to its toolGroups loop
// with prefix 'ad-previews/').
//
// English-first: only the `en` key is authored today. Every record falls back
// to `en` at render time (see tStr in the route/content components), so the
// silo is structurally ready for all 10 locales while shipping English copy.
// ──────────────────────────────────────────────────────────────────────────

import type { ToolDefinition } from './tools';

export const adPreviews: ToolDefinition[] = [
  {
    id: 'facebook-ads',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-18',
    platformLimits:
      'Facebook Feed primary text truncates at ~125 characters behind "… See More"; headline best kept to 27–40 characters; link description ~30 characters.',

    slugs: { en: 'facebook-ads' },

    schemaName: { en: 'Facebook Ad Preview & Character Limit Simulator' },

    titles: {
      en: 'Facebook Ad Preview — Live Feed Mockup & Character Limits',
    },

    metaDescriptions: {
      en: 'Free Facebook Feed ad preview. See exactly where your primary text hits the "… See More" cutoff at 125 characters, check headline and description limits, and switch between mobile and desktop — live as you type.',
    },

    intro: {
      en: 'Paste your primary text, headline, and description below to see a pixel-accurate Facebook Feed ad mockup. The preview applies Facebook\'s real 125-character "See More" truncation and shows how your headline behaves on mobile versus desktop.',
    },

    content: {
      en: `<h2>Facebook ad character limits that actually matter</h2>
<p>Facebook does not publish a single hard "ad limit" — what trips up advertisers is <strong>truncation</strong>. On the Facebook Feed, your <strong>primary text is cut off at roughly 125 characters</strong>, after which the platform appends an unclickable "… See More". Everything past that point is hidden unless the viewer taps to expand, and most never do. The simulator above shows that cutoff live, so you can guarantee your hook and value proposition land above the fold.</p>
<h2>Headline and description rules</h2>
<p>The <strong>headline</strong> is the bold line beneath your creative. Facebook recommends keeping it short, and on mobile a headline longer than about <strong>40 characters</strong> gets squeezed or wraps awkwardly; under <strong>27 characters</strong> is the safest zone for full visibility across placements. The <strong>link description</strong> caps around <strong>30 characters</strong> and is frequently dropped entirely when the headline is long or the placement is narrow — never put critical information there.</p>
<h2>Mobile versus desktop</h2>
<p>The overwhelming majority of Facebook ad impressions are mobile, and mobile is far less forgiving: less horizontal room, earlier truncation, and a higher chance the description disappears. Toggle the preview between <strong>Mobile</strong> and <strong>Desktop</strong> to confirm your ad reads cleanly on the placement that matters most — the small screen.</p>
<h2>Why preview before you publish</h2>
<p>Rewriting an ad after it has entered review wastes time and can reset its learning phase. Checking truncation in advance means your strongest copy is never buried behind "See More," your headline never clips, and your call to action stays visible. Because PostTruncate runs entirely in your browser, nothing you paste is uploaded or stored — type your draft, watch the cutoff in real time, and copy the final version straight into Ads Manager.</p>`,
    },

    faq: {
      en: [
        {
          q: 'What is the Facebook ad primary text character limit?',
          a: 'There is no hard cap, but the Feed truncates primary text at about 125 characters with a "… See More" link. Keep your hook and core message before that point so it shows without a tap.',
        },
        {
          q: 'How long can a Facebook ad headline be?',
          a: 'Technically up to 40 characters display cleanly on most placements, but under 27 characters is safest on mobile, where longer headlines get squeezed or wrapped.',
        },
        {
          q: 'Does the link description always show?',
          a: 'No. The ~30-character link description is often dropped on mobile or when the headline is long. Treat it as optional and never place essential information there.',
        },
        {
          q: 'Is my ad copy uploaded anywhere?',
          a: 'No. The preview runs entirely in your browser. Nothing you type or any image you attach is sent to a server or stored.',
        },
      ],
    },
  },

  {
    id: 'google-ads',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-18',
    platformLimits:
      'Google Responsive Search Ads: headlines max 30 characters each, descriptions max 90 characters; the desktop SERP clips combined headlines around a 600px container width.',

    slugs: { en: 'google-ads' },

    schemaName: { en: 'Google Responsive Search Ads Preview (Pixel-Accurate)' },

    titles: {
      en: 'Google Ads Preview — Pixel-Accurate Responsive Search Ad Simulator',
    },

    metaDescriptions: {
      en: 'Free Google Responsive Search Ads preview. Measures your headlines by true pixel width with a canvas engine, enforces the 30-character headline and 90-character description caps, and shows when a headline drops on the desktop SERP.',
    },

    intro: {
      en: 'Enter your Responsive Search Ad headlines and descriptions to see a pixel-accurate Google SERP mockup. The simulator measures real rendered width — not an average — so you can see exactly when a third headline would be dropped on desktop.',
    },

    content: {
      en: `<h2>Google Responsive Search Ads character limits</h2>
<p><strong>Responsive Search Ads (RSA)</strong> have firm character caps: each <strong>headline is limited to 30 characters</strong> and each <strong>description to 90 characters</strong>. Google mixes and matches your headlines and descriptions automatically, showing up to three headlines and two descriptions at once. The counters in the simulator above enforce these caps as you type, so a clamped field is impossible to miss.</p>
<h2>Why pixel width matters more than character count</h2>
<p>The 30-character cap is only half the story. Google renders headlines in a row separated by vertical bars, and the desktop ad slot is roughly a <strong>600px-wide container</strong>. Three headlines that each pass the 30-character check can still overflow that width — in which case Google <strong>drops the trailing headline</strong> rather than wrapping it. This tool measures each headline by its <strong>true rendered pixel width</strong> using an HTML5 canvas, exactly the way a browser paints Arial, instead of guessing with an average-character estimate. That means the preview drops Headline 3 at the same point Google would.</p>
<h2>Writing headlines that survive</h2>
<p>Front-load the headlines that must always appear, and pin them to positions 1 and 2 in Google Ads if they are non-negotiable. Keep wide characters (capital letters, "W" and "M") in mind — a 28-character all-caps headline can be physically wider than a 30-character lowercase one. The live pixel meter shows the difference instantly.</p>
<h2>Preview privately, then publish</h2>
<p>Every measurement happens in your browser; nothing is uploaded. Draft your RSA assets here, confirm that your most important headlines clear the pixel container on desktop, and paste the finished copy into Google Ads with confidence that nothing important silently disappears.</p>`,
    },

    faq: {
      en: [
        {
          q: 'What are the Google RSA character limits?',
          a: 'Each headline is capped at 30 characters and each description at 90 characters. You can supply up to 15 headlines and 4 descriptions; Google rotates combinations automatically.',
        },
        {
          q: 'Why does my headline get dropped even though it is under 30 characters?',
          a: 'Google shows headlines in a fixed-width container (~600px on desktop). If the combined rendered width of your headlines exceeds it, the trailing headline is dropped. Wide characters take more pixels than the character count suggests.',
        },
        {
          q: 'How is this preview pixel-accurate?',
          a: 'It measures text with an HTML5 canvas measureText engine in Arial, the same way a browser paints the SERP, instead of using an averaged character width. So truncation matches what Google actually renders.',
        },
        {
          q: 'Is my ad data sent anywhere?',
          a: 'No. All measurement and preview rendering happens locally in your browser. Nothing is uploaded or stored.',
        },
      ],
    },
  },

  {
    id: 'instagram-ads',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-18',
    platformLimits:
      'Instagram Feed caption truncates at ~125 characters behind "… more"; Reels captions are best kept to 40–72 characters; safe zones block the bottom ~20% and right ~15% of the creative.',

    slugs: { en: 'instagram-ads' },

    schemaName: { en: 'Instagram Feed & Reels Ad Preview with Safe Zones' },

    titles: {
      en: 'Instagram Ad Preview — Feed, Reels & Safe Zone Simulator',
    },

    metaDescriptions: {
      en: 'Free Instagram ad preview for Feed and Reels. See the 125-character caption cutoff, the tighter 40–72 character Reels window, and toggle a safe-zone overlay that shows where the UI covers your creative.',
    },

    intro: {
      en: 'Preview your Instagram ad in both Feed and Reels modes. See where your caption hits the "… more" fold, check the tighter Reels caption window, and toggle the safe-zone overlay to spot text that collides with Instagram\'s interface.',
    },

    content: {
      en: `<h2>Instagram caption limits: Feed versus Reels</h2>
<p>Instagram allows captions up to 2,200 characters, but visibility is what counts. In the <strong>Feed</strong>, an ad caption is truncated at roughly <strong>125 characters</strong> behind a "… more" link — the same practical fold as Facebook. In <strong>Reels</strong>, the usable space is far tighter: the caption sits over the video with the interface on top of it, so the comfortable window is about <strong>40 to 72 characters</strong> before your words start colliding with on-screen controls. The simulator switches between both modes so you can see each cutoff.</p>
<h2>Why safe zones make or break a Reel</h2>
<p>Reels and Stories overlay your creative with interface elements: the profile and caption block runs along the <strong>bottom ~20%</strong>, and the action stack — like, comment, share, audio — occupies the <strong>right ~15%</strong>. Any text or critical subject you bake into those regions gets covered. Toggle the <strong>Safe Zone overlay</strong> to see these danger areas as translucent bands over your media, so you can reposition important elements before export.</p>
<h2>Designing for the interface, not against it</h2>
<p>Keep logos, captions, and calls to action inside the clear central column. Treat the bottom fifth and right edge as off-limits for anything that must be read. For Feed ads, front-load the hook in the first 125 characters; for Reels, keep on-creative text short and high-contrast so it survives compression and small screens.</p>
<h2>A private, instant preview</h2>
<p>PostTruncate runs entirely in your browser — paste a caption and attach a creative and nothing is uploaded or saved. Check the Feed fold, the Reels window, and the safe-zone collisions in real time, then publish knowing your message stays visible.</p>`,
    },

    faq: {
      en: [
        {
          q: 'Where does an Instagram Feed caption get cut off?',
          a: 'At roughly 125 characters, after which Instagram shows a "… more" link. Put your hook and key message before that point.',
        },
        {
          q: 'How long should a Reels caption be?',
          a: 'Keep it tight — about 40 to 72 characters. Reels captions sit over the video and compete with the interface, so long captions get covered or pushed behind a "more" tap.',
        },
        {
          q: 'What are Instagram safe zones?',
          a: 'Regions of the screen covered by the interface: the bottom ~20% (profile and caption) and the right ~15% (the action icon stack). Keep important text and subjects out of these areas.',
        },
        {
          q: 'Is my caption or image uploaded?',
          a: 'No. Everything runs locally in your browser. Your caption and any attached creative never leave your device.',
        },
      ],
    },
  },

  {
    id: 'tiktok-ads',
    editorAnchor: 'workspace',
    lastUpdated: '2026-06-18',
    platformLimits:
      'TikTok description truncates around 100 characters behind "... See more" and is clamped to ~4 lines; safe zones block the top ~10%, bottom ~20%, and right ~15% of the 9:16 video.',

    slugs: { en: 'tiktok-ads' },

    schemaName: { en: 'TikTok Ad Preview — Safe Zones & Character Limits' },

    titles: {
      en: 'TikTok Ad Preview — 9:16 Safe Zone & Character Limit Simulator',
    },

    metaDescriptions: {
      en: 'Free TikTok ad preview. See the safe zones that prevent text cutoff, where the description hits the "... See more" cutoff at ~100 characters, and exactly where TikTok\'s UI covers your vertical 9:16 video.',
    },

    intro: {
      en: 'Preview your TikTok ad on a true 9:16 vertical canvas. See where your description hits the "... See more" cutoff, and toggle the safe-zone overlay to find the blind spots where TikTok\'s interface would cover hardcoded text in your video.',
    },

    content: {
      en: `<h2>TikTok ad character limits and the "See more" cutoff</h2>
<p>A TikTok ad <strong>description truncates around 100 characters</strong>, after which the platform appends an unclickable "... See more" and clamps the visible text to roughly <strong>four lines</strong>. Anything past that is hidden unless a viewer taps. Because TikTok is sound-on, fast-scrolling, and full-screen, your first line has to earn the watch — the simulator above shows the exact cutoff so your hook is never buried.</p>
<h2>TikTok safe zones: where not to put text</h2>
<p>This is the single biggest mistake in TikTok creative: <strong>baking text or logos into the parts of the video that TikTok's interface covers</strong>. On a vertical 9:16 video, the UI blocks three regions — the <strong>top ~10%</strong> (the For You / Following tabs and status bar), the <strong>bottom ~20%</strong> (username, caption, call to action, and the music ticker), and the <strong>right ~15%</strong> (the profile photo plus the like, comment, bookmark, and share icons). Toggle the <strong>Safe Zone overlay</strong> to see these blind spots as translucent red bands, so you know precisely where hardcoded text would be hidden.</p>
<h2>How to prevent text cutoff on TikTok</h2>
<p>Keep captions, prices, disclaimers, and logos inside the clear central area — never in the top bar, bottom fifth, or right rail. If you must place text low, raise it well above the caption block. Design for the interface from the first frame rather than discovering the collision after the ad is live.</p>
<h2>Preview your vertical video privately</h2>
<p>Upload a vertical thumbnail to the 9:16 canvas, type your description, and toggle the overlay — all in your browser, with nothing uploaded or stored. You will see your TikTok ad the way users do, with the safe zones mapped, before you ever push it to TikTok Ads Manager.</p>`,
    },

    faq: {
      en: [
        {
          q: 'What is the TikTok ad description character limit?',
          a: 'The visible description truncates around 100 characters with a "... See more" link, and is clamped to about four lines. Keep your hook and key message before that cutoff.',
        },
        {
          q: 'What are the TikTok safe zones?',
          a: 'The areas the interface covers on a 9:16 video: the top ~10% (tabs and status bar), the bottom ~20% (username, caption, CTA, music ticker), and the right ~15% (the profile and engagement icon stack).',
        },
        {
          q: 'How do I prevent text from being cut off on TikTok?',
          a: 'Keep all important text and logos inside the clear central column, away from the top bar, bottom fifth, and right rail. Use the safe-zone overlay in this tool to check placement before exporting.',
        },
        {
          q: 'Is my video or text uploaded?',
          a: 'No. The preview runs entirely in your browser. Your thumbnail and description are never uploaded or stored.',
        },
      ],
    },
  },
];

// ── Lookup helpers (mirror the other registries) ────────────────────────────

/** adPreviews keyed by stable id. */
export const AD_PREVIEWS_BY_ID: Record<string, ToolDefinition> = Object.fromEntries(
  adPreviews.map((tool) => [tool.id, tool]),
);

/** Find an ad-preview tool by any locale's URL slug. */
export function adPreviewBySlug(slug: string): ToolDefinition | undefined {
  return adPreviews.find((tool) => Object.values(tool.slugs).includes(slug));
}
