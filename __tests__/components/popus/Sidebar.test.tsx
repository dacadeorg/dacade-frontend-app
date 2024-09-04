import "@testing-library/jest-dom";
import { act, fireEvent, screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import Sidebar from "@/components/popups/Sidebar";
import { colors } from "@__mocks__/fixtures/colors";
import { mockUser } from "@__mocks__/fixtures/user";

// Mocking the required hooks and functions
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

// Mock the functions to be used in the Sidebar component
jest.mock("@/store/feature/ui.slice", () => {
  const toggleBodyScrolling = jest.fn();
  const toggleJobOffersPopup = jest.fn();
  const toggleShowReferralPopup = jest.fn();

  return {
    toggleBodyScrolling,
    toggleJobOffersPopup,
    toggleShowReferralPopup,
  };
});
jest.mock("@/store/services/notification.service", () => ({
  readNotification: jest.fn(),
}));

jest.mock("@/hooks/useTypedDispatch", () => ({
  useDispatch: jest.fn(() => jest.fn()),
}));

jest.mock("@/components/ui/button", () => {
  return function MockButton({ children, ...props }) {
    return (
      <button data-testid="mock-button" {...props}>
        {children}
      </button>
    );
  };
});

const mockState = {
  ui: { colors: colors, locked: false, showReferralPopup: false, showJobOffersPopup: false },
  user: { data: mockUser, userBalance: null, balance: null, walletAddresses: null, token: null, referrals: null, fetchingUserLoading: false, filteredUsers: null },
  isAuthenticated: true,
  unread: 0,
};

describe("Sidebar Component", () => {
  it("should render the Sidebar component", () => {
    renderWithRedux(<Sidebar testId="popup-sidebar" />);
    const sidebar = screen.getByTestId("popup-sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  it("should toggle between menu and close icons when the toggle button is clicked", async () => {
    renderWithRedux(<Sidebar />, mockState);

    const toggleButton = screen.getByTestId("sidebar-toggle-button");
    expect(toggleButton).toBeInTheDocument();

    expect(screen.getByTestId("mobile-menu-logo")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(toggleButton);
    });

    expect(screen.getByTestId("close-icon")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(toggleButton);
    });

    expect(screen.getByTestId("mobile-menu-logo")).toBeInTheDocument();
  });

  it("should open the popup when the toggle button is clicked", async () => {
    renderWithRedux(<Sidebar />, mockState);

    const toggleButton = screen.getByTestId("sidebar-toggle-button");
    expect(toggleButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(toggleButton);
    });

    const popup = screen.getByTestId("popup-sidebar");
    expect(popup).toBeVisible();
  });
});
