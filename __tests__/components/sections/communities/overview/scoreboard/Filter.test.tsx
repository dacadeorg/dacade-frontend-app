import Filters from "@/components/sections/communities/overview/scoreboard/Filter";
import "@testing-library/jest-dom";
import {  screen } from "@testing-library/react";
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
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Quarter")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
  });

  it("renders sort options", () => {
    renderWithRedux(<Filters />);
    expect(screen.getByText("Sort")).toBeInTheDocument();
    expect(screen.getByText("Reputation")).toBeInTheDocument();
    expect(screen.getByText("Submission points")).toBeInTheDocument();
  });

})