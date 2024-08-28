import Overview from "@/components/cards/wallet/Overview";
import { mockWallet } from "@__mocks__/fixtures/wallet";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const wallet = {
  ...mockWallet,
  title: "some title",
};

describe("Overview component", () => {
  it("Should render Overview component and all the required elements with props value", () => {
    render(<Overview wallet={wallet} />);
    expect(screen.getByTestId("overviewId")).toBeInTheDocument();
     expect(screen.getByText(wallet.title)).toBeInTheDocument();
     expect(screen.getByText("profile.wallets.balance")).toBeInTheDocument();
     expect(screen.getByTestId("currencyId")).toBeInTheDocument();
     expect(screen.getByTestId("coin")).toBeInTheDocument();
     expect(screen.getByTestId("tag")).toBeInTheDocument();
  });

});
