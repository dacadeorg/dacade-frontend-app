import { useSelector } from "@/hooks/useTypedSelector";
import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "next-i18next";
import UserCard from "@/components/cards/User";
import TranslationBox from "@/components/cards/TranslationBox";
import { ReactElement, ReactNode } from "react";

/**
 * Type for the default locale
 * @date 4/3/2023 - 12:38:50 PM
 *
 * @typedef {DefaultLocale}
 */
type DefaultLocale = "en" | "fr";

/**
 *
 * Interface for SubmissionViewCard props
 * @date 4/3/2023 - 12:36:51 PM
 *
 * @interface SubmissionViewCardProps
 * @typedef {SubmissionViewCardProps}
 */
interface SubmissionViewCardProps {
  // TODO: to be updated with ISubmission once community slice is implemented
  submission: {
    user: any;
    created_at: string;
    text: string;
    link: string;
    metadata: {
      language: string;
    };
  };
  children: ReactNode
}

/**
 * Submission view card component
 * @date 4/3/2023 - 12:38:14 PM
 *
 * @export
 * @param {SubmissionViewCardProps} {
  submission = {},
}
 * @returns {ReactElement}
 */
export default function SubmissionViewCard({
  submission,
}: SubmissionViewCardProps): ReactElement {
  const { t } = useTranslation();
  const colors = useSelector((state) => state.ui.colors);

  const language = (submission?.metadata?.language ||
    "en") as DefaultLocale;
  const primaryButtonStyles = {
    borderColor: colors.textAccent,
    color: colors.text,
    backgroundColor: colors.textAccent,
    "--button-color--hover": colors.text,
    "--button-background-color--hover": colors.accent,
    "--button-border-color--hover": colors.accent,
  };


  return (
    <UserCard
      user={submission.user}
      timestamp={{
        date: submission.created_at,
        text: t("submissions.submitted"),
      }}
    >
      <TranslationBox
        textContainerCssClasses="pb-5"
        text={submission.text}
        defaultLocale={language}
        textCssClasses="text-base md:text-lg leading-normal text-gray-700"
      />
      <div className="inline-grid space-y-2 md:space-y-5 md:contents space-x-0 md:space-x-2">
        {submission.link && (
          <ArrowButton
            link={submission.link}
            target="__blank"
            customStyle={primaryButtonStyles}
            variant="outline-primary"
          >
            {t("submissions.link.github")}
          </ArrowButton>
        )}
      </div>
    </UserCard>
  );
}
