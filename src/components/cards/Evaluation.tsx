import { ReactElement } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import UserCard from "@/components/cards/User";
import TranslationBox from "@/components/cards/TranslationBox";
import { useTranslation } from "next-i18next";

/**
 * Evaluation interface
 * @date 3/30/2023 - 11:54:04 AM
 *
 * @interface Evaluation
 * @typedef {Evaluation}
 */
interface Evaluation {
  evaluator: string;
  created_at: string;
  comment: string;
  metadata: {
    language: string;
  };
}

/**
 * Interface for evaluation component props
 * @date 3/30/2023 - 9:37:00 AM
 *
 * @interface EvaluationCardProps
 * @typedef {EvaluationCardProps}
 */
interface EvaluationCardProps {
  evaluation: Evaluation;
  link?: string;
  last?: boolean;
  children: ReactElement;
}
export default function EvaluationCard({ evaluation, link = "", last, children }: EvaluationCardProps): ReactElement {
  const language = evaluation?.metadata?.language || "en";
  const colors = useSelector((state) => state.ui.colors);
  const { t } = useTranslation();
  // TODO: this line will be uncommented once community slice is available
  // const community = useSelector((state) => state.community);
  return (
    <>
      <UserCard
        user={evaluation.evaluator}
        timestamp={{
          date: evaluation.created_at,
          text: t("submissions.evaluation.evaluated"),
        }}
        link={link}
        bordered={!last}
        boxLayout={true}
      >
        <TranslationBox text={evaluation.comment} textCssClasses="text-base md:text-lg leading-normal" defaultLocale={"en"} disabled={false} textContainerCssClasses="" />
        {children}
      </UserCard>
    </>
  );
}
