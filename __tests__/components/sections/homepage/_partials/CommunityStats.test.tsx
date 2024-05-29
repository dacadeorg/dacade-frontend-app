import CommunityStats, { stats } from "@/components/sections/homepage/_partials/testimonials/CommunityStats";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../../__mocks__/renderWithRedux";

describe("CommunityStats", () => {
  it("should render Community stats", () => {
    renderWithRedux(<CommunityStats />);
    const communityStat = screen.getByTestId("communityStatsId");
    expect(communityStat).toBeInTheDocument();
  });

  it("should display the stats", () => {
    renderWithRedux(<CommunityStats />);
    stats.forEach((stat) => {
      expect(screen.getByText(stat.count)).toBeInTheDocument();
      expect(screen.getByText(stat.count).textContent).toBe(stat.count.toString());
      expect(screen.getByText(stat.title)).toBeInTheDocument();
      expect(screen.getByText(stat.title).textContent).toBe(stat.title.toString());
      expect(screen.getByText(stat.description)).toBeInTheDocument();
      expect(screen.getByText(stat.description).textContent).toBe((stat.title + " " + stat.description).toString());
    });
  });

  it("should display the anchor tag with button", () => {
    renderWithRedux(<CommunityStats />);
    expect(screen.getByRole("link")).toHaveAttribute("href");
    expect(screen.getByRole("link").getAttribute("href")).toBe("https://discord.gg/U38KQHDtHe");
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("testimonials.community.join")).toBeInTheDocument();
  });
});
