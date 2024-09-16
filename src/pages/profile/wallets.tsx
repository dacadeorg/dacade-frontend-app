import { useState, useEffect, ReactElement } from "react";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { fetchAllWallets } from "@/store/services/wallets.service";
import { GetStaticProps } from "next";

import EditProfile from "@/components/sections/profile/modals/EditProfile";
import Wallet from "@/components/cards/wallet";
import Hint from "@/components/ui/Hint";
import ProfileLayout from "@/layouts/ProfileLayout";
import i18Translate from "@/utilities/I18Translate";
import AuthObserver from "@/contexts/AuthObserver";
import { IRootState } from "@/store";
import { User } from "@/types/bounty";
import { Wallet as WalletType } from "@/types/wallet";

interface ProfileWalletMultiSelector {
  wallets: WalletType[];
  user: User | null;
}
/**
 * Profile Wallet component
 *
 * @returns {ReactElement}
 */

export default function ProfileWallet(): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { wallets, user } = useMultiSelector<unknown, ProfileWalletMultiSelector>({
    wallets: (state: IRootState) => state.wallets.list,
    user: (state: IRootState) => state.user.data,
  });
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    dispatch(fetchAllWallets());
  }, [dispatch]);

  const cashable = user?.displayName;

  return (
    <div className="w-full lg:w-10/12">
      {!cashable && (
        <div>
          <Hint className="mb-5">
            {t("profile.wallets.missing-info.warning")}
            <span className="underline cursor-pointer" onClick={() => setShowEditProfile(true)}>
              {t("profile.wallets.missing-info.action")}
            </span>
          </Hint>
          <EditProfile show={showEditProfile} onClose={() => setShowEditProfile(false)} />
        </div>
      )}
      {wallets.map((wallet) => (
        <Wallet key={`wallets-${wallet.id}`} wallet={wallet} />
      ))}
    </div>
  );
}

ProfileWallet.getLayout = function (page: ReactElement) {
  return (
    <AuthObserver>
      <ProfileLayout>{page}</ProfileLayout>
    </AuthObserver>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { ...(await i18Translate(locale as string)) } });
