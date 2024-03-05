import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReduxProvider from "../../../__mocks__/provider/ReduxProvider";
import EmailInput from "@/components/ui/EmailInput";
import { FormValues } from "@/pages/signup";
import { FieldErrors } from "react-hook-form";

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
  render(
    <ReduxProvider>
      <EmailInput register={register} errors={{ ...props?.errors }} emailValue={props?.emailValue} />
    </ReduxProvider>
  );

  return screen.getByTestId("emailInput");
};

describe("username Input", () => {
  it("should render the username input", () => {
    const usernameInput = renderUsernameInput();
    expect(usernameInput).toBeInTheDocument();
  });
});
