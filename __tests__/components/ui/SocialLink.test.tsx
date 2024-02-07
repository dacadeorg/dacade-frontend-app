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

});

describe("Social link icon", () => {
  it("should render icon", () => {
    render(<SocialLink link={link} />);
    const socialLink = screen.getByTestId("socialLink-icon");
    expect(socialLink).toBeInTheDocument();
  })

  it("Should render discord icon", () => {
    render(<SocialLink link={link} />);
    const discordLink = screen.getByTestId("discordIcon");
    expect(discordLink).toBeInTheDocument();
  })

  it("Should render twitter icon", () => {
    render(<SocialLink link={{...link, icon: "twitter"}} />);
    const twitterLink = screen.getByTestId("twitterIcon");
    expect(twitterLink).toBeInTheDocument();
  })

  it("Should render youtube icon", () => {
    render(<SocialLink link={{...link, icon: "youtube"}} />);
    const youtubeLink = screen.getByTestId("youtubeIcon");
    expect(youtubeLink).toBeInTheDocument();
  })
});