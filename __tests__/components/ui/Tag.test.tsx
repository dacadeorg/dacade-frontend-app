import Tag from "@/components/ui/Tag";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Tag", () => {
  it("Should render the tag", () => {
    render(<Tag />);
    const tag = screen.getByTestId("tag");
    expect(tag).toBeInTheDocument();
  });

  it("should render the value", () => {
    render(<Tag value="Test Value" />);
    const tagValue = screen.getByTestId("tag-value");
    expect(tagValue).toBeInTheDocument();
    expect(tagValue).toHaveTextContent("Test Value");
  });

  it("should render children", () => {
    render(<Tag>Test Child</Tag>);
    const tag = screen.getByTestId("tag");
    expect(tag.textContent).toBe("Test Child");
  });
});
