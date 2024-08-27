import { ReactElement } from "react";
import Button from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import { toggleShowReferralPopup } from "@/store/feature/ui.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";

/**
 *  ReferralsList props interface
 * @date 3/28/2023 - 12:02:30 PM
 *
 * @interface ReferralsListProps
 * @typedef {ReferralsListProps}
 */
interface ReferralsListProps {
  text: string;
}

/**
 *  ReferralsList Component
 * @date 3/28/2023 - 12:02:39 PM
 *
 * @export
 * @param {ReferralsListProps} {
  text,
}
 * @returns {ReactElement}
 */
export default function ReferralsList({ text }: ReferralsListProps): ReactElement {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const togglePopUp = () => {
    dispatch(toggleShowReferralPopup(true));
  };

  return (
    <div className="bg-blue-lighter border border-solid border-blue-light w-full rounded-3.5xl items-center justify-between flex md:flex-row flex-col py-6 px-5">
      <div className="md:w-96">
        <p className="inline-block px-2 pb-3 text-lg font-medium text-brand md:pb-0">{text}</p>
      </div>

      <div className="flex-none">
        <Button
          className="px-5 font-medium leading-relaxed hover:bg-brand group-hover:text-white lg:px-7"
          variant="outline-primary"
          type="button"
          padding={false}
          onClick={togglePopUp}
        >
          {t("profile.referrals.button-text")}
        </Button>
      </div>
    </div>
  );
}
