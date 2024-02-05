import SocialLink from "@/components/ui/SocialLink";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { link } from "../../../__mocks__/link";

describe("SocialLink", () => {

  it("Should render social link", () => {
    render(<SocialLink link={link} />);
    const socialLink = screen.getByTestId("socialLink")
    expect(socialLink).toBeInTheDocument();
  });

  it("Should render the link and title", () => {
    render(<SocialLink link={link} />);
    const socialLink = screen.getByTestId("socialLink");
    expect(socialLink).toHaveAttribute("href", link.url);
    expect(socialLink).toHaveAttribute("title", link.title);
  });

  it("renders the correct icon", () => {
    render(<SocialLink link={link} />);
    const socialLink = screen.getByTestId("discordIcon");
    expect(socialLink).toBeInTheDocument();
  });

});
