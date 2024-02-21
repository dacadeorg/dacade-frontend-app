import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReduxProvider from "../../../__mocks__/provider/ReduxProvider";
import EmailInput from "@/components/ui/EmailInput";

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
    render(
      <ReduxProvider>
        <EmailInput register={register} errors={{}} />
      </ReduxProvider>
    );
    const usernameValue = screen.getByTestId("emailInput");

    expect(usernameValue).toBeInTheDocument();
  });
});