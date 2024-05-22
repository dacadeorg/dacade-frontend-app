import "@testing-library/jest-dom";
import PageNavigation from "@/components/sections/courses/PageNavigation";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));




describe("PageNavigation", () => {
  it("should render the Page Navigation", () => {

    renderWithRedux( <PageNavigation /> );

    const pageNavigation = screen.getByTestId("pageNavId");
    expect(pageNavigation).toBeInTheDocument();
  });
});
