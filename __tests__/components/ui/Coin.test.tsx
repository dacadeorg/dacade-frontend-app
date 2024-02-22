import Coin from "@/components/ui/Coin";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Coin", () => {
  it("should render the coin", () => {
    render(<Coin />);
  });
});
