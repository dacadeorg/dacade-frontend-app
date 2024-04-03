import { userProfile } from "./userProfile"

export const mockRubric = {
    id: "id",
    ref: "ref",
    created_at: "created_at",
    updated_at: "updated_at",
    challenge: "challenge",
    text: "text",
    type: "type",
    order: 89,
    points: 9,
    timestamp: 7,
    typeSlug: "typeSlug",
    key: "key",
  };

export const mockRatingCriteria = {
    name: 'Rating',
    order: 4567,
    rubric: [mockRubric],
    maxPoints: 6789
}

export const mockTeam = {
    challenge_ref: "challenge",
    created_at: "created_at",
    id: "id",
    locked: true,
    name: "name",
    organizer_id: "organizer",
    ref: "references",
    timestamp: "timestamp",
    updated_at: "updated_at",
  }

  export const mockInvite = {
    created_at: "created_at",
    id: "id",
    ref: "references",
    status: "status",
    team_ref: "team_ref",
    timestamp: 56789,
    updated_at: "updated_at",
    user: userProfile,
    user_id: "user_id",
  }

  export const mockTeamMember = {
    created_at: "created_at",
    id: "id",
    joined_on: "joined_on",
    ref: "reference",
    team_ref: "team_ref",
    timestamp: 67890,
    updated_at: "updated_at",
    user: userProfile,
  }

  export const mockNewTeamOption = {
    name: "new_team",
  }