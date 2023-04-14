import React, { useEffect } from "react";
import Header from "@/components/sections/communities/_partials/Header";
import ScoreboardCard from "@/components/cards/Scoreboard";
import {
  getMetadataDescription,
  getMetadataTitle,
} from "@/utilities/Metadata";

import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";

const ScoreboardList = () => {
  const dispatch = useDispatch();
  const { community, list } = useSelector((state) => state);

  useEffect(() => {
    // dispatch(fetchCommunities(params.slug));
    // dispatch(fetchScoreboard(params.slug));
  }, [dispatch, params.slug]);

  return (
    <div className="py-4 flex flex-col text-gray-700">
      <Header
        title={community.name}
        subtitle="$t('communities.navigation.scoreboard')"
      />
      <div className="my-24 w-full divide-y divide-gray-200 space-y-4 bg-gray-50 lg:max-w-2xl rounded-3.5xl overflow-hidden">
        {list.map((item, i) => (
          <ScoreboardCard key={i} index={i + 1} value={item} />
        ))}
      </div>
    </div>
  );
};

// ScoreboardList.fetch = ({ store, params, error }) => {
//   return Promise.all([
//     store.dispatch(fetchCommunities(params.slug)),
//     store.dispatch(fetchScoreboard(params.slug)),
//   ]).catch((e) => {
//     error(e);
//   });
// };

// ScoreboardList.head = () => {
//   return {
//     title: getMetadataTitle(
//       '$t("communities.navigation.scoreboard")',
//       community?.name
//     ),
//     meta: getMetadataDescription(community?.description),
//   };
// };

export default ScoreboardList;
