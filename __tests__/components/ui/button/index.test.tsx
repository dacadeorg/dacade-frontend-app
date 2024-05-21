import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import Button, { ButtonProps } from "@/components/ui/button";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";

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

const buttonProps: ButtonProps = {
  link: "",
  text: "",
  disabled: false,
  rounded: true,
  variant: "primary",
  type: "submit",
  padding: true,
  customStyle: null,
  target: "_self",
  communityStyles: false,
  onClick: () => null,
  className: "",
  children: "button",
};

function RenderButton(props = buttonProps) {
  renderWithRedux(
    <Button
      className={props.className}
      onClick={props.onClick}
      type={props.type}
      link={props.link}
      disabled={props.disabled}
      padding={props.padding}
      target={props.target}
      communityStyles={props.communityStyles}
      text={props.text}
      rounded={props.rounded}
    >
      {props.children}
    </Button>
  );

  return screen.getByTestId("button");
}

describe("Button", () => {
  it("should render the button and its children", () => {
    const button = RenderButton();
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe(buttonProps.children);
  });

  it("Should render button with button tag", () => {
    const button = RenderButton();
    expect(button.tagName).toBe("BUTTON");
  });

  it("Should render a button as an internal link", () => {
    const button = RenderButton({ ...buttonProps, link: "/internal" });
    expect(button.tagName).toBe("A");
  });

  it("Should be disabled when the button is disabled", () => {
    const button = RenderButton({ ...buttonProps, disabled: true, type: "button" });
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  it("Should be enabled when the button is enabled", () => {
    const button = RenderButton({ ...buttonProps, type: "button" });
    expect((button as HTMLButtonElement).disabled).toBe(false);
  });

  it("Should be a submit button", () => {
    const button = RenderButton({ ...buttonProps, type: "submit" });
    expect((button as HTMLButtonElement).type).toBe("submit");
  });

  it("Should be a reset button", () => {
    const button = RenderButton({ ...buttonProps, type: "reset" });
    expect((button as HTMLButtonElement).type).toBe("reset");
  });

  it("Should fire click event", () => {
    const handleClick = jest.fn();
    const button = RenderButton({ ...buttonProps, onClick: handleClick });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
