import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import Link from "next/link";

interface Props {
  link: string | null;
}

const AchievementLinkField: React.FC<Props> = ({ link }) => {
  const { t } = useTranslation();
  const authUser = useSelector((state) => state.user.get);
  const current = useSelector(
    (state) => state.profile.certificates.current
  );
  const username = useSelector((state) => authUser?.displayName);
  const currentSubmissionId = current?.submission?.id;

  const copy = () => {
    navigator.clipboard.writeText(link as string);
  };

  return (
    <div className="border relative p-2 rounded">
      <p
        className="text-gray-500 line-clamp-1 break-all flex-1 text-sm md:text-base overflow-hidden"
        onClick={copy}
      >
        {link}
      </p>
      <div className="bg-gradient-to-l input-background absolute h-full w-40 top-0 flex justify-end items-center pr-2 right-0">
        <Link href={`/submissions/${currentSubmissionId}`}>
          <button className="p-1 py-0 bg-white border border-blue-600 text-blue-600">
            {t("profile.achievement.open")}
          </button>
        </Link>
      </div>
    </div>
  );
};
