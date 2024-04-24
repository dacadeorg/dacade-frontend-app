import ChallengeHeader from "@/components/sections/challenges/Header";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";

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
        renderWithRedux(
        <ChallengeHeader/>
        )
        const challengeheader = screen.getByTestId("challengeHeaderId")
        expect(challengeheader).toBeInTheDocument()
    })
})