import CommunityStats from "@/components/sections/profile/communities/Stats";
import List from "@/components/sections/profile/communities/List";
import { Fragment } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react-markdown/lib/react-markdown";
import ProfileLayout from "@/layouts/ProfileLayout";
import { GetServerSideProps } from "next";
import { wrapper } from "@/store";
import { fetchProfileCommunity } from "@/store/services/profile/profileCommunities.service";
import { fetchUserProfile } from "@/store/services/profile/users.service";

export default function ProfileCommunities() {
  return (
    <Fragment>
      <CommunityStats />
      <List />
    </Fragment>
  );
}

ProfileCommunities.getLayout = function (page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ locale, query }) => {
  try {
    const { slug, username } = query;

    const [{ data }, translations] = await Promise.all([
      store.dispatch(fetchProfileCommunity({ username: username as string, slug: slug as string })),
      store.dispatch(fetchUserProfile((username as string) || "")),
      serverSideTranslations(locale as string),
    ]);

    return {
      props: {
        community: data.community,
        feedbacks: data.feedbacks,
        submissions: data.submissions,
        reputation: data.reputation,
        ...translations,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
});
