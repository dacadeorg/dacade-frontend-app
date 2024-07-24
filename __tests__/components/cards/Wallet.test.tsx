import CardsWallet from "@/components/cards/Wallet";
import "@testing-library/jest-dom";
import { mockWallet } from "../../../__mocks__/fixtures/wallet";
import { renderWithRedux } from "../../../__mocks__/renderWithRedux";
import { screen } from "@testing-library/react";


// use the actual component when it is done tested
jest.mock("../../../src/components/sections/profile/modals/EditAddress/index.tsx", () => {
  return <h1>hello</h1>;
});

describe("Wallet card component", () => {
  it("renders the wallet component with all the required elements", () => {
    renderWithRedux(<CardsWallet wallet={mockWallet} disabled={false} />);
    expect(screen.getByTestId("cardWalletId")).toBeInTheDocument()
    expect(screen.getByText("User wallet")).toBeInTheDocument();
    expect(screen.getByTestId("tag-value")).toBeInTheDocument();
    expect(screen.queryAllByTestId("currencyId")).not.toBeNull();
    expect(screen.getByTestId("coin")).toBeInTheDocument();
  });
});
