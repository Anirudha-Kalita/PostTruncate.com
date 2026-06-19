# Requirements Document

## Introduction

This feature refreshes the About page content across all 10 locales to present PostTruncate as a solo-developer project by Anirudha, adds an optimized circular author photo to the About page, introduces a visible author byline with avatar on blog posts linking back to the About page, updates JSON-LD structured data to attribute posts to "Anirudha", and changes CMS/normalizer defaults from "PostTruncate Team" to "Anirudha".

## Glossary

- **Author_Photo**: A center-cropped square WebP image (~300×300, quality ~80) stored at `public/author-anirudha.webp`, displayed with circular framing (`border-radius: 50%`, `object-fit: cover`).
- **Prose_Component**: The shared Astro component (`src/components/Prose.astro`) that renders the About, Privacy, and Terms pages from locale-provided `ContentPage` data.
- **Locale_File**: A TypeScript module in `src/i18n/{code}.ts` implementing the `Translations` interface for a specific language (en, da, de, es, fr, it, ja, nl, pt, zh).
- **Byline**: The author attribution line rendered on blog post pages, showing the author name with a circular avatar and a link to the About page.
- **CMS_Config**: The Sveltia CMS configuration file at `public/admin/config.yml` that defines content fields and defaults.
- **Normalizer**: The script at `scripts/normalize-blog-md.mjs` that processes newly-created blog Markdown files and fills in default frontmatter values.
- **JSON_LD**: The structured data (`BlogPosting` schema) rendered by `BlogStructuredData.astro`, including the `author` field.
- **i18n_Interface**: The TypeScript interface in `src/i18n/types.ts` that defines the shape of all translation dictionaries.

## Requirements

### Requirement 1: Optimized Author Photo Asset

**User Story:** As a site visitor, I want to see a professional, fast-loading author photo on the About page, so that I can put a face to the developer behind PostTruncate.

#### Acceptance Criteria

1. WHEN the site is built, THE Author_Photo SHALL exist at `public/author-anirudha.webp` as a center-cropped square image with dimensions approximately 300×300 pixels and WebP quality approximately 80.
2. THE Author_Photo SHALL be derived from the source portrait at `D:\AICodingProjects\ProfilePic.webp` using the sharp library for conversion and cropping.

### Requirement 2: Author Alt Text i18n Key

**User Story:** As a screen-reader user visiting the About page, I want to hear a localized description of the author image, so that the photo is accessible regardless of my language.

#### Acceptance Criteria

1. THE i18n_Interface SHALL include an `authorAlt` key within the `images` object of type `string`.
2. WHEN the site is built, each Locale_File SHALL provide a translated value for the `images.authorAlt` key describing the author photo (e.g., "Anirudha, developer of PostTruncate" in English).
3. THE `images.authorAlt` value SHALL be used as the `alt` attribute on every rendered instance of the Author_Photo.

### Requirement 3: Refreshed About Page Copy (English)

**User Story:** As a site visitor reading the About page in English, I want to learn about Anirudha as the solo developer behind PostTruncate, so that I understand the personal mission driving the tool.

#### Acceptance Criteria

1. THE Locale_File for English SHALL contain updated `pages.about` content with an introductory paragraph and four sections structured as `SeoSection[]` entries.
2. THE English About copy SHALL include a "Why I built it" section presented as a first-person narrative from Anirudha.
3. THE English About copy SHALL preserve a link to the Privacy Policy page using the relative path `../privacy/`.
4. THE English About copy SHALL keep brand names (PostTruncate, LinkedIn, X, Threads, Instagram, Facebook) untranslated within markup.

### Requirement 4: Translated About Copy for All Locales

**User Story:** As a non-English-speaking visitor, I want to read the About page in my own language, so that I can understand PostTruncate's purpose and the developer's story.

#### Acceptance Criteria

1. WHEN the About page is rendered in any supported locale, THE Locale_File for that locale SHALL contain translated `pages.about` content matching the same four-section structure as the English version.
2. THE translated About copy SHALL keep brand names (PostTruncate, LinkedIn, X, Threads, Instagram, Facebook) untranslated.
3. THE translated About copy SHALL preserve the relative Privacy Policy link (`../privacy/`).
4. THE translated About copy SHALL be provided for all 9 non-English locales: da, de, es, fr, it, ja, nl, pt, zh.

### Requirement 5: Circular Author Image in Prose Component

**User Story:** As a visitor viewing the About page, I want to see Anirudha's photo displayed in a visually appealing circular frame alongside the relevant section, so that the page feels personal and professional.

#### Acceptance Criteria

1. THE Prose_Component SHALL accept optional props `authorImage` (image path), `authorImageAlt` (alt text), and `authorImageSectionIndex` (number indicating which section to pair with the image).
2. WHEN `authorImage` is provided, THE Prose_Component SHALL render the Author_Photo in a circular frame (`border-radius: 50%`, `object-fit: cover`) adjacent to the section at the specified index.
3. WHEN rendered on desktop viewports (width > 768px), THE Author_Photo SHALL display to the left of the section text at approximately 140px diameter.
4. WHEN rendered on mobile viewports (width ≤ 768px), THE Author_Photo SHALL display above the section text at approximately 110px diameter.
5. THE Author_Photo frame SHALL include a subtle ring or border that renders correctly in both light and dark mode.
6. WHEN the About page routes (`/[lang]/about/` and `/[lang]/[slug]/about/`) render, THE Prose_Component SHALL receive `authorImage` pointing to `/author-anirudha.webp`, `authorImageAlt` from `t.images.authorAlt`, and `authorImageSectionIndex` set to 1 (the "Why I built it" section).

### Requirement 6: Blog Post Author Byline with Avatar

**User Story:** As a blog reader, I want to see a visible author attribution with a photo and link to the About page, so that I know who wrote the post and can learn more about the author.

#### Acceptance Criteria

1. WHEN a blog post is rendered, THE blog post page SHALL display a byline containing a small circular Author_Photo (rendered at approximately 28–32px diameter), the author display name, and a link to the locale-appropriate About page.
2. THE byline author name SHALL be derived by mapping the frontmatter `author` value: WHEN the `author` field equals "PostTruncate Team", the displayed name SHALL be "Anirudha"; otherwise the frontmatter value SHALL be used as-is.
3. THE byline link SHALL navigate to `/{lang}/{slug}/about/` where `{lang}` is the post locale and `{slug}` is the locale-specific slug from `getLocale(lang)`.
4. THE byline avatar SHALL use `border-radius: 50%` and `object-fit: cover` consistent with other Author_Photo usages.

### Requirement 7: JSON-LD Author Attribution

**User Story:** As a search engine consuming structured data, I want the blog post JSON-LD to attribute posts to "Anirudha", so that author identity is consistent across the site's markup and visible UI.

#### Acceptance Criteria

1. WHEN the `BlogStructuredData` component renders a `BlogPosting` schema for a blog post, THE `author.name` field in JSON-LD SHALL use the same mapping as the byline: "PostTruncate Team" maps to "Anirudha", all other values pass through unchanged.
2. THE `author` field in the JSON-LD SHALL remain of type `Person` with only the `name` property modified by the mapping.

### Requirement 8: CMS and Normalizer Default Author Update

**User Story:** As a content author using the CMS, I want the default author field to be "Anirudha", so that new blog posts are attributed correctly without manual edits.

#### Acceptance Criteria

1. THE CMS_Config SHALL set the default value of the `author` field to "Anirudha" instead of "PostTruncate Team".
2. THE Normalizer SHALL set the `DEFAULT_AUTHOR` constant to "Anirudha" instead of "PostTruncate Team".

### Requirement 9: Build Integrity

**User Story:** As a developer, I want the site to build without TypeScript or lint errors after all changes, so that the deployment pipeline remains green.

#### Acceptance Criteria

1. WHEN `npm run typecheck` is executed, THE build system SHALL complete with zero type errors.
2. WHEN `npm run lint` is executed, THE build system SHALL complete with zero lint errors.
3. WHEN `npm run build` is executed, THE build system SHALL complete successfully, producing all static pages for all 10 locales without errors.
