import { ReactElement, useCallback, useEffect } from "react";
import Navigation from "@/components/sections/bounties/Navigation";
import BountyList from "@/components/list/Bounty";
import { useTranslation } from "react-i18next";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { Bounty } from "@/types/bounty";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DefaultLayout from "@/components/layout/Default";
import { fetchReferrals } from "@/store/services/referrals.service";
import { fetchAllBounties } from "@/store/services/bounties.service";
import { Referral } from "@/types/community";
import { IRootState } from "@/store";

/**
 * interface for Bounties multiSelector
 * @date 9/13/2023 - 9:25:40 AM
 *
 * @interface bountiesMultiSelector
 * @typedef {bountiesMultiSelector}
 */
interface bountiesMultiSelector {
  referrals: Referral[];
  bounties: Bounty[];
}

/**
 * Default bounty
 * @date 5/16/2023 - 11:39:06 AM
 *
 * @type {Bounty}
 */

/**
 * Bounties page component
 * @date 5/16/2023 - 11:39:56 AM
 *
 * @export
 * @returns
 */
export default function Bounties() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getBountiesData = useCallback(async () => {
    await Promise.all([dispatch(fetchAllBounties()), dispatch(fetchReferrals())]);
  }, [dispatch]);

  useEffect(() => {
    getBountiesData();
  }, [getBountiesData]);

  const { referrals, bounties } = useMultiSelector<unknown, bountiesMultiSelector>({
    referrals: (state: IRootState) => state.referrals.list,
    bounties: (state: IRootState) => state.bounties.bountiesList,
  });

  return (
    <div className="flex justify-center content-wrapper">
      <div className="hidden lg:block w-1/4 mt-28 py-3 pr-10 lg:py-14">
        <Navigation />
      </div>
      <div className="flex-col w-full">
        <h1 className="text-4xl sm:text-5xl pt-10 md:pt-20 pb-10">{t("nav.bounties")}</h1>
        <BountyList bounties={bounties as Bounty[]} referrals={referrals} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }: { locale?: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};

Bounties.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};
