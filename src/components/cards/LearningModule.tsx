import { Fragment, useMemo } from "react";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Tag from "../ui/Tag";
import { DurationBadge } from "@/components/badges/Duration";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { IRootState } from "@/store";
import { LearningModule } from "@/types/course";

/**
 * Props for the RelatedLearning component.
 */

/**
 * Component that displays related learning material with a title, description, and "Start now" button.
 */
export function LearningModuleCard({ data }: { data: LearningModule }): JSX.Element {
  const { t } = useTranslation()
  const { challenge, community, colors } = useMultiSelector<any, any>({
    challenge: (state: IRootState) => state.challenges.current,
    community: (state: IRootState) => state.communities.current,
    colors: (state: IRootState) => state.ui.colors
  })

  const level = useMemo(() => {
    const value = data?.level;
    return t((value === 0 || value === 1) ? "course.challenge.level-0" : "course.challenge.level-2");
  }, [data?.level]);

  const courses = data?.courses.map(course => ({ name: course.name, slug: course.slug }))

  return (
    <div className="flex flex-col content-start w-full p-8 rounded-3xl group text-gray-700 border-solid border border-gray-200 gap-8">
      <div className="flex flex-wrap gap-2 text-xs items-center justify-between">
        <div className="gap-2 flex items-center">
          <div className="h-4.5 w-4.5 rounded-sm" style={{ backgroundColor: colors?.primary }} />
          <span className="uppercase font-semibold">{t("communities.card.module")}</span>
        </div>
        <div className="gap-2 flex items-center">
          {data?.level && <Tag className="uppercase">{level}</Tag>}
          <DurationBadge value={data.duration} type="bordered" />
        </div>
      </div>

      <div className="flex-grow flex flex-col gap-6">
        <div className="text-base font-medium leading-normal text-gray-900">{data.title}</div>
        <div className="text-sm font-normal text-gray-700 max-w-xxs">{data.description}</div>
      </div>

      {courses.length ?
        <p className="font-medium text-gray text-tertiary text-sm">
          {t('learning-module.course.other.appearances')}
          {courses.map((course, index) =>
            <Fragment key={`related-course-${index}`}>
              <Link
                key={`other-appearance-course-${index}`}
                href={`/communities/${community.slug}/courses/${course?.slug}`}
                className="hover:underline ml-1">{course.name}
              </Link>
              {index !== courses.length - 1 && ","}
            </Fragment>
          )}
        </p>
        :
        <></>}

      <div className="w-full mb-0 justify-self-end">
        <Link href={`/communities/${community.slug}/challenges/${challenge?.id}/learning-modules/${data.id}`}>
          <ArrowButton communityStyles={true} variant="outline-primary">
            {t("communities.overview.challenge.learning.start")}
          </ArrowButton>
        </Link>
      </div>
    </div>
  );
};

