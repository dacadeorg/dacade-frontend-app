import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import RubricRating, { RubricRatingProps } from "@/components/sections/challenges/Rating";
import { mockCommunity } from "../../../../__mocks__/community";
import { mockCourse } from "../../../../__mocks__/course";

type MockRubricRating = Pick<RubricRatingProps, "rubricRating">;

const fixtureRubricRating: MockRubricRating = {
  rubricRating: {
    relevance: 2,
    originality: 2,
    quality: 8,
    total: 12,
    available: 2,
    reward: 6,
    rewardCoin: "ICP",
  },
};
describe("RubricRating", () => {
  const rubricRatings = fixtureRubricRating.rubricRating;
  it("should render ratings with title", () => {
    renderWithRedux(<RubricRating testId="rubricRatingId" hideTitle={false} />);
    expect(screen.getByTestId("rubricRatingId")).toBeInTheDocument();
    expect(screen.getByTestId("coin")).toBeInTheDocument();
    expect(screen.getByText("communities.challenge.criteria.title")).toBeInTheDocument();
  });

  it("should render ratings with rating criterias", () => {
    renderWithRedux(<RubricRating rubricRating={rubricRatings} />, {
        community: { current: mockCommunity, list: [mockCommunity], courses: [mockCourse], status: "succeeded", error: "error message" },
      });

    mockCommunity.challenge?.ratingCriteria.forEach((criteria) => {
        expect(screen.getByText(criteria.name)).toBeInTheDocument();
        expect(screen.getByText(criteria.name).textContent).toBe("rating criteria");
        criteria.rubric.forEach((rubric) => {
          if (rubricRatings) {
            if (rubricRatings[criteria.name] === rubric.points) {
              expect(screen.getByText(rubric.points)).toBeInTheDocument();
              expect(screen.getByText(rubric.points).textContent).toBe("90");
              expect(screen.getByText(rubric.text)).toBeInTheDocument();
              expect(screen.getByText(rubric.text).textContent).toBe("Challenge text");
            }
          }
        });
      });
  })
});
