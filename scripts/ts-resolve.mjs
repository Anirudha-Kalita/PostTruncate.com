/**
 * Test-only module resolver: lets Node's built-in `--test` runner load the
 * project's extensionless `./foo` TypeScript imports (Vite resolves these at
 * build time; Node ESM does not). Used only by `npm run test:lib`; never part
 * of the Astro/Cloudflare build.
 */
import { register } from 'node:module';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

register('./ts-resolve.mjs', import.meta.url);

export async function resolve(specifier, context, next) {
  if (/^[.]{1,2}\//.test(specifier) && !/\.[mc]?[jt]s$/.test(specifier)) {
    const candidate = new URL(`${specifier}.ts`, context.parentURL);
    if (existsSync(fileURLToPath(candidate))) {
      return next(`${specifier}.ts`, context);
    }
  }
  return next(specifier, context);
}
