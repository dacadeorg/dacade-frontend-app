import "@testing-library/jest-dom";
import Rubric from "@/components/sections/challenges/Rubric";
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


const RenderRubric = () => {
    render(
      <ReduxProvider>
        <Rubric />
      </ReduxProvider>
    );
    return screen.getByTestId("");
}


describe('Rubric', () => {
    it("should render the Header", () => {
        const rubric  = RenderRubric();
        expect(rubric).toBeInTheDocument();
      });

    //   example from another test
    //   it("should show rewards when we have rewards and show rewards when enabled", () => {
    //     RenderCommunityCard({ ...communityCardProps, showRewards: true });
    //     const communityCardButtonrewards = screen.getByTestId("community-rewards");
    //     expect(communityCardButtonrewards).toBeInTheDocument();
    //   });
 
  })

