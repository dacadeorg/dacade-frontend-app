import "@testing-library/jest-dom";
import Wrapper from "@/components/sections/courses/Wrapper";
import Navigation from "@/components/sections/courses/Navigation";
import MobileNav from "@/components/sections/courses/MobileNav";
import CommunityNavigation from "@/components/sections/courses/CommunityNavigation";
import { render, screen } from "@testing-library/react";


describe("Wrapper", () => {

  it("should render the Wrapper", () => {
    // eslint-disable-next-line react/no-children-prop
    render( <Wrapper children={undefined} />);
    const wrapper = screen.getByTestId("wrapperId");
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByPlaceholderText("wrapperSectionId")).toBeInTheDocument();
  });


  it("Should render Navigation component", () => {
    render(<Navigation />);
    const navigation = screen.getByTestId("NavId");
    expect(navigation).toBeInTheDocument();
  });


  it("Should render Navigation component", () => {
    render(<MobileNav />);
    const inputElement = screen.getByPlaceholderText("showTopBorder");
    expect(inputElement).toBeInTheDocument();    
    const mobileNav = screen.getByText("MobileNavId");
    expect(mobileNav).toBeInTheDocument();
  });


  it("Should render Navigation component", () => {
    render(<CommunityNavigation />);
    const inputElement = screen.getByPlaceholderText("paths");
    expect(inputElement).toBeInTheDocument();
    const communityNav = screen.getByTestId("communityNavId");
    expect(communityNav).toBeInTheDocument();
  });

});


