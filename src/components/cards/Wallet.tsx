import { ReactElement, useState } from "react";
import Coin from "@/components/ui/Coin";
import ArrowButton from "@/components/ui/button/Arrow";
import Tag from "@/components/ui/Tag";
import Currency from "@/components/ui/Currency";
import EditAddress from "@/components/sections/profile/modals/EditAddress";
import Payout from "@/components/sections/profile/modals/Payout";
import Hint from "@/components/ui/Hint";
import { useTranslation } from "next-i18next";
import { Wallet } from "@/types/wallet";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { setCurrentWallet } from "@/store/feature/user/wallets.slice";
import { openVerificationModal } from "@/store/feature/kyc.slice";

/**
 * Cards wallet props interface
 */
interface CardsWalletProps {
  wallet: Wallet;
  disabled?: boolean;
}

/**
 * Cards wallet component
 *
 * @returns {ReactElement}
 */

export default function CardsWallet({ wallet, disabled = false }: CardsWalletProps): ReactElement {
  const { t } = useTranslation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const isKycVerified = user?.kycStatus === "VERIFIED";
  const address = wallet.address ? wallet.address.match(/.{1,4}/g) : null;

  const cashable = String(wallet.token).toUpperCase() !== "DAC";
  const triggerCashout = () => {
    setShowPayoutModal(true);
    dispatch(toggleBodyScrolling(true));
  };

  const triggerKYCVerification = () => {
    dispatch(
      openVerificationModal({
        description: t("kyc.payout.reason"),
        completedActionText: t("kyc.payout.button.completed"),
        completedAction: () => {
          triggerCashout();
        },
      })
    );
  };

  const cashout = () => {
    if (!isKycVerified) return triggerKYCVerification();
    triggerCashout();
  };

  const onClose = () => {
    setShowEditModal(false);
    setShowPayoutModal(false);
    dispatch(toggleBodyScrolling(false));
  };

  const triggerEditAddress = () => {
    dispatch(setCurrentWallet(wallet));
    setShowEditModal(true);
    dispatch(toggleBodyScrolling(true));
  };

  return (
    <div className="relative mb-7">
      <div className="relative lg:flex md:flex sm:flex rounded-3.5xl">
        {showEditModal && <EditAddress show={showEditModal} onClose={onClose} wallet={wallet} />}
        <Payout wallet={wallet} show={showPayoutModal} onClose={onClose} />
        <div className="bg-secondary lg:w-60 md:w-60 sm:w-60 rounded-3.5xl">
          <div className="p-6">
            <div className="border-b border-dotted border-gray-900">
              <h1 className="text-2xl">{wallet.title}</h1>
              <Tag value={wallet.token} />
              <div className="text-right mb-4">
                <Coin size="medium" token={wallet.token} />
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2 pt-5 text-sm">
                <h1>{t("profile.wallets.balance")}</h1>
              </div>
              <div className="w-1/2 pt-3.5 text-right text-2xl font-medium">
                <h1>
                  <Currency value={wallet.balance} />
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="px-7 pt-6 flex-1 pb-24 lg:pb-24">
          {cashable ? (
            <div className="text-sm text-gray-700">
              {address ? (
                <p className="leading-5 text-sm flex gap-x-2 gap-y-1 flex-wrap font-mono font-normal">
                  {address.map((part, k) => (
                    <span key={`address-${k}`} className="mr-2">
                      {part}
                    </span>
                  ))}
                </p>
              ) : (
                <p>{wallet.description}</p>
              )}
              <div className="text-gray-700 text-sm mt-3">
                <span className="cursor-pointer hover:underline" onClick={triggerEditAddress}>
                  {address ? t("profile.wallets.address-change") : t("profile.wallets.address-set")}
                </span>
              </div>
            </div>
          ) : (
            <div className="prose">
              <p
                dangerouslySetInnerHTML={{
                  __html: t("profile.wallets.uncashable", {
                    token: `${wallet.title}`,
                    link: "https://discord.gg/5yDZvVnpQQ",
                  }),
                }}
              />
            </div>
          )}
          {cashable && (
            <div className="right-2 absolute bottom-2 mt-5">
              <ArrowButton disabled={!wallet.balance || !wallet.address || disabled} variant="outline-primary" minWidthClass="min-w-40" onClick={cashout}>
                {t("profile.wallets.cash-out")}
              </ArrowButton>
            </div>
          )}
        </div>
      </div>
      {wallet.payouts.map((payout, i) => (
        <Hint key={`wallet-payout-${i}`} className="mt-2">
          <span className="font-medium">
            <Currency value={payout.amount} token={payout.token} />
          </span>{" "}
          {t("profile.wallet.payout.text")}
        </Hint>
      ))}
    </div>
  );
}
