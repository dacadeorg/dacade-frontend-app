import "@testing-library/jest-dom"
import EmailForm from "@/components/popups/profile-settings/EmailForm";
import { act, fireEvent, screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";

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

    it("should not submit the form when emails do not match", async () => {
        const emailInput = screen.getByPlaceholderText('login-page.email.placeholder');
        const emailInputConfirm = screen.getByPlaceholderText('profile.settings.edit.email.confirm');
        const form = screen.getByTestId('edit-email-form');

        fireEvent.change(emailInput, { target: { value: "email1@example.com" } });
        fireEvent.change(emailInputConfirm, { target: { value: "email2@example.com" } });

        await act(async () => {
            fireEvent.submit(form);
        });

        expect(onSubmit).not.toHaveBeenCalled();
        expect(screen.queryByText("Emails should match.")).toBeInTheDocument();

    })

    it("it should close the modal when its open", () => {
        expect(screen.getByTestId('profileModal')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('close-button'))
        expect(handleClose).toHaveBeenCalled()
    })
})
