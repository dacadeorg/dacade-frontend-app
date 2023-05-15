import { useDispatch } from "react-redux";
import { useSelector } from "@/hooks/useTypedSelector";
import { setShowReferralPopup } from "@/store/feature/ui.slice";
import List from "./List";
import Box from "./Box";
import Crossmark from "@/icons/crossmark-2.svg";
import Modal from "@/components/ui/Modal";
import { useTranslation } from "next-i18next";
import { ReactElement, useEffect, useState } from "react";

/**
 * Referreal popup component
 * @date 4/4/2023 - 3:31:08 PM
 *
 * @export
 * @returns {ReactElement}
 */

export default function ReferralPopup(): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [referralLink, setReferralLink] = useState("");

  // Get user data and show referral popup status from the redux store
  const user = useSelector((state) => state.user.data);

  // Get the referral visibility status from the redux store
  const showReferral = useSelector((state) => state.ui.showReferralPopup);

  useEffect(() => {
    // Construct referral link using the user's display name
    if (window !== undefined) {
      setReferralLink(
        () => `${window.location.origin}
    /signup?invite=${user?.displayName}`
      );
    }
  }, [user?.displayName]);

  const referralCode = user?.displayName;
  const username = user?.displayName;

  /**
   * Handles the close button click event.
   * @returns {void}
   */
  const close = (): void => {
    if (showReferral) {
      dispatch(setShowReferralPopup(false));
    }
  };

  return (
    <>
      {user && showReferral && (
        <Modal show={true} onClose={close}>
          <div className="w-full p-7 relative">
            <button className="bg-gray-100 self-start px-2.5 py-2.5 absolute top-2 right-2" onClick={close}>
              <Crossmark className="text-xl text-gray-600 w-6" />
            </button>
            <h1 className="text-xl md:text-3xl mr-3 mb-3 text-left">
              {t("modal.referral.title")}
              {t("app.name")}
            </h1>
            <div className="text-base md:text-lg text-left font-normal text-gray-700 mb-8">
              <p className="mb-3 leading-normal">
                {t("modal.referral.text-1", {
                  username,
                })}
              </p>
              <p className="leading-normal">{t("modal.referral.text-2")}</p>
            </div>
            <div className="flex flex-col space-y-5">
              <Box value={referralLink} label="modal.referral.link.label" />
              <Box value={referralCode} label="modal.referral.code.label" />
            </div>
            <div className="my-8">
              <List />
            </div>
            <div className="w-full block border-t border-t-solid border-gray-200" />
            <p className="text-left pt-4 pb-8 text-gray-500 text-sm font-normal">{t("modal.referral.message")}</p>
          </div>
        </Modal>
      )}
    </>
  );
}
