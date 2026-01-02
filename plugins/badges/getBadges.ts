import { readFileSync } from 'fs';
import { join, relative } from 'path';
import { glob, lodash, winPath } from '@umijs/utils';

export function getBadges(opts: {
    base: string;
    cwd: string;
    pattern?: string;
    skipModelValidate?: boolean;
    extraModels?: string[];
}) {
    return lodash
        .uniq(
            glob
                .sync(opts.pattern || '**/*.{ts}', {
                    cwd: opts.base,
                })
                .map((f) => join(opts.base, f))
                .concat(opts.extraModels || [])
                .map(winPath),
        )
        .filter((f) => {
            if (/\.d.ts$/.test(f)) return false;
            if (/\.(test|e2e|spec).(j|t)sx?$/.test(f)) return false;

            return true;
        });
}