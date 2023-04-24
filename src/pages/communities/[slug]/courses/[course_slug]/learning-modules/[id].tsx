import { useMemo, useEffect, ReactElement } from "react";
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

export default function LearningModulePage(props: {
  pageProps: {
    community: Community;
    course: Course;
    learningModule: LearningModule;
  };
}) {
  const { community, course, learningModule } = props.pageProps;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentCommunity(community));
    dispatch(setCurrentCourse(course));
    dispatch(setCurrentLearningModule(learningModule));
    dispatch(setColors(community.colors));
    initNavigationMenu()(dispatch);
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (data) => {
    const { query } = data;
    const slug = query.slug as string;
    const courseSlug = query.course_slug as string;
    const learningModuleId = query.id as string;
    const locale = data.locale as string;

    const getCurrentCommunty = store.dispatch(
      fetchCurrentCommunity({
        slug: slug,
        locale,
      })
    );

    const getCurrentCourse = store.dispatch(
      fetchCourse({
        slug: courseSlug,
        locale,
      })
    );

    const getLearningModule = store.dispatch(
      findLearningModule(learningModuleId)
    );

    const results = await Promise.all([
      getCurrentCommunty,
      getCurrentCourse,
      getLearningModule,
    ]);

    const community = results[0].payload;
    const course = results[1].payload;
    const learningModule = results[2].payload;

    return {
      props: {
        ...(await serverSideTranslations(locale)),
        community,
        course,
        learningModule,
      },
    };
  }
);
