import type { ToolDefinition } from '../data/tools';
import { DEFAULT_LOCALE } from '../i18n/config';

export interface ToolBreadcrumbLabels {
  home: string;
  platformGuides: string;
}

export interface ToolBreadcrumbParams {
  site: URL;
  lang: string;
  localeSlug: string;
  tool: ToolDefinition;
  labels: ToolBreadcrumbLabels;
}

/** Escape `</script>` injection vectors while keeping valid JSON. */
export function stringifyJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

/**
 * Build a schema.org BreadcrumbList for a /[lang]/[tool]/ sub-tool page.
 * Trail: Home → Platform Guides (#platforms) → current tool.
 */
export function buildToolBreadcrumbList({
  site,
  lang,
  localeSlug,
  tool,
  labels,
}: ToolBreadcrumbParams): Record<string, unknown> {
  const homeUrl = new URL(`/${lang}/${localeSlug}/`, site).href;
  const guidesUrl = `${homeUrl}#platforms`;
  const toolSlug = tool.slugs[lang] ?? tool.slugs[DEFAULT_LOCALE];
  const toolUrl = new URL(`/${lang}/${toolSlug}/`, site).href;
  const toolName = tool.schemaName[lang] ?? tool.schemaName[DEFAULT_LOCALE];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: labels.home,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.platformGuides,
        item: guidesUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: toolName,
        item: toolUrl,
      },
    ],
  };
}
