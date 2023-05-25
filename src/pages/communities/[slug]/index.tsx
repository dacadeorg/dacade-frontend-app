import Section from "@/components/ui/Section";
import { Community } from "@/types/community";
import { setColors } from "@/store/feature/ui.slice";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainHeader from "@/components/sections/communities/overview/MainHeader";
import { CoursesOverview } from "@/components/sections/communities/overview/Courses";
import ScoreboardOverview from "@/components/sections/communities/overview/scoreboard";
import CommunityLayout from "@/layouts/Community";
import { ReactElement, useEffect } from "react";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { Course } from "@/types/course";
import { setScoreboardList } from "@/store/feature/communities/scoreboard.slice";
import { Scoreboard } from "@/types/scoreboard";
import api from "@/config/api";
import { setCourseList } from "@/store/feature/course.slice";
import { GetServerSideProps } from "next";
import { store } from "@/store";
import { fetchCurrentCommunity } from "@/store/services/community.service";

export default function Slug(props: {
  pageProps: {
    community: Community;
    courses: Course[];
    scoreboards: Scoreboard[];
  };
}): ReactElement {
  const { community, courses, scoreboards } = props.pageProps;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentCommunity(community));
    dispatch(setColors(community.colors));
    dispatch(setCourseList(courses));
    dispatch(setScoreboardList(scoreboards));
  }, [community, courses, dispatch, scoreboards]);

  return (
    <div>
      <MainHeader />
      <Section type="default">
        <div className="w-full mx-auto divide-y divide-gray-200 divide-solid">
          <CoursesOverview />
          <ScoreboardOverview />
        </div>
      </Section>
    </div>
  );
}

Slug.getLayout = function (page: ReactElement) {
  return <CommunityLayout>{page}</CommunityLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  try {
    const slug = params?.slug as string;

    const [{ data: community }, { data: scoreboards }, { data: courses }] = await Promise.all([
      store.dispatch(fetchCurrentCommunity({ slug, locale })),
      api(locale).server.get<Scoreboard>(`/communities/${slug}/scoreboard`),
      api(locale).server.get<Course[]>(`/communities/${slug}/courses`),
    ]);

    return {
      props: {
        community,
        scoreboards,
        courses,
        ...(await serverSideTranslations(locale as string)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
