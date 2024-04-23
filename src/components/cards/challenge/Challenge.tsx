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
  const learningMaterialsCount = data?.learningModules?.length + data?.courses?.length || 0;

  return (
    <div className="w-full flex flex-col sm:flex-row  md:flex-col lg:flex-row  border-solid border border-gray-200 bg-gray-50 rounded-3xl mb-5 group text-gray-700">
      <div className="border-solid border-b border-r-0 sm:border-b-0 sm:border-r md:border-b md:border-r-0 lg:border-r lg:border-b-0 border-gray-300 bg-white rounded-3xl sm:p-8 sm:pb-6 p-6 lg:w-2/3">
        <div className="flex flex-col mb-1">
          <div className="lg:pr-20">
            {expiresAt && (
              <div className="text-gray-400 lg:w-2/3 text-sm font-normal mb-4">
                  <span>{t("communities.overview.challenge.deadline")}</span>
                  <span className="font-medium pl-1">{expiresAt}</span>
              </div>
            )}
            <div className="text-lg text-gray-900 font-medium leading-normal mb-4">{data.name}</div>
            <Badges challenge={data} />
            <div className="text-sm text-gray-700">{data.description}</div>
          </div>
          <div className="divide-y-2 divide-gray-200 divide-dotted flex flex-col mt-4">
            {learningMaterialsCount && (
              <p className="pb-5 text-sm font-medium text-gray-400">{`${learningMaterialsCount}  Learning ${learningMaterialsCount === 1 ? "material" : "materials"} included`}</p>
            )}
            <div className="lg:flex lg:flex-row flex-col justify-between pt-5 items-center">
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
          <Image src={data?.certificateData?.icon} alt="achievement" fill priority />
        </div>
        <div className="">
          <h1 className="font-bold text-gray-400 text-xs uppercase pb-2">{t("communities.overview.challenge.unlock.certificate")}</h1>
          <RewardCertificate rewards={data?.rewards} />
        </div>
        {data?.isHackathon && <p className="py-2 border-t border-gray-200 text-sm">{t("communities.overview.challenge.participate", { token: reward?.token })}</p>}
      </div>
    </div>
  );
}
