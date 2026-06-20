---
translationKey: master-google-ads-character-limits-30-90-rule
title: 'Master Google Ads character limits: 30/90 rule'
subtitle: Learn the strict 30/90 character limits for Google Responsive Search Ads and the hidden killers that trigger rejections. Master formatting before upload.
description: Learn the strict 30/90 character limits for Google Responsive Search Ads and the hidden killers that trigger rejections. Master formatting before upload.
publishDate: 2026-06-20
updatedDate: ''
locale: en
slug: master-google-ads-character-limits-30-90-rule
relatedPlatform: general
category: seo-serp
author: PostTruncate Team
draft: false
ogImage: /og/master-google-ads-character-limits-30-90-rule.png
---

## TL;DR

Google Responsive Search Ads enforce **strict 30-character headlines** and **90-character descriptions**, but the real trap isn't character count-it's pixel width. Wide characters (M, W, capitals), hidden spaces, and Dynamic Keyword Insertion fallback text silently push ads over Google's rejection threshold. Draft your copy in [PostTruncate's pixel-accurate Google Ads preview](/en/ad-previews/google-ads/) to catch rejections before upload and guarantee every headline and description passes on the first try.

## That red error message never gets old

It's 2 AM, your campaign is live in an hour, you've tweaked your headlines one last time, and you hit upload. Five seconds later: **"Your ad has been disapproved."** The error message doesn't say why. You read through your copy three times. Everything looks fine. You count the characters: 27 for the headline, 89 for the description. Both under the limit. You rewrite it anyway, shorten it by three more characters, and re-upload. Disapproved again.

That was me, three years ago, staring at campaigns that should've run and getting nowhere with Google support. It happened so often-always the same pattern, always the "it looks fine" moment before the rejection-that I eventually built [PostTruncate](/) as a way to catch these rejections before they happen. And the reason the rejections happen is simple: **you're counting characters when you should be counting pixels**.

## The hard limits: 30 / 90 / 15

Let's start with what Google actually publishes. [Responsive Search Ads (RSA)](/en/ad-previews/google-ads/) have three firm caps:

-   **Headlines: 30 characters each.** You can write up to 15 headlines; Google mixes and matches them automatically, showing up to three at once.
-   **Descriptions: 90 characters each.** You can supply up to four descriptions; Google rotates them automatically, showing up to two at once.
-   **Display paths: 15 characters per segment.** The `/path` shown below your domain (not the full URL-just the breadcrumb Google displays).

These limits are not suggestions. Hit 31 characters on a headline and Google won't just truncate-it'll reject the entire ad and send it back for manual review. Same for descriptions. Same for display paths. One character over and you're blocked.

The limits sound straightforward until you start typing.

![Anatomy of a Google Responsive Search Ad showing the 30-character limit on headlines, 90-character limit on descriptions, and 15-character limit on display paths, as taken from \[Google Ads Preview Tool\](/en/ad-previews/google-ads/)](/og/master-google-ads-character-limits-30-90-rule-1.png)

<p align="center"><span style="font-size: 12px; "><em>Anatomy of a Google Responsive Search Ad showing the 30-character limit on headlines, 90-character limit on descriptions, and 15-character limit on display paths</em></span></p>

## The silent killers: what pushes you over without you knowing

Here are the three culprits that trigger rejections even when you think you're under the limit.

### Hidden spaces and trailing whitespace

A trailing space is invisible. It's also a character. If you copy a headline from another source, paste it into your ad, and don't notice the trailing space, you're at 31 characters even if the visible text is 30. [Google's API rejects it](/en/ad-previews/google-ads/). No warning, no "you have an extra space"-just a disapproval.

Same with leading spaces before the text, or double spaces between words that look like one space on screen but are actually two. When you draft in [PostTruncate's character counter](/en/character-counter/), every space is visible and counted, so you catch these before they become rejections.

### Wide punctuation and smart quotes

Not all characters are created equal. When Google renders an ad headline on a search result, it measures the _pixel width_ of each character, not just the count. A capital M is about twice as wide as a lowercase i. Curly quotes (" ") are wider than straight quotes (" "). Em dashes (-) are wider than hyphens (-). A European guillemet « is wider than a comma.

This matters because Google displays your headline in a fixed-width container on desktop, about 600px across. If your three headlines, rendered in Arial, exceed that width, [Google drops the third one entirely](/en/ad-previews/google-ads/) rather than wrapping it. You'd never notice in a generic character counter. In pixel width, a 28-character all-caps headline can be physically wider than a 30-character lowercase one. That's why the pixel preview matters.

### Dynamic Keyword Insertion (DKI) and fallback text

If you use Google's Dynamic Keyword Insertion feature-the `{keyword:fallback}` syntax that auto-swaps in the user's search term-you're trusting that the fallback text you wrote is shorter than the longest keyword you bid on. If it isn't, Google substitutes the fallback, and your ad goes over the limit. And if the fallback is longer than you realised (which it often is-you wrote it in a hurry and didn't measure), the ad gets rejected.

Even worse: the fallback substitution happens _after_ upload, so a character counter won't catch it. You'd only find out when Google rejects the ad after it's already in review. The way around this: paste your longest-expected keyword replacement into the [PostTruncate preview](/en/ad-previews/google-ads/) alongside your fallback text, and verify both render under the 600px desktop width. If either one exceeds it, you know Google will drop that headline.

## Why this matters: rejections cost you time and money

An ad disapproval triggers a manual review. While Google is reviewing it (usually 24-48 hours), your campaign doesn't run. If you're in an auction where volume and speed matter-like a limited-time promotion-those lost hours mean lost conversions. You rewrite, resubmit, wait again, and by the time the ad finally runs, the deadline has passed.

On top of that, repeated rejections can lower your account standing with Google. Too many submissions and you risk slower review times or higher scrutiny on future campaigns.

That's why I built the [PostTruncate Google Ads preview tool](/en/ad-previews/google-ads/) in the first place. It measures your headlines and descriptions the way Google actually measures them-by rendered pixel width, not averaged character count-so you can see exactly how your ad will appear on the SERP, and catch rejections before they happen.

## The solution: pixel-accurate preview before upload

Here's the workflow that actually works:

1.  **Draft your headlines and descriptions** in [PostTruncate's text editor](/en/character-counter/). Unlike a word processor, it counts the way Google counts-character by character, accounting for spaces and special characters.
2.  **Switch to the** [**Google Ads preview**](/en/ad-previews/google-ads/)**.** You'll see exactly how each headline renders in a desktop search result, with a live pixel meter showing how much horizontal space each headline consumes. If Headline 3 gets dropped, you'll see it happen in real time.
3.  **Test wide characters deliberately.** Paste your all-caps headlines into the preview and watch the pixel width jump. Toggle between all-caps, title case, and lowercase to see the difference. A 28-char all-caps version might exceed a 30-char lowercase one-the pixel preview shows you which survives.
4.  **Check for hidden spaces and DKI issues.** Paste your fallback text into the preview alongside your main headline. If the fallback is longer, the pixel meter will show it. No guessing.
5.  **Copy the final version directly to Google Ads.** Everything you've verified in [PostTruncate](/en/ad-previews/google-ads/) will pass Google's threshold. No rejections, no delays.

The reason this works: PostTruncate measures text the way a browser paints it, using an HTML5 canvas `measureText` engine in Arial, the same font and rendering method Google uses on the SERP. It's not guessing with an average character width. It's measuring the actual pixels. That means the preview drops a headline at the exact point Google would.

## The 30/90 rule for 2026 and beyond

Google hasn't changed these limits since RSA launched, and there's no indication they will in 2026. The 30/90 rule is locked. But what _does_ change is how picky Google gets about enforcement and what counts as a violation.

For 2026, assume the limits are absolute. Assume Google is running stricter validation on uploads. Assume a space you can't see, or a character you think is one width but renders as another, will get caught.

The solution isn't to get cleverer at hiding things-it's to measure accurately before you ship. That's what [PostTruncate's ad previews](/en/ad-previews/google-ads/) were built for.

Draft your next Google Ads campaign in [PostTruncate's Google Ads preview](/en/ad-previews/google-ads/). Write your headlines and descriptions, watch them render in pixel-perfect accuracy, and catch formatting issues before Google's API does. The tool is free, runs entirely in your browser, and nothing you paste is ever uploaded or stored.

Your headlines will pass. Your descriptions will pass. And you'll stop getting that red error message at 2 AM.

## FAQs

<details><summary><b>What are the exact character limits for Google Responsive Search Ads?</b></summary>
<p>Each <strong>headline is limited to 30 characters</strong> and each <strong>description to 90 characters</strong>. You can supply up to 15 headlines and 4 descriptions; Google rotates combinations automatically. Display paths are limited to 15 characters per segment (the domain path shown below the description).</p>
</details>

<details><summary><b>Why does my 30-character headline still get rejected or dropped?</b></summary>
<p>Character count isn't the only limit. Google displays headlines in a \~600px desktop container. <a href="/en/ad-previews/google-ads/">Wide characters like M, W, and capital letters</a> consume more pixels than narrow ones (i, l). A 28-character all-caps headline can exceed a 30-character lowercase one in pixel width, causing Google to drop it entirely rather than wrapping.</p>
</details>

<details><summary><b>What are the silent killers that trigger Google Ads disapprovals?</b></summary>
<p>Three main culprits: (1) <strong>Hidden spaces</strong> - trailing spaces after your headline push it over the limit; (2) <strong>Wide punctuation</strong> - em dashes, curly quotes, and fancy characters; (3) <strong>DKI fallback text</strong> - if Dynamic Keyword Insertion fails, Google inserts fallback text that's often longer than your original. Always test the final copy before uploading.</p>
</details>

<details><summary><b>Can I use emojis or special characters in Google Ads headlines?</b></summary>
<p>You can technically include Unicode characters and emojis, but they consume pixels at varying rates. An emoji might render as one character but take 2-3x the pixel width of a letter. <a href="/en/ad-previews/google-ads/">Test your exact copy in the PostTruncate Google Ads preview</a> to see how it renders before submitting. Wide emoji combined with wide letters (W, M) can easily exceed the pixel limit.</p>
</details>

<details><summary><b>Why should I draft in PostTruncate instead of directly in Google Ads?</b></summary>
<p>PostTruncate measures headlines by their true rendered pixel width using an HTML5 canvas, exactly the way Google renders them. Generic character counters use an average character width and miss wide characters entirely. <a href="/en/ad-previews/google-ads/">The PostTruncate preview drops Headline 3 at the exact point Google would</a>, so you catch rejections before they happen.</p>
</details>
