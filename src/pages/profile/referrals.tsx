import { ReactElement, useEffect, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import ProfileLayout from "@/layouts/ProfileLayout";
import { userFetchReferrals } from "@/store/services/referrals.service";

import Referral from "@/components/cards/profile/Referral";
import EmptyState from "@/components/ui/EmptyState";
import InfiniteScroll from "react-infinite-scroll-component";
import AuthObserver from "@/contexts/AuthObserver";
import { User } from "@/types/bounty";
import { Referral as ReferralType } from "@/types/community";
import { IRootState } from "@/store";
import Loader from "@/components/ui/button/Loader";

/**
 * interface for UserReferrals multiSelector
 * @date 9/13/2023 - 9:27:17 AM
 *
 * @interface UserReferralsMultiSelector
 * @typedef {UserReferralsMultiSelector}
 */
interface UserReferralsMultiSelector {
  user: User | null;
  referrals: ReferralType[];
  hasMore: boolean;
}

/**
 * Refferrals component for user profile
 *
 * @returns {ReactElement}
 */

export default function UserReferrals(): ReactElement {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, referrals, hasMore } = useMultiSelector<unknown, UserReferralsMultiSelector>({
    user: (state: IRootState) => state.user.data,
    referrals: (state: IRootState) => state.userReferrals.userReferralList,
    hasMore: (state: IRootState) => state.userReferrals.hasMore,
  });
  const dispatch = useDispatch();
  const showLoadMore = useMemo(() => hasMore && referrals?.length >= 10, [referrals?.length, hasMore]);
  useEffect(() => {
    const fetchReferrals = async () => {
      await dispatch(userFetchReferrals());
    };
    fetchReferrals();
  }, [dispatch, user?.referrals]);

  const nextPage = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const referralId = referrals[referrals.length - 1]?.id || null;
    await dispatch(userFetchReferrals({ startAfter: referralId || null }));
    setPage(page + 1);
    setLoading(false);
  };

  return (
    <div className="w-full">
      {referrals.length ? (
        <div className="relative w-full">
          <InfiniteScroll
            className="flex flex-col w-full overflow-hidden border border-gray-200 border-solid divide-y divide-gray-200 rounded-3xl divide-solid"
            dataLength={referrals.length}
            next={nextPage}
            hasMore={showLoadMore}
            // loader is required for InfiniteScroll to work
            loader={<></>}
          >
            {referrals.map((referral, i) => (
              <Referral key={`user-referral-${i}`} referral={referral} />
            ))}
          </InfiniteScroll>
          {loading && <Loader loading={loading} className="sm:absolute sm:left-6 sm:-bottom-7.5" onClick={() => nextPage()} />}
        </div>
      ) : (
        <EmptyState title={t("referrals.empty-state.title")} subtitle={t("referrals.empty-state.subtitle")} />
      )}
    </div>
  );
}

UserReferrals.getLayout = function (page: ReactElement) {
  return (
    <AuthObserver>
      <ProfileLayout>{page}</ProfileLayout>
    </AuthObserver>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { ...(await i18Translate(locale as string)) } });
