import { Bounty, BountyCourse } from "@/types/bounty";
import { colors } from "./colors";
import { reward } from "./reward";
import { metadata } from "./community";
import { mockCourse } from "./course";

const mockBountyCourse: BountyCourse = {
    ...mockCourse,
    prerequisite: [""],
    duration: 0,
    active: false,
    slug: "ICP",

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
