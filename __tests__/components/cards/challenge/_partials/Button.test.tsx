import Button from "@/components/cards/challenge/_partials/Button";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { ButtonProps } from "@/components/cards/challenge/_partials/Button";

const buttonProps: ButtonProps = {
  text: "Test Button",
  onClick: jest.fn(),
  loading: true,
  testId: "button",
};

function RenderButton(props: ButtonProps = buttonProps) {
  renderWithRedux(<Button text={props.text} onClick={props.onClick} loading={props.loading} testId={props.testId} />);
  return screen.getByTestId(buttonProps.testId!);
}

describe("Button", () => {
  it("should render the button", () => {
    const button = RenderButton();
    expect(button).toBeInTheDocument();
  });

  it("should show loader when loading is true", () => {
    RenderButton({ ...buttonProps, loading: true });
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should not show loader when loading is false", () => {
    RenderButton({ ...buttonProps, loading: false });
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const onClickMock = jest.fn();
    RenderButton({ ...buttonProps, onClick: onClickMock, loading: false });
    fireEvent.click(screen.getByTestId(buttonProps.testId!));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("should display text when loading is false and isTextVisible is true", () => {
    renderWithRedux(<Button {...buttonProps} loading={false} />);
    fireEvent.mouseEnter(screen.getByTestId(buttonProps.testId!));
    expect(screen.getByTestId("button-text")).toHaveTextContent(buttonProps.text);
  });
});
