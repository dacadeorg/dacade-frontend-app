import Loader from "@/components/ui/Loader";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { colors } from "../../../__mocks__/colors";
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

describe("Loader Component", () => {
  it("renders Loader component", () => {
    render(
      <ReduxProvider>
        <Loader />
      </ReduxProvider>
    );
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("renders Loader component with community styles", () => {
    render(
      <ReduxProvider>
        <Loader communityStyles />
      </ReduxProvider>
    );
    const container = screen.queryByTestId("loader");
    expect(container?.firstChild).toHaveStyle(`color: ${colors.textAccent}`); 
  });
});
