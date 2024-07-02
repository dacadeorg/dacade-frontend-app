import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import OpenSource from "@/components/sections/homepage/OpenSource";

describe("OpenSource", () => {
  it("should render Open Source", () => {
    renderWithRedux(<OpenSource />);
    expect(screen.getByTestId("openSourceId")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/dacadeorg/dacade-frontend-app");
  });
});
