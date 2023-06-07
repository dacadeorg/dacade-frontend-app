import React from "react";
import Accordion from "@/components/ui/accordion/Accordion";
import Section from "@/components/sections/communities/_partials/Section";
import LearningCard from "@/components/cards/challenge/_partials/Learning";
import RelatedLearningCard from "@/components/cards/challenge/_partials/RelatedLearning";

interface LearningProps {
  hideTitle?: boolean;
}

const Learning: React.FC<LearningProps> = ({ hideTitle }) => {
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
              <LearningCard />
              <LearningCard />
            </div>
            <div className="flex flex-row gap-3 overflow-hidden">
              <RelatedLearningCard />
              <RelatedLearningCard />
              <RelatedLearningCard />
            </div>
          </>
        }
      />
    </Section>
  );
};

export default Learning;
