import ErrorBox from "@/components/ui/ErrorBox";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const CustomError = {
    message: "Custom error",
    details: {
        key: "custom key",
        index: "custom index"
    },
    name: "Custom Error"
}

describe("ErrorBox", () => {
    it("should render the error box", () => {
        render(<ErrorBox error={CustomError}/>)
        const error = screen.getByTestId("errorBox");
        expect(error).toBeInTheDocument()
    })

    it("should render the error message and details", () => {
        render(<ErrorBox error={CustomError}/>)
        const errorMessage = screen.getByText(CustomError.message);
        expect(errorMessage).toBeInTheDocument()
        const errorDetails1 = screen.getByText(CustomError.details.key);
        expect(errorDetails1).toBeInTheDocument();
        const errorDetails2 = screen.getByText(CustomError.details.index);
        expect(errorDetails2).toBeInTheDocument();
    })

    it("should render the children", () => {
        render(<ErrorBox error={CustomError}>
            <div>Error message</div>
        </ErrorBox>)
        const error = screen.getByText("Error message");
        expect(error).toBeInTheDocument()
    })
    
})