import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import CommunitySection from "@/components/sections/communities/overview/MainHeader";
import { renderWithRedux } from "../../../../../__mocks__/renderWithRedux";

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

describe("MainHeader", () => {
    it("displays the header", () => {
        renderWithRedux(<CommunitySection/>)
        expect(screen.getByTestId("mainHeaderId")).toBeInTheDocument()
        expect(screen.getByText("communities.submissions")).toBeInTheDocument()
        expect(screen.getByText("communities.feedbacks")).toBeInTheDocument()
    })
})