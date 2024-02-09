import Avatar from "@/components/ui/Avatar";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userIcon, userProfile } from "../../../__mocks__/userProfile";

describe("Avatar", () => {
  it("Should render the avatar", () => {
    render(<Avatar />);
    const avatar = screen.getByTestId("avatar");

    expect(avatar).toBeInTheDocument();
  });

  it("Should render an avatar link", () => {
    render(<Avatar />);
    const avatar = screen.getByTestId("avatar");
    expect(avatar.tagName).toBe("A");
  });

  it("Should render an avatar div box", () => {
    render(<Avatar useLink={false} />);
    const avatar = screen.getByTestId("avatar");
    expect(avatar.tagName).toBe("DIV");
  });

  it("Should render the user avatar image", () => {
    render(<Avatar user={userProfile} />);
    const avatarImage = screen.getByAltText("user-avatar");
    expect(avatarImage).toBeInTheDocument();
  });

  it("Should only render user's initial", () => {
    render(<Avatar user={{ username: userProfile.username, displayName: userProfile.displayName }} />);
    const initialsContainer = screen.getByTestId("user-avatar-initials");
    expect(initialsContainer).toBeInTheDocument();
    expect(initialsContainer.textContent).toBe(userProfile.username[0] || userProfile.displayName[0]);
  });

  it("Should render icon image", () => {
    render(<Avatar icon={userIcon} />);
    const iconImage = screen.getByAltText("icon image");
    expect(iconImage).toBeInTheDocument();
  });

  it("Should render avatar image", () => {
    render(<Avatar image={userProfile.avatar} />);
    const avatarImage = screen.getByAltText("avatar image");
    expect(avatarImage).toBeInTheDocument();
  });

  it("Should render both avatar image and icon", () => {
    render(<Avatar image={userProfile.avatar} icon={userIcon} />);
    const avatarImage = screen.getByAltText("avatar image");
    const iconImage = screen.getByAltText("icon image");
    expect(avatarImage).toBeInTheDocument();
    expect(iconImage).toBeInTheDocument();
  });

  it("Should render the verification badge", () => {
    render(<Avatar user={userProfile} hideVerificationBadge={false} isKycVerified={true} />);
    const verificationBadge = screen.getByTestId("verification-badge");
    expect(verificationBadge).toBeInTheDocument();
  });

  it("Should not render the verification badge for unverified users", () => {
    render(<Avatar user={userProfile} hideVerificationBadge={false} isKycVerified={false} />);
    const avatar = screen.getByTestId("avatar");
    const verificationBadge = avatar?.querySelector(`[data-testid=verification-badge]`);
    expect(verificationBadge).toBe(null);
  });
});
