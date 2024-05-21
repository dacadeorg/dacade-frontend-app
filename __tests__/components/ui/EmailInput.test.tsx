import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmailInput from "@/components/ui/EmailInput";
import { FormValues } from "@/pages/signup";
import { FieldErrors } from "react-hook-form";
import { renderWithRedux } from "../../../__mocks__/renderWithRedux";

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

const renderUsernameInput = (props?: { errors: FieldErrors<FormValues>; emailValue: string }) => {
  const register = jest.fn();
  renderWithRedux(<EmailInput register={register} errors={{ ...props?.errors }} emailValue={props?.emailValue} />);

  return screen.getByTestId("emailInput");
};

describe("username Input", () => {
  it("should render the username input", () => {
    const usernameInput = renderUsernameInput();
    expect(usernameInput).toBeInTheDocument();
  });
});
