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
import { ReactElement, useLayoutEffect } from "react";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { setCoursesList } from "@/store/feature/course.slice";
import { Course } from "@/types/course";
import { setScoreboardList } from "@/store/feature/communities/scoreboard.slice";
import { Scoreboard } from "@/types/scoreboard";
import api from "@/config/api";
import { GetStaticProps } from "next";

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

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
}) => {
  try {
    const slug = params?.slug as string;

    const [community, scoreboards, courses] = await Promise.all([
      api(locale).server.get<Community>(`/communities/${slug}`),
      api(locale).server.get<Scoreboard>(
        `/communities/${slug}/scoreboard`
      ),
      api(locale).server.get<Course[]>(
        `/communities/${slug}/courses`
      ),
    ]).then((responses) =>
      responses.map((response) => response.data)
    );
    //
    return {
      props: {
        community,
        scoreboards,
        courses,
        ...(await serverSideTranslations(locale as string)),
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export async function getStaticPaths() {
  const communities: Community[] = await api()
    .server.get<Community[]>(`/communities`)
    .then((res) => res.data);

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
