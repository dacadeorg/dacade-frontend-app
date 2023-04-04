import React from "react";
import Modal from "@/components/ui/Modal";
import { useTranslation } from "next-i18next";
import ArrowButton from "../ui/button/Arrow";

interface KYCVerificationProps {
  onCompleted: () => void;
}

export default function KYCVerification({
  onCompleted,
}: KYCVerificationProps) {
  const { t } = useTranslation();

  //This will be fetched for the store
  const showModal = false;

  //This will be fetched for the store
  const completed = false;

  //This will be fetched for the store
  const completedText = "";

  //This will be fetched for the store
  const reasonText = "";

  //This will be fetched for the store
  const completedActionText = "";

  //This will be fetched for the store
  const actionText = "";

  //This will be fetched for the store
  const loading = false;

  //This will be fetched for the store
  const title = "";

  //This will be fetched for the store
  const verifying = false;

  const closeModal = () => {
    // this.$store.dispatch("kyc/closeVerificationModal");
  };
  const verify = () => {
    if (completed) return handleCompleted();
    // this.$store.dispatch("kyc/launchWebSdk");
  };

  const handleCompleted = () => {
    closeModal();
    onCompleted();
    //   this.$store.dispatch('kyc/triggerCompleteAction')
  };
  return (
    <Modal show={showModal} onClose={closeModal}>
      <div className="px-6 py-6">
        {!verifying && (
          <div className="text-left flex flex-col">
            <h1 className="text-.5xl leading-snug font-medium">
              {title || t("kyc.default.title")}
            </h1>
            <p className="pt-8">
              {completed
                ? completedText || t("kyc.default.completed")
                : reasonText || t("kyc.default.reason")}
            </p>
          </div>
        )}
        {verifying && (
          <div id="sumsub-websdk-container" className="pb-5"></div>
        )}
      </div>
      <div className="flex items-center justify-between pt-4 pl-6 pr-2 pb-2">
        <span
          className="cursor-pointer text-sm font-medium text-primary"
          onClick={closeModal}
        >
          {t("profile.edit.close")}
        </span>
        {!verifying && (
          <ArrowButton
            loading={loading}
            disabled={loading}
            onClick={verify}
          >
            {completed
              ? completedActionText ||
                t("kyc.default.button.completed")
              : actionText || t("kyc.default.button")}
          </ArrowButton>
        )}
      </div>
    </Modal>
  );
}
