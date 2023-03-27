import { ReactElement, ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// waiting for the popups folder to be migrated
// import ReferralPopup from '@/components/popups/referral';


/**
 * Interface for the layout wrapper props
 * @date 3/27/2023 - 4:18:51 PM
 *
 * @interface LayoutWrapperProps
 * @typedef {LayoutWrapperProps}
 */
interface LayoutWrapperProps {
  children: ReactNode;
}


/**
 * Component for the layout wrapper 
 * @date 3/27/2023 - 4:19:16 PM
 *
 * @export
 * @param {LayoutWrapperProps} { children}
 * @returns {ReactElement}
 */
export default function LayoutWrapper ({ children}: LayoutWrapperProps): ReactElement {
  const showReferral = useSelector((state: any) => state.ui.showReferralPopup);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'ui/unlockBodyScrolling' });
  }, [dispatch]);

  return (
    <div className="relative w-full h-full">
      {children}
      {/* {showReferral && <ReferralPopup />} */}
    </div>
  );
};
