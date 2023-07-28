import ObjectiveList from "@/components/list/Objectives";
import Section from "@/components/sections/communities/_partials/Section";
import { useSelector } from "@/hooks/useTypedSelector";

export default function ChallengeObjectives() {
  const challenge = useSelector((state) => state.challenges.current);
  return (
    <Section title="Challenge Objectives">
      <ObjectiveList objectives={challenge?.objectives} />
    </Section>
  );
}
