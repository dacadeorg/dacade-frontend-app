import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Story from "@/components/cards/Story";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("Story Component", () => {
  const mockStory = {
    content: "Test story content",
    icon: "/test-icon.png",
  };

  const defaultProps = {
    story: mockStory,
    position: 0,
    gridPosition: 0,
    count: 5,
    showingBubble: { card: null, grid: null },
    onShowBubble: jest.fn(),
    onHideBubble: jest.fn(),
  };

  it("renders the story icon", () => {
    render(<Story {...defaultProps} />);
    expect(screen.getByTestId("storyId")).toBeInTheDocument();
    const icon = screen.getByAltText("story icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/test-icon.png");
  });

  it("shows the bubble when clicked", () => {
    render(<Story {...defaultProps} />);
    fireEvent.click(screen.getByTestId("storyId"));
    expect(screen.getByText("Test story content")).toBeInTheDocument();
    expect(defaultProps.onShowBubble).toHaveBeenCalled();
  });

  it("hides the bubble when clicked again", () => {
    render(<Story {...defaultProps} />);
    fireEvent.click(screen.getByTestId("storyId"));
    fireEvent.click(screen.getByTestId("storyId"));
    expect(screen.queryByText("Test story content")).not.toBeInTheDocument();
    expect(defaultProps.onHideBubble).toHaveBeenCalled();
  });

  it("shows the bubble initially when showingBubble matches position and gridPosition", () => {
    const props = {
      ...defaultProps,
      showingBubble: { card: 0, grid: 0 },
    };
    render(<Story {...props} />);
    expect(screen.getByText("Test story content")).toBeInTheDocument();
  });
});
