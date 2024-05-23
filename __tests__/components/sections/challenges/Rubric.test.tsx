import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import RubricHeader from "@/components/sections/challenges/Rubric";
import { Rubric, mockRatingCriteria } from "../../../../__mocks__/course";
import { challenge as mockChallenge, submission } from "../../../../__mocks__/challenge";

describe("Rubric", () => {
  const challenge = mockChallenge();
  it("should render the Rubric header", () => {
    renderWithRedux(<RubricHeader testId="rubricId" ratingCriteria={[]} selected={[]} />, { challenges: { current: challenge, list: [challenge], loading: false, submission: submission() } });
    const rubricHeader = screen.getByTestId("rubricId");
    expect(rubricHeader).toBeInTheDocument();
  });

  it("should render the Rubric with ratings", () => {
    renderWithRedux(<RubricHeader ratingCriteria={[mockRatingCriteria]} selected={[Rubric]} />, {
      challenges: { current: challenge, list: [challenge], loading: false, submission: submission() },
    });
    const rubricHeaderName = screen.getByText(mockRatingCriteria.name);
    expect(rubricHeaderName).toBeInTheDocument();

    const selectedRubric = (id: string) => [Rubric].find((rubric) => rubric.id === id);

    [mockRatingCriteria].forEach((criteria) => {
      expect(screen.getByText(criteria.name)).toBeInTheDocument();
      criteria.rubric.forEach((rubric) => {
        if (selectedRubric(rubric.id)) {
          const rubricPoints = selectedRubric(rubric.id)?.points;
          expect(screen.getByText(rubricPoints || "id")).toBeInTheDocument();
        } else {
          expect(screen.getByText(rubric.points)).toBeInTheDocument();
        }
        expect(screen.getByText(rubric.text)).toBeInTheDocument();
      });
    });
  });
});