
import "@testing-library/jest-dom";
import Rewards from "@/components/sections/courses/overview/Rewards";
import { render, screen } from "@testing-library/react";
import Reward from "@/components/sections/courses/overview/Rewards";
import { mockCourse } from "../../../../../__mocks__/course";
import { RewardType } from "@/components/cards/Bounty";


interface RewardProps {
  reward: RewardType, 
  i: number;
}


const rewardList = (props?: RewardProps) => {
  mockCourse.challenge?.rewards.forEach(reward => <Reward {...props} key={2} reward={reward} size="medium" category="category"/>)
}


const RewardComponnent = () => {
  render({rewardList});
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