import React from "react";
import Section from "@/components/sections/communities/_partials/Section";
import TeamChallengeCard from "@/components/cards/TeamChallenge";

/**
 * Data structure for a card.
 */
interface CardData {
  index: number;
  title: string;
  text: string;
}

/**
 * TeamChallenge component.
 *
 * @returns {JSX.Element} The TeamChallenge component JSX element.
 */
export default function TeamChallenge(): JSX.Element {
  const TeamChallengeData: CardData[] = [
    {
      index: 1,
      title: "Form your team",
      text:
        "Open discord channel #teams and find your teammates to complete the challenge with you",
    },
    {
      index: 2,
      title: "Confirm your team",
      text:
        "Make sure your teammates accept notification to confirm your team",
    },
    {
        index: 3,
        title: "Submit!",
        text:
          "Once you have completed the challenge, only person needs to submit it at the end of this page",
      },
  ];


  return (
    <Section title="Team Challenge">
            <div className="text-base font-normal text-slate-700 pt-8 pb-7 md:w-99">
            To complete the team challenge, you need to follow these steps:
            </div>
            <div className="md:flex flex-row gap-20">
              {TeamChallengeData.map((card) => (
                <TeamChallengeCard
                  key={`TeamChallenge-card-data-${card.index}`}
                  index={card.index}
                  title={card.title}
                  text={card.text}
                />
              ))}
            </div>
       
    </Section>
  );
}

