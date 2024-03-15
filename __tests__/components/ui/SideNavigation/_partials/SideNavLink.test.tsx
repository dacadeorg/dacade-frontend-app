import CourseLink from "@/components/ui/SideNavigation/_partials/SideNavLink";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReduxProvider from "../../../../../__mocks__/provider/ReduxProvider";

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
    render(
      <ReduxProvider>
        <CourseLink item={item} />
      </ReduxProvider>
    );
    const courseLink = screen.getByTestId("courseLinkId");
    expect(courseLink).toBeInTheDocument();
  });
});
