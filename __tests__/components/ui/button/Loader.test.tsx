import Loader from "@/components/ui/button/Loader";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const loaderButtonProps = {
  loading: false,
  className: "classname",
  onClick: () => jest.fn(),
  onInput: () => jest.fn(),
};

const RenderLoader = (props = loaderButtonProps) => {
  const { loading, className } = props;
  render(<Loader loading={loading} className={className} onClick={props?.onClick} onInput={props?.onInput} />);
  return screen.getByTestId("loader");
};

describe("Loader", () => {
  it("Should render the loader", () => {
    const loader = RenderLoader();
    expect(loader).toBeInTheDocument();
  });

  it("Should fire on click", () => {
    const handleClick = jest.fn();
    const loader = RenderLoader({ ...loaderButtonProps, onClick: handleClick });
    fireEvent.click(loader);
    expect(handleClick).toHaveBeenCalled();
  });

  it("Should fire on input", () => {
    const handleOnInput = jest.fn();
    const loader = RenderLoader({ ...loaderButtonProps, onInput: handleOnInput });
    fireEvent.input(loader);
    expect(handleOnInput).toHaveBeenCalled();
  });
});
