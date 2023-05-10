import { useMemo, useEffect, ReactElement, useLayoutEffect } from "react";
import PageNavigation from "@/components/sections/courses/PageNavigation";
import InteractiveModule from "@/components/sections/learning-modules/InteractiveModule";
import AdditionalMaterialsSection from "@/components/sections/learning-modules/AdditionalMaterials";
import Wrapper from "@/components/sections/courses/Wrapper";
import Head from "next/head";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Community } from "@/types/community";
import { wrapper } from "@/store";
import { Course, LearningModule } from "@/types/course";
import { setCurrentCourse } from "@/store/feature/course.slice";
import { findLearningModule, setCurrentLearningModule } from "@/store/feature/learningModules.slice";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { getMetadataDescription, getMetadataTitle } from "@/utilities/Metadata";
import MaterialSection from "@/components/sections/learning-modules/MaterialSection";
import DefaultLayout from "@/components/layout/Default";
import Header from "@/components/sections/learning-modules/Header";
import { initNavigationMenu } from "@/store/feature/communities/navigation.slice";
import { setColors } from "@/store/feature/ui.slice";
import useNavigation from "@/hooks/useNavigation";
import api from "@/config/api";
import { GetStaticProps } from "next";
import LOCALES from "@/constants/locales";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { fetchCourse } from "@/store/services/course.service";

/**
 * Learning module page props interfae
 * @date 4/24/2023 - 8:36:15 PM
 *
 * @interface LearningModulePageProps
 * @typedef {LearningModulePageProps}
 */
interface LearningModulePageProps {
  pageProps: {
    community: Community;
    course: Course;
    learningModule: LearningModule;
  };
}

/**
 * Learning module module view page
 * @date 4/24/2023 - 8:35:52 PM
 *
 * @export
 * @param {LearningModulePageProps} props
 * @returns
 */
export default function LearningModulePage(props: LearningModulePageProps) {
  const { community, course, learningModule } = props.pageProps;
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    dispatch(setCurrentCommunity(community));
    dispatch(setCurrentCourse(course));
    dispatch(setCurrentLearningModule(learningModule));
    dispatch(setColors(community.colors));
    initNavigationMenu(navigation.community)(dispatch);
  }, [community, course, dispatch, learningModule]);

  const materials = useMemo(() => learningModule?.materials?.filter((material) => material.type !== "ADDITIONAL") || [], [learningModule?.materials]);
  const additionalMaterials = useMemo(() => learningModule?.materials?.filter((material) => material.type === "ADDITIONAL") || [], [learningModule?.materials]);

  const interactiveModules = learningModule?.interactiveModules || [];

  const title = getMetadataTitle(learningModule?.title!, course?.name!);
  const descriptions = getMetadataDescription(learningModule?.description!);

  return (
    <>
      <Head>
        <title>{title}</title>
        {descriptions.map((meta, i) => (
          <meta key={`learning-module-head-${i}`} {...meta} />
        ))}
      </Head>
      <Wrapper>
        <div className="py-8 flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700">
          <Header />
          <div className="w-full divide-y divide-solid divide-gray-200">
            {materials.map((material, i) => (
              <MaterialSection key={`material-section-${i}`} material={material} />
            ))}
            <AdditionalMaterialsSection materials={additionalMaterials} />
            {interactiveModules.length > 0 && <InteractiveModule data={interactiveModules[0]} />}
            <PageNavigation />
          </div>
        </div>
      </Wrapper>
    </>
  );
}

LearningModulePage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={"default"}>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    const slug = params?.slug as string;
    const course_slug = params?.course_slug as string;
    const id = params?.id as string;

    const [community, course, learningModule] = await Promise.all([
      api(locale).server.get<Community>(`/communities/${slug}`),
      api(locale).server.get<Course>(`/courses/${course_slug}`),
      api(locale).server.get<LearningModule>(`/learning-modules/${id}`),
    ]).then((responses) => responses.map((response) => response.data));

    if (Object.entries(learningModule).length === 0 || Object.entries(course).length === 0 || Object.entries(community).length === 0) {
      return {
        notFound: true,
      };
    } else {
      return {
        props: {
          community,
          course,
          learningModule,
          ...(await serverSideTranslations(locale as string)),
        },
        revalidate: 60,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

interface Path {
  params: {
    slug: string;
    course_slug: string;
    id: string;
  };
  locale: string;
}

export async function getStaticPaths() {
  const { data: communities } = await api().server.get<Community[]>(`/communities`);

  const getPathes = async () => {
    const paths = await Promise.all(
      communities.map(async (community) => {
        const { data: courses } = await api().server.get<Course[]>(`/communities/${community.slug}/courses`);
        const coursePaths = await Promise.all(
          courses.map(async (course) => {
            try {
              const { data: modules } = await api().server.get<Course[]>(`/courses/${course.slug}/learning-modules`);

              const modulePaths: Path[] = [];

              if (Array.isArray(modules)) {
                modules.forEach(({ id }) => {
                  LOCALES.forEach((locale) => {
                    modulePaths.push({
                      params: {
                        slug: community.slug,
                        course_slug: course.slug,
                        id: id,
                      },
                      locale: locale,
                    });
                  });
                });
              }
              return modulePaths;
            } catch (error) {
              return [];
            }
          })
        );
        return coursePaths.flat();
      })
    );
    return paths.flat();
  };

  const paths = await getPathes();

  return {
    paths,
    fallback: "blocking",
  };
}
