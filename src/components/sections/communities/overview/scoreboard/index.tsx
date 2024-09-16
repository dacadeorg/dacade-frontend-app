import { useSelector } from "@/hooks/useTypedSelector";
import ScoreboardCard from "@/components/cards/Scoreboard";
import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "next-i18next";
import { ReactElement, useState } from "react";
import Loader from "@/components/ui/Loader";
import EmptyState from "@/components/ui/EmptyState";
import CommunityNavItem from "../_partials/NavItem";

/**
 * Scoreboard Overview index component
 * @date 4/13/2023 - 10:12:04 AM
 *
 * @export
 * @returns {ReactElement}
 */

export default function ScoreboardOverview(): ReactElement {
  const { t } = useTranslation();
  const { list, loading } = useSelector((state) => state.scoreboard);

  const [items, setItems] = useState(3);

  const loadMore = () => {
    setItems(items + 10);
  };

  return (
    <>
      <CommunityNavItem title={t("communities.overview.scoreboard.title")} description={t("communities.overview.scoreboard.description")} className="md:hidden my-8" />
      {loading ? (
        <div className="h-full w-full grid">
          <Loader className="place-self-center" />
        </div>
      ) : list && list.length !== 0 ? (
        <div className="flex flex-col w-full overflow-hidden border border-gray-200 border-solid divide-y divide-gray-200 divide-solid rounded-3xl">
          {list.slice(0, items).map((item, i) => (
            <ScoreboardCard key={`list-element-${i}`} index={i + 1} value={item} />
          ))}
          {items < list.length && (
            <div className="flex items-center w-full p-6 space-x-5 space-y-0 overflow-hidden sm:flex sm:flex-row-reverse bg-secondary sm:px-4 sm:py-7 sm:justify-center">
              <ArrowButton communityStyles={true} variant="outline-primary" direction="down" onClick={loadMore}>
                {t("course.scoreboard.button")}
              </ArrowButton>
            </div>
          )}
        </div>
      ) : (
        <div className=" w-full overflow-hidden border-t border-gray-200 ">
          <EmptyState title={t("communities.scoreboard.empty-state.title")} />
        </div>
      )}
    </>
  );
}
