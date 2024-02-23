import Coin from "@/components/ui/Coin";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import fs from "fs";
import path from "path";

describe("Coin", () => {
  it("should render the coin", () => {
    const coinTokensDir = path.resolve(__dirname, "..", "..", "../src/icons/tokens/");
    const coinTokenFiles = fs.readdirSync(coinTokensDir);

    coinTokenFiles.forEach((token) => {
      const tokenName = token.split(".")[0];
      if (tokenName.trim() !== "") {
        render(<Coin token={tokenName} />);
        const coins = screen.getAllByTestId("coin");
        console.log("coins", coins);
        //    expect(coins).toBe(coinTokenFiles.length);
      }
    });
  });
});
