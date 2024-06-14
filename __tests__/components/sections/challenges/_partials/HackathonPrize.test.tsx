import HackathonPrize from "@/components/sections/challenges/_partials/HackathonPrize";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { reward } from "../../../../../__mocks__/reward";
import { Distribution } from "@/types/course";

describe("HackathonPrize", () => {
  const { first, second, third } = reward?.distribution || ({} as Distribution);
  it("should render the hackathon prize", () => {
    render(<HackathonPrize reward={reward} description={"Prize"} testId="hackathonPrizeId" />);
    expect(screen.getByTestId("hackathonPrizeId")).toBeInTheDocument();
  });

  it("should render hackathon prize with reward and description", () => {
    render(<HackathonPrize reward={reward} description={"Prize"} testId="hackathonPrizeId" />);
    if (reward.fiatCurrency) {
      const currency = screen.getByText("communities.overview.reward.fiat.prize.pool");
      expect(currency).toBeInTheDocument();
      expect(currency.textContent).toBe("communities.overview.reward.fiat.prize.pool");
    } else {
      const currency = screen.getByText("communities.overview.reward.crypto.prize.pool");
      expect(currency).toBeInTheDocument();
      expect(currency.textContent).toBe("communities.overview.reward.crypto.prize.pool");
    }

    const descriptionText = screen.getByText("Prize");
    expect(descriptionText).toBeInTheDocument();
    expect(descriptionText.textContent).toBe("Prize");

    const distributionText = screen.getByText(`1st Place ${first}; 2nd Place ${second}; 3rd Place ${third}`);
    expect(distributionText).toBeInTheDocument();
  });
});
