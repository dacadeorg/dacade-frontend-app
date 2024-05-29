import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import OpenSource from "@/components/sections/homepage/OpenSource";

describe("OpenSource", () => {
  it("should render Open Source", () => {
    renderWithRedux(<OpenSource />);
    expect(screen.getByTestId("openSourceId")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link").hasAttribute("href")).toBeTruthy();
    expect(screen.getByRole("link").getAttribute("href")).toBe("https://github.com/dacadeorg/dacade-frontend-app");
  });
});
