import { NextSeoProps } from "next-seo"
export default {
    title: "Dacade",
    description:
        "A peer to peer learning platform",
    canonical: "https://dacade.org/",
    openGraph: {
        type: "website",
        locale: "en",
        url: "https://dacade.org/",
        siteName: "Dacade",
        images: [
            // {
            //     url: "/img/opengraph.webp",
            //     width: 800,
            //     height: 600,
            //     alt: "DACADE",
            // },
            {
                url: "/favicon.ico",
                width: 800,
                height: 600,
                alt: "DACADE",
            }
        ],
    },
    twitter: {
        cardType: "summary_large_image",
    },
} as NextSeoProps
