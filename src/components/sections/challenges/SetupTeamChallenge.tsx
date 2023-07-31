import Section from "@/components/sections/communities/_partials/Section";
import FormTeamCard from "@/components/cards/challenge/_partials/FormTeam";
import SubmissionTeamCard from "@/components/cards/SubmissionTeam";

/**
 * SetupTeamChallenge component.
 *
 * @returns {JSX.Element} The SetupTeamChallenge component JSX element.
 */
export default function SetupTeamChallenge(): JSX.Element {
  return (
    <Section title="Submission">
      <div className="text-base font-normal text-slate-700 pt-8 pb-7 md:w-99">To complete the team challenge, you need to follow these steps:</div>
      <div className="md:flex flex-row gap-5">
        <FormTeamCard index={1} title="Form your team now" description="Open discord channel #teams and find your teammates to complete the challenge with you." />
        <SubmissionTeamCard index={2} title="Submit your team" text="The maximum team members for this challenge is 3 people" />
      </div>
    </Section>
  );
}
