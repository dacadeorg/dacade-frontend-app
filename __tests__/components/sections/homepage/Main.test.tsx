import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import MainSection, { cards } from "@/components/sections/homepage/Main";

describe("Main Section", () => {
  it("should render the main section", () => {
    renderWithRedux(<MainSection testId="mainSectionId" />);
    expect(screen.getByTestId("mainSectionId")).toBeInTheDocument();
    const linkElements = screen.getAllByText("page.index.main.button");
    const linkElement = linkElements.find((el) => el.closest("a") !== null);
    expect(linkElement?.closest("a")).toHaveAttribute("href", "/communities");
    const lastLink = linkElements[linkElements.length - 1];
    expect(lastLink.closest("a")).toHaveAttribute("href", "/communities");
  });

  it("should display cards", () => {
    renderWithRedux(<MainSection />);
    cards.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
      expect(screen.getByText(card.body)).toBeInTheDocument();
    });
  });
});
