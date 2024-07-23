import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import TeamChallenge, { hackathonChallengeSteps, teamChallengeSteps } from "@/components/sections/challenges/TeamChallenge";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { challenge, submission } from "@__mocks__/fixtures/challenge";

interface CardData {
  index: number;
  title: string;
  text: string;
}

describe("TeamChallenge", () => {
  const mockTeamChallengeStates = {
    challenges: { current: challenge, list: [challenge], loading: false, submission: submission },
  };
  it("should render the team challenge section", () => {
    renderWithRedux(<TeamChallenge />, mockTeamChallengeStates);
    expect(screen.getByText("Team Challenge")).toBeInTheDocument();
    expect(screen.getByText("To complete the team challenge, you need to follow these steps:")).toBeInTheDocument();
  });

  it("should render all team challenge steps", () => {
    renderWithRedux(<TeamChallenge />, mockTeamChallengeStates);
    let teamChallengeArray: CardData[] = [];
    if (challenge.isHackathon) {
      teamChallengeArray = hackathonChallengeSteps;
    } else teamChallengeArray = teamChallengeSteps;

    teamChallengeArray.forEach((step) => {
      expect(screen.getByText(step.text)).toBeInTheDocument();
      expect(screen.getByText(step.title)).toBeInTheDocument();
    });
  });
});
