
import Box from "@/components/popups/referral/Box";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { screen, fireEvent, act } from "@testing-library/react";

describe("Box component", () => {
    it('Should render the box component with label and value', () => {
        renderWithRedux(<Box value="Test Value" label="test label" />)
        expect(screen.getByTestId("referral-box")).toBeInTheDocument()
        expect(screen.getByText("Test Value")).toBeInTheDocument();
        expect(screen.getByText("test label")).toBeInTheDocument();
    });

    it("Should copy text to clipboard when the copy button is clicked", () => {
        renderWithRedux(<Box value="Test Value" label="test label" />)
        const copyButton = screen.getByTestId("button");
        const mockClipboard = {
            writeText: jest.fn(() => Promise.resolve()),
        }
        Object.assign(navigator, { clipboard: mockClipboard });
        fireEvent.click(copyButton);
        expect(mockClipboard.writeText).toHaveBeenCalledWith("Test Value");
    });

    it("Should change the text to 'copied' when the copy button is clicked and change it back to 'copy' after 500ms", async () => {
        renderWithRedux(<Box value="Test Value" label="test label" />)
        const copyButton = screen.getByTestId("button");
        fireEvent.click(copyButton);
        expect(await screen.findByText("modal.referral.button.copied")).toBeInTheDocument()
        // Wait for the button text to change back to "Copy" after 600ms
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 600));

        });
        expect(await screen.findByText("modal.referral.button.copy")).toBeInTheDocument()
    })

})