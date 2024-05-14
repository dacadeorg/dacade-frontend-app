import React, { useMemo } from "react";
import Section from "@/components/sections/communities/_partials/Section";
import TeamChallengeCard from "@/components/cards/TeamChallenge";
import { useSelector } from "@/hooks/useTypedSelector";

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
 *  * @interface TeamChallengeCard
 */

export default function TeamChallenge(): JSX.Element {
  const challenge = useSelector((state) => state.challenges.current);

  const hackathonChallengeSteps: CardData[] = [
    {
      index: 1,
      title: "Form your team",
      text: "Open Telegram group and find your teammates to complete the challenge with you",
    },
    {
      index: 2,
      title: "Confirm your team",
      text: "Make sure your teammates accept notification to confirm your team",
    },
    {
      index: 3,
      title: "Submit!",
      text: "Once you have completed the challenge, only one person needs to submit it at the end of this page",
    },
  ];
  const teamChallengeSteps: CardData[] = [
    {
      index: 1,
      title: "Form your team",
      text: "Open discord channel #teams and find your teammates to complete the challenge with you",
    },
    {
      index: 2,
      title: "Confirm your team",
      text: "Make sure your teammates accept notification to confirm your team",
    },
    {
      index: 3,
      title: "Submit!",
      text: "Once you have completed the challenge, only one person needs to submit it at the end of this page",
    },
  ];

  const steps: CardData[] = useMemo(() => {
    return challenge?.isHackathon ? hackathonChallengeSteps : teamChallengeSteps;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge?.isTeamChallenge]);

  return (
    <Section title="Team Challenge">
      <div className="text-base font-normal text-slate-700 pt-8 pb-7 md:w-182.5">To complete the team challenge, you need to follow these steps:</div>
      <div className="md:flex flex-row gap-20 md:divide-y-0 divide-y divide-gray-900 divide-dotted space-y-5 md:space-y-0 space-x-0">
        {steps.map((step) => (
          <TeamChallengeCard key={`TeamChallenge-card-data-${step.index}`} index={step.index} title={step.title} text={step.text} />
        ))}
      </div>
    </Section>
  );
}
