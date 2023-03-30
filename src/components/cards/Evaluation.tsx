import { ReactElement } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
// import UserCard from '@/components/cards/User'
// import TranslationBox from '@/components/cards/TranslationBox'

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
 * @interface EvaluationProps
 * @typedef {EvaluationProps}
 */
interface EvaluationProps {
  evaluation: Evaluation;
  stats?: boolean;
  link?: string;
  buttons?: boolean;
  last?: boolean;
  children: ReactElement;
}
export default function Evaluation({
  evaluation,
  stats = false,
  link = "",
  buttons = false,
  last = false,
  children,
}: EvaluationProps): ReactElement {
  const language = evaluation?.metadata?.language || "en";
  const colors = useSelector((state) => state.ui.colors);
  // TODO: this line will be uncommented once community slice is available
  // const community = useSelector((state) => state.community);
  return (
    <>
      {/* 
        // TODO: this component[EvaluationCard] needs UserCard and TranslationBox which are not ready yet. Once they are ready we can uncomment both UserCard and TranslationBox
        <UserCard
            user={evaluation.evaluator}
            timestamp={{
                date: evaluation.created_at,
                text: $t("submissions.evaluation.evaluated"),
            }}
            link={link}
            bordered={!last}>
            <TranslationBox
                text={evaluation.comment}
                text-css-classes="text-base md:text-lg leading-normal"
                default-locale={language}
            />
            {children}
        </UserCard>
      */}
    </>
  );
}
