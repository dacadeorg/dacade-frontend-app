import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "@/components/cards/User";
import ArrowButton from "@/components/ui/button/Arrow";
import Reward from "@/components/badges/Reward";
import Tag from "@/components/ui/Tag";
import TranslationBox from "@/components/cards/TranslationBox";

export default function FeedbackCard({ value, preview, last, link }) {
  const [loading, setLoading] = useState(false);
  //   const colors = useSelector((state) => state.ui.colors);
  const primaryButtonStyles = {
    borderColor: colors.textAccent,
    color: colors.text,
    backgroundColor: colors.textAccent,
    "--button-color--hover": colors.text,
    "--button-background-color--hover": colors.accent,
    "--button-border-color--hover": colors.accent,
  };
  const language = value?.metadata?.language || "en";

  return (
    <UserCard
      user={value.user}
      timestamp={{
        date: value.created_at,
        text: "Feedback",
      }}
      link={link}
      bordered={!last}
      badge={value.ranking}
      boxLayout={preview}
    >
      <TranslationBox
        className="pb-3"
        text={value.text}
        defaultLocale={language}
        disabled={preview}
        textCssClasses="text-base md:text-lg leading-normal relative break-words"
        textContainerCssClasses={{ "line-clamp-3": preview }}
      />
      {value.metadata &&
        value.metadata.evaluation &&
        value.metadata.evaluation.points && (
          <div className="flex pt-5 space-x-1">
            {value.metadata.evaluation.reward && (
              <Reward
                type="light-gray"
                reward={value.metadata.evaluation.reward}
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
            {$t("submissions.feedback.link.github")}
          </ArrowButton>
        </div>
      )}
    </UserCard>
  );
}
