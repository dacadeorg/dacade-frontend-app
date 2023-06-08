import React from "react";
import Accordion from "@/components/ui/accordion/Accordion";
import Section from "@/components/sections/communities/_partials/Section";
import LearningCard from "@/components/cards/challenge/_partials/Learning";
import RelatedLearningCard from "@/components/cards/challenge/_partials/RelatedLearning";

interface LearningProps {
  hideTitle?: boolean;
}

interface CardData {
  id: number;
  title: string;
}

const Learning: React.FC<LearningProps> = ({ hideTitle }) => {
  const learningCardData: CardData[] = [
    { id: 1, title: "Learning Card 1" },
    { id: 2, title: "Learning Card 2" },
  ];

  const relatedLearningCardData: CardData[] = [
    { id: 1, title: "Related Learning Card 1" },
    { id: 2, title: "Related Learning Card 2" },
    { id: 3, title: "Related Learning Card 3" },
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
                <LearningCard key={card.id} title={card.title} />
              ))}
            </div>
            <div className="flex flex-row gap-3 overflow-hidden">
              {relatedLearningCardData.map((card) => (
                <RelatedLearningCard key={card.id} title={card.title} />
              ))}
            </div>
          </>
        }
      />
    </Section>
  );
};

export default Learning;
