import Feedback from "@/components/sections/feedbacks"
import "@testing-library/jest-dom"
import { screen } from "@testing-library/react"
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { challengeSliceData, submission } from "../../../../__mocks__/fixtures/challenge";
import { mockUser } from "@__mocks__/fixtures/user";


jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
        pathname: "communities-slug__"
    }),
}));

const authData = {
    data: mockUser,
    userBalance: null,
    balance: null,
    walletAddresses: null,
    isAuthLoading: true,
}

const renderFeedbackSection = () => {
    renderWithRedux(<Feedback />, {
        auth: authData
    })
}
describe('Feedback', () => {
    it('should render the feedback component', () => {
        renderFeedbackSection()
        const section = screen.getByTestId("feedback-section")
        expect(section).toBeInTheDocument();
    })

    it('should initally render with a loader', async () => {
        renderFeedbackSection()
        screen.getByTestId("feedback-section")
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    })

    it('should render with at least one child', async () => {
        renderFeedbackSection()
        const section = screen.getByTestId("feedback-section")
        expect(section.childElementCount).toBeGreaterThan(0)
    })

    it("should not render the feedback section when we don't have a user", () => {
        renderWithRedux(<Feedback />, {
            auth: { ...authData, data: null },
            challenges: challengeSliceData,
            submissions: {
                current: submission,
                list: [submission],
                text: "string"
            }
        })
        const section = screen.queryByTestId("section")
        expect(section).not.toBeInTheDocument()
    })
})