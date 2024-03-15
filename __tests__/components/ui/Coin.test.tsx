import Coin from "@/components/ui/Coin";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Coin", () => {
  it("should render the token", () => {
    render(<Coin shape="rounded" />);
    const coin = screen.getByTestId("coin");
    expect(coin).toBeInTheDocument();
  });

  it("should render a child inside of it", () => {
    render(<Coin shape="rounded" />);
    const coin = screen.getByTestId("coin");
    expect(coin.childElementCount).toBeGreaterThanOrEqual(1);
  });
});
