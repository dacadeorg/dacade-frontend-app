import CardsWallet from "@/components/cards/wallet";
import "@testing-library/jest-dom";
import { mockWallet } from "@__mocks__/fixtures/wallet";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";

// use the actual component when it is done tested
jest.mock("@/components/sections/profile/modals/EditAddress", () => {
  return <div>Edit address</div>;
});

jest.mock("@/hooks/useTypedDispatch.ts", () => ({
  useDispatch: jest.fn(),
}));

describe("Wallet card component", () => {
  it("renders the wallet component with all the children", () => {
    renderWithRedux(<CardsWallet wallet={mockWallet} disabled={false} />);
    expect(screen.getByTestId("cardWalletId")).toBeInTheDocument();
    expect(screen.getByTestId("overviewId")).toBeInTheDocument();
    expect(screen.getByTestId("cashoutAddressId")).toBeInTheDocument();
    expect(screen.queryByText("profile.wallet.payout.text")).not.toBeNull();
  });
});
