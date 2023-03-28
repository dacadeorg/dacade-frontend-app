//Next.js(Typescript)
import React, { ReactElement } from "react";
// import { useDispatch } from 'react-redux';
// import {toggleShowReferralPopup} from "@/store/features/ui/ui.slice";
import Button from "@/components/ui/button";
import { useTranslation } from "next-i18next";

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
export default function ReferralsList({
  text,
}: ReferralsListProps): ReactElement {
  //   const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const togglePopUp = () => {
    // TODO: stop body scrolling functionality to be added while implementing page that's using this component.
    // dispatch(toggleShowReferralPopup({payload: true }));
  };

  return (
    <div className="bg-blue-lighter border border-solid border-blue-light w-full rounded-3.5xl items-center justify-between flex md:flex-row flex-col py-6 px-5">
      <div className="md:w-96">
        <p className="inline-block px-2 text-primary text-lg font-medium pb-3 md:pb-0">
          {text}
        </p>
      </div>

      <div className="flex-none">
        <Button
          className="hover:bg-primary group-hover:text-white leading-relaxed lg:px-7 px-5 font-medium"
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
