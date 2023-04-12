import { ChangeEvent, useEffect, useState } from "react";
import FilterOption from "./_partials/FilterOption";
import {
  filter,
  selectList,
  sort,
} from "@/store/feature/communities/scoreboard.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useRouter } from "next/router";
import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react-markdown/lib/react-markdown";

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

const options: Option[] = [
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

const sortingOptions: Option[] = [
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
  const list = useSelector((state) => selectList(state));
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    filter(slug as string, filterBy, sortBy)(dispatch);
  }, [dispatch, filterBy, slug, sortBy]);

  useEffect(() => {
    sort(sortBy)(dispatch, list);
  }, [dispatch, list, sortBy]);

  const handleFilterByChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    if (newValue === filterBy) return;
    setFilterBy(newValue);
  };

  const handleSortByChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
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
            {options.map((option, i) => (
              <FilterOption
                key={`option-${i}`}
                checked={filterBy === option.value}
                label={option.label}
                value={option.value}
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
                checked={sortBy === option.value}
                label={option.label}
                value={option.value}
                name="sort-by-option"
                onChange={handleSortByChange}
              />
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
