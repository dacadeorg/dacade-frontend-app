import CommunityCard from "@/components/cards/community";
import { render, screen } from "@testing-library/react";
import { community } from "../../../__mocks__/community";

import "@testing-library/jest-dom";

describe("CommunityCard", () => {
  it("should render the communit card", () => {
    render(<CommunityCard showRewards={true} community={community} />);
    console.log("the community data", community);
    const communitycardContent = screen.getByTestId("community-card");
    expect(communitycardContent.textContent).toBe("Hello H3");
  });
});
