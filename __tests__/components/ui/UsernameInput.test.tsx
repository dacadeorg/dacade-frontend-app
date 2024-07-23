import React from "react";
import { screen } from "@testing-library/react";
import UsernameInput from "@/components/ui/UsernameInput";
import "@testing-library/jest-dom";
import { renderWithRedux } from "@__mocks__/renderWithRedux";

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

describe("UsernameInput", () => {
  it("should render the username input", () => {
    const register = jest.fn();
    renderWithRedux(<UsernameInput register={register} errors={{}} usernameValue="" />);
    const usernameValue = screen.getByTestId("usernameInput");

    expect(usernameValue).toBeInTheDocument();
  });
});
