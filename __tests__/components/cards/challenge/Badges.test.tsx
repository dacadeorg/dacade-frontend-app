import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Badges from "@/components/cards/challenge/Badges";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { challenge } from "@__mocks__/fixtures/challenge";

describe("Badge-card", () => {
  it("should render the level badge in cards", () => {
    const challengeWithLevel = { ...challenge, level: 2, isTeamChallenge: false };
    renderWithRedux(<Badges challenge={challengeWithLevel} />);
    const badges = screen.getAllByTestId('tag');
    expect(badges.length).toBe(1);
    expect(badges[0]).toHaveTextContent('course.challenge.level-2');
  });

  it("should render the team challenge badge", () => {
    const teamChallenge = { ...challenge, level: 0, isTeamChallenge: true, isHackathon: false };
    renderWithRedux(<Badges challenge={teamChallenge} />);
    const badges = screen.getAllByTestId('tag');
    expect(badges.length).toBe(1);
    expect(badges[0]).toHaveTextContent('Team challenge');
  });

  it("should render the Hackathon badge", () => {
    const hackathonChallenge = { ...challenge, level: 0, isTeamChallenge: true, isHackathon: true };
    renderWithRedux(<Badges challenge={hackathonChallenge} />);
    const badges = screen.getAllByTestId('tag');
    expect(badges.length).toBe(1);
    expect(badges[0]).toHaveTextContent('Hackathon challenge');
  });

  it("should render nothing when there is no level or team challenge", () => {
    const noChallenge = { ...challenge, level: 0, isTeamChallenge: false };
    renderWithRedux(<Badges challenge={noChallenge} />);
    const badges = screen.queryByTestId('tag');
    expect(badges).toBeNull();
  });
});
