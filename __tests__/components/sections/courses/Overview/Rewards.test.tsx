
import "@testing-library/jest-dom";
import Rewards from "@/components/sections/courses/overview/Rewards";
import { render, screen } from "@testing-library/react";
import Reward from "@/components/sections/courses/overview/Rewards";




interface RewardProps {
  objectives: [];
}


const RewardComponnent = (props?: RewardProps) => {
  render(<Reward {...props} key={2} reward={""} size="" category=""/>);
  return screen.getByTestId("rewardId");
};

 

describe("Rewards", () => {
  it("should render the Rewards component", () => {
    render( <Rewards />)
    const rewards = screen.getByTestId("rewardsId");
    expect(rewards).toBeInTheDocument();
  });

  it("should render the Reward component", () => {
    const reward = RewardComponnent();
    expect(reward).toBeInTheDocument();
  });

});