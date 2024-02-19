import React from "react";
import { render, screen } from "@testing-library/react";
import UsernameInput from "@/components/ui/UsernameInput";
import "@testing-library/jest-dom";
import ReduxProvider from "../../../__mocks__/provider/ReduxProvider";

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
        <UsernameInput register={register} errors={{}} usernameValue="" />
      </ReduxProvider>
    );
    const usernameValue = screen.getByTestId("usernameInput");

    expect(usernameValue).toBeInTheDocument();
  });
});
