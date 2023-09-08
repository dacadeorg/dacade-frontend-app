import { ReactElement, useEffect, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import ProfileLayout from "@/layouts/ProfileLayout";
import { userFetchReferrals } from "@/store/services/referrals.service";

import Referral from "@/components/cards/profile/Referral";
import EmptyState from "@/components/ui/EmptyState";
import InfiniteScroll from "react-infinite-scroll-component";
import AuthObserver from "@/contexts/AuthObserver";

/**
 * Refferrals component for user profile
 *
 * @returns {ReactElement}
 */

export default function UserReferrals(): ReactElement {
  const { t } = useTranslation();
  const [showButton, setShowButton] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, referrals } = useSelector((state) => ({ user: state.user.data, referrals: state.userReferrals.userReferralList }));
  const dispatch = useDispatch();
  const showLoadMore = useMemo(() => showButton && referrals?.length >= 30, [referrals?.length, showButton]);

  useEffect(() => {
    dispatch(userFetchReferrals({}));
  }, [dispatch, user?.referrals]);

  const nextPage = async () => {
    if (loading || !showButton) return;
    setLoading(true);
    const referralId = referrals[referrals.length - 1]?.id || null;
    const list = (await dispatch(userFetchReferrals({ startAfter: referralId || null }))).data;
    setPage(page + 1);
    setLoading(false);

    if (!list?.payload.length) {
      setShowButton(false);
      return;
    }
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
