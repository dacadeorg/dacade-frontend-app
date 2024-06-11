import Evaluations from "@/components/sections/submissions/Evaluation";
import { challenge, submission } from "@__mocks__/challenge";
import { colors } from "@__mocks__/colors";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "next",
  }),
}));

const mockEvaluationState = {
  ui: { colors: colors, locked: false, showReferralPopup: false, showJobOffersPopup: false },
  submissions: {
    current: {
      ...submission(),
    },
    list: [submission()],
    text: "",
  },
  challenges: { current: challenge(), list: [challenge()], submission: submission(), loading: false },
};

describe("Evaluations", () => {
  it("Should render evaluations", () => {
    renderWithRedux(<Evaluations />, mockEvaluationState);
    const evaluations = screen.getByTestId("evaluationsId");
    expect(evaluations).toBeInTheDocument();
  });

  it("Should render RatingRubric when the challenge is present", () => {
    renderWithRedux(<Evaluations />, mockEvaluationState);
    const ratingCriteriaName = challenge().ratingCriteria[0].name;
    const ratingRubric = screen.getByText(ratingCriteriaName);
    expect(ratingRubric).toBeInTheDocument();
  });

  it("Should conditionally render reward information when evaluation reward is present and the challenge is not a hackathon", () => {
    const nonHackathonState = {
      ...mockEvaluationState,
      challenges: {
        ...mockEvaluationState.challenges,
        current: { ...challenge(), isHackathon: false },
      },
    };

    renderWithRedux(<Evaluations />, nonHackathonState);
    const token = submission().evaluation?.reward?.token;
    if (token) {
      expect(screen.getByText(token)).toBeInTheDocument();
    }
  });

  it("Should conditionally render reward information when evaluation.reward is present and challenge is a hackathon", () => {
    const hackathonState = {
      ...mockEvaluationState,
      challenges: {
        ...mockEvaluationState.challenges,
        current: { ...challenge(), isHackathon: true },
      },
    };

    renderWithRedux(<Evaluations />, hackathonState);
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("communities.challenge.evaluation.message.nominated")).toBeInTheDocument();
  });
});
