import CommunityStats from "@/components/sections/profile/communities/Stats";
import List from "@/components/sections/profile/communities/List";
import { Fragment, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react-markdown/lib/react-markdown";
import ProfileLayout from "@/layouts/ProfileLayout";
import { GetServerSideProps } from "next";
import { store } from "@/store";
import { fetchProfileCommunity } from "@/store/services/profile/profileCommunities.service";
import { Community } from "@/types/community";
import { Feedback } from "@/types/feedback";
import { Reputation, Submission } from "@/types/bounty";
import { setCurrentProfileCommunity, setProfileCommunityFeedbacks, setProfileCommunityReputation, setProfileCommunitySubmissions } from "@/store/feature/profile/communities.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";

export default function ProfileCommunities(props: {
  pageProps: {
    community: Community;
    feedbacks: Feedback[];
    submissions: Submission[];
    reputation: Reputation;
  };
}) {
  const dispatch = useDispatch();
  const { community, feedbacks, reputation, submissions } = props.pageProps;

  useEffect(() => {
    dispatch(setCurrentProfileCommunity(community));
    dispatch(setProfileCommunityFeedbacks(feedbacks));
    dispatch(setProfileCommunitySubmissions(submissions));
    dispatch(setProfileCommunityReputation(reputation));
  }, [community, dispatch, feedbacks, reputation, submissions]);

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

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const slug = query?.slug;
  const username = query?.username;

  const [{ data }, translations] = await Promise.all([
    store.dispatch(fetchProfileCommunity({ username: (username as string) || "", slug: (slug as string) || "" })),
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
};
