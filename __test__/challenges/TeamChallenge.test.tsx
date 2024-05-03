import "@testing-library/jest-dom";
import TeamChallenge from "@/components/sections/challenges/TeamChallenge";
import { render, screen } from "@testing-library/react";
// import { community } from "../../../../__mocks__/community";
import ReduxProvider from "../../__mocks__/provider/ReduxProvider";
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));

// const Props = {

    // }
    
    
    const RenderTeamChallenge = () => {
      render(
        <ReduxProvider>
          <TeamChallenge/>
        </ReduxProvider>
      );
      return screen.getByTestId("");
  }

describe('TeamChallenge', () => {

  it("should render the TeamChallenge", () => {
    const teamchallenge  = RenderTeamChallenge();
    expect(teamchallenge).toBeInTheDocument();
  });

//   example from another test
//   it("should show rewards when we have rewards and show rewards when enabled", () => {
//     RenderCommunityCard({ ...communityCardProps, showRewards: true });
//     const communityCardButtonrewards = screen.getByTestId("community-rewards");
//     expect(communityCardButtonrewards).toBeInTheDocument();
//   });


 
  })

