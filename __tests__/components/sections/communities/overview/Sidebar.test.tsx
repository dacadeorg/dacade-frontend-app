import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import Sidebar from "@/components/sections/communities/overview/Sidebar";
import { mockCourse } from "@__mocks__/fixtures/course";
import { mockCommunity } from "@__mocks__/fixtures/community";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "next",
  }),
}));

describe("Sidebar", () => {
  beforeEach(() => {
    renderWithRedux(<Sidebar />, { communities: { current: mockCommunity, list: [mockCommunity], courses: [mockCourse], status: "succeeded", error: "" } });
  });
  const mainLink = `/communities/${mockCommunity.slug}`;
    const learningMaterialsLink = `/communities/${mockCommunity.slug}/learning-materials`;
    const scoreboardLink = `/communities/${mockCommunity.slug}/scoreboard`;

  it("displays the sidebar", () => {
    expect(screen.getByText("communities.overview.challenges.title")).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenges.description")).toBeInTheDocument();
    expect(screen.getByText("communities.overview.scoreboard.title")).toBeInTheDocument();
    expect(screen.getByText("communities.overview.scoreboard.description")).toBeInTheDocument();
  });

  it("renders the links correctly", () => {
    expect(screen.getByText("communities.overview.challenges.title").closest("a")).toHaveAttribute("href", mainLink);
    expect(screen.getByText("communities.overview.learning-materials.title").closest("a")).toHaveAttribute("href", learningMaterialsLink);
    expect(screen.getByText("communities.overview.scoreboard.title").closest("a")).toHaveAttribute("href", scoreboardLink);
  });
});
