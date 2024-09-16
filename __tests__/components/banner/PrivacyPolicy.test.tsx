import "@testing-library/jest-dom";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import PrivacyPolicyBanner from "@/components/banner/PrivacyPolicy";

jest.mock('@/store/feature/banner.slice', () => ({
  ...jest.requireActual('@/store/feature/banner.slice'),
  checkCookiePolicy: jest.fn(() => ({ type: 'mockedCheckCookiePolicy' })),
}));

describe("PrivacyPolicyBanner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render PrivacyPolicyBanner when showCookiePolicy is true", () => {
    renderWithRedux(<PrivacyPolicyBanner />, {
      banner: { showCookiePolicy: true },
    });
    const privacyPolicy = screen.getByTestId("PrivacyPolicy");
    expect(privacyPolicy).toBeInTheDocument();
  });

 
  it("should not render PrivacyPolicyBanner when showCookiePolicy is false", async () => {
    renderWithRedux(<PrivacyPolicyBanner />, {
      banner: { showCookiePolicy: false },
    });

    await waitFor(() => {
      const privacyPolicy = screen.queryByTestId("PrivacyPolicy");
      expect(privacyPolicy).not.toBeInTheDocument(); 
    });
  });

  it("should render the close button when showCookiePolicy is true", () => {
    renderWithRedux(<PrivacyPolicyBanner />, {
      banner: { showCookiePolicy: true },
    });
    const closeButton = screen.getByTestId("closeButton");
    expect(closeButton).toBeInTheDocument();
  });

  it("should not render PrivacyPolicy after the user clicks on the close button", () => {
    renderWithRedux(<PrivacyPolicyBanner />, {
      banner: { showCookiePolicy: true },
    });
    const closeButton = screen.getByTestId("closeButton");
    fireEvent.click(closeButton);
    const privacyPolicy = screen.queryByTestId("PrivacyPolicy");
    expect(privacyPolicy).not.toBeInTheDocument();
  });
});
