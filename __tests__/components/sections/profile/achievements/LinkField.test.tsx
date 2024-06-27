import AchievementLinkField from "@/components/sections/profile/achievements/LinkField";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("AchievementLinkField", () => {
  const testLink = "https://dacade.org/some/path";
  it("should render the achievement link", () => {
    render(<AchievementLinkField link={testLink} />);
    expect(screen.getByTestId("achievementLinkId")).toBeInTheDocument();
    const linkElement = screen.getByText(testLink);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.textContent).toBe("https://dacade.org/some/path");
  });
  it("should copy the link to the clipboard when clicked", () => {
    render(<AchievementLinkField link={testLink} />);
    if (navigator.clipboard) {
      const mockCopy = async () => await navigator.clipboard.writeText(testLink);
      const linkElement = screen.getByText(testLink);
      fireEvent.click(linkElement);
      expect(mockCopy()).toHaveBeenCalled();
    }
  });
  it("should have the link button", () => {
    render(<AchievementLinkField link={testLink} />);
    const mockPathname = testLink.split("https://dacade.org/")[1];
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("link").hasAttribute("href")).toBeTruthy();
    if (typeof window !== "undefined") {
      expect(screen.getByRole("link").getAttribute("href")).toBe(`${window.location.origin}/${mockPathname}`);
    }
  });
});
