import Section from "@/components/sections/communities/_partials/Section";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement, useMemo } from "react";
import Coin from "@/components/ui/Coin";
import Certificate from "@/components/ui/Certificate";
import { useRouter } from "next/router";
import { Challenge } from "@/types/course";
import { Community } from "@/types/community";
import { IRootState } from "@/store";
import HackathonPrize from "./_partials/HackathonPrize";

/**
 * Overview reward section component
 * @date 4/18/2023 - 1:44:34 PM
 *
 * @export
 * @returns {ReactElement}
 */
export function OverviewRewards(): ReactElement {
  const { t } = useTranslation();
  const { challenge, community } = useMultiSelector<unknown, { challenge: Challenge; community: Community }>({
    challenge: (state: IRootState) => state.challenges.current,
    community: (state: IRootState) => state.communities.current,
  });
  const rewards = useMemo(() => challenge?.rewards?.filter((reward) => reward.type === "SUBMISSION"), [challenge?.rewards]);
  const totalReward = challenge?.rewards?.reduce((acc, reward) => (acc += Number(reward.amount)), 0);
  const shorternNumberen = (token: string) => {
    return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
  };
  const router = useRouter();

  return (
    <Section title={`${t("communities.overview.reward.title")}`}>
      <p className="my-5 text-lg">{t("communities.overview.reward.subtitle")}</p>
      <div className="md:flex md:flex-row items-center flex-col rounded-full max-w-max text-sm mt-6 space-y-8 md:space-x-8 md:space-y-0">
        <div className="flex items-center gap-1 md:gap-0">
          <Certificate size="medium" name={router.query?.slug as string} />
          <div className="md:pl-2 space-y-2 max-w-max">
            <div className="flex text-sm text-gray-700">
              <span className="block font-medium pr-1">
                {community?.slug === "celo" && "NFT"} {t("communities.overview.challenge.certificate")}
              </span>
            </div>
            <div className="text-gray-400 text-xs font-medium">{t("communities.overview.challenge.subtitle")}</div>
          </div>
        </div>
        {rewards?.map((reward, index) => (
          <div key={`reward=${index}`} className="flex items-center">
            <Coin size="medium" token={reward?.token} />
            <div className="text-sm space-y-2 md:pl-2 max-w-max">
              {challenge?.isHackathon && reward?.distribution ? (
                <HackathonPrize reward={reward} description={t("communities.overview.challenge.rewards")} />
              ) : (
                <>
                  <div className="flex gap-1 text-gray-700 font-medium">
                    <span>{totalReward}</span>
                    <span>{reward?.token}</span>
                    <span>{t("communities.overview.challenge.rewards")}</span>
                  </div>
                  <div className="text-gray-400 text-xs font-medium leading-3 mt-1 flex">
                    {challenge?.rewards.map((reward, index) => (
                      <span key={`reward-${index}`}>
                        {index > 0 && "\u003B "}
                        {reward.amount} {reward.token}/{shorternNumberen(reward.type)}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
