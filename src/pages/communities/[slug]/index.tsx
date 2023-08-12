import { Community } from "@/types/community";
import { setColors } from "@/store/feature/ui.slice";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ChallengeCard from "@/components/cards/challenge/Challenge";
import Scoreboard from "@/components/sections/communities/overview/scoreboard/index";
import CommunityWrapper from "@/components/sections/communities/overview/Wrapper";
import CommunityLayout from "@/layouts/Community";
import { ReactElement, useEffect } from "react";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { Challenge, Course } from "@/types/course";
import api from "@/config/api";
import { GetServerSideProps } from "next";
import { store } from "@/store";
import { fetchCurrentCommunity } from "@/store/services/community.service";

export default function Slug(props: {
  pageProps: {
    community: Community;
    challenges: Challenge[];
  };
}): ReactElement {
  const { community, challenges } = props.pageProps;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentCommunity(community));
    dispatch(setColors(community.colors));
    // dispatch(setCourseList(courses));
  }, [community, dispatch]);

  return (
    <CommunityWrapper>
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} data={challenge} community={community} />
      ))}
      <div className="md:hidden">
        <div className="active md:hidden mb-7 scroll-smooth pt-5">
          <div className="font-medium text-.5xl leading-snug">Scoreboard</div>
          <div className="text-sm font-light lg:w-full lg:pr-7 pt-2">
            On the scoreboard, you can see which users have accumulated the most reputation by giving valuable feedback to their peers.
          </div>
        </div>
        <Scoreboard />
      </div>
    </CommunityWrapper>
  );
}

Slug.getLayout = function (page: ReactElement) {
  return <CommunityLayout>{page}</CommunityLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  try {
    const slug = params?.slug as string;

    const [{ data: community }, { data: challenges }] = await Promise.all([
      store.dispatch(fetchCurrentCommunity({ slug, locale })),
      api(locale).server.get<Course[]>(`/communities/${slug}/challenges`),
    ]);

    return {
      props: {
        community,
        challenges,
        ...(await serverSideTranslations(locale as string)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
