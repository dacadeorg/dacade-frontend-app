import Markdown from "@/components/ui/Markdown";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";

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

describe("Markdown", () => {
  it("should render Markdown", () => {
    renderWithRedux(<Markdown value="Markdown test" />);

    const markdown = screen.queryByText("Markdown test");
    expect(markdown).toBeInTheDocument();
  });

  it("Should have the markdown styles passed as props", () => {
    const markdownStyle = "mark down style";
    renderWithRedux(<Markdown value="Markdown test" markDownStyles={markdownStyle} />);

    const markdown = screen.queryByText("Markdown test");
    expect(markdown?.className).toContain(markdownStyle);
  });
});
