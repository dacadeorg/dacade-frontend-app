import Filters, { filterOptions, sortingOptions } from "@/components/sections/communities/overview/scoreboard/Filter";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";

jest.mock("next/router", () => {
  const mockRouter = {
    query: { slug: "test-slug" },
    locale: "en",
    push: jest.fn(),
  };
  return {
    useRouter: jest.fn().mockReturnValue(mockRouter),
  };
});

describe("Filter", () => {

  it("renders filter options", () => {
    renderWithRedux(<Filters />);
    expect(screen.getByText("Filter by")).toBeInTheDocument();
    filterOptions.forEach((option) => {
      const labelElement = screen.getByText(option.label)
      const valueElement = screen.getByDisplayValue(option.value)
      expect(labelElement).toBeInTheDocument();
      expect(labelElement.textContent).toBe(option.label)
      expect(valueElement).toBeInTheDocument();
      expect(valueElement.getAttribute("value")).toBe(option.value)
    });
  });

  it("renders default filter and sort values", () => {
    renderWithRedux(<Filters />);
    const defaultFilter = screen.getByDisplayValue("all");
    const defaultSort = screen.getByDisplayValue("score");
    expect(defaultFilter).toBeChecked();
    expect(defaultSort).toBeChecked();
  });

  it("disables filter options when value matches data", () => {
    renderWithRedux(<Filters />);
    filterOptions.forEach((option) => {
      const valueElement = screen.getByDisplayValue(option.value);
      if (option.value === "all") {
        expect(valueElement).toBeDisabled();
      } 
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
      const labelElement = screen.getByText(option.label)
      const optionElement = screen.getByDisplayValue(option.value)
      expect(labelElement).toBeInTheDocument();
      expect(labelElement.textContent).toBe(option.label);
      expect(optionElement).toBeInTheDocument();
      expect(optionElement.getAttribute("value")).toBe(option.value);
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
