import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import CommunitySection from "@/components/sections/communities/overview/MainHeader";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { CommunitiesState } from "@/store/feature/community.slice";
import { mockCommunity } from "@__mocks__/fixtures/community";
import { mockCourse } from "@__mocks__/fixtures/course";

describe("MainHeader", () => {
  const communityMockState = {
    communities: { current: mockCommunity, courses: [mockCourse], list: [mockCommunity], status: "succeeded" as CommunitiesState["status"], error: null },
  };
  it("renders community section component", () => {
    renderWithRedux(<CommunitySection />, communityMockState);
    expect(screen.getByRole("heading", {name:mockCommunity.name})).toBeInTheDocument();
    const summaryElements = screen.queryAllByText(mockCommunity.summary);
    summaryElements.forEach(element=>{
      expect(element).toBeInTheDocument()
    })
    if(mockCommunity.icon){
      expect(screen.getByRole('img')).toBeInTheDocument()
    }
    expect(screen.getByText("communities.submissions")).toBeInTheDocument();
    expect(screen.getByText("communities.feedbacks")).toBeInTheDocument();
  });
});
