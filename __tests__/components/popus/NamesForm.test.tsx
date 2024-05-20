import "@testing-library/jest-dom"
import { renderWithRedux } from "../../../__mocks__/renderWithRedux"
import EditProfile from "@/components/popups/profile-settings/NamesForm"
import { screen } from "@testing-library/react"

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
describe("NamesForm", () => {
    it("should render the names edit form", () => {
        renderWithRedux(<EditProfile show onClose={handleClose} />)
        const form = screen.getByTestId('names-edit-form')
        expect(form).toBeInTheDocument()
    })
})