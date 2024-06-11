import "@testing-library/jest-dom";
import PageNavigation from "@/components/sections/courses/PageNavigation";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));


const arrowButtonProps = {
  customStyle: {},
  minWidthClass: "",
  className: "",
  children: "Arrow button",

};


const linkPrev = "/"

const linkNext = "/"

const RenderArrowButton = (props = arrowButtonProps) => {
  const { customStyle, minWidthClass, className } =
    props;

  renderWithRedux(
    <ArrowButton
      customStyle={customStyle}
      minWidthClass={minWidthClass}
      className={className}
  
    >
      {props.children}
    </ArrowButton>
  );

  return screen.getByText(arrowButtonProps.children);
};

describe("PageNavigation", () => {

  it("Should render the arrow button", () => {
    const arrowButton = RenderArrowButton();
    expect(arrowButton).toBeInTheDocument();
  });
  
  it("should render the Page Navigation", () => {
    renderWithRedux( <PageNavigation /> );
    const pageNavigation = screen.getByTestId("pageNavId");
    expect(pageNavigation).toBeInTheDocument();
  });


  it("should render page nav link with previous link", () => {
    renderWithRedux(<Link href={linkNext}/>);
    const pageNavLink = screen.getByTestId("pageNavLinkId");
    expect(pageNavLink).toBeInTheDocument();
    expect(pageNavLink).toHaveAttribute("href", "/");
  });


  it("should render page nav link with next link", () => {
    renderWithRedux(<Link href={linkPrev}/>);
    const pageNavLink = screen.getByTestId("pageNavLinkId");
    expect(pageNavLink).toBeInTheDocument();
    expect(pageNavLink).toHaveAttribute("href", "/");
  });




});
