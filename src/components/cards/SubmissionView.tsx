// import { useSelector } from 'react-redux';
import { useSelector } from "@/hooks/useTypedSelector";
import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "next-i18next";
// TODO: to be uncommented when UserCard is ready
// import UserCard from '@/components/cards/User';
// TODO: to be uncommented when TranslationBox is ready
// import TranslationBox from '~/components/cards/TranslationBox';

interface SubmissionViewCardProps {
  submission?: {
    user?: any;
    created_at?: string;
    text?: string;
    link?: string;
    metadata?: {
      language?: string;
    };
  };
}

const SubmissionViewCard: React.FC<SubmissionViewCardProps> = ({
  submission = {},
}) => {
  const { t } = useTranslation();
  const colors = useSelector((state) => state.ui.colors);
  // TODO: to be uncommented when redux is ready
  //   const community = useSelector((state: any) => state.communities.current);

  const badgeButtonStyles = {
    backgroundColor: colors.textAccent,
    color: colors.text,
  };

  const language = submission?.metadata?.language || "en";

  const primaryButtonStyles = {
    borderColor: colors.textAccent,
    color: colors.text,
    backgroundColor: colors.textAccent,
    "--button-color--hover": colors.text,
    "--button-background-color--hover": colors.accent,
    "--button-border-color--hover": colors.accent,
  };
  // TODO: to be uncommented when UserCard and TranslationBox are ready
  // <UserCard
  //   user={submission.user}
  //   timestamp={{
  //     date: submission.created_at,
  //     text: t("submissions.submitted"),
  //   }}
  // >
  //   <TranslationBox
  //     className="pb-5"
  //     text={submission.text}
  //     defaultLocale={language}
  //     textCssClasses="text-base md:text-lg leading-normal text-gray-700"
  //   />
  return (
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
  );

  //</UserCard>
};

export default SubmissionViewCard;
