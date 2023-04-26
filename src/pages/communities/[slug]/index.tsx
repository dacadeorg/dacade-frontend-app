import { wrapper } from "@/store";
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
import { setCourseList } from "@/store/feature/course.slice";
import { Course } from "@/types/course";
import {
  fetchAllScoreboards,
  setScoreboardList,
} from "@/store/feature/communities/scoreboard.slice";
import { Scoreboard } from "@/types/scoreboard";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { fetchAllCourses } from "@/store/services/course.service";

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
    const getAllCourses = store.dispatch(fetchAllCourses(fetchArgs));
    const getAllScoreboards = store.dispatch(
      fetchAllScoreboards(fetchArgs)
    );

    const results = await Promise.all([
      getCurrentCommunty,
      getAllCourses,
      getAllScoreboards,
    ]);

    const community = results[0].data;
    const courses = results[1].data;
    const scoreboards = results[2].payload;

    return {
      props: {
        ...(await serverSideTranslations(data.locale as string)),
        community,
        courses,
        scoreboards,
      },
    };
  }
);
