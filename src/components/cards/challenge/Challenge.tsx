import ArrowButton from "@/components/ui/button/Arrow";
import { Community } from "@/types/community";
import { Challenge } from "@/types/course";
import Link from "next/link";
import Badges from "./Badges";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import RewardCertificates from "./RewardCertificates";

/**
 * `ChallengeCard` is a function component that renders a card
 * detailing a blockchain development challenge. The card includes
 * information about the challenge, such as its title, description,
 * reward, deadline, and related content.
 *
 * @returns {JSX.Element} The rendered ChallengeCard component.
 * @interface ChallengeCardProps
 */
interface ChallengeCardProps {
  data: Challenge;
  community: Community;
  isCourseEnd?: boolean;
}
export default function ChallengeCard({ data, community, isCourseEnd }: ChallengeCardProps) {
  const { t } = useTranslation();
  const link = `/communities/${community.slug}/challenges/${data.id}`;
  const expiresAt = useMemo(() => (data.expiresAt ? new Date(data.expiresAt).toLocaleDateString() : null), [data.expiresAt]);
  const reward = isCourseEnd ? data?.rewards?.find((reward) => reward.type === "SUBMISSION") : data?.reward;
  const learningModulesCount = data?.learningModules?.length || 0;

  return (
    <div className="w-full justify-between- flex flex-col sm:flex-row  md:flex-col lg:flex-row  border-solid border border-gray-200 bg-gray-50 rounded-3xl mb-5 group text-gray-700">
      <div className="border-solid border-b border-gray-300 bg-white rounded-3xl sm:p-8 sm:pb-6 p-6 lg:w-2/3">
        <div className="flex flex-col mb-1">
          <div className="lg:pr-20 lg:w-3/5-">
            <div className="text-gray-400 lg:w-2/3 text-sm font-normal mb-6 lg:mb-0">
              {expiresAt && (
                <>
                  <span>{t("communities.overview.challenge.deadline")}</span>
                  <span className="font-medium pl-1">{expiresAt}</span>
                </>
              )}
            </div>
            <div className="text-lg text-gray-900 font-medium leading-normal mb-6">{data.name}</div>
            <Badges challenge={data} className="" />
            <div className="text-sm pb-2 text-gray-700">{data.description}</div>
          </div>
          <div className="divide-y-2 divide-gray-200 divide-dotted flex flex-col mt-3">
            <p className="pb-6">
              {learningModulesCount ? `${learningModulesCount}  learning ${learningModulesCount === 1 ? "module" : "modules"} included` : "No learning modules included"}
            </p>
            <div className="lg:flex lg:flex-row flex-col justify-between pt-6 items-center">
              <Link href={link}>
                <ArrowButton communityStyles={true} variant="outline-primary">
                  {isCourseEnd ? t("communities.overview.challenge.take.challenge") : t("communities.overview.challenge.see.challenge")}
                </ArrowButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className={"mx-auto relative rounded-full mb-5 w-[147px] h-[184px]"}>
          <Image src={data?.certificateData?.icon} alt="achievement" fill />
        </div>
        <div className="">
          <h1 className="font-bold text-gray-400 text-xs uppercase pb-2">{t("communities.overview.challenge.unlock.certificate")}</h1>
          <RewardCertificates rewards={data?.rewards}/>
        </div>
        {data?.isHackathon && <p className="py-2 border-t border-gray-200 text-sm">{t("communities.overview.challenge.participate", { token: reward?.token })}</p>}
      </div>
    </div>
  );
}
