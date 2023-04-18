import Section from '@/components/sections/communities/_partials/Section';
import Header from '@/components/sections/communities/_partials/Header';
import ObjectiveList from '@/components/list/Objectives';
import { useSelector } from '@/hooks/useTypedSelector';
import { useTranslation } from 'next-i18next';

/**
 * Learning module header component
 * @date 4/18/2023 - 5:05:14 PM
 *
 * @returns {*}
 */
const LearningModuleHeader = () => {
  const course = useSelector((state) => state.courses.current);
  const learningModule = useSelector((state) => state.learningModules.current);
  const { t } = useTranslation()

  return (
    <div>
      <Header
        hideTitleOnMobile={true}
        title={course?.name}
        subtitle={learningModule?.title}
        description={learningModule?.description}
      />
      <Section
        title={`${t('communities.overview.objective.title')}`}
        subtitle={`${t('communities.chapter.objective.subtitle')}:`}
        hide-subtitle-on-mobile
      >
        <ObjectiveList objectives={learningModule?.objectives} />
      </Section>
    </div>
  );
};

export default LearningModuleHeader;
