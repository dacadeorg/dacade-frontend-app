import { Bounty, BountyCourse } from "@/types/bounty";
import { colors } from "./colors";
import { metadata } from "./community";

export const mockBountyCourse: BountyCourse = {
    duration: 0,
    slug: "intoduction-to-blockchain",
    active: false,
    id: "123",
    ref: "courses/123",
    created_at: new Date(),
    updated_at: new Date(),
    summary: "this is a course",
    level: 0,
    name: "introduction to blockchain",
    description: "",
    objectives: [],
    locale: "",
    community: "icp",
    introduction: {
        text: "Introduction"
    },
    certificateIcon: "",
    certificateData: {
        narrative: "",
        icon: ""
    },
    timestamp: 0,
    learningModules: [],
    translations: []
}
export const mockBounty: Bounty = {
    url: "",
    image: undefined,
    id: "",
    ref: "",
    created_at: "",
    updated_at: "",
    icon: "",
    active: false,
    colors,
    description: "",
    summary: "",
    name: "",
    slug: "",
    metadata,
    timestamp: 0,
    course: mockBountyCourse,
    challenge: "",
    reward: {
        id: "",
        ref: "",
        created_at: new Date(),
        updated_at: new Date(),
        challenge: "",
        type: "",
        community: "",
        token: "",
        stable: false,
        fiatCurrency: undefined,
        amount: 0,
        timestamp: 0,
        distribution: undefined
    },
    community: ""
}
export const mockTrailer = {
    summary: "trailer summary",
    description: "trailer descriptio",
    video: "trailer video",
    duration: 4,
    info: {
        items: ["item 1", "item 2"],
        title: "info title",
    },
};
