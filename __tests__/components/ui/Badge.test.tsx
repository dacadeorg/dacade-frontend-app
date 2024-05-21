import Badge from "@/components/ui/Badge";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
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
    pathname: "mocked-pathname", 
  }),
}));

describe("Badge", () => {
  it("should render the badge", () => {
    renderWithRedux(<Badge />);
    const badge = screen.getByTestId("badgeId");
    expect(badge).toBeInTheDocument();
  });

  it("shoulld render the badge", () => {
    renderWithRedux(<Badge value={"Badge test"} />);
    const badge = screen.getByTestId("badgeId");
    expect(badge.textContent).toBe("Badge test");
  });
});
