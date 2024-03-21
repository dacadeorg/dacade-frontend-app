import Form from "@/components/sections/feedbacks/Form"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider"
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
        isFallback: false,
    }),
}));
describe('FeedbackForm', () => {
    it('should render the feedback form', () => {
        const handleSave = jest.fn()
        render(<ReduxProvider><Form onSave={handleSave} /></ReduxProvider>)
        const form = screen.getByTestId('feedback-form')
        expect(form).toBeInTheDocument()
    })

    it("should fire the onsave function when submitted", () => {
        // find how to know which functions was called when the  fireevent.submit was called then find if our handlesave is one of them
    })
})