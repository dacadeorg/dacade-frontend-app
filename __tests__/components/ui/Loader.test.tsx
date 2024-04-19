import Loader from "@/components/ui/Loader";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { colors } from "../../../__mocks__/colors";
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

describe("Loader Component", () => {
  it("renders Loader component", () => {
    renderWithRedux(
        <Loader />
    );
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("renders Loader component with community styles", () => {
    renderWithRedux(
        <Loader communityStyles />
    );
    const container = screen.queryByTestId("loader");
    expect(container?.firstChild).toHaveStyle(`color: ${colors.textAccent}`); 
  });
});
