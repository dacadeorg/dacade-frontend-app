import Filters, { filterOptions, sortingOptions } from "@/components/sections/communities/overview/scoreboard/Filter";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { renderWithRedux } from "../../../../../../__mocks__/renderWithRedux";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Filter", () => {
  const mockRouter = {
    query: { slug: "test-slug" },
    locale: "en",
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("renders filter options", () => {
    renderWithRedux(<Filters />);
    expect(screen.getByText("Filter by")).toBeInTheDocument();
    filterOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
      expect(screen.getByDisplayValue(option.value)).toBeInTheDocument();
    });
  });

  it("updates filter options on change on filter", () => {
    renderWithRedux(<Filters />);
    filterOptions.forEach((option) => {
      const value = screen.getByDisplayValue(option.value);
      fireEvent.change(value, { target: { value: "new filter option" } });
      expect(value.getAttribute("value")).toContain("new filter option");
    });
  });

  it("renders sort options", () => {
    renderWithRedux(<Filters />);
    expect(screen.getByText("Sort")).toBeInTheDocument();
    sortingOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
      expect(screen.getByDisplayValue(option.value)).toBeInTheDocument();
    });
  });

  it("updates filter options on change on sort", () => {
    renderWithRedux(<Filters />);
    sortingOptions.forEach((option) => {
      const value = screen.getByDisplayValue(option.value);
      fireEvent.change(value, { target: { value: "new filter option" } });
      expect(value.getAttribute("value")).toContain("new filter option");
    });
  });
});
