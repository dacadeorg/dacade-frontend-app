import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Wallet } from "@/types/wallet";
import WalletHint from "@/components/cards/wallet/WalletHint";
import { mockWallet } from "@__mocks__/fixtures/wallet";

const wallet: Wallet = {
  ...mockWallet,
  payouts: [
    { amount: 100, token: "ETH" },
    { amount: 200, token: "BTC" },
  ],
};

describe("WalletHint component", () => {
  it("should render WalletHint component with the correct number of Hint components", () => {
    render(<WalletHint wallet={wallet} />);
    const textElements = screen.getAllByText("profile.wallet.payout.text");
    expect(textElements).toHaveLength(wallet.payouts.length);
  });

  it("renders the correct number of Hint components", () => {
    render(<WalletHint wallet={wallet} />);
    const hints = screen.getAllByText("profile.wallet.payout.text");
    expect(hints).toHaveLength(wallet.payouts.length);
  });

  it("renders Currency components with correct values", () => {
    render(<WalletHint wallet={wallet} />);
    const currencyElements = screen.getAllByTestId("currencyId");
    expect(currencyElements).toHaveLength(wallet.payouts.length);
    wallet.payouts.forEach((payout, index) => {
      const element = currencyElements[index];
      expect(element).toHaveTextContent(new RegExp(`${payout.token}`));
    });
  });
});
