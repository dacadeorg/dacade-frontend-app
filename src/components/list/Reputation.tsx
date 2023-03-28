import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

// TODO: uncomment this import once reputation card is implemented and redux intergration
// TODO: import { useSelector } from 'react-redux'
// TODO: import ReputationCard from '@/components/cards/Reputation'

export default function ReputationList(): ReactElement {
//  TODO: const reputations = useSelector(state => state.user.reputations.list)
  const { t } = useTranslation()

  return (
    <div className="text-left">
      <span className="uppercase block text-xs font-semibold text-gray-500 leading-relaxed">
        {t('nav.reputation')}
      </span>
      <div className="space-y-4 mt-2">
        {/* 
           TODO: uncomment this ReputationCard rendering once the reputation is ready
            {reputations.map(reputation => (
                <ReputationCard key={reputation.id} details={reputation} />
            ))} 

        */}
      </div>
    </div>
  )
}