import Header from "@/components/sections/communities/_partials/Header";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const headerProps = {
  description: "Test Description",
  title: "Test Title",
  subtitle: "Test Subtitle",
  isTeamChallenge: true,
  isHackathon: true,
};

describe("Header", () => {
  it("renders the Header with Props", () => {
    render(
      <Header
        description={headerProps.description}
        title={headerProps.title}
        subtitle={headerProps.subtitle}
        isTeamChallenge={headerProps.isTeamChallenge}
        isHackathon={headerProps.isHackathon}
      />
    );
    expect(screen.getByRole("heading", { name: headerProps.title })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: new RegExp(headerProps.subtitle) })).toBeInTheDocument();
    expect(screen.getByTestId("tag")).toBeInTheDocument();
    expect(screen.getByText(headerProps.description)).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    render(<Header />);
    expect(screen.queryByRole("heading", { name: new RegExp(headerProps.subtitle) })).toBe(null);
    expect(screen.queryByRole("tag")).toBe(null);
  });

  it("renders 'TEAM' if isHackathon is false", () => {
    render(<Header subtitle={headerProps.subtitle} isTeamChallenge={headerProps.isTeamChallenge} />);
    expect(screen.getByText("TEAM")).toBeInTheDocument();
  });

  it("renders 'Hackathon' if isHackathon is true", () => {
    render(<Header subtitle={headerProps.subtitle} isTeamChallenge={headerProps.isTeamChallenge} isHackathon={headerProps.isHackathon} />);
    expect(screen.getByText("Hackathon")).toBeInTheDocument();
  });
});
