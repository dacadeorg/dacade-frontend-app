import { wrapper } from "@/store";
import Section from "@/components/ui/Section";
import { Community } from "@/types/community";
import { setColors } from "@/store/feature/ui.slice";
import {
  fetchCurrentCommunity,
  setCurrentCommunity,
} from "@/store/feature/community.slice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainHeader from "@/components/sections/communities/overview/MainHeader";
import { CoursesOverview } from "@/components/sections/communities/overview/Courses";
import ScoreboardOverview from "@/components/sections/communities/overview/scoreboard";
import CommunityLayout from "@/layouts/Community";
import { ReactElement, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "@/hooks/useTypedDispatch";
import {
  fetchAllCourses,
  setCoursesList,
} from "@/store/feature/course.slice";
import { Course } from "@/types/course";
import {
  fetchAllScoreboards,
  setScoreboardList,
} from "@/store/feature/communities/scoreboard.slice";
import { Scoreboard } from "@/types/scoreboard";

export default function Slug(props: {
  pageProps: {
    community: Community;
    courses: Course[];
    scoreboards: Scoreboard[];
  };
}): ReactElement {
  const { community, courses, scoreboards } = props.pageProps;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(setCurrentCommunity(community));
    dispatch(setColors(community.colors));
    dispatch(setCoursesList(courses));
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

export async function getStaticProps({ res, params, locale }: any) {
  const { slug } = params;

  const headers = {
    "Accept-Language": locale,
  };

  const [community, scoreboards, courses] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/communities/${slug}`,
      { headers }
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/communities/${slug}/scoreboard`,
      { headers }
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/communities/${slug}/courses`,
      { headers }
    ),
  ]).then((responses) =>
    Promise.all(responses.map(async (res) => await res.json()))
  );

  if (community.status === 404) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        community,
        scoreboards,
        courses,
        ...(await serverSideTranslations(locale as string)),
      },
      revalidate: 60,
    };
  }
}

export async function getStaticPaths() {
  const communities: Community[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/communities`
  ).then((res) => res.json());

  const paths: { params: { slug: string }; locale: string }[] = [];
  communities.forEach(({ slug }) => {
    ["bg", "en", "es", "hr"].forEach((locale) => {
      paths.push({
        params: {
          slug,
        },
        locale: locale,
      });
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}
