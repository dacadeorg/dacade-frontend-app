import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { getMetadataTitle } from "@/utilities/Metadata";
import {
  fetchAllCommunities,
  setCurrentCommunity,
} from "@/store/feature/community.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { ReactElement } from "react";
import CommunityListCard from "@/components/cards/community/List";
import Head from "next/head";
import { wrapper } from "@/store";
import { Community } from "@/types/community";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HomeLayout from "@/layouts/Home";

export default function CommunitiesPage(props: {
  pageProps: { communities: Community[] };
}) {
  const { t } = useTranslation();
  const communities = props.pageProps.communities;
  const title: string = getMetadataTitle(t("nav.communities"));
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl sm:text-5xl pt-10 md:pt-20 pb-10">
          {t("nav.communities")}
        </h1>
        <div className="row w-full">
          {communities?.map((community, index) => (
            <div
              key={`generated-key-${index}`}
              onClick={() => dispatch(setCurrentCommunity(community))}
              className="flex pb-4 min-w-full flex-grow"
            >
              <CommunityListCard community={community} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * Initialize the page transilation and fetch the communities.
 * @date 4/6/2023 - 11:52:05 AM
 *
 * @async
 */
export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (data) => {
    const { locale } = data;
    const results = await store.dispatch(
      fetchAllCommunities({ locale: locale as string })
    );
    return {
      props: {
        ...(await serverSideTranslations(locale as string)),
        communities: results.payload,
        revalidate: 60 * 60 * 12,
      },
    };
  }
);

CommunitiesPage.getLayout = function (page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};
