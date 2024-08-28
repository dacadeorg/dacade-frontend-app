import "@testing-library/jest-dom";
import PrivacyPolicyBanner from "@/components/banner/PrivacyPolicy";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { fireEvent, screen } from "@testing-library/react";

describe("PrivacyPolicyBanner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render PrivacyPolicy", () => {
    renderWithRedux(<PrivacyPolicyBanner />, {
      banner: { showCookiePolicy: true },
    });
    const privacyPolicy = screen.getByTestId("PrivacyPolicy");
    expect(privacyPolicy).toBeInTheDocument();
  });

it("should render the close button", () => {
  const { getByTestId } = renderWithRedux(<PrivacyPolicyBanner />, {
    banner: { showCookiePolicy: false },
  });
  const closeButton = getByTestId("closeButton");
  expect(closeButton).toBeInTheDocument();
});

it("should not render PrivacyPolicy after the user clicks on the close button", () => {
  const { queryByTestId } = renderWithRedux(<PrivacyPolicyBanner />, {
    banner: { showCookiePolicy: false },
  });
  const closeButton = screen.getByTestId("closeButton");
  fireEvent.click(closeButton);
  expect(queryByTestId("PrivacyPolicy")).not.toBeInTheDocument();
});

  
});
