import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TeamChallengeCard from "@/components/cards/TeamChallenge";

describe("Team challenge card component", () => {
  it("Should render component with default props", () => {
    render(<TeamChallengeCard />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryAllByAltText('')).not.toBe(null);
  });

  it("Should render the component with given props", ()=>{
    render(<TeamChallengeCard index={5} title="Test title" text="test text"/>)
    expect(screen.getByText("5")).toBeInTheDocument()
    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("test text")).toBeInTheDocument();
  })
});
