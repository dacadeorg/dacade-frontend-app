import Button, { ButtonProps } from "@/components/cards/challenge/_partials/Button";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
});

const buttonProps: ButtonProps = {
  text: "Test Button",
  onClick: jest.fn(),
  loading: true,
};

function RenderButton(props: ButtonProps = buttonProps) {
  renderWithRedux(
    <Button
      text={props.text}
      onClick={props.onClick}
      loading={props.loading}
    />
  );
  return screen.getByTestId("button");
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
    fireEvent.click(screen.getByTestId("button"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("should display text when loading is false and isTextVisible is true", () => {
    renderWithRedux(<Button {...buttonProps} loading={false} />);
    fireEvent.mouseEnter(screen.getByTestId("button"));
    expect(screen.getByTestId("button-text")).toHaveTextContent(buttonProps.text);
  });
});
