import ChallengeCard, { ChallengeCardProps } from "@/components/cards/challenge/Challenge";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { challenge } from "@__mocks__/fixtures/challenge";
import { mockCommunity } from "@__mocks__/fixtures/community";


const mockChallengeCardProps: ChallengeCardProps = {
  data: {
    ...challenge,
    isHackathon: true,
  },
  community: mockCommunity,
  isCourseEnd: true,
};

describe("ChallengeCard", () => {
  it("should render the ChallengeCard", () => {
    renderWithRedux(<ChallengeCard {...mockChallengeCardProps} />);
    const challengeCard = screen.getByTestId("challenge-card");
    expect(challengeCard).toBeInTheDocument();
  });

  it("should display the challenge name", () => {
    renderWithRedux(<ChallengeCard {...mockChallengeCardProps} />);
    const challengeName = screen.getByText(mockChallengeCardProps.data.name);
    expect(challengeName).toBeInTheDocument();
  });

  it("should display the challenge description", () => {
    renderWithRedux(<ChallengeCard {...mockChallengeCardProps} />);
    const description = screen.getByText(mockChallengeCardProps.data.description);
    expect(description).toBeInTheDocument();
  });

  it("should display the correct number of learning materials", () => {
    renderWithRedux(<ChallengeCard {...mockChallengeCardProps} />);
    const learningMaterialsText = screen.getByText(
      `${mockChallengeCardProps.data.learningModules.length + mockChallengeCardProps.data.courses.length} Learning materials included`
    );
    expect(learningMaterialsText).toBeInTheDocument();
  });

  it("should display the reward certificate", () => {
    renderWithRedux(<ChallengeCard {...mockChallengeCardProps} />);
    const rewardCertificate = screen.getByText("communities.overview.challenge.unlock.certificate");
    expect(rewardCertificate).toBeInTheDocument();
  });

  it("should link to the correct challenge page", () => {
    renderWithRedux(<ChallengeCard {...mockChallengeCardProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/communities/${mockChallengeCardProps.community.slug}/challenges/${mockChallengeCardProps.data.id}`);
  });
  it("should render the challenge image", () => {
    renderWithRedux(<ChallengeCard {...mockChallengeCardProps} />);
    const challengeImage = screen.getByAltText("achievement");
    expect(challengeImage).toBeInTheDocument();
  });

  it("should display the reward certificate component with proper rewards", () => {
    renderWithRedux(<ChallengeCard {...mockChallengeCardProps} />);
    const rewardCertificateText = screen.getByText("communities.overview.challenge.unlock.certificate");
    expect(rewardCertificateText).toBeInTheDocument();
  });

  });
