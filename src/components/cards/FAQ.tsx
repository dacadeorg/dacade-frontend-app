// import { useSelector } from 'react-redux';
// TODO: to be uncommented when QuestionCard is ready
// import QuestionCard from 'path/to/QuestionCard';
import { useTranslation } from "next-i18next";

const FaqCard: React.FC = () => {
  // TODO: to be uncommented when redux is ready
  //   const course = useSelector((state: RootState) => state.communities.courses.current);
  const { t } = useTranslation();

  return (
    <div className="py-5 md:py-10 w-full bg-gray-50">
      <div className="w-full content-wrapper divide-y divide-2 lg:divide-0 lg:divide-y-0 divide-gray-200 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 lg:min-w-xs text-gray-900 text-2xl md:text-4xl font-medium pb-5 flex-row">
          <div>{t("faq.title")}</div>
          <div className="hidden text-gray-500 text-base font-normal lg:inline-block mt-2 max-w-xs">
            {t("faq.subtitle")}
            <a
              className="hover:text-gray-700 underline"
              href="https://discord.gg/U38KQHDtHe"
              target="_blank"
            >
              {t("faq.discord")}
            </a>
          </div>
        </div>
        {/* TODO: to be uncommented when redux and QuestionCard is ready */}
        {/* {course.faq && (
          <div className="w-full lg:w-1/2 divide-y divide-2 space-y-4 divide-gray-200">
            {course.faq.map((question, i) => (
              <QuestionCard key={i} details={question} />
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FaqCard;
