import { Bounty, BountyCourse } from "@/types/bounty";
import { colors } from "./colors";
import { reward } from "./reward";
import { metadata } from "./community";

const mockBountyCourse: BountyCourse = {
    duration: 0,
    slug: "",
    active: false,
    id: "",
    ref: "",
    created_at: new Date(),
    updated_at: new Date(),
    summary: "",
    level: 0,
    name: "",
    description: "",
    objectives: [],
    locale: "",
    community: "",
    introduction: {
        text: ""
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
    metadata: metadata,
    timestamp: 0,
    course: mockBountyCourse,
    challenge: "",
    reward: reward,
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
