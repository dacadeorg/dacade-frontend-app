import { Distribution, Reward } from "@/types/course";
import { useTranslation } from "react-i18next";

export default function HackathonPrize({ reward }: { reward: Reward }) {
  const { t } = useTranslation();
  const { first, second, third } = reward?.distribution || ({} as Distribution);
  return (
    <>
      <div className="flex gap-1 text-gray-700 font-medium">
        <span>{`$${reward?.amount}K Prize Pool`}</span>
        <span>{t("communities.overview.challenge.rewards")}</span>
      </div>
      <div className="text-gray-400 text-xs font-medium leading-3 mt-1 flex">
        <span>{`1st Place $${first}K;  2nd Place $${second}K; 3rd Place $${third}K`}</span>
      </div>
    </>
  );
}
