import Feedback from "@/components/sections/feedbacks"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider"
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
        isFallback: false,
    }),
}));
const renderFeedbackSection = () => {
        render(
            <ReduxProvider>
                <Feedback />
            </ReduxProvider>
        );
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
})