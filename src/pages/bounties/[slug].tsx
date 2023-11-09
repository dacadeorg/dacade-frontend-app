import { ReactElement, useCallback, useEffect, useMemo } from "react";
import { getMetadataTitle } from "@/utilities/Metadata";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import Navigation from "@/components/sections/bounties/Navigation";
import BountyList from "@/components/list/Bounty";
import Head from "next/head";
import DefaultLayout from "@/components/layout/Default";
import i18Translate from "@/utilities/I18Translate";
import { fetchAllBounties } from "@/store/services/bounties.service";
import { findBountiesBySlug } from "@/store/feature/bouties.slice";
import { Bounty } from "@/types/bounty";
import { Referral } from "@/types/community";
import { IRootState } from "@/store";

/**
 * interface for BountiesPage multiSelector
 * @date 9/13/2023 - 9:25:01 AM
 *
 * @interface BountiesPageMultiSelector
 * @typedef {BountiesPageMultiSelector}
 */
interface BountiesPageMultiSelector {
  bountiesFiltered: Bounty[];
  referralsFiltered: Referral[];
}

/**
 * Bounties by slug page
 * @date 5/11/2023 - 9:43:21 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function BountiesPage(): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchBounties = useCallback(async () => {
    dispatch(fetchAllBounties());
    dispatch(findBountiesBySlug(router.query.slug as string));
  }, [dispatch, router.query.slug]);

  useEffect(() => {
    fetchBounties();
  }, [fetchBounties]);

  const { bountiesFiltered, referralsFiltered } = useMultiSelector<unknown, BountiesPageMultiSelector>({
    bountiesFiltered: (state: IRootState) => state.bounties.filteredBountyList,
    referralsFiltered: (state: IRootState) => state.referrals.filteredList,
  });

  const title = useMemo(() => getMetadataTitle(router.query.slug as string, t("nav.bounties")), [router.query.slug, t]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex justify-center content-wrapper">
        <div className="hidden lg:block w-1/4 mt-28 py-3 pr-10 lg:py-14">
          <Navigation />
        </div>
        <div className="flex-col w-full">
          <h1 className="text-4xl sm:text-5xl pt-10 md:pt-20 pb-10">{t("nav.bounties")}</h1>
          <BountyList bounties={bountiesFiltered.filter((bounty) => bounty.slug === router.query.slug)} referrals={referralsFiltered} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({ props: { ...(await i18Translate(locale as string)) } });

BountiesPage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};
