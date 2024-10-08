import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import Wrapper from "@/components/sections/communities/overview/Wrapper";

jest.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "next",
  }),
}));


describe("Wrapper", () => {
  it("displays the wrapper with all the children", () => {
    renderWithRedux(
      <Wrapper filter={<div>Test Filter</div>}>
        <div>Wrappper test</div>
      </Wrapper>
    );

    expect(screen.getByTestId("wrapperId")).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenges.title")).toBeInTheDocument();
    expect(screen.getByText("Wrappper test")).toBeInTheDocument();
    expect(screen.getByText("Test Filter")).toBeInTheDocument();
  });
});
