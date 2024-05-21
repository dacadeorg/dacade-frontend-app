import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from "react";
import FilterOption from "./_partials/FilterOption";
import { setLoading } from "@/store/feature/communities/scoreboard.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useRouter } from "next/router";
import { filterScoreboards } from "@/store/services/communities/scoreboard.service";

/**
 * Options interface
 * @date 4/12/2023 - 8:15:30 PM
 *
 * @interface Option
 * @typedef {Option}
 */

interface Option {
  label: string;
  value: string;
}

/**
 * Filtering options
 * @date 4/12/2023 - 8:15:04 PM
 *
 * @type {Option[]}
 */

export const filterOptions: Option[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Month",
    value: "month",
  },
  {
    label: "Quarter",
    value: "quarter",
  },
  {
    label: "Year",
    value: "year",
  },
];

/**
 * Sorting options
 * @date 4/12/2023 - 8:12:45 PM
 *
 * @type {Option[]}
 */

export const sortingOptions: Option[] = [
  {
    label: "Reputation",
    value: "score",
  },
  {
    label: "Submission points",
    value: "submissionPoints",
  },
];

/**
 * Filter components used in the communities overview page.
 * @date 4/12/2023 - 8:11:45 PM
 *
 * @export
 * @returns {ReactElement}
 */

export default function Filters(): ReactElement {
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("score");

  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const onFilterScoreboards = useCallback(async () => {
    dispatch(setLoading(true));
    await dispatch(
      filterScoreboards({
        slug: slug as string,
        filterBy,
        sortBy,
        locale: router.locale as string,
      })
    );
    dispatch(setLoading(false));
  }, [dispatch, filterBy, router.locale, slug, sortBy]);

  useEffect(() => {
    onFilterScoreboards();
  }, [onFilterScoreboards]);

  const handleFilterByChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === filterBy) return;
    setFilterBy(newValue);
  };

  const handleSortByChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === sortBy) return;
    setSortBy(newValue);
  };

  return (
    <div className="lg:flex flex-col w-2/4 mr-8 divide-y divide-solid divide-gray-200 hidden">
      <div className="divide-y divide-gray-200">
        <div className="block mt-6 mb-6">
          <span className="text-gray-700 mb-4">Filter by</span>
          <div className="mt-6 mb-6">
            {filterOptions.map((option, i) => (
              <FilterOption
                key={`option-${i}`}
                defaultChecked={filterBy === option.value}
                label={option.label}
                value={option.value}
                data={filterBy}
                name="filter-by-option"
                onChange={handleFilterByChange}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <div className="block">
          <span className="text-gray-700 mb-4">Sort</span>
          <div className="mt-6 mb-6">
            {sortingOptions.map((option, i) => (
              <FilterOption
                key={`sorting-option-${i}`}
                defaultChecked={sortBy === option.value}
                label={option.label}
                value={option.value}
                data={sortBy}
                name="sort-by-option"
                onChange={handleSortByChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
