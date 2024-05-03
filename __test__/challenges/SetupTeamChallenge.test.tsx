import "@testing-library/jest-dom";
import SetupTeamChallenge from "@/components/sections/challenges/SetupTeamChallenge";
import { render, screen } from "@testing-library/react";
// import { community } from "../../../../__mocks__/community";
import ReduxProvider from "../../__mocks__/provider/ReduxProvider";
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));

const RenderSetupTeamChallenge = () => {
    render(
      <ReduxProvider>
        <SetupTeamChallenge />
      </ReduxProvider>
    );
    return screen.getByTestId("");
}


describe('SetupTeamChallenge', () => {

    it("should render the SetupTeamChallenge", () => {
        const setupteamchallenge  = RenderSetupTeamChallenge();
        expect(setupteamchallenge).toBeInTheDocument();
      });

    //   example from another test
    //   it("should show rewards when we have rewards and show rewards when enabled", () => {
    //     RenderCommunityCard({ ...communityCardProps, showRewards: true });
    //     const communityCardButtonrewards = screen.getByTestId("community-rewards");
    //     expect(communityCardButtonrewards).toBeInTheDocument();
    //   });
 
  })

