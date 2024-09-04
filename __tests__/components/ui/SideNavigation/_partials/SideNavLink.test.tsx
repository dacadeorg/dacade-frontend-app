import CourseLink from "@/components/ui/SideNavigation/_partials/SideNavLink";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../../__mocks__/renderWithRedux";
import { colors } from "../../../../../__mocks__/fixtures/colors";

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

describe("SideNavLink", () => {
  const item = {
    link: "/example",
    exact: true,
    subitems: [],
    label: "Example label",
  };
  it("should render side navigation links", () => {
    renderWithRedux(<CourseLink item={item} />, {
      ui: {
        colors: colors,
        locked: false,
        showReferralPopup: false,
        showJobOffersPopup: false,
      },
    });
    const courseLink = screen.getByTestId("courseLinkId");
    expect(courseLink).toBeInTheDocument();
  });
});
