import React, { ReactElement, useEffect } from "react";
import Wrapper from "@/components/layout/Wrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PrivacyPolicyBanner from "@/components/banner/PrivacyPolicy";
import NotificationBar from "@/components/layout/NotificationBar";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import DiscordButton from "@/components/ui/DiscordButton";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * Community layout
 * @date 4/15/2023 - 5:39:53 PM
 *
 * @export
 * @param {{
  children: ReactElement;
}} {
  children,
}
 * @returns {ReactElement}
 */
export function CommunityLayout({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const colors = useSelector((state) => state.ui.colors);

  return (
    <Wrapper>
      <ThemeWrapper colors={colors}>
        <div className="relative overflow-hidden lg:overflow-auto">
          <Navbar settings={{ colors }} sidebarBurgerColor />
          <NotificationBar />
          <div className="relative">{children}</div>
          <DiscordButton />
          <Footer />
          <PrivacyPolicyBanner />
        </div>
      </ThemeWrapper>
    </Wrapper>
  );
}

export default CommunityLayout;
