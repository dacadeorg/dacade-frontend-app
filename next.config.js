/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require("./next-i18next.config");

// Pages that only make sense for logged-in users or for creating content.
// Closed while Dacade is archived. Keep in sync with ARCHIVED_PAGES in
// src/constants/archive.ts, which covers client-side navigation.
const ARCHIVED_PATHS = [
  "/login",
  "/signup",
  "/password-reset",
  "/new-password",
  "/email-verification",
  "/verify-email",
  "/verify-email-update",
  "/bounties",
  "/bounties/:slug",
  "/profile",
  "/profile/wallets",
  "/profile/referrals",
  "/profile/settings",
  "/notifications",
  "/notifications/email-unsubscribe/:id",
];
const isArchived = process.env.NEXT_PUBLIC_ARCHIVE_MODE !== "false";

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: true,
  async redirects() {
    if (!isArchived) return [];
    return ARCHIVED_PATHS.map((source) => ({ source, destination: "/", permanent: false }));
  },
  i18n,
  images: {
    // Netlify's image optimizer fails on the missing sharp/libvips library,
    // which breaks every photo. Serve the files as they are instead.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
