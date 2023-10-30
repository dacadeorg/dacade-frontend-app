import { NextRouter } from "next/router";

// it doesn't matter here since were are just returning the path name
const DEFAULT_DOMAIN = "https://dacade.org";

export function localePath(router: NextRouter, path: string) {
    const locale = router.locale !== router.defaultLocale ? router.locale : '';
    const url = new URL(`/${locale}/${path}`, DEFAULT_DOMAIN);
    return url.pathname;
}
