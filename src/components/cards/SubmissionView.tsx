// import { useSelector } from 'react-redux';
import { useSelector } from "@/hooks/useTypedSelector";
import ArrowButton from "@/components/ui/button/Arrow";
// import UserCard from '@/components/cards/User';
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
  const colors = useSelector((state: any) => state.ui.colors);
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

  const outlineButtonStyles = {
    borderColor: colors.textAccent,
    color: colors.textAccent,
    "--button-color--hover": colors.text,
    "--button-background-color--hover": colors.textAccent,
    "--button-border-color--hover": colors.textAccent,
  };

  return (
    <UserCard
      user={submission.user}
      timestamp={{
        date: submission.created_at,
        text: "submissions.submitted",
      }}
    >
      <TranslationBox
        className="pb-5"
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
            type="outline-primary"
          >
            {"submissions.link.github"}
          </ArrowButton>
        )}
      </div>
    </UserCard>
  );
};

export default SubmissionViewCard;
