import { wrapper } from "@/store";
import { fetchCurrentCommunity } from "@/store/feature/community.slice";
import { setColors } from "@/store/feature/ui.slice";
import { Community } from "@/types/community";
import MainHeader from "@/components/sections/communities/overview/MainHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HomeLayout from "@/layouts/Home";
import { ReactElement, useEffect } from "react";
import CommunityLayout from "@/layouts/Community";
import { useDispatch } from "@/hooks/useTypedDispatch";

/**
 * This page is here to mock the redirect that happens when you click on one of the community list
 * @date 4/6/2023 - 12:22:05 PM
 *
 * @export
 */
export default function Slug(props: {
  pageProps: { community: Community };
}) {
  const { community } = props.pageProps;

  return (
    <div>{community && <MainHeader community={community} />}</div>
  );
}

Slug.getLayout = (page: ReactElement) => {
  return <CommunityLayout>{page}</CommunityLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (data) => {
    const { query } = data;
    const slug = query?.slug;

    const fetchArgs = {
      slug: slug as string,
      locale: data.locale as string,
    };

    const getCurrentCommunty = store.dispatch(
      fetchCurrentCommunity(fetchArgs)
    );

    const results = await Promise.all([getCurrentCommunty]);

    const community = results[0].payload as Community;

    await store.dispatch(setColors(community.colors));

    return {
      props: {
        ...(await serverSideTranslations(data.locale as string)),
        community,
      },
    };
  }
);
