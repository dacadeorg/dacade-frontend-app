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

    it('should not make modifications to the text input', () => {
        renderForm()
        const inputText = screen.getByTestId('textarea').getElementsByTagName("textarea")[0]
        fireEvent.change(inputText, { target: { value: 'Test input' } })
        expect(inputText.value).toBe('Test input')
    })
})