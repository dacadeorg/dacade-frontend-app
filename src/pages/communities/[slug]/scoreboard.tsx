import { ReactElement, ReactNode, useEffect } from "react";
import Header from "@/components/sections/communities/_partials/Header";
import ScoreboardCard from "@/components/cards/Scoreboard";
import { getMetadataDescription, getMetadataTitle } from "@/utilities/Metadata";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useRouter } from "next/router";
import { fetchAllScoreboards } from "@/store/feature/communities/scoreboard.slice";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { GetServerSideProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import HomeLayout from "@/layouts/Home";
import { fetchCurrentCommunity } from "@/store/services/community.service";

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
  const { community, list } = useSelector((state) => ({
    community: state.communities.current,
    list: state.scoreboard.list,
  }));

  useEffect(() => {
    dispatch(
      fetchCurrentCommunity({
        slug: params.slug as string,
        locale: router.locale as string,
      })
    );
    dispatch(
      fetchAllScoreboards({
        slug: params.slug as string,
        locale: router.locale as string,
      })
    );
  }, [dispatch, params.slug, router.locale]);

  return (
    <>
      <Head>
        <title>{getMetadataTitle(t("communities.navigation.scoreboard"), community?.name as string)}</title>
        {getMetadataDescription(community?.description as string).map((attributes, i) => (
          <meta key={`scoreboard-meta-${i}`} {...attributes} />
        ))}
      </Head>
      <div className="py-4 flex flex-col text-gray-700">
        <Header title={community?.name} subtitle={t("communities.navigation.scoreboard")} />
        <div className="my-24 w-full divide-y divide-gray-200 space-y-4 bg-gray-50 lg:max-w-2xl rounded-3.5xl overflow-hidden">
          {list.map((item, i) => (
            <ScoreboardCard key={`scoreboard-item-${i}`} index={i + 1} value={item} />
          ))}
        </div>
      </div>
    </>
  );
}

ScoreboardList.getLayout = function (page: ReactNode) {
  return <HomeLayout>{page}</HomeLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({ props: { ...(await i18Translate(locale as string)) } });
