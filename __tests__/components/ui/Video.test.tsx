import Video from "@/components/ui/Video";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { video } from "../../../__mocks__/video";

describe("Video", () => {
  it("should render the video", () => {
    render(<Video url={video} />);
    const videoTrailer = screen.getByTestId("video");

    expect(videoTrailer).toBeInTheDocument();
  });

  it("should not render the video when url is empty", () => {
    render(<Video url={""} />);
    const videoTrailer = screen.queryByTestId("video");

    expect(videoTrailer).toBeNull();
  });

  it("should have the allowFullScreen attribute", () => {
    render(<Video url={video} />);
    const videoTrailer = screen.getByTestId("video");
    const videoIframe = videoTrailer.querySelector("iframe");

    expect(videoIframe).toHaveAttribute("allowFullScreen");
  });
});
