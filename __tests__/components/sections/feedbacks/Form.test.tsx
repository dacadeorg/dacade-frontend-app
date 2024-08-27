import Form from "@/components/sections/feedbacks/Form"
import "@testing-library/jest-dom"
import { fireEvent, screen } from "@testing-library/react"
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { mockUser } from "@__mocks__/fixtures/user";
import { colors } from "@__mocks__/fixtures/colors";
import { challenge, challengeSliceData } from "@__mocks__/fixtures/challenge";
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
        isFallback: false,
    }),
}));
const handleSave = jest.fn()

const user = {
    data: mockUser,
    userBalance: null,
    balance: null,
    walletAddresses: null,
    token: null,
    referrals: null,
    fetchingUserLoading: false,
    filteredUsers: null,
}

const ui = {
    colors, locked: false,
    showReferralPopup: false,
    showJobOffersPopup: false,
}
const renderForm = () => {
    renderWithRedux(<Form onSave={handleSave} />, { ui, user })
}
describe('FeedbackForm', () => {
    it('should render the feedback form', () => {
        renderForm()
        const form = screen.getByTestId('feedback-form')
        expect(form).toBeInTheDocument()
    })

    it("should render the user avatar ", () => {
        renderForm()
        const avatar = screen.getByTestId('avatar')
        expect(avatar).toBeInTheDocument()
    })

    it('should preserve the text case and format', () => {
        renderForm()
        const inputText = screen.getByTestId('textarea').getElementsByTagName("textarea")[0]
        fireEvent.change(inputText, { target: { value: 'Test input' } })
        expect(inputText.value).toBe('Test input')
    })

    it("should not show the github input link when the challenge does need one", () => {
        renderWithRedux(<Form onSave={handleSave} />, {
            ui, user, challenges: {
                ...challengeSliceData,
                current: {
                    ...challenge,
                    format: {
                        githubLink: false,
                        text: true,
                        disclaimer: true,
                    }
                },
            }
        })

        const githubLinkInput = screen.queryByTestId("githubLinkInput");
        expect(githubLinkInput).not.toBeInTheDocument();
    })

})