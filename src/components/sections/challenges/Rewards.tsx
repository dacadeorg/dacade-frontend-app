import Section from "@/components/sections/communities/_partials/Section";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import Coin from "@/components/ui/Coin";
import Certificate from "@/components/ui/Certificate";
import { useRouter } from "next/router";

/**
 * Overview reward section component
 * @date 4/18/2023 - 1:44:34 PM
 *
 * @export
 * @returns {ReactElement}
 */
export function OverviewRewards(): ReactElement {
  const { t } = useTranslation();
  const  challenge = useSelector((state)=>state.challenges.current)
  const router = useRouter();
  const token = challenge?.reward?.token || challenge?.rewards[0]?.token || "";

  return (
    <Section title={`${t("communities.overview.reward.title")}`}>
      <p className="my-5 text-lg">Complete the course to achieve the certificate and unlock new opportunities</p>
      <div className="text-sm mt-6 flex gap-8 w-full md:w-2/3">
        <div className="">
          <Certificate size="medium" name={router.query?.slug as string} />
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-2 items-start w-full">
          <div className="flex flex-col w-full lg:w-1/2">
            {challenge?.rewards.map((reward, index, rewardsArray) => (
              <div key={index} className={`flex items-center gap-1 pb-2 ${index !==  (rewardsArray.length !==1 && rewardsArray.length-1)? "border-b border-gray-200":""} ${index !==0 ? "pt-2":""} `}>
                <Coin size="small" token={reward?.token} />
                <div className="text-sm">
                  <span>
                    {reward?.amount} {reward?.token}
                  </span>
                  <span>{reward?.type === "SUBMISSION" ? " for the certificate" : " for every feedback"}</span>
                </div>
              </div>
            ))}
          </div>
          {challenge?.isHackathon && <div className="pb-2 border-b border-gray-200 w-full lg:w-1/2">{`Participate in ${token} hackathons`}</div>}
        </div>
      </div>
    </Section>
  );
}
