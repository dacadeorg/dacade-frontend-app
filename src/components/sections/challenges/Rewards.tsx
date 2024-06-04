import Section from "@/components/sections/communities/_partials/Section";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import Certificate from "@/components/ui/Certificate";
import { useRouter } from "next/router";
import RewardCertificate from "@/components/cards/challenge/RewardCertificate";

/**
 * Overview reward section component
 * @date 4/18/2023 - 1:44:34 PM
 *
 * @export
 * @returns {ReactElement}
 */
export function OverviewRewards({testId}: {testId?: string}): ReactElement {
  const { t } = useTranslation();
  const challenge = useSelector((state) => state.challenges.current);
  const router = useRouter();
  const token = challenge?.reward?.token || challenge?.rewards[0]?.token || "";

  return (
    <Section title={`${t("communities.overview.reward.title")}`}>
      <p data-testid={testId} className="my-6 text-lg">{t("course.challenge.reward.certificate.description")}</p>
      <div className="text-sm mt-6 flex gap-8 w-full md:w-2/3 items-center">
        <div>
          <Certificate size="medium" name={router.query?.slug as string} />
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-2 items-start w-full">
          <div className="flex flex-col w-full lg:w-1/2">{challenge?.rewards && <RewardCertificate rewards={challenge?.rewards} isReward />}</div>
          {challenge?.isHackathon && <div className="pb-1.5 border-b border-gray-200 w-full lg:w-1/2">{t("communities.overview.challenge.participate", { token: token })}</div>}
        </div>
      </div>
    </Section>
  );
}
