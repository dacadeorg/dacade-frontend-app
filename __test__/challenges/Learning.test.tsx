import "@testing-library/jest-dom";
import Learning from "@/components/sections/challenges/Learning";
import { render, screen } from "@testing-library/react";
// import { community } from "../../../../__mocks__/community";
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider";
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));


const RenderLearning = () => {
  render(
    <ReduxProvider>
      <Learning />
    </ReduxProvider>
  );
  return screen.getByTestId("");
}

describe('Learning', () => {
  it("should render the Learning", () => {
    const learning  = RenderLearning();
    expect(learning).toBeInTheDocument();
  });

      //   example from another test
    //   it("should show rewards when we have rewards and show rewards when enabled", () => {
    //     RenderCommunityCard({ ...communityCardProps, showRewards: true });
    //     const communityCardButtonrewards = screen.getByTestId("community-rewards");
    //     expect(communityCardButtonrewards).toBeInTheDocument();
    //   });
  })

