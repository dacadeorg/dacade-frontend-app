import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NoHtml from "@/components/ui/NoHtml";

describe("NoHtml", () => {
  it("Should render the processed string without HTML tags", () => {
    const htmlString = "<div>This is <b>bold</b> and <i>italic</i></div>";
    const expectedProcessedString = "This is bold and italic";

    render(<NoHtml value={htmlString} />);

    const spanElement = screen.getByText(expectedProcessedString);
    expect(spanElement).toBeInTheDocument();
  });
});
