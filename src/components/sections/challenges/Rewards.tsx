import Section from "@/components/sections/communities/_partials/Section";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import Certificate from "@/components/ui/Certificate";
import { useRouter } from "next/router";
import RewardCertificate from "@/components/cards/challenge/RewardCertificate";
import { IRootState } from "@/store";
import { Challenge } from "@/types/course";
import { Community } from "@/types/community";

/**
 * Overview reward section component
 * @date 4/18/2023 - 1:44:34 PM
 *
 * @export
 * @returns {ReactElement}
 */
export function OverviewRewards(): ReactElement {
  const { t } = useTranslation();
  const { challenge, community } = useMultiSelector<unknown, { challenge: Challenge, community: Community }>({
    challenge: (state: IRootState) => state.challenges.current,
    community: (state: IRootState) => state.communities.current,
  })
  const router = useRouter();

  return (
    <Section title={`${t("communities.overview.reward.title")}`}>
      <p className="my-6 text-base text-secondary">{t("course.challenge.reward.certificate.description")}</p>
      <div className="text-sm mt-6 flex gap-8 w-full md:w-2/3 items-center">
        <div>
          <Certificate size="medium" name={router.query?.slug as string} />
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-2 items-start w-full">
          <div className="flex flex-col text-primary w-full lg:w-1/2">{challenge?.rewards && <RewardCertificate rewards={challenge?.rewards} isReward />}</div>
          {!challenge?.isHackathon && (
            <div className="pb-1.5 border-b border-primary text-primary w-full lg:w-1/2 text-base">{t("communities.overview.challenge.participate", { community: community.name })}</div>
          )}
        </div>
      </div>
    </Section>
  );
}
