import "@testing-library/jest-dom";
import CommunityNavigation from "@/components/sections/courses/CommunityNavigation";
import { render, screen } from "@testing-library/react";
// import { course } from "../../__mocks__/course.ts";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));


const RenderCommunityNavigation = () => {
  render(
    <ReduxProvider>
      <CommunityNavigation />
    </ReduxProvider>
  );
  return screen.getByTestId("community-navigation-show");
}

describe("CommunityNavigation", () => {
  it("should render the Learning Modules", () => {
    const communityNavigation = RenderCommunityNavigation();
    expect(communityNavigation).toBeInTheDocument();
  });
});