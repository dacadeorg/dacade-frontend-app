import AchievementViewItem from "@/components/sections/profile/achievements/ListItem";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("AchievementViewItem", () => {
  it("should render the achievement view item", () => {
    render(
      <AchievementViewItem name="viewItem">
        <p>Testing achievement view item</p>
      </AchievementViewItem>
    );
    expect(screen.getByTestId("achievementViewItemId")).toBeInTheDocument();
    expect(screen.getByText("viewItem")).toBeInTheDocument();
    expect(screen.getByTestId("achievementViewItemId").textContent).toContain("Testing achievement view item");
  });
});
