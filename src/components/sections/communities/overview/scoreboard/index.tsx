import { useSelector } from "@/hooks/useTypedSelector";
import SectionWrapperCol from "./Wrapper";
import ScoreboardCard from "@/components/cards/Scoreboard";
import ArrowButton from "@/components/ui/button/Arrow";
import ScoreboardFilter from "./Filter";
import { useTranslation } from "next-i18next";
import { ReactElement, useState } from "react";

/**
 * Scoreboard Overview index component
 * @date 4/13/2023 - 10:12:04 AM
 *
 * @export
 * @returns {ReactElement}
 */

export default function ScoreboardOverview(): ReactElement {
  const { t } = useTranslation();
  const list = useSelector((state) => state.scoreboard.list);

  const [items, setItems] = useState(3);

  const loadMore = () => {
    setItems(items + 10);
  };

  return (
    <SectionWrapperCol
      title={`${t("communities.overview.scoreboard.title")}`}
      description={`${t(
        "communities.overview.scoreboard.description"
      )}`}
    >
      <div className="w-full flex flex-row mt-10">
        <ScoreboardFilter />
        {list && list.length ? (
          <div className="w-full flex flex-col divide-y divide-solid divide-gray-200 border border-gray-200 border-solid rounded-3xl overflow-hidden">
            {list.slice(0, items).map((item, i) => (
              <ScoreboardCard
                key={`list-element-${i}`}
                index={i + 1}
                value={item}
              />
            ))}
            {items < list.length && (
              <div className="flex w-full sm:flex space-x-5 space-y-0 sm:flex-row-reverse overflow-hidden bg-gray-50 p-6 sm:px-4 sm:py-7 items-center sm:justify-center">
                <ArrowButton
                  community-styles={true}
                  variant="outline-primary"
                  direction="down"
                  onClick={loadMore}
                >
                  {t("course.scoreboard.button")}
                </ArrowButton>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </SectionWrapperCol>
  );
}
