import "@testing-library/jest-dom"
import { renderWithRedux } from "../../../__mocks__/renderWithRedux"
import EmailForm from "@/components/popups/profile-settings/EmailForm";
import { act, fireEvent, screen } from "@testing-library/react";

jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
        pathname: "mocked-pathname",
    }),
}));

const handleClose = jest.fn()

const onSubmit = jest.fn()

const renderEmailEditForm = () => {
    renderWithRedux(<EmailForm show onClose={handleClose} />)
}

beforeEach(() => {
    renderEmailEditForm()
})

afterEach(() => {
    onSubmit.mockReset()
})

describe("EmailEditForm", () => {
    it('should render the email edit form modal.', () => {
        expect(screen.getByTestId('profileModal')).toBeInTheDocument()
    })

    it('should render a form', () => {
        const form = screen.getByTestId('edit-email-form')
        expect(form).toBeInTheDocument()
    })

    it('should contain 2 inputs, and a close button', () => {
        const emailInput = screen.getByPlaceholderText('login-page.email.placeholder');
        const emailInputConfirm = screen.getByPlaceholderText('profile.settings.edit.email.confirm')
        const closeButton = screen.getByTestId('close-button')

        expect(emailInput).toBeInTheDocument()
        expect(emailInputConfirm).toBeInTheDocument()
        expect(closeButton).toBeInTheDocument()
    })

    it("should not modify the input values of the form", async () => {
        const emailInput = screen.getByPlaceholderText('login-page.email.placeholder');
        const emailInputConfirm = screen.getByPlaceholderText('profile.settings.edit.email.confirm')

        act(() => {
            fireEvent.change(emailInput, { target: { value: "email1@gmail.com" } });
            fireEvent.change(emailInputConfirm, { target: { value: "email2@gmail.com" } });
            fireEvent.submit(screen.getByTestId("edit-email-form"));
        })
    });

    it("it should close the modal when its open", () => {
        expect(screen.getByTestId('profileModal')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('close-button'))
        expect(handleClose).toHaveBeenCalled()
    })

})