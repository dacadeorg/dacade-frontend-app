import SocialLink from "@/components/ui/SocialLink";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { link } from "@__mocks__/fixtures/link";

type LinkType = {
  url: string;
  title: string;
  icon: string;
};

const RenderLink = (link: LinkType) => {
  render(<SocialLink link={link} />);
  return screen.getByTestId("socialLink");
};

describe("SocialLink", () => {
  it("Should render social link", () => {
    const socialLink = RenderLink(link);
    expect(socialLink).toBeInTheDocument();
  });

  it("Should render the link and title", () => {
    const socialLink = RenderLink(link);
    expect(socialLink).toHaveAttribute("href", link.url);
    expect(socialLink).toHaveAttribute("title", link.title);
  });
});

describe("Social link icon", () => {
  it("should render icon", () => {
    RenderLink(link);
    const socialLink = screen.getByTestId("socialLink-icon");
    expect(socialLink).toBeInTheDocument();
  });

  it("Should render discord icon", () => {
    RenderLink(link);
    const discordLink = screen.getByTestId("discordIcon");
    expect(discordLink).toBeInTheDocument();
  });

  it("Should render twitter icon", () => {
    RenderLink({ ...link, icon: "twitter" });
    const twitterLink = screen.getByTestId("twitterIcon");
    expect(twitterLink).toBeInTheDocument();
  });

  it("Should render youtube icon", () => {
    RenderLink({ ...link, icon: "youtube" });
    const youtubeLink = screen.getByTestId("youtubeIcon");
    expect(youtubeLink).toBeInTheDocument();
  });
});
