import React from "react";
import Accordion from "@/components/ui/accordion/Accordion";
import Section from "@/components/sections/communities/_partials/Section";
import LearningCard from "@/components/cards/challenge/_partials/Learning";
import RelatedLearningCard from "@/components/cards/challenge/_partials/RelatedLearning";
import { Course, LearningModule } from "@/types/course";
import { Community } from "@/types/community";

/**
 * Data structure for a card.
 */
interface CardData {
  id: number;
  title: string;
  description: string;
}

/**
 * Learning component.
 *
 * @returns {JSX.Element} The Learning component JSX element.
 */
export default function Learning({ courses, learningModules, community }: { courses: Course[], learningModules: LearningModule[], community: Community }): JSX.Element {

  return (
    <Section>
      <Accordion
        title="Learn"
        content={
          <>
            <div className="text-base font-normal text-slate-700 pt-8 pb-7 md:w-99">
              The following learning materials will equip you with the technical expertise required to successfully address the challenge.
            </div>
            <div className="md:grid grid-cols-2 gap-3">
              {courses?.map((course) => (
                <LearningCard
                  key={`learning-card-data-${course.id}`}
                  title={course.name}
                  description={course.description}
                  link={`/communities/${community.slug}/courses/${course.slug}`}
                />
              ))}
            </div>
            <div className="md:grid grid-cols-3 gap-3">
              {learningModules?.map((learning) => (
                <RelatedLearningCard
                  key={`related-learning-card-${learning.id}`}
                  title={learning.title}
                  description={learning.description}
                />
              ))}
            </div>
          </>
        }
      />
    </Section>
  );
}
