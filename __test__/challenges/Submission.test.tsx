import "@testing-library/jest-dom";
import Submission from "@/components/sections/challenges/Submission";
import { render, screen } from "@testing-library/react";
// import { community } from "../../../../__mocks__/community";
import ReduxProvider from "../../__mocks__/provider/ReduxProvider";
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));

const RenderSubmission = () => {
    render(
      <ReduxProvider>
        <Submission />
      </ReduxProvider>
    );
    return screen.getByTestId("");
}

describe('Submission', () => {

    it("should render the Submission", () => {
        const submission  = RenderSubmission();
        expect(submission).toBeInTheDocument();
      });

    //   example from another test
    //   it("should show rewards when we have rewards and show rewards when enabled", () => {
    //     RenderCommunityCard({ ...communityCardProps, showRewards: true });
    //     const communityCardButtonrewards = screen.getByTestId("community-rewards");
    //     expect(communityCardButtonrewards).toBeInTheDocument();
    //   });
 
  })

