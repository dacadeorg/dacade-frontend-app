import { ReactElement, useEffect, useMemo } from "react";
import Navigation from "@/components/sections/bounties/Navigation";
import BountyList from "@/components/list/Bounty";
import { useTranslation } from "react-i18next";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { Bounty } from "@/types/bounty";
import { GetStaticProps } from "next";
import { Referral } from "@/types/community";
// import { fetchAllBounties, setBountiesList } from "@/store/feature/bouties.slice";
import i18Translate from "@/utilities/I18Translate";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DefaultLayout from "@/components/layout/Default";
import { fetchReferrals } from "@/store/services/referrals.service";
import { fetchAllBounties } from "@/store/services/bounties.service";

interface BountiesPageProps {
  bouties: Bounty[];
  referrals: Referral[];
}

export default function Bounties(props: BountiesPageProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await Promise.all([dispatch(await fetchAllBounties()), dispatch(fetchReferrals())]);
    })();
  }, [dispatch]);

  const { referrals, bounties } = useSelector((state) => ({
    referrals: state.referrals.list,
    bounties: state.bounties.bountiesList,
  }));

  const bountiesList = useMemo(
    () => [
      {
        name: "Tezos Starter Course",
        image: "/img/communities/tacode.svg",
        type: "Challenge",
        link: "https://tacode.dev/courses/dev-starter/challenges/f9c23fc7-3022-4347-b19c-66cc2424ac2f",
        colors: {
          text: "#0D61FF",
          accent: "#0D61FF",
          textAccent: "#fff",
          primary: "#0D61FF",
        },
        reward: {
          amount: 12,
          token: "tez",
          type: "SUBMISSION",
        },
        url: "https://tacode.dev/courses/dev-starter",
      },
      ...(bounties || []),
    ],
    [bounties]
  );

  return (
    <div className="flex justify-center content-wrapper">
      <div className="hidden lg:block w-1/4 mt-28 py-3 pr-10 lg:py-14">
        <Navigation />
      </div>
      <div className="flex-col w-full">
        <h1 className="text-4xl sm:text-5xl pt-10 md:pt-20 pb-10">{t("nav.bounties")}</h1>
        <BountyList bounties={bountiesList as Bounty[]} referrals={referrals} />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
  await i18Translate(locale as string);

  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};

Bounties.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};
