import Currency from "@/components/ui/Currency";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("@coingecko/cryptoformat", () => ({
    formatCurrency: jest.fn((value, token) => `${value} ${token}`),
  }));

describe("Currency", () => {
    it("should render currency", () => {
        render(<Currency/>)
        const currency = screen.getByTestId("currencyId")
        expect(currency).toBeInTheDocument()
        expect(currency).toHaveTextContent("0");
    })

    it("should render currency with value and token", () => {
        render(<Currency value={100} token="USD" />);
    const currency = screen.getByTestId("currencyId");
    expect(currency).toBeInTheDocument();
    expect(currency).toHaveTextContent("100 USD");
    })

})
