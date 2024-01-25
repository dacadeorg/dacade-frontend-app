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
    <Section className="bg-theme-primary text-theme-text">
      <div className="py-2 md:py-8 mx-auto">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="max-w-md mb-4 md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl lg:mr-6">
            <h1 className="text-5xl tracking-tight sm:text-6.5xl xl:text-7.75xl max-w-text-xs">{community?.name}</h1>
            <p className="mt-2 text-xl tracking-tight md:text-.5xl leading-tight max-w-text-sm lg:hidden">{community?.summary}</p>
            <p className="hidden mt-4 tracking-tight text-lg xl:text-.5xl max-w-text-md font-extralight lg:block">{community?.summary}</p>
          </div>
          <div className="self-end w-36 sm:h-82 lg:h-128 md:w-1/2 max-w-lg">
            {community?.icon && <Image src={`${community?.icon}`} alt={community?.name || ""} className="relative w-full h-full" width={300} height={300} />}
          </div>
        </div>
        <div className="flex flex-col max-w-xs mt-0 sm:-mt-15 lg:-mt-8 md:max-w-xl lg:flex-row lg:items-center">
          <div className="my-2 text-sm">
            <span>
              <strong>{submissions} </strong>
              {t("communities.submissions")}
            </span>
            <span className="p-2 md:border-l md:ml-2">
              <strong>{feedbacks} </strong>
              {t("communities.feedbacks")}
            </span>
            <div />
          </div>
        </div>
      </div>
    </Section>
  );
}
