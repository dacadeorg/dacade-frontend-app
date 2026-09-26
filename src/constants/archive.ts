// Dacade is archived: content stays browsable, but nothing new can be created.
// Set NEXT_PUBLIC_ARCHIVE_MODE=false to switch the interactive features back on.
export const IS_ARCHIVED = process.env.NEXT_PUBLIC_ARCHIVE_MODE !== "false";

// Pages closed while archived. next.config.js redirects the same paths on the
// server; this list covers client-side navigation. Keep both in sync.
export const ARCHIVED_PAGES = [
  "/login",
  "/signup",
  "/password-reset",
  "/new-password",
  "/email-verification",
  "/verify-email",
  "/verify-email-update",
  "/bounties",
  "/bounties/[slug]",
  "/profile",
  "/profile/wallets",
  "/profile/referrals",
  "/profile/settings",
  "/notifications",
  "/notifications/email-unsubscribe/[id]",
];
