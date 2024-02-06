import "@testing-library/jest-dom";
import CommunityCard from "@/components/cards/community";
import { render, screen } from "@testing-library/react";
import { community } from "../../../__mocks__/community";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
describe("CommunityCard", () => {
  it("should render the communit card", () => {
    mockRouter.push("/communities");
    render(<CommunityCard showRewards={true} community={community} />);
    console.log("the community data", community);
    const communitycardContent = screen.getByTestId("community-card");
    expect(communitycardContent.textContent).toBe("Hello H3");
  });
});
