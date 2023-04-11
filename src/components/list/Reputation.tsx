import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ReputationCard from "@/components/cards/Reputation";

export default function ReputationList(): ReactElement {
  // TODO: To be uncommented when the use slice is implemented
  // const reputations = useSelector(state => state.user.reputations.list)
  const { t } = useTranslation();

  return (
    <div className="text-left">
      <span className="uppercase block text-xs font-semibold text-gray-500 leading-relaxed">
        {t("nav.reputation")}
      </span>
      <div className="space-y-4 mt-2">
        {/* 
          // TODO: To be uncommented when the use slice is implemented
          {
            reputations.map(reputation => (
              <ReputationCard key={reputation.id} details={reputation} />
            ))}  
        */}
      </div>
    </div>
  );
}
