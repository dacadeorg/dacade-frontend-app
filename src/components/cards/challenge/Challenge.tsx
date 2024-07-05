import ArrowButton from "@/components/ui/button/Arrow";
import { Community } from "@/types/community";
import { Challenge } from "@/types/course";
import Link from "next/link";
import Badges from "./Badges";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import RewardCertificate from "./RewardCertificate";

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

  const { learningModules = [], courses = [] } = data || {};
  const learningMaterialsCount = learningModules.length + courses.length;


  return (
    <div className="w-full flex flex-col sm:flex-row  md:flex-col lg:flex-row  border-solid border border-primary bg-secondary rounded-3xl mb-5 group text-secondary">
      <div className="border-solid border -m-px border-primary bg-primary rounded-3xl sm:p-8 sm:pb-6 p-6 sm:w-2/3 md:w-auto lg:w-2/3">
        <div className="flex flex-col mb-1">
          <div className="lg:pr-20">
            {expiresAt && (
              <div className="text-tertiary text-sm font-normal mb-4.5 md:mb-6">
                <span>{t("communities.overview.challenge.deadline")}</span>
                <span className="font-medium pl-1">{expiresAt}</span>
              </div>
            )}
            <div className="text-lg text-primary font-medium leading-4.95 mb-3">{data.name}</div>
            <Badges challenge={data} />
            <div className="text-base text-secondary -tracking-1">{data.description}</div>
          </div>
          <div className="divide-y-2 divide-gray-200 divide-dotted flex flex-col mt-8">
            {learningMaterialsCount && (
              <p className="pb-3 md:pb-4 text-sm font-medium text-tertiary">{`${learningMaterialsCount}  Learning ${
                learningMaterialsCount === 1 ? "material" : "materials"
              } included`}</p>
            )}
            <div className="lg:flex lg:flex-row flex-col justify-between pt-3 md:pt-4 items-center">
              <Link href={link}>
                <ArrowButton communityStyles={true} variant="outline-primary">
                  {isCourseEnd ? t("communities.overview.challenge.take.challenge") : t("communities.overview.challenge.see.challenge")}
                </ArrowButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 lg:flex-1">
        <div className="mx-auto relative rounded-full mb-5 w-[147px] h-[184px]">
          <Image src={data?.certificateData?.icon} alt="achievement" fill priority />
        </div>
        <div className="">
          <h1 className="font-bold text-tertiary text-xs uppercase pb-3 leading-3.3 tracking-3">{t("communities.overview.challenge.unlock.certificate")}</h1>
          <RewardCertificate rewards={data?.rewards} />
        </div>
        {data?.isHackathon && <p className="py-1.5 border-t border-primary text-sm">{t("communities.overview.challenge.participate", { token: reward?.token })}</p>}
      </div>
    </div>
  );
}