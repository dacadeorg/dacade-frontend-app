import Header from "@/components/sections/communities/_partials/Header";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Header", () => {
  it("renders the Header with Props", () => {
    render(<Header description="Test Description" title="Test Title" subtitle="Test Subtitle" isTeamChallenge={true} isHackathon={true} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Hackathon")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    render(<Header />);
    expect(screen.queryByText("Test Subtitle")).not.toBeInTheDocument();
  });

  it("conditionally renders the description", () => {
    render(<Header description="Test Description" />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders 'TEAM' tag when isTeamChallenge is true and isHackathon is false", () => {
    render(<Header subtitle="Test Subtitle" isTeamChallenge={true} isHackathon={false} />);
    expect(screen.getByText("TEAM")).toBeInTheDocument();
  });

  it("does not render 'TEAM' or 'Hackathon' tag when isTeamChallenge is false", () => {
    render(<Header />);
    expect(screen.queryByText("TEAM")).not.toBeInTheDocument();
    expect(screen.queryByText("Hackathon")).not.toBeInTheDocument();
  });
});
