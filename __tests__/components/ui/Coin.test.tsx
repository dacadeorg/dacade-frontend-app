import Coin from "@/components/ui/Coin";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import fs from "fs";
import path from "path";
import DACIcon from "@/icons/tokens/DAC.svg";


describe("Coin", () => {
  it("should render a small size coin", () => {
    render(<Coin size="small" />)
    const coin = screen.getByTestId('coin')
    expect(coin.className).toContain('w-4 h-4')
  })

  it("should render a coin with a specified shape", () => {
    render(<Coin shape="rounded" />)
    const coin = screen.getByTestId('coin')
    expect(coin.className).toContain('rounded-xl')
  })

  it("should render a child inside of it", () => {
    render(<Coin shape="rounded" />)
    const coin = screen.getByTestId('coin')
    expect(coin.childElementCount).toBeGreaterThanOrEqual(1)
  })

  it("should not render the DAC coin when a different token was passed", () => {
    const coinTokensDir = path.resolve(__dirname, "..", "..", "../src/icons/tokens/");
    const coinTokenFiles = fs.readdirSync(coinTokensDir);

    coinTokenFiles.forEach((token) => {
      const tokenName = token.split(".")[0];
      if (tokenName.trim() !== "") {
        render(<Coin token={tokenName} />);
        const coin = screen.getByTestId("coin");
        const icon = <DACIcon />
        expect(coin).toBe(icon)
        console.log("coins", coin);
        //    expect(coins).toBe(coinTokenFiles.length);
      }
    })
  })
});
