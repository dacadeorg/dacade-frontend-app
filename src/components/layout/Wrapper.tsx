import { ReactElement, ReactNode } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import ReferralPopup from "@/components/popups/referral";
import graphik from "@/config/font";
import JobOffers from "../popups/JobOffers";

/**
 * LayoutWrapper props interface
 * @date 4/4/2023 - 3:47:02 PM
 *
 * @interface LayoutWrapperProps
 * @typedef {LayoutWrapperProps}
 */
interface LayoutWrapperProps {
  children: ReactNode;
}

/**
 * Layout wrapper component
 * @date 4/4/2023 - 3:47:34 PM
 *
 * @export
 * @param {LayoutWrapperProps} {
  children,
}
 * @returns {ReactElement}
 */

export default function LayoutWrapper({ children }: LayoutWrapperProps): ReactElement {
  const showReferral = useSelector((state) => state.ui.showReferralPopup);
  const showJobOffersPopup = useSelector((state) => state.ui.showJobOffersPopup);

  return (
    <div className={`relative w-full h-full ${graphik.variable} font-sans`}>
      {children}
      {showReferral && <ReferralPopup />}
      {showJobOffersPopup && <JobOffers />}
    </div>
  );
}
