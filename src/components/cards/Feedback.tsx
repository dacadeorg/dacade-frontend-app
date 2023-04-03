import { ReactElement, useTransition } from "react";
import UserCard from "@/components/cards/User";
import ArrowButton from "@/components/ui/button/Arrow";
import RewardBadge from "@/components/badges/RewardBadge";
import Tag from "@/components/ui/Tag";
import TranslationBox from "@/components/cards/TranslationBox";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

/**
 * Props for the feedback card
 * @date 4/3/2023 - 12:28:08 PM
 *
 * @interface Props
 * @typedef {Props}
 */
interface FeedbackProps {
  value: {
    user: string;
    created_at: string;
    ranking: number;
    text: string;
    metadata?: {
      evaluation?: {
        reward: string;
        points: number;
      };
      language: string;
    };
    link?: string;
  };
  preview?: boolean;
  buttons?: boolean;
  last?: boolean;
  link?: string;
}

/**
 * Function that returns feedback card
 * @date 4/3/2023 - 12:28:38 PM
 *
 * @export
 * @param {FeedbackProps} {
  value,
  preview = false,
  buttons = false,
  last = false,
  link = "",
}
 * @returns {ReactElement}
 */
export default function FeedbackCard({
  value,
  preview = false,
  buttons = false,
  last = false,
  link = "",
}: FeedbackProps): ReactElement {
  const { t } = useTranslation();
  const language = value?.metadata?.language || "en";

  // TODO: Remove 'any' when the postman file comes
  const colors = useSelector((state: any) => state.ui.colors);

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
      user={value.user}
      timestamp={{ date: value.created_at, text: "Feedback" }}
      link={link}
      bordered={!last}
      badge={`${value.ranking}`}
      boxLayout={preview}
    >
      <TranslationBox
        text={value.text}
        defaultLocale={language}
        disabled={preview}
        textCssClasses="text-base md:text-lg leading-normal relative break-words"
        textContainerCssClasses={{ "line-clamp-3 pb-3": preview }}
      />
      {value.metadata &&
        value.metadata.evaluation &&
        value.metadata.evaluation.points && (
          <div className="pt-5 flex space-x-1">
            {value.metadata.evaluation.reward && (
              <RewardBadge
                type="light-gray"
                reward={{ token: value.metadata.evaluation.reward }}
              />
            )}
            <Tag
              value={`${value.metadata.evaluation.points} REP`}
              className="text-sm font-bold"
              type="light-gray"
            />
          </div>
        )}
      {!preview && value.link && (
        <div className="pt-6">
          <ArrowButton
            link={value.link}
            target="__blank"
            customStyle={primaryButtonStyles}
          >
            {t("submissions.feedback.link.github")}
          </ArrowButton>
        </div>
      )}
    </UserCard>
  );
}
