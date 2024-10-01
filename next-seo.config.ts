import { NextSeoProps } from "next-seo"
export default {
    title: "Dacade site name",
    description:
        "A peer to peer learning platform",
    canonical: "https://dacade.org/",
    openGraph: {
        type: "website",
        locale: "en",
        url: "https://dacade.org/",
        siteName: "Dacade",
        images: [
            {
                url: "/img/opengraph.webp",
                width: 1200,
                height: 630,
                alt: "DACADE",
            },
        ],
    },
    twitter: {
        cardType: "summary_large_image",
    },
} as NextSeoProps
