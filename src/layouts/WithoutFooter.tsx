import Wrapper from "@/components/layout/Wrapper";
import Navbar from "@/components/layout/Navbar";
import PrivacyPolicyBanner from "@/components/banner/PrivacyPolicy";
import NotificationBar from "@/components/layout/NotificationBar";
import { ReactElement, ReactNode } from "react";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * Interface for Layout without footer
 * @date 4/18/2023 - 11:54:49 AM
 *
 * @interface LayoutWithoutFooterProps
 * @typedef {LayoutWithoutFooterProps}
 */
interface LayoutWithoutFooterProps {
  children: ReactNode;
}

/**
 * Layout without footer
 * @date 4/18/2023 - 11:41:32 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function LayoutWithoutFooter({
  children,
}: LayoutWithoutFooterProps): ReactElement {
  const colors = useSelector((state) => state?.ui.colors);
  return (
    <Wrapper>
      <div className="relative min-h-screen">
        <div className="relative z-99">
          <Navbar settings={{ colors }} sidebarBurgerColor={true} />
          <NotificationBar />
        </div>
        <div>{children}</div>
        <PrivacyPolicyBanner />
      </div>
    </Wrapper>
  );
}
