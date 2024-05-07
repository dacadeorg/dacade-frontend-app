import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../../__mocks__/renderWithRedux";
import Sidebar from "@/components/sections/communities/overview/Sidebar";

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

describe("Sidebar", () => {
    it("displays the sidebar", () => {
        renderWithRedux(<Sidebar/>)
        expect(screen.getByTestId("sidebarId")).toBeInTheDocument()
        expect(screen.getByText("communities.overview.challenges.title")).toBeInTheDocument()
        expect(screen.getByText("communities.overview.challenges.description")).toBeInTheDocument()
    })
})