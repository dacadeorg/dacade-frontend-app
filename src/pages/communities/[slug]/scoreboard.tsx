import { useEffect } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import Header from "@/components/sections/communities/_partials/Header";
import ScoreboardCard from "@/components/cards/Scoreboard";
import {
  getMetadataDescription,
  getMetadataTitle,
} from "@/utilities/Metadata";
// TODO: fetchCommunities and fetchScoreboard to be combined in redux store optimisation.
import { fetchAllCommunities as fetchCommunities } from "@/store/feature/community.slice";
import { all as fetchScoreboard } from "@/store/feature/communities/scoreboard.slice";
import { wrapper } from "@/store";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "next-i18next";

interface Props {
  badgeStyles?: Record<string, unknown>;
}

const ScoreboardList: React.FC<Props> = ({ badgeStyles = {} }) => {
  const dispatch = useDispatch();
  const { community, list } = useSelector((state) => ({
    community: state.communities.current,
    list: state.scoreboard.list,
  }));
  const { t } = useTranslation();
  useEffect(() => {
    Promise.all([
      dispatch(fetchCommunities({ locale: "en" })),
      dispatch(fetchScoreboard("celo")),
    ]).then((res) => {
      console.log({ res });
      console.log("done");
    });
  }, []);

  return (
    <>
      <Head>
        <title>
          {getMetadataTitle(
            t("communities.navigation.scoreboard"),
            community?.name as string
          )}
        </title>
        {getMetadataDescription(community?.description as string).map(
          ({ name, content }) => (
            <meta name={name} content={content} />
          )
        )}
      </Head>
      <div className="py-4 flex flex-col text-gray-700">
        <Header
          title={community?.name as string}
          subtitle={t("communities.navigation.scoreboard")}
        />
        <div className="my-24 w-full divide-y divide-gray-200 space-y-4 bg-gray-50 lg:max-w-2xl rounded-3.5xl overflow-hidden">
          {list.map((item, i) => (
            <ScoreboardCard key={i} index={i + 1} value={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => {
    return async ({ params, locale }) => {
      const { dispatch } = store;
      console.log({ params });
      //   const results = await Promise.all([
      //     dispatch(fetchCommunities({ locale: locale as string })),
      //     dispatch(fetchScoreboard(params?.slug as string)),
      //   ]);

      //   console.log(results);

      //   await dispatch(fetchCommunities(params.slug));
      //   await dispatch(fetchScoreboard(params.slug));

      return {
        props: {
          ...(await serverSideTranslations(locale as string)),
        },
      };
    };
  }
);

export default ScoreboardList;
