import { ReactElement, ReactNode } from "react";
import { useSelector } from "react-redux";
import ReferralPopup from "@/components/popups/referral";
import { IRootState } from "@/store";

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

export default function LayoutWrapper({
  children,
}: LayoutWrapperProps): ReactElement {
  const showReferral = useSelector(
    (state: IRootState) => state.ui.showReferralPopup
  );

  return (
    <div className="relative w-full h-full content-wrapper">
      {children}
      {showReferral && <ReferralPopup />}
    </div>
  );
}
