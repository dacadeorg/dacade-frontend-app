import { ReactElement } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import ReputationCard from "@/components/cards/Reputation";
import { useTranslation } from "next-i18next";

/**
 * ReputationList component
 * @returns {ReactElement}
 */

export default function ReputationList(): ReactElement {
  const { t } = useTranslation();
  const reputations = useSelector((state) => state.userReputations.list);

  if (!reputations.length) return <></>;
  return (
    <div className="text-left">
      <span className="uppercase block text-xs font-semibold text-gray-500 leading-relaxed">{t("nav.reputation")}</span>
      <div className="space-y-4 mt-2">
        {reputations.map((reputation) => (
          <ReputationCard key={reputation.id} details={reputation} />
        ))}
      </div>
    </div>
  );
}
