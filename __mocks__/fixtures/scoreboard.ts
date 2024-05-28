
import { Scoreboard } from "@/types/scoreboard";
import { mockUser } from "./user";

export const mockScoreboard: Scoreboard = {
    id: "id",
    ref: "ref",
    created_at: "Monday",
    updated_at: "February",
    score: 3,
    user_id: "user_id",
    submissions: 3,
    submissionPoints: 4,
    feedbacks: 0,
    type: "feedback",
    entity: "feedback entity",
    feedbackPoints: 0,
    timestamp: 4,
    user: mockUser,
}