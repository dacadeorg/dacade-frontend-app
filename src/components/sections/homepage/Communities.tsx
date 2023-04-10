import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

export default function CommunitiesSection({
  communities,
}: {
  communities: Community[];
}): ReactElement {
  const { t } = useTranslation();

  return (
    <Section padding="pt-20 lg:pb-24 md:pb-24">
      <div id="communities" className="md:flex relative items-end">
        <div className="pr-5">
          <p className="uppercase font-semibold leading-none text-base">
            {t("page.index.communities.title")}
          </p>
        </div>
        <div className="pl-7 relative hidden lg:block md:block">
          <div className="message-bubble">
            {t("page.index.communities.subtitle")}
          </div>
        </div>
      </div>
      <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-0.5 lg:gap-y-5 md:gap-y-5 justify-stretch-items">
        {communities?.map((community: any) => (
          <CommunityCard key={community.id} community={community} />
        ))}
        <PartneringCard />
      </div>
    </Section>
  );
}
