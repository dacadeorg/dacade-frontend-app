import Avatar from "@/components/ui/Avatar";
import { Reward as IReward } from "@/types/course";
import { Community } from "@/types/community";
import Reward from "../ui/Reward";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

/**
 * Referral card component props
 * @date 3/29/2023 - 11:09:33 AM
 *
 * @interface ReferralProps
 * @typedef {ReferralProps}
 */

interface ReferralProps {
  referral: {
    title?: string;
    community: Community;
    reward: IReward;
  };
}

/**
 * Referral card component
 * @date 3/29/2023 - 11:08:52 AM
 *
 * @export
 * @param {ReferralProps} { referral }
 * @returns {ReactElement}
 */

export default function Referral({
  referral,
}: ReferralProps): ReactElement {
  const { t } = useTranslation();

  // TODO: Should be uncommented when redux is implemented
  //   const openLink = () => {
  //     dispatch("ui/toggleShowReferralPopup", true);
  //   };

  return (
    <div
      className="cursor-pointer flex md:flex-row-reverse md:space-x-5 px-5 min-h-32 md:h-auto md:w-full justify-between hover:bg-secondary relative"
      // TODO:  should be uncommented when redux is implemented
      //   onClick={openLink}
    >
      <div className="bg-theme-accent flex-col w-full h-full justify-between md:-space-y-1 pl-3 pr-5 mt-7 mb-5">
        <div className="relative w-full md:flex md:justify-between">
          <div className="font-medium text-md md:pt-1.5">
            {referral.title || referral.community.name}
          </div>
        </div>

        <div className="inline-flex md:flex h-2/3 md:flex-row flex-col-reverse justify-between">
          <div className="text-sm pt-8 md:pt-2 md:pb-4 text-gray-600">
            {t("bounties.reward.referral")}
          </div>
          <div>
            <Reward reward={referral.reward} />
          </div>
        </div>
      </div>
      <div className="self-start relative mt-15 md:mt-7">
        <Avatar
          icon={referral.community.icon}
          image={referral.community.image}
          color={referral.community.colors.primary}
          size="large"
          shape="rounded"
        />
      </div>
    </div>
  );
}
