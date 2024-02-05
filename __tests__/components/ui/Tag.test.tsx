import Tag from "@/components/ui/Tag";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Tag", () => {
  it("Should render the tag", () => {
    render(<Tag />);
    const tag = screen.getByTestId("tag")
    expect(tag).toBeInTheDocument();
  });

  it("Should be rounded", () => {
    render(<Tag rounded={true}/>);
    const tag = screen.getByTestId("tag")
    expect(tag).toHaveClass("rounded-full");
  });

  it("applies correct background color based on 'type' prop", () => {
    render(<Tag type="gray" />);
    const tag = screen.getByTestId("tag")
    expect(tag).toHaveClass("bg-gray-200 text-gray-500");
  });

  it("should render the value", () => {
    render(<Tag value="Test Value" />);
    const tag = screen.getByText("Test Value");

    expect(tag).toBeInTheDocument();
  });

  it("should render children", () => {
    render(<Tag>Test Child</Tag>);
    const tag = screen.getByText("Test Child");

    expect(tag).toBeInTheDocument();
  });

});
