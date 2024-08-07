import { ReactElement } from "react";
import Section from "@/components/ui/Section";
import CommunityCard from "@/components/cards/community";
import PartneringCard from "@/components/cards/Partnering";
import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";

/**
 *  Communities section component props
 * @date 4/10/2023 - 7:31:44 AM
 *
 * @export
 * @param {{
  communities: Community[];
}} {
  communities,
}
 * @returns {ReactElement}
 */

export default function CommunitiesSection({ communities, testId = "communitiesSectionId" }: { communities: Community[]; testId?: string }): ReactElement {
  const { t } = useTranslation();

  return (
    <Section type="default" padding="pt-20 lg:pb-24 md:pb-24">
      <div data-testid={testId} id="communities" className="md:flex relative items-end">
        <div className="pr-5">
          <p className="uppercase font-bold text-xs leading-3.3 tracking-3 text-primary">{t("page.index.communities.title")}</p>
        </div>
        <div className="pl-7 relative hidden lg:block md:block">
          <div className="message-bubble">{t("page.index.communities.subtitle")}</div>
        </div>
      </div>
      <div className="mt-5 md:mt-7 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-6 md:gap-y-5 justify-stretch-items">
        {communities?.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
        <PartneringCard />
      </div>
    </Section>
  );
}
