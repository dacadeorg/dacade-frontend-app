import Modal from "@/components/ui/Modal";
import { useTranslation } from "next-i18next";
import ArrowButton from "@/components/ui/button/Arrow";

/**
 * KYCVerification Props Interface
 * @date 4/5/2023 - 2:32:45 PM
 *
 * @interface KYCVerificationProps
 * @typedef {KYCVerificationProps}
 */
interface KYCVerificationProps {
  onCompleted: () => void;
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

  // TODO: This will be fetched from the store once the store is ready
  // const {
  //   showModal,
  //   completed,
  //   completedText,
  //   reasonText,
  //   verifying,
  //   completedActionText,
  //   actionText,
  //   loading,
  //   title,
  // } = useSelector((state: any) => state.kyc);

  // TODO: Remove this once the store is ready
  const showModal = false;
  const completed = false;
  const completedText = "";
  const reasonText = "";
  const completedActionText = "";
  const actionText = "";
  const loading = false;
  const title = "";
  const verifying = false;

  const closeModal = () => {
    // TODO: This will be dispatched to the store once the store is ready
    // dispatch("kyc/closeVerificationModal");
  };
  const verify = () => {
    if (completed) return handleCompleted();
    // TODO: This will be dispatched to the store once the store is ready
    // dispatch("kyc/launchWebSdk");
  };

  const handleCompleted = () => {
    closeModal();
    onCompleted();
    // TODO: This will be dispatched to the store once the store is ready
    // dispatch("kyc/triggerCompleteAction");
  };

  return (
    <Modal show={showModal} onClose={closeModal}>
      <div className="px-6 py-6">
        {!verifying && (
          <div className="text-left flex flex-col">
            <h1 className="text-.5xl leading-snug font-medium">{title || t("kyc.default.title")}</h1>
            <p className="pt-8">{completed ? completedText || t("kyc.default.completed") : reasonText || t("kyc.default.reason")}</p>
          </div>
        )}
        {verifying && <div id="sumsub-websdk-container" className="pb-5"></div>}
      </div>
      <div className="flex items-center justify-between pt-4 pl-6 pr-2 pb-2">
        <span className="cursor-pointer text-sm font-medium text-primary" onClick={closeModal}>
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
