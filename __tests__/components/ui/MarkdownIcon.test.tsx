import MarkdownIcon from "@/components/ui/MarkdownIcon";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("MarkdownIcon", () => {
  it("should render the Markdown icon", () => {
    render(<MarkdownIcon />);

    const markdownIcon = screen.getByTestId("markdown-icon");
    expect(markdownIcon).toBeInTheDocument();
  });

  it("should render the Markdown link", () => {
    render(<MarkdownIcon />);
    const markdownLink = screen.getByText("Markdown");
    expect(markdownLink).toBeInTheDocument();
    expect(markdownLink).toHaveAttribute("href", "https://www.markdownguide.org/cheat-sheet/");
  });
});
