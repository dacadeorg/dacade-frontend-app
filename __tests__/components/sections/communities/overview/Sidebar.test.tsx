import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import Sidebar from "@/components/sections/communities/overview/Sidebar";
import { mockCourse } from "@__mocks__/course";
import { mockCommunity } from "@__mocks__/community";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "next",
  }),
}));

describe("Sidebar", () => {
  it("displays the sidebar", () => {
    renderWithRedux(<Sidebar testId="sidebarId" />, { community: { current: mockCommunity, list: [mockCommunity], courses: [mockCourse], status: "succeeded", error: "" } });
    expect(screen.getByTestId("sidebarId")).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenges.title")).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenges.description")).toBeInTheDocument();
  });
});
