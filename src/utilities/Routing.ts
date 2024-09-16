import { NextRouter } from "next/router";

export function localePath(router: NextRouter, path: string) {
  const locale = router.locale !== router.defaultLocale ? router.locale : "";
  // remove duplicate slashes
  return `/${locale}/${path}`.replace(/\/\/+/g, "/");
}
