import HackathonPrize from "@/components/sections/challenges/_partials/HackathonPrize";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { reward } from "../../../../../__mocks__/reward";

describe("HackathonPrize", () => {
  it("should render the hackathon prize", () => {
    render(<HackathonPrize reward={reward} description={"Prize"} />);

    const hackathonPrize = screen.getByTestId("hackathonPrizeId");
    expect(hackathonPrize).toBeInTheDocument();
    if(reward.fiatCurrency){
      expect(screen.getByText("communities.overview.reward.fiat.prize.pool"))
    } else {
      expect(screen.getByText("communities.overview.reward.crypto.prize.pool"))
    }
    expect(screen.getByText("Prize")).toBeInTheDocument();
    const distributionText = screen.getByTestId("distributionId");
    expect(distributionText.textContent).toBe(`1st Place ${reward.distribution.first}; 2nd Place ${reward.distribution.second}; 3rd Place ${reward.distribution.third}`);
  });
});
