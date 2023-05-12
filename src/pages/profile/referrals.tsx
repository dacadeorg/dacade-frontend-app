import { ReactElement, useEffect, useMemo, useState } from "react";
import Referral from "@/components/cards/profile/ProfileReferral";
import EmptyState from "@/components/ui/EmptyState";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { Referral as Referrals } from "@/types/community";
import { userFetchReferrals } from "@/store/feature/user/referrals.slice";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import DefaultLayout from "@/components/layout/Default";

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
  const referrals = useSelector((state) => state.referrals.list);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const showLoadMore = useMemo(() => showButton && referrals?.length >= 30, [referrals?.length, showButton]);
  useEffect(() => {
    dispatch(userFetchReferrals({}));
  }, [dispatch, user?.referrals]);

  const nextPage = async () => {
    if (loading || !showButton) {
      return;
    }
    setLoading(true);
    const referralId = referrals[referrals.length - 1]?.id || null;
    const list = await dispatch(userFetchReferrals({ startAfter: referralId || null }));
    setPage(page + 1);
    setLoading(false);

    if (!list?.payload.length) {
      setShowButton(false);
      return;
    }
  };

  return (
    <div className="lg:w-9/12 xl:w-2/3">
      {referrals && referrals.length ? (
        <div className="w-full relative">
          <div className="w-full flex flex-col rounded-3xl border border-solid border-gray-200 divide-y divide-solid divide-gray-200 overflow-hidden">
            <InfiniteScroll
              dataLength={referrals.length}
              next={nextPage}
              hasMore={showLoadMore}
              // loader is required for InfiniteScroll to work
              loader={<></>}
            >
              {referrals.map((referral: Referrals, i: number) => (
                <Referral key={i} referral={referral} />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      ) : (
        <EmptyState title={t("referrals.empty-state.title")} subtitle={t("referrals.empty-state.subtitle")} />
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => i18Translate(locale as string);

UserReferrals.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};