import Modal from "@/components/ui/Modal";
import { useTranslation } from "next-i18next";
import ArrowButton from "@/components/ui/button/Arrow";
import { useSelector } from "@/hooks/useTypedSelector";
import { KYCSTATUS, closeVerificationModal, launchWebSdk, triggerCompleteAction } from "@/store/feature/kyc.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useMemo } from "react";

/**
 * KYCVerification Props Interface
 * @date 4/5/2023 - 2:32:45 PM
 *
 * @interface KYCVerificationProps
 * @typedef {KYCVerificationProps}
 */
interface KYCVerificationProps {
  onCompleted?: () => void;
}

/**
 * KYCVerification Component
 * @date 4/5/2023 - 2:32:29 PM
 *
 * @export
 * @param {KYCVerificationProps} {
  onCompleted,
}
 * @returns {*}
 */
export default function KYCVerification({ onCompleted }: KYCVerificationProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const verificationData = useSelector((state) => state.sumsubVerification);

  const { showModal, completed, verifying, completedActionText, actionText, loading, title } = verificationData;
  const user = useSelector((state) => state.user.data);

  const kycStatus = useMemo(() => user?.kycStatus, [user?.kycStatus]);

  const closeModal = () => {
    dispatch(closeVerificationModal());
  };
  const verify = () => {
    if (completed) return handleCompleted();
    dispatch(launchWebSdk());
  };

  const handleCompleted = () => {
    closeModal();
    onCompleted?.();
    triggerCompleteAction();
  };

  const statuMessage = useMemo(() => {
    if (kycStatus === KYCSTATUS.VERIFIED) return t("kyc.default.completed");
    if (kycStatus === KYCSTATUS.PENDING) return t("kyc.verification.pending");
    if (kycStatus === KYCSTATUS.REJECTED) return t("kyc.verification.rejected");
    return t("kyc.default.reason");
  }, [kycStatus, t]);

  return (
    <Modal show={showModal} onClose={closeModal}>
      <div className="px-6 py-6">
        {!verifying ? (
          <div className="flex flex-col text-left">
            <h1 className="text-.5xl leading-snug font-medium">{title || t("kyc.default.title")}</h1>
            <p className="pt-8">{statuMessage}</p>
          </div>
        ) : (
          <></>
        )}
        {showModal ? <div id="sumsub-websdk-container" className="pb-5"></div> : <></>}
      </div>
      <div className="flex items-center justify-between pt-4 pb-2 pl-6 pr-2">
        <span className="text-sm font-medium cursor-pointer text-primary" onClick={closeModal}>
          {t("profile.edit.close")}
        </span>
        {!verifying && (
          <ArrowButton loading={loading} disabled={loading} onClick={verify}>
            {completed ? completedActionText || t("kyc.default.button.completed") : actionText || t("kyc.default.button")}
          </ArrowButton>
        )}
      </div>
    </Modal>
  );
}
