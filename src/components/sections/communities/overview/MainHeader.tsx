import Section from "@/components/ui/Section";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { ReactElement } from "react";

/**
 * Represents the Community Section
 * @date 4/13/2023 - 5:56:41 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function CommunitySection(): ReactElement {
  const { t } = useTranslation();
  const community = useSelector((state) => state.communities.current);

  const submissions = community?.metadata?.submissions || 0;
  const feedbacks = community?.metadata?.feedbacks || 0;

  return (
    <Section padding="pt-7 pb-6 lg:pt-2 lg:pb-8" className="bg-theme-primary text-theme-text">
      <div className="mx-auto relative">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="max-w-md mb-4 md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl lg:mr-6 space-y-1.5 md:space-y-7">
            <h1 className="text-5xl leading-10 sm:text-6.5xl xl:text-7.75xl max-w-text-xs -tracking-4">{community?.name}</h1>
            <p className="text-base md:text-.5xl">{community?.summary}</p>
          </div>
          <div className="self-end w-36 md:h-82 lg:h-128 md:w-1/2 max-w-lg">
            {community?.icon && <Image src={`${community?.icon}`} alt={community?.name || ""} className="relative w-full h-full" width={300} height={300} />}
          </div>
        </div>
        <div className="absolute left-0 bottom-0 md:static flex flex-col md:flex-row md:items-center text-sm gap-1 md:gap-2.5">
          <p className="md:py-2">
            <strong>{submissions} </strong>
            {t("communities.submissions")}
          </p>
          <p className="md:py-2 md:border-l md:px-2.5">
            <strong>{feedbacks} </strong>
            {t("communities.feedbacks")}
          </p>
        </div>
      </div>
    </Section>
  );
}
