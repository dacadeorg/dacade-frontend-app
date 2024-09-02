import { mockReferral } from "@__mocks__/fixtures/referrals";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import ReferralListItem from "@/components/popups/referral/ListItem";
import { screen } from "@testing-library/react";


describe("ReferralBountyItem", () => {
    it("Should render the bounty list item", () => {
        renderWithRedux(<ReferralListItem referral={mockReferral} bounty={true} />)
        expect(screen.getByTestId("referral-bounty-item")).toBeInTheDocument()
    });
    it("Should show the user avatar", () => {
        renderWithRedux(<ReferralListItem referral={mockReferral} bounty={true} />)
        const avatar = screen.getByTestId("avatar");
        expect(avatar).toBeInTheDocument();
    });
    it("should show the community name when its not a referral bounty", () => {
        renderWithRedux(<ReferralListItem referral={mockReferral} bounty={false} />);
        expect(screen.getByText(mockReferral.title)).toBeInTheDocument();
    });
    it("should display the referral title when its a referral bounty", () => {
        renderWithRedux(<ReferralListItem referral={mockReferral} bounty={true} />);
        expect(screen.getByText(mockReferral.community.name)).toBeInTheDocument();
    });
})