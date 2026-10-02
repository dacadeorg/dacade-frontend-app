import { mockReferral } from "@__mocks__/fixtures/referrals";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import ReferralList from "@/components/popups/referral/List";

describe("Referral list", () => {
    it("should render the bounty and the referral titles", () => {
        renderWithRedux(<ReferralList />)
        expect(screen.getByText('modal.referral.list.bounty_title')).toBeInTheDocument();
        expect(screen.getByText('modal.referral.list.reward')).toBeInTheDocument();
    });
    it("should show render as many as the referrals as it received", () => {
        renderWithRedux(<ReferralList />,
            {
                referrals:
                {
                    list: [mockReferral],
                    filteredList: [mockReferral]
                },
            })
        expect(screen.getAllByTestId('referral-bounty-item')).toHaveLength(1)
    })

})