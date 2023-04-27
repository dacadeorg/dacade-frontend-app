import {
  useMemo,
  useEffect,
  ReactElement,
  useLayoutEffect,
} from "react";
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
import {
  fetchCourse,
  setCurrentCourse,
} from "@/store/feature/course.slice";
import {
  findLearningModule,
  setCurrentLearningModule,
} from "@/store/feature/learningModules.slice";
import {
  fetchCurrentCommunity,
  setCurrentCommunity,
} from "@/store/feature/community.slice";
import {
  getMetadataDescription,
  getMetadataTitle,
} from "@/utilities/Metadata";
import MaterialSection from "@/components/sections/learning-modules/MaterialSection";
import DefaultLayout from "@/components/layout/Default";
import Header from "@/components/sections/learning-modules/Header";
import { initNavigationMenu } from "@/store/feature/communities/navigation.slice";
import { setColors } from "@/store/feature/ui.slice";
import useNavigation from "@/hooks/useNavigation";

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
export default function LearningModulePage(
  props: LearningModulePageProps
) {
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

  const materials = useMemo(
    () =>
      learningModule?.materials?.filter(
        (material) => material.type !== "ADDITIONAL"
      ) || [],
    [learningModule?.materials]
  );
  const additionalMaterials = useMemo(
    () =>
      learningModule?.materials?.filter(
        (material) => material.type === "ADDITIONAL"
      ) || [],
    [learningModule?.materials]
  );

  const interactiveModules = learningModule?.interactiveModules || [];

  const title = getMetadataTitle(
    learningModule?.title!,
    course?.name!
  );
  const descriptions = getMetadataDescription(
    learningModule?.description!
  );

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
              <MaterialSection
                key={`material-section-${i}`}
                material={material}
              />
            ))}
            <AdditionalMaterialsSection
              materials={additionalMaterials}
            />
            {interactiveModules.length > 0 && (
              <InteractiveModule data={interactiveModules[0]} />
            )}
            <PageNavigation />
          </div>
        </div>
      </Wrapper>
    </>
  );
}

LearningModulePage.getLayout = function (page: ReactElement) {
  return (
    <DefaultLayout footerBackgroundColor={"default"}>
      {page}
    </DefaultLayout>
  );
};

export async function getStaticProps({ res, params, locale }: any) {
  const { slug, course_slug, id } = params;

  const headers = {
    "Accept-Language": "en",
  };
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [community, course, learningModule] = await Promise.all([
    fetch(`${API_URL}/communities/${slug}`, { headers }),
    fetch(`${API_URL}/courses/${course_slug}`, { headers }),
    fetch(`${API_URL}/learning-modules/${id}`, { headers }),
  ]).then((responses) =>
    Promise.all(responses.map(async (res) => await res.json()))
  );

  if (
    course.status === 404 ||
    community.status === 404 ||
    learningModule.status === 404 ||
    Object.entries(learningModule).length === 0 ||
    Object.entries(course).length === 0 ||
    Object.entries(community).length === 0
  ) {
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
}

export async function getStaticPaths() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const communities = await fetch(`${API_URL}/communities`).then(
    (res) => res.json()
  );

  const getPathes = async () => {
    const paths = await Promise.all(
      communities.map(async (community: any) => {
        const courses = await fetch(
          `${API_URL}/communities/${community.slug}/courses`
        ).then((res) => res.json());
        const coursePaths = await Promise.all(
          courses.map(async (course: any) => {
            const modules = await fetch(
              `${API_URL}/courses/${course.slug}/learning-modules`
            )
              .then((res) => res.json())
              .catch((err) => {
                console.log(err);
                return [];
              });

            const modulePaths: any = [];
            // check if module is array type
            if (Array.isArray(modules)) {
              modules.forEach(({ id }) => {
                ["bg", "en", "es", "hr"].forEach((locale) => {
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
