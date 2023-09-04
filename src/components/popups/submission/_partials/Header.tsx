import Crossmark from "@/icons/crossmark-2.svg";
import ArrowLeftIcon from "@/icons/arrow-left.svg";
import { ReactElement } from "react";
import { useTranslation } from "next-i18next";

/**
 * Submission popup props
 * @date 4/27/2023 - 11:41:57 AM
 *
 * @interface SubmissionPopup
 * @typedef {SubmissionPopup}
 */
interface SubmissionPopup {
  onClose: () => void;
}

/**
 * Submssion component
 * @date 4/27/2023 - 11:42:29 AM
 *
 * @export
 * @param {SubmissionPopup} { onClose }
 * @returns {ReactElement}
 */
export default function SubmissionPopup({ onClose }: SubmissionPopup): ReactElement {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center border-b border-solid border-gray-200">
      <div className="text-left pl-5 flex items-center space-x-6 cursor-pointer" onClick={onClose}>
        <ArrowLeftIcon className="block" />
        <span className="text-lg font-medium block">{t("communities.submission")}</span>
      </div>
      <div className="p-2">
        <button className="bg-gray-100 self-start px-2.5 py-2.5" onClick={onClose}>
          <Crossmark className="text-xl text-gray-600 w-6" />
        </button>
      </div>
    </div>
  );
}
