import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import RubricHeader from "@/components/sections/challenges/Rubric";
import { Rubric, mockRatingCriteria } from "../../../../__mocks__/course";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

describe("Rubric", () => {
  it("should render the Rubric header", () => {
    renderWithRedux(<RubricHeader ratingCriteria={[]} selected={[]} />);
    const rubricHeader = screen.getByTestId("rubricId");
    expect(rubricHeader).toBeInTheDocument();
  });

  it("should render the Rubric with ratings", () => {
    renderWithRedux(<RubricHeader ratingCriteria={[mockRatingCriteria]} selected={[Rubric]} />);
    const rubricHeaderName = screen.getByText(mockRatingCriteria.name);
    expect(rubricHeaderName).toBeInTheDocument();
    const selectedRubric = screen.getByText(Rubric.text);
    expect(selectedRubric).toBeInTheDocument();
  });
});
