import { useState, useEffect, ReactElement } from "react";
import EditProfile from "@/components/sections/profile/modals/EditProfile";
import Wallet from "@/components/cards/Wallet";
import Hint from "@/components/ui/Hint";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { fetchAllWallets } from "@/store/services/wallets.service";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import DefaultLayout from "@/components/layout/Default";
import ProfileLayout from "@/layouts/ProfileLayout";

/**
 * Profile Wallet component
 *
 * @returns {ReactElement}
 */

export default function ProfileWallet(): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.wallets.list);
  const user = useSelector((state) => state.user.data);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    dispatch(fetchAllWallets());
  }, [dispatch]);

  const cashable = user?.displayName;

  return (
    <div className="w-full xl:w-2/">
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
  return <ProfileLayout>{page}</ProfileLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { ...(await i18Translate(locale as string)) } });
