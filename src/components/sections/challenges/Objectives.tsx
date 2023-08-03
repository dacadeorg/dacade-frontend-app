import ExpiryDate from "@/components/challenge/ExpiryDate";
import ObjectiveList from "@/components/list/Objectives";
import Section from "@/components/sections/communities/_partials/Section";
import Hint from "@/components/ui/Hint";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

/**
 * Challenge objectives component
 * @date 7/28/2023 - 5:04:54 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Objectives(): ReactElement {
  const { t } = useTranslation();
  const challenge = useSelector((state) => state.challenges.current);
  return (
    <Section title={`${t("communities.overview.challenge.objective.title")}`}>
      <ObjectiveList objectives={challenge?.objectives} />
      {challenge?.expiresAt && <ExpiryDate expiresAt={challenge?.expiresAt} />}
      <Hint className="mb-5">
        <span className="pr-1 font-medium">Hint:</span>
        If you need an idea what to build or are stuck ask on our
        <a className="underline cursor-pointer ml-1" target="_blank" href="https://discord.gg/U38KQHDtHe">
          Dacade Discord server.
        </a>
      </Hint>
    </Section>
  );
}
