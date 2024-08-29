import UserPopup from "@/components/popups/user";
import { mockUser } from "@__mocks__/fixtures/user";
import { mockWallet } from "@__mocks__/fixtures/wallet";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    pathname: "mocked-pathname",
  }),
}));

const mockInitialState = {
  wallets: { main: mockWallet, list: [mockWallet], current: mockWallet },
  user: {
    data: mockUser,
    userBalance: "0",
    balance: "0",
    walletAddresses: "",
    token: "",
    referrals: [],
    fetchingUserLoading: false,
    filteredUsers: [],
  },
};

describe("UserPopup component", () => {

  it("renders the user popup component and all the required elements", () => {
    renderWithRedux(<UserPopup buttonStyles={{}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId("user-popup")).toBeInTheDocument();
  });

  it("renders the Currency component when mainWallet is present", () => {
    renderWithRedux(<UserPopup buttonStyles={{}} />, mockInitialState );
    expect(screen.getByTestId("currencyId")).toBeInTheDocument();
  })
  it("does not render the Currency component when mainWallet is not present", () => {
    renderWithRedux(<UserPopup buttonStyles={{}} /> );
    expect(screen.queryByTestId("currencyId")).toBeNull();
  })

    it("toggles the show state when the button is clicked", async () => {
      renderWithRedux(<UserPopup buttonStyles={{}} />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(screen.getByTestId("dropdownpopup")).toBeInTheDocument();
    });


});
