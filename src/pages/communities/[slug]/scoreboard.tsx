import React, { ReactNode, useEffect } from "react";
import Header from "@/components/sections/communities/_partials/Header";
import ScoreboardCard from "@/components/cards/Scoreboard";
import {
  getMetadataDescription,
  getMetadataTitle,
} from "@/utilities/Metadata";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { fetchCommunity } from "@/store/feature/community.slice";
import { useRouter } from "next/router";
import { fetchAllScoreboard } from "@/store/feature/communities/scoreboard.slice";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import HomeLayout from "@/layouts/Home";

/**
 * Scoreboard list page
 * @date 4/14/2023 - 1:36:53 PM
 *
 * @returns {ReactElement}
 */
export default function ScoreboardList(): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const params = router.query;

  const {
    communities: { current: community },
    scoreboard: { list },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCommunity(params.slug as string));
    fetchAllScoreboard(params.slug as string)(dispatch);
  }, [dispatch, params.slug]);

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
          (attributes, i) => (
            <meta key={`scoreboard-meta-${i}`} {...attributes} />
          )
        )}
      </Head>
      <div className="py-4 flex flex-col text-gray-700">
        <Header
          title={community?.name}
          subtitle={t("communities.navigation.scoreboard")}
        />
        <div className="my-24 w-full divide-y divide-gray-200 space-y-4 bg-gray-50 lg:max-w-2xl rounded-3.5xl overflow-hidden">
          {list.map((item, i) => (
            <ScoreboardCard
              key={`scoreboard-item-${i}`}
              index={i + 1}
              value={item}
            />
          ))}
        </div>
      </div>
    </>
  );
}

ScoreboardList.getLayout = function (page: ReactNode) {
  return <HomeLayout>{page}</HomeLayout>;
};

export const getServerSideProps: GetStaticProps = async ({
  locale,
}) => await i18Translate(locale as string);
