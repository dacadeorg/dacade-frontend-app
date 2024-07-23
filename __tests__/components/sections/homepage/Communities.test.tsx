import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import CommunitiesSection from "@/components/sections/homepage/Communities";
import { mockCommunity } from "@__mocks__/fixtures/community";
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Communities Section", () => {
  it("should render community section", () => {
    renderWithRedux(<CommunitiesSection communities={[mockCommunity]} />);
    expect(screen.getByTestId("communitiesSectionId")).toBeInTheDocument();
    [mockCommunity].forEach((community) => {
      expect(screen.getByText(community.name)).toBeInTheDocument();
      expect(screen.getByText(community.name).textContent).toBe("aeternity");
    });
    expect(screen.getByText("page.index.communities.partnering.title")).toBeInTheDocument();
  });
  it("should handle empty communities list", () => {
    renderWithRedux(<CommunitiesSection communities={[]} />);
    expect(screen.queryByText(mockCommunity.name)).not.toBeInTheDocument();
  });

  it("should render the PartneringCard", () => {
    renderWithRedux(<CommunitiesSection communities={[mockCommunity]} />);
    expect(screen.getByText("page.index.communities.partnering.title")).toBeInTheDocument();
  });
});
