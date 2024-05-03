import "@testing-library/jest-dom";
import Rating from "@/components/sections/challenges/Rating";
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
    
    
    const RenderRating = () => {
      render(
        <ReduxProvider>
          <Rating/>
        </ReduxProvider>
      );
      return screen.getByTestId("");
  }
  

describe('Rating', () => {
  it("should render the Rating", () => {
    const rating  = RenderRating();
    expect(rating).toBeInTheDocument();
  });

//   example from another test
//   it("should show rewards when we have rewards and show rewards when enabled", () => {
//     RenderCommunityCard({ ...communityCardProps, showRewards: true });
//     const communityCardButtonrewards = screen.getByTestId("community-rewards");
//     expect(communityCardButtonrewards).toBeInTheDocument();
//   });
 
  })

