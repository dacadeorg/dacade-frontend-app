import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import CommunitiesSection from "@/components/sections/homepage/Communities";
import { community } from "../../../../__mocks__/community";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Communities Section", () => {
  it("should render community section", () => {
    renderWithRedux(<CommunitiesSection communities={[community]} />);
    expect(screen.getByTestId("communitiesSectionId")).toBeInTheDocument();
    [community].forEach((community) => {
      expect(screen.getByText(community.name)).toBeInTheDocument();
      expect(screen.getByText(community.name).textContent).toBe("aeternity");
    });
    expect(screen.getByText("page.index.communities.partnering.title")).toBeInTheDocument();
  });
});
