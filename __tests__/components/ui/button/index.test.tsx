import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";
import Button from "@/components/ui/button";
// import classNames from "classnames";

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

function RenderButton(
  props = {
    link: "/",
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
  }
) {
  render(
    <ReduxProvider>
      <Button className={props.className} communityStyles={props.communityStyles} text={props.text} rounded={props.rounded}>
        button
      </Button>
    </ReduxProvider>
  );
  return screen.getByTestId("button");
}

describe("Button", () => {
  it("should render the button", () => {
    const button = RenderButton();
    expect(button).toBeInTheDocument();
  });

  it("Should render button with button tag", () => {
    const button = RenderButton();
    expect(button.tagName).toBe("BUTTON");
  });

  it("Should render a button as an internal link", () => {
    const button = RenderButton({
      link: "/",
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
    });
    expect(button.tagName).toBe("A");
  });
});
