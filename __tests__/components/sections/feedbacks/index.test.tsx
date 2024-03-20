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
    render(<ReduxProvider>
        <Feedback />
    </ReduxProvider>)
}
describe('Feedback', () => {
    it('should render the feedback component', () => {
        renderFeedbackSection()
        const component = screen.getByTestId("feedback-section")
        expect(component).toBeInTheDocument();
    })

    it('should have some children in it', () => {
        renderFeedbackSection()
        const component = screen.getByTestId("feedback-section")
        const children = component.childElementCount
        console.log(children)
        expect(children).toBeGreaterThan(30)
    })
})