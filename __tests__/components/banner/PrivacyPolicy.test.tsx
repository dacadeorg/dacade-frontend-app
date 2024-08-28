import "@testing-library/jest-dom";
import PrivacyPolicyBanner from "@/components/banner/PrivacyPolicy";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { fireEvent, screen } from "@testing-library/react";

const mockPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    locale: "en",
    push: mockPush,
  })),
}));

jest.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key === "signup-page.privacy" ? "Translated Privacy Policy" : key,
  }),
}));

describe("PrivacyPolicyBanner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render PrivacyPolicy", () => {
    const { getByTestId } = renderWithRedux(<PrivacyPolicyBanner />, {
      banner: { showCookiePolicy: true },
    });
    const privacyPolicy = getByTestId("PrivacyPolicy");
    expect(privacyPolicy).toBeInTheDocument();
  });

  it("should accept the cookies policy and not render PrivacyPolicy after the user clicks on the close button", () => {
    const { queryByTestId } = renderWithRedux(<PrivacyPolicyBanner />, {
      banner: { showCookiePolicy: false },
    });
    const closeButton = screen.getByTestId("closeButton");
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(queryByTestId("PrivacyPolicy")).not.toBeInTheDocument();
  });
  
});
