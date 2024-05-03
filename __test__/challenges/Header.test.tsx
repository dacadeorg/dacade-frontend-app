import "@testing-library/jest-dom";
import Header from "@/components/sections/challenges/Header";
import { render, screen } from "@testing-library/react";
// import { community } from "../../../../__mocks__/community";
import ReduxProvider from "../../__mocks__/provider/ReduxProvider";
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));

// const HeaderProps = {

// }


const RenderHeader = () => {
    render(
      <ReduxProvider>
        <Header />
      </ReduxProvider>
    );
    return screen.getByTestId("");
}

describe('Header', () => {
    it("should render the Header", () => {
        const header  = RenderHeader();
        expect(header).toBeInTheDocument();
      });

    //   example from another test
    //   it("should show rewards when we have rewards and show rewards when enabled", () => {
    //     RenderCommunityCard({ ...communityCardProps, showRewards: true });
    //     const communityCardButtonrewards = screen.getByTestId("community-rewards");
    //     expect(communityCardButtonrewards).toBeInTheDocument();
    //   });
  })

