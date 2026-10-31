import type { InertiaLinkProps } from '@inertiajs/vue3';

type ClassValue = string | false | null | undefined | 0 | Record<string, boolean | undefined> | ClassValue[];

/** Joins class names (OmniaCSS needs no class merging: utilities sit in their own cascade layer). */
export function cn(...inputs: ClassValue[]): string {
    return inputs
        .flatMap((input): string[] => {
            if (!input) return [];
            if (Array.isArray(input)) return [cn(...input)];
            if (typeof input === 'object') return Object.keys(input).filter((key) => input[key]);
            return [input];
        })
        .filter(Boolean)
        .join(' ');
}

export function toUrl(href: NonNullable<InertiaLinkProps['href']>) {
    return typeof href === 'string' ? href : href?.url;
}
