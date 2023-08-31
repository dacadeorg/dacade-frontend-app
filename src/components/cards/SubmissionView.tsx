import { useSelector } from "@/hooks/useTypedSelector";
import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "next-i18next";
import UserCard from "@/components/cards/User";
import TranslationBox from "@/components/cards/TranslationBox";
import { ReactElement, useEffect, useState } from "react";
import { Submission, User } from "@/types/bounty";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { getTeamById } from "@/store/services/teams.service";

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
  submission: Submission;
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
export default function SubmissionViewCard({ submission }: SubmissionViewCardProps): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { colors, teamData } = useSelector((state) => ({
    colors: state.ui.colors,
    teamData: state.teams.current,
  }));

  const [members, setMembers] = useState<User[]>([]);

  const language = (submission?.metadata?.language || "en") as DefaultLocale;
  const primaryButtonStyles = {
    borderColor: colors?.textAccent,
    color: colors?.text,
    backgroundColor: colors?.textAccent,
    "--button-color--hover": colors?.text,
    "--button-background-color--hover": colors?.accent,
    "--button-border-color--hover": colors?.accent,
  };

  useEffect(() => {
    const teamId = submission.team_ref ? submission.team_ref.split("/")[1] : "";
    const fetchSubmissionByTeam = async () => {
      if (teamId) await dispatch(getTeamById(teamId));
    };
    fetchSubmissionByTeam();
  }, [dispatch, submission.team_ref]);

  useEffect(() => {
    if (teamData) {
      setMembers(() => [teamData.organizer as User]);
      teamData.members?.forEach(({ user }) => setMembers((prev) => [...prev, user]));
    } else {
      setMembers([submission.user]);
    }
  }, [submission.user, teamData]);
  return (
    <UserCard
      user={submission.user}
      teamMembers={members}
      timestamp={{
        date: submission.created_at,
        text: t("submissions.submitted"),
      }}
      bordered
    >
      <TranslationBox textContainerCssClasses="pb-5" text={submission.text} defaultLocale={language} textCssClasses="text-base md:text-lg leading-normal text-gray-700" />
      <div className="inline-grid space-y-2 md:space-y-5 md:contents space-x-0 md:space-x-2">
        {submission.link && (
          <ArrowButton link={submission.link} target="__blank" customStyle={primaryButtonStyles} variant="outline-primary">
            {t("submissions.link.github")}
          </ArrowButton>
        )}
      </div>
    </UserCard>
  );
}
