import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { Wallet } from "@/types/wallet";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import CashoutAddress from "@/components/cards/wallet/CashoutAddress";
import { mockUser } from "@__mocks__/fixtures/user";
import { mockWallet } from "@__mocks__/fixtures/wallet";
import { KYCSTATUS, openVerificationModal } from "@/store/feature/kyc.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";

jest.mock("@/hooks/useTypedDispatch.ts", () => ({
  useDispatch: jest.fn(),
}));

const walletMock: Wallet = {
  ...mockWallet,
  title: "Test Wallet",
  token: "BTC",
  balance: 100,
  description: "Test Wallet Description",
  payouts: [],
};

jest.mock("@/store/feature/kyc.slice", () => {
  const actual = jest.requireActual("@/store/feature/kyc.slice");
  return {
    ...actual,
    openVerificationModal: jest.fn(),
  };
});

const mockUserStore = {
  user: {
    data: mockUser,
    userBalance: null,
    balance: null,
    walletAddresses: null,
    token: null,
    referrals: null,
    fetchingUserLoading: false,
    filteredUsers: null,
  },
};

const verifiedUserStore = {
  user: {
    data: {
      ...mockUser,
      kycStatus: KYCSTATUS.VERIFIED,
    },
    userBalance: null,
    balance: null,
    walletAddresses: null,
    token: null,
    referrals: null,
    fetchingUserLoading: false,
    filteredUsers: null,
  },
};
const address = walletMock.address ? walletMock.address.match(/.{1,4}/g) : null;

describe("CashoutAddress component", () => {
  let setShowEditModal: () => void;
  let setShowPayoutModal: () => void;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    setShowEditModal = jest.fn();
    setShowPayoutModal = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  test("renders CashoutAddress component correctly with given props when cashable is true and there's address", () => {
    renderWithRedux(<CashoutAddress wallet={walletMock} setShowEditModal={setShowEditModal} disabled={false} setShowPayoutModal={setShowPayoutModal} />, mockUserStore);
    expect(screen.getByTestId("cashoutAddressId")).toBeInTheDocument();
    address?.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
    expect(screen.getByText("profile.wallets.address-change")).toBeInTheDocument();
  });

  it("Renders wallet description when there is no address", () => {
    renderWithRedux(
      <CashoutAddress wallet={{ ...walletMock, address: "" }} setShowEditModal={setShowEditModal} disabled={false} setShowPayoutModal={setShowPayoutModal} />,
      mockUserStore
    );
    expect(screen.getByText(walletMock.description)).toBeInTheDocument();
    expect(screen.getByText("profile.wallets.address-set")).toBeInTheDocument();
  });

  it("triggers cashout for verified user", () => {
    renderWithRedux(<CashoutAddress wallet={walletMock} setShowEditModal={setShowEditModal} disabled={false} setShowPayoutModal={setShowPayoutModal} />, verifiedUserStore);
    fireEvent.click(screen.getByText("profile.wallets.cash-out"));
    expect(setShowPayoutModal).toHaveBeenCalledWith(true);
  });

  it("Should trigger KYC verification for non-verified user", () => {
    renderWithRedux(<CashoutAddress wallet={walletMock} setShowEditModal={setShowEditModal} disabled={false} setShowPayoutModal={setShowPayoutModal} />, mockUserStore);
    fireEvent.click(screen.getByText("profile.wallets.cash-out"));
    expect(openVerificationModal).toHaveBeenCalled();
  });

  it("Should trigger edit address modal", () => {
    renderWithRedux(<CashoutAddress wallet={walletMock} setShowEditModal={setShowEditModal} disabled={false} setShowPayoutModal={setShowPayoutModal} />, verifiedUserStore);
    fireEvent.click(screen.getByText("profile.wallets.address-change"));
    expect(setShowEditModal).toHaveBeenCalledWith(true);
    expect(mockDispatch).toHaveBeenCalled();
  });

});
