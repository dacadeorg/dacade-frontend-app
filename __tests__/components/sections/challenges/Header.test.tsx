import ChallengeHeader from "@/components/sections/challenges/Header";
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
    }),
  }));

describe("Header", ()=> {
    it("should render the header", () => {
        render(
        <ReduxProvider>
        <ChallengeHeader/>
        </ReduxProvider>
        )
        const challengeheader = screen.getByTestId("challengeHeaderId")
        expect(challengeheader).toBeInTheDocument()
    })
})