import Form from "@/components/sections/feedbacks/Form"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import ReduxProvider from "../../../../__mocks__/provider/ReduxProvider"
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
        isFallback: false,
    }),
}));
const handleSave = jest.fn()
const renderForm = () => {
    render(<ReduxProvider><Form onSave={handleSave} /></ReduxProvider>)

}
describe('FeedbackForm', () => {
    it('should render the feedback form', () => {
        renderForm()
        const form = screen.getByTestId('feedback-form')
        expect(form).toBeInTheDocument()
    })

    it("should fire the onsave function when submitted", () => {
        // find how to know which functions was called when the  fireevent.submit was called then find if our handlesave is one of them
        renderForm()
        const form = screen.getByTestId('feedback-form')
        fireEvent.submit(form)
        console.log("the function called", handleSave.mock.calls)
        expect(handleSave).toHaveBeenCalled()

    })
})