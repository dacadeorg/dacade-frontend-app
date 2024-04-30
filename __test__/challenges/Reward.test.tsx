import "@testing-library/jest-dom";
import Reward from "@/components/sections/challenges/Reward";
import { render, screen } from "@testing-library/react";
// import { community } from "../../../../__mocks__/community";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));

// const Props = {

    // }
    
    
    const RenderReward = () => {
        render(
          <ReduxProvider>
            <Reward />
          </ReduxProvider>
        );
        return screen.getByTestId("");
    }
    

describe('Reward', () => {
    it("should render the Reward", () => {
        const reward  = RenderReward();
        expect(reward).toBeInTheDocument();
      });

    //   example from another test
    //   it("should show rewards when we have rewards and show rewards when enabled", () => {
    //     RenderCommunityCard({ ...communityCardProps, showRewards: true });
    //     const communityCardButtonrewards = screen.getByTestId("community-rewards");
    //     expect(communityCardButtonrewards).toBeInTheDocument();
    //   });
 
  })

