/**
 * The following components are needed for this file to be fully implemented
 *  - Navbar from layout
 *  - NotificationBar
 *
 */

// import Navbar from "@/components/layout/Navbar";
// import NotificationBar from "@/components/layout/NotificationBar";
import Wrapper from "./Wrapper";
import Footer from "@/components/layout/Footer";
import PrivacyPolicyBanner from "@/components/banner/PrivacyPolicy";
import DiscordButton from "@/components/ui/DiscordButton";
import { ReactElement, ReactNode } from "react";

/**
 * Default layout props interface
 * @date 3/27/2023 - 2:44:31 PM
 *
 * @interface DefaultLayoutProps
 * @typedef {DefaultLayoutProps}
 */

interface DefaultLayoutProps {
  footerBackgroundColor?: boolean;
  children: ReactNode;
}

/**
 * Default Layout component
 * @date 3/27/2023 - 2:43:21 PM
 *
 * @export
 * @param {DefaultLayoutProps} {
  footerBackgroundColor,
}
 * @returns {ReactElement}
 */

export default function DefaultLayout({
  footerBackgroundColor,
  children,
}: DefaultLayoutProps): ReactElement {
  return (
    <Wrapper>
      <div className="relative min-h-screen flex flex-col">
        <div className="relative flex-grow-0">
          {/* <Navbar />
          <NotificationBar /> */}
        </div>
        <div className="relative flex-grow">{children}</div>
        <DiscordButton />
        <div className="relative flex-grow-0">
          <Footer backgroundColor={footerBackgroundColor} />
          <PrivacyPolicyBanner />
        </div>
      </div>
    </Wrapper>
  );
}
