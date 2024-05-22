import CommunityStats from "@/components/sections/homepage/_partials/testimonials/CommunityStats";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../../__mocks__/renderWithRedux";

describe("CommunityStats", () => {
    it("should render Community stats", () => {
        renderWithRedux(<CommunityStats testId="communityStatsId"/>)
        const communityStat = screen.getByTestId("communityStatsId")
        expect(communityStat).toBeInTheDocument()
    })
})