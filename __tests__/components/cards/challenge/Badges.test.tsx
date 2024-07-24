import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Badges from "@/components/badges";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { challenge } from "@__mocks__/fixtures/challenge";

describe("Badge-card", () => {
  it("should render the challenge level in challenge card", () => {
    renderWithRedux(<Badges />);
    const challengeLevel = screen.getByTestId("badge");
    expect(challengeLevel).toBeInTheDocument();
  });
  it("should render the team challenge badge", () => {
    const teamChallenge = { ...challenge, level: 1, isTeamChallenge: true, isHackathon: false };
    renderWithRedux(<Badges challenge={teamChallenge} />);
    const teamChallengeValue = screen.getByText("Team challenge");
    expect(teamChallengeValue).toBeInTheDocument();
    expect(teamChallengeValue).toHaveTextContent("Team challenge");
  });

  it("should render the Hackathon badge", () => {
    const hackathonChallenge = { ...challenge, level: 0, isTeamChallenge: true, isHackathon: true };
    renderWithRedux(<Badges challenge={hackathonChallenge} />);
    const teamChallengeValue = screen.getByText("Hackathon challenge");
    expect(teamChallengeValue).toBeInTheDocument();
    expect(teamChallengeValue).toHaveTextContent("Hackathon challenge");
  });
  it('should display BEGINNER when the challenge level 0', () => {
    renderWithRedux(<Badges courseLevel={1} />);
    const beginnerTag = screen.getByText('course.challenge.level-0');
    expect(beginnerTag).toBeInTheDocument();
    expect(beginnerTag).toHaveTextContent('course.challenge.level-0')
  });
it('should display INTERMEDIATE when the challenge lever is 2',()=> {
  renderWithRedux(<Badges courseLevel={2} />);
    const intermediateTag = screen.getByText('course.challenge.level-2');
    expect(intermediateTag).toBeInTheDocument();
    expect(intermediateTag).toHaveTextContent('course.challenge.level-2')
})
});
