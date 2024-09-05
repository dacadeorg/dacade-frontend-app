import "@testing-library/jest-dom";
import { act, fireEvent, screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import Sidebar from "@/components/popups/Sidebar";
import { colors } from "@__mocks__/fixtures/colors";
import { mockUser } from "@__mocks__/fixtures/user";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

const SidebarMockState = {
  ui: { colors: colors, locked: false, showReferralPopup: false, showJobOffersPopup: false },
  user: { data: mockUser, userBalance: null, balance: null, walletAddresses: null, token: null, referrals: null, fetchingUserLoading: false, filteredUsers: null },
  auth: {
    data: mockUser,
    isAuthLoading: false,
    userBalance: null,
    balance: null,
    walletAddresses: null,
  },
  notifications: { unread: 0, notifications: [], count: 0 },
};
const authenticatedUserMockState = {
  ...SidebarMockState,
  auth: { ...SidebarMockState.auth, data: { ...SidebarMockState.auth.data, emailVerified: true } },
};

const triggerSidebarOpen = async () => {
  const toggleButton = screen.getByTestId("sidebar-toggle-button");
  await act(async () => {
    fireEvent.click(toggleButton);
  });
};
describe("Sidebar Component", () => {
  it("should render the Sidebar component", () => {
    renderWithRedux(<Sidebar testId="popup-sidebar" />);
    const sidebar = screen.getByTestId("popup-sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  it("should toggle between menu and close icons when the toggle button is clicked", async () => {
    renderWithRedux(<Sidebar />, SidebarMockState);

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
    renderWithRedux(<Sidebar />, SidebarMockState);

    const toggleButton = screen.getByTestId("sidebar-toggle-button");
    expect(toggleButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(toggleButton);
    });

    const popup = screen.getByTestId("popup-sidebar");
    expect(popup).toBeVisible();
  });

  it("should not display authenticated user content when isAuthenticated is false", async () => {
    renderWithRedux(<Sidebar />, SidebarMockState);

    await triggerSidebarOpen();

    expect(screen.queryByText(mockUser.username)).not.toBeInTheDocument();
    expect(screen.queryByText("nav.wallet")).not.toBeInTheDocument();
    expect(screen.queryByText("job.offers.title")).not.toBeInTheDocument();
    expect(screen.queryByText("nav.view-profile-codes")).not.toBeInTheDocument();
  });

  it("should display authenticated user content when isAuthenticated is true", async () => {
    renderWithRedux(<Sidebar />, authenticatedUserMockState);

    await triggerSidebarOpen();

    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
    expect(screen.getByText("nav.wallet")).toBeInTheDocument();
    expect(screen.getByText("job.offers.title")).toBeInTheDocument();
    expect(screen.getByText("nav.view-profile-codes")).toBeInTheDocument();
  });
});
