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
    <>
      {list && list.length ? (
        <SectionWrapperCol
          title={`${t("communities.overview.scoreboard.title")}`}
          description={`${t(
            "communities.overview.scoreboard.description"
          )}`}
        >
          <div className="flex flex-row w-full mt-10">
            <ScoreboardFilter />
            <div className="flex flex-col w-full overflow-hidden border border-gray-200 border-solid divide-y divide-gray-200 divide-solid rounded-3xl">
              {list.slice(0, items).map((item, i) => (
                <ScoreboardCard
                  key={`list-element-${i}`}
                  index={i + 1}
                  value={item}
                />
              ))}
              {items < list.length && (
                <div className="flex items-center w-full p-6 space-x-5 space-y-0 overflow-hidden sm:flex sm:flex-row-reverse bg-gray-50 sm:px-4 sm:py-7 sm:justify-center">
                  <ArrowButton
                    communityStyles={true}
                    variant="outline-primary"
                    direction="down"
                    onClick={loadMore}
                  >
                    {t("course.scoreboard.button")}
                  </ArrowButton>
                </div>
              )}
            </div>
          </div>
        </SectionWrapperCol>
      ) : (
        <></>
      )}
    </>
  );
}
