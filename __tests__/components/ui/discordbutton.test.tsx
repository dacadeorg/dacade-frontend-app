import DiscordButton from "@/components/ui/DiscordButton";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
describe("Discordbutton", () => {
  it("should act as a link", () => {
    render(<DiscordButton />);
    const discordButton = screen.getByTestId("discordbutton-id");
    expect(discordButton.tagName).toBe("A");
  });
});
