import ArrowButton from "@/components/ui/button/Arrow";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

const arrowButtonProps = {
  loading: false,
  disabled: false,
  rounded: true,
  type: "submit" as "submit" | "button" | "reset" | undefined,
  variant: "primary",
  padding: true,
  children: "Arrow button",
  customStyle: null,
  link: "",
  target: "_self",
  direction: "right" as "right" | "left" | "up" | "down" | undefined,
  minWidthClass: "min-w-44",
  communityStyles: true,
  arrowClasses: "",
  onClick: () => jest.fn(),
  className: "",
};

const RenderArrowButton = (props = arrowButtonProps) => {
  const { loading, disabled, rounded, type, variant, padding, children, customStyle, link, target, direction, minWidthClass, communityStyles, arrowClasses, onClick, className } =
    props;

  render(
    <ReduxProvider>
      <ArrowButton
        loading={loading}
        disabled={disabled}
        rounded={rounded}
        type={type}
        variant={variant}
        padding={padding}
        customStyle={customStyle}
        link={link}
        target={target}
        direction={direction}
        minWidthClass={minWidthClass}
        communityStyles={communityStyles}
        arrowClasses={arrowClasses}
        onClick={onClick}
        className={className}
      >
        {children}
      </ArrowButton>
    </ReduxProvider>
  );

  return screen.getByText(arrowButtonProps.children);
};

describe("Arrow button", () => {
  it("Should render the arrow button", () => {
    const arrowButton = RenderArrowButton();
    expect(arrowButton).toBeInTheDocument();
  });

  it("Should render right icon and not the left icon", () => {
    const arrowButton = RenderArrowButton();
    const rightIcon = screen.getByTestId("right-icon");
    const leftIcon = arrowButton.querySelector("[data-testid=left-icon]");
    expect(leftIcon).toBe(null);
    expect(rightIcon).toBeInTheDocument();
  });

  it("Should render the left icon and not the right icon", () => {
    const arrowButton = RenderArrowButton({ ...arrowButtonProps, direction: "left" });
    const leftIcon = screen.getByTestId("left-icon");
    const rightIcon = arrowButton.querySelector("[data-testid=right-icon]");
    expect(rightIcon).toBe(null);
    expect(leftIcon).toBeInTheDocument();
  });

  it("Should display the spinner while loading", () => {
    RenderArrowButton({ ...arrowButtonProps, loading: true });
    const spinnerIcon = screen.getByTestId("spinner-icon");
    expect(spinnerIcon).toBeInTheDocument();
  });

  it("Should not render the spinner if not loading", () => {
    const arrowButton = RenderArrowButton();
    const spinnerIcon = arrowButton.querySelector("[data-testid=spinner-icon]");
    expect(spinnerIcon).toBe(null);
  });
});
