import HackathonPrize from "@/components/sections/challenges/_partials/HackathonPrize";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { reward } from "../../../../../__mocks__/reward";

describe("HackathonPrize", () => {
  it("should render the hackathon prize", () => {
    render(<HackathonPrize reward={reward} description={"Prize"} />);

    const hackathonPrize = screen.getByTestId("hackathonPrizeId");
    expect(hackathonPrize).toBeInTheDocument();

    const prizePoolText = screen.getByText(`$${reward.amount} Prize Pool`);
    expect(prizePoolText).toBeInTheDocument();

    const descriptionText = screen.getByText("Prize");
    expect(descriptionText).toBeInTheDocument();

    const distributionText = screen.getByTestId("distributionId");
    expect(distributionText.textContent).toBe(`1st Place $${reward.distribution.first};  2nd Place $${reward.distribution.second}; 3rd Place $${reward.distribution.third}`)
  });
});
