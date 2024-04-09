import RewardsList from "@/components/sections/challenges/_partials/RewardsList";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { reward } from "../../../../../__mocks__/reward";

describe("RewardsList", ()=> {
    it("should render the reward list", ()=> {
        render(<RewardsList rewards={[reward]}/>)

        const rewardList = screen.getByTestId("rewardListId")
        expect(rewardList).toBeInTheDocument()

        const rewardElements = screen.getAllByTestId("rewardElementId")
        expect(rewardElements).toHaveLength([reward].length);

        [reward].forEach((reward, i)=> {
            expect(rewardElements[i]).toHaveTextContent(reward.token);
        })
    })
})