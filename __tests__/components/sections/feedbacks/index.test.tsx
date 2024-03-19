import Feedback from "@/components/sections/feedbacks"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

describe('Feedback', () => {
    it('should render the feedback component', () => {
        render(<Feedback />)
        const component = screen.getByTestId("feedback-section")
        expect(component).toBeInTheDocument();
    })
})