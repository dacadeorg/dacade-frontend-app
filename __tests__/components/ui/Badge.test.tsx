import Badge from "@/components/ui/Badge";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
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
      pathname: "mocked-pathname"
    }),
  }));
  

describe("Badge", () => {
    it("shoulld render the badge", () => {
        render(
        <ReduxProvider>
        <Badge />
        </ReduxProvider>
        )
        const badge = screen.getByTestId("badgeId")
        expect(badge).toBeInTheDocument()
    })

    it("shoulld render the badge", () => {
        render(
        <ReduxProvider>
        <Badge value={"Badge test"}/>
        </ReduxProvider>
        )
        const badge = screen.getByTestId("badgeId")
        expect(badge.textContent).toBe("Badge test")
    })

})