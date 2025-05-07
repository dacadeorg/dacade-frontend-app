import "@testing-library/jest-dom";
import CommunityNavigation from "@/components/sections/courses/CommunityNavigation";
import { render, screen } from "@testing-library/react";
import ChevronRightIcon from "@/icons/chevron-right.svg";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";
import Link from "next/link";


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
  return screen.getByTestId("communityNavigationShow");
}

describe("CommunityNavigation", () => {
  it("should render the Learning Modules", () => {
    const communityNavigation = RenderCommunityNavigation();
    expect(communityNavigation).toBeInTheDocument();
  });
});

it("should render the Chevron Right Icon", () => {
  render( <ChevronRightIcon /> );
  const communityNavigationChevIcon = screen.getByTestId("communityNavId");
  expect(communityNavigationChevIcon).toBeInTheDocument();
});

it("should render the Link", () => {
  render( <Link href={""} >link</Link> );
  const communityNavigationLink = screen.getByTestId("communityNavLink");
  expect(communityNavigationLink).toBeInTheDocument();
});