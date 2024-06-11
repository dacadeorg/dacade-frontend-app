import "@testing-library/jest-dom";
import Challenge from "@/components/sections/courses/overview/Challenge";
import { render, screen } from "@testing-library/react";
import { mockCourse } from "../../../../../__mocks__/course";



describe("Challenge", () => {
  it("should render the Challenge", () => {
    render(<Challenge />);
    const challenge = screen.getByTestId("challengeDescriptionId");;
    expect(challenge).toBeInTheDocument();
  });

  it("should show content", () => {
    const challengeDescription = screen.getByTestId("challengeDescription");
    expect(challengeDescription).toBeInTheDocument();
  });

  it("should show text content", () => {
    const challengeText = screen.getByTestId("challengeDescription");
    expect(challengeText).toBeInTheDocument();
    expect(challengeText).toBe( mockCourse.challenge?.description);
  });



});


