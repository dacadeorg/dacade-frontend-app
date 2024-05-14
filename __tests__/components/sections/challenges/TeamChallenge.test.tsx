import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TeamChallenge from "@/components/sections/challenges/TeamChallenge";

describe("TeamChallenge", () => {
  it("should render the team challenge section", () => {
    render(<TeamChallenge />);
    expect(screen.getByText("Team Challenge")).toBeInTheDocument();
    expect(screen.getByText("To complete the team challenge, you need to follow these steps:")).toBeInTheDocument();
  });

  it("should render all team challenge steps", () => {
    render(<TeamChallenge />);
    expect(screen.getByText("Form your team")).toBeInTheDocument();
    expect(screen.getByText("Open discord channel #teams and find your teammates to complete the challenge with you")).toBeInTheDocument();
    expect(screen.getByText("Confirm your team")).toBeInTheDocument();
    expect(screen.getByText("Make sure your teammates accept notification to confirm your team")).toBeInTheDocument();
    expect(screen.getByText("Submit!")).toBeInTheDocument();
    expect(screen.getByText("Once you have completed the challenge, only person needs to submit it at the end of this page")).toBeInTheDocument();
  });
});
