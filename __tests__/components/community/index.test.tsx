import "@testing-library/jest-dom";
import CommunityCard from "@/components/cards/community";
import { render, screen } from "@testing-library/react";
import { community } from "../../../__mocks__/community";
import ReduxProvider from "../../../__mocks__/provider/ReduxProvider";
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    isFallback: false,
  }),
}));

const communityCardProps: any = {
  showRewards: false,
  community: community,
};

function RenderCommunityCard(props = communityCardProps) {
  render(
    <ReduxProvider>
      <CommunityCard showRewards={props.showRewards} community={props.community} />
    </ReduxProvider>
  );
  return screen.getByTestId("community-card");
}

describe("Community", () => {
  it("should render the community card", () => {
    const card = RenderCommunityCard();
    expect(card).toBeInTheDocument();
  });

  it("should show rewards when we have rewards and showrewards is enabled", () => {
    RenderCommunityCard({ ...communityCardProps, showRewards: true });
    const communityCardButtonrewards = screen.getByTestId("community-rewards");
    expect(communityCardButtonrewards).toBeInTheDocument();
  });
});
