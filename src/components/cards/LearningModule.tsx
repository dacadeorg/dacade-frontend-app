import { Fragment, useEffect, useState } from "react";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Tag from "../ui/Tag";
import { DurationCard } from "../ui/Duration";
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
  const [level, setLevel] = useState("");
  const { t } = useTranslation()
  const { challenge, community, colors } = useMultiSelector<any, any>({
    challenge: (state: IRootState) => state.challenges.current,
    community: (state: IRootState) => state.communities.current,
    colors: (state: IRootState) => state.ui.colors
  })

  useEffect(() => {
    if (!challenge?.level) return
    if (challenge.level === 0 || challenge.level === 1) return setLevel("course.challenge.level-0");
    return setLevel("course.challenge.level-2");
  }, [challenge?.level]);

  const courses = data?.courses.map(course => ({ name: course.name, slug: course.slug }))

  return (
    <div className="flex flex-col content-start w-full p-8 rounded-3xl group text-gray-700 border-solid border border-gray-200 gap-8">
      <div className="flex text-xs items-center justify-between">
        <div className="gap-2 flex items-center">
          <div className="h-4.5 w-4.5 rounded-sm" style={{ backgroundColor: colors?.primary }} />
          <span className="uppercase">{t("communities.card.module")}</span>
        </div>
        <div className="gap-2 flex items-center">
          <Tag className="uppercase">{t(level)}</Tag>
          <DurationCard value={data.duration} type="bordered" />
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
            Start now
          </ArrowButton>
        </Link>
      </div>
    </div>
  );
};

