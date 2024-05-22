import HackathonPrize from "@/components/sections/challenges/_partials/HackathonPrize";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { reward } from "../../../../../__mocks__/reward";
import { Distribution } from "@/types/course";

describe("HackathonPrize", () => {
  it("should render the hackathon prize", () => {
    render(<HackathonPrize reward={reward} description={"Prize"} testId="hackathonPrizeId" />);

    const { first, second, third } = reward?.distribution || ({} as Distribution);

    const hackathonPrize = screen.getByTestId("hackathonPrizeId");
    expect(hackathonPrize).toBeInTheDocument();

    const prizePoolText = screen.getByText(`$${reward.amount} Prize Pool`);
    expect(prizePoolText).toBeInTheDocument();
    expect(prizePoolText.textContent).toBe(`$${reward.amount} Prize Pool`);

    const descriptionText = screen.getByText("Prize");
    expect(descriptionText).toBeInTheDocument();
    expect(descriptionText.textContent).toBe("Prize");

    const distributionText = screen.getByText(`1st Place $${first}; 2nd Place $${second}; 3rd Place $${third}`);
    expect(distributionText).toBeInTheDocument();
  });
});
