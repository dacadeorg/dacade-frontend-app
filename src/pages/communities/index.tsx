import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { getMetadataTitle } from "@/utilities/Metadata";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { ReactElement } from "react";
import CommunityListCard from "@/components/cards/community/List";
import Head from "next/head";
import { wrapper } from "@/store";
import { Community } from "@/types/community";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { fetchAllCommunities } from "@/store/services/community.service";
import DefaultLayout from "@/components/layout/Default";

/**
 * Interface for community view page
 * @date 4/19/2023 - 7:53:52 PM
 *
 * @interface CommunityPageprops
 * @typedef {CommunityPageprops}
 */
interface CommunityPageProps {
  pageProps: { communities: Community[] };
}

/**
 * Community view page
 * @date 4/19/2023 - 7:54:15 PM
 *
 * @export
 * @param {CommunityPageprops} props
 * @returns
 */
export default function CommunitiesPage(props: CommunityPageProps) {
  const { t } = useTranslation();
  const communities = props.pageProps.communities;
  const title: string = getMetadataTitle(t("nav.communities"));
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col justify-center content-wrapper">
        <h1 className="pt-10 pb-10 text-4xl sm:text-5xl md:pt-20">{t("nav.communities")}</h1>
        <div className="w-full row">
          {communities?.map((community, index) => (
            <div key={`generated-key-${index}`} onClick={() => dispatch(setCurrentCommunity(community))} className="flex flex-grow min-w-full pb-4">
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
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (data) => {
  const { locale } = data;
  const results = await store.dispatch(fetchAllCommunities(locale as string));

  return {
    props: {
      communities: results?.data,
      ...(await serverSideTranslations(locale as string)),
    },
  };
});

CommunitiesPage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};
