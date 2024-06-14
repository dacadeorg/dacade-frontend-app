import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import TeamChallenge from "@/components/sections/challenges/TeamChallenge";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { challenge, submission } from "../../../../__mocks__/challenge";

interface CardData {
  index: number;
  title: string;
  text: string;
}

describe("TeamChallenge", () => {
  const hackathonChallengeSteps: CardData[] = [
    {
      index: 1,
      title: "Form your team",
      text: "Open Telegram group and find your teammates to complete the challenge with you",
    },
    {
      index: 2,
      title: "Confirm your team",
      text: "Make sure your teammates accept notification to confirm your team",
    },
    {
      index: 3,
      title: "Submit!",
      text: "Once you have completed the challenge, only one person needs to submit it at the end of this page",
    },
  ];
  const teamChallengeSteps: CardData[] = [
    {
      index: 1,
      title: "Form your team",
      text: "Open discord channel #teams and find your teammates to complete the challenge with you",
    },
    {
      index: 2,
      title: "Confirm your team",
      text: "Make sure your teammates accept notification to confirm your team",
    },
    {
      index: 3,
      title: "Submit!",
      text: "Once you have completed the challenge, only one person needs to submit it at the end of this page",
    },
  ];
  const mockChallenge = challenge();
  const mockSubmission = submission();
  const mockTeamChallengeStates = {
    challenges: { current: mockChallenge, list: [mockChallenge], loading: false, submission: mockSubmission },
  };
  it("should render the team challenge section", () => {
    renderWithRedux(<TeamChallenge />, mockTeamChallengeStates);
    expect(screen.getByText("Team Challenge")).toBeInTheDocument();
    expect(screen.getByText("To complete the team challenge, you need to follow these steps:")).toBeInTheDocument();
  });

  it("should render all team challenge steps", () => {
    renderWithRedux(<TeamChallenge />, mockTeamChallengeStates);
    const challenges = challenge();
    let teamChallengeArray: CardData[] = [];
    if (challenges.isHackathon) {
      teamChallengeArray = hackathonChallengeSteps;
    } else teamChallengeArray = teamChallengeSteps;

    teamChallengeArray.forEach((step) => {
      expect(screen.getByText(step.text)).toBeInTheDocument();
      expect(screen.getByText(step.title)).toBeInTheDocument();
    });
  });
});