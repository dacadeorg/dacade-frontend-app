import Feedback from "@/components/sections/feedbacks"
import "@testing-library/jest-dom"
import { act, render, screen, waitFor } from "@testing-library/react"
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider"
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
        isFallback: false,
    }),
}));
const renderFeedbackSection = async () => {
    await act(async () => {
        render(
            <ReduxProvider>
                <Feedback />
            </ReduxProvider>
        );
    });
}
describe('Feedback', () => {
    it('should render the feedback component', async () => {
        renderFeedbackSection()
        const section = await waitFor(() => screen.getByTestId("feedback-section"))
        expect(section).toBeInTheDocument();
    })

    it('should initally render with a loader', async () => {
        renderFeedbackSection()
        await waitFor(() => screen.getByTestId("feedback-section"))
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    })

    it('should render with at least one child', async () => {
        renderFeedbackSection()
        const section = await waitFor(() => screen.getByTestId("feedback-section"))
        expect(section.childElementCount).toBeGreaterThan(0)
    })
})