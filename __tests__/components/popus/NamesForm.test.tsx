import "@testing-library/jest-dom"
import { renderWithRedux } from "../../../__mocks__/renderWithRedux"
import EditProfile from "@/components/popups/profile-settings/NamesForm"
import { fireEvent, screen } from "@testing-library/react"

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
jest.mock("../../../src/components/ui/button/Arrow", () => {
    return {
        __esModule: true,
        default: () => {
            return <div />;
        },
    };
});
beforeEach(() => {
    renderWithRedux(<EditProfile show onClose={handleClose} />)
})
describe("NamesForm", () => {
    it("should render the names edit form", () => {
        const form = screen.getByTestId('names-edit-form')
        expect(form).toBeInTheDocument()
    })

    it("should render the form with 2 inputs", () => {
        const form = screen.getByTestId('names-edit-form')
        const firstNameInput = form.querySelectorAll("div [data-testid='first-name']")
        const lastNameInput = form.querySelectorAll("div [data-testid='last-name']")
        expect(firstNameInput).toHaveLength(1)
        expect(lastNameInput).toHaveLength(1)
    })
    it("it should close the modal when its open", () => {
        expect(screen.getByTestId('names-edit-form')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('close-button'))
        expect(handleClose).toHaveBeenCalled()
    })
})