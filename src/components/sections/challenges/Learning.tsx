import React from "react";
import Accordion from "@/components/ui/accordion/Accordion";
import Section from "@/components/sections/communities/_partials/Section";
import LearningCard from "@/components/cards/challenge/_partials/Learning";
import RelatedLearningCard from "@/components/cards/challenge/_partials/RelatedLearning";

/**
 * Data structure for a card.
 */
interface CardData {
  id: number;
  title: string;
  description: string;
}

/**
 * Props for the Learning component.
 */
interface LearningProps {
  title: string;
}

/**
 * Learning component.
 *
 * @param {LearningProps} props - The props for the Learning component.
 * @returns {JSX.Element} The Learning component JSX element.
 */
export default function Learning({ title }: LearningProps): JSX.Element {
  const learningCardData: CardData[] = [
    {
      id: 1,
      title: "Celo Blockchain 101",
      description:
        "In this course, you will learn the most important blockchain concepts that you will need to navigate the Celo ecosystem.",
    },
    {
      id: 2,
      title: "Celo Blockchain 102",
      description:
        "In this course, you will learn the most important blockchain concepts that you will need to navigate the Celo ecosystem.",
    },
  ];

  const relatedLearningCardData: CardData[] = [
    {
      id: 1,
      title: "Related learning material",
      description:
        "In this course, you will learn the most important blockchain concepts that you will need to navigate the Celo ecosystem.",
    },
    {
      id: 2,
      title: "Related learning material",
      description:
        "In this course, you will learn the most important blockchain concepts that you will need to navigate the Celo ecosystem.",
    },
    {
      id: 3,
      title: "Related learning material",
      description:
        "In this course, you will learn the most important blockchain concepts that you will need to navigate the Celo ecosystem.",
    },
  ];

  return (
    <Section>
      <Accordion
        title="Learn"
        content={
          <>
            <div className="text-base font-normal text-slate-700 pt-8 pb-7 md:w-99">
              The following learning materials will equip you with the technical expertise required to successfully address the challenge.
            </div>
            <div className="md:flex flex-row gap-3">
              {learningCardData.map((card) => (
                <LearningCard
                  key={`learning-card-data-${card.id}`}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
            <div className="flex flex-row gap-3 overflow-hidden">
              {relatedLearningCardData.map((card) => (
                <RelatedLearningCard
                  key={`related-learning-card-${card.id}`}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </>
        }
      />
    </Section>
  );
}
