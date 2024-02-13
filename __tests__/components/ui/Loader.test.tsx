import Loader from "@/components/ui/Loader";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReduxProvider from "../../../__mocks__/provider/ReduxProvider";
import { colors } from "../../../__mocks__/colors";

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
    const container = screen.getByTestId("loader");
    expect(container.firstChild).toHaveStyle(colors.textAccent); // Assuming colors?.textAccent is undefined in the mocked useSelector
  });

  it("renders Loader component with small spinner", () => {
    render(
      <ReduxProvider>
        <Loader isSmallSpinner />
      </ReduxProvider>
    );
    const container = screen.getByTestId("loader");
    expect(container.querySelector(".h-6")).toBeInTheDocument();
    expect(container.querySelector(".w-6")).toBeInTheDocument();
  });

  it("renders Loader component with default spinner size", () => {
    render(
      <ReduxProvider>
        <Loader />
      </ReduxProvider>
    );
    const container = screen.getByTestId("loader");
    expect(container.querySelector(".h-12")).toBeInTheDocument();
    expect(container.querySelector(".w-12")).toBeInTheDocument();
  });
});
