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
  const [showKycModal, setShowKycModal] = useState(false);
  // TODO: Replace with actual value from store
  const isKycVerified = false;

  const address = wallet.address ? wallet.address.match(/.{1,4}/g) : null;

  const cashable = String(wallet.token).toUpperCase() !== "DAC";

  const cashout = () => {
    if (isKycVerified) {
      setShowPayoutModal(true);
      return;
    }
    // TODO: replace with actual dispatch to open KYC verification modal
    setShowKycModal(true);
  };

  return (
    <div className="relative mb-7">
      <div className="bg-gray-100 relative lg:flex md:flex sm:flex rounded-3.5xl">
        <EditAddress show={showEditModal} onClose={() => setShowEditModal(false)} wallet={wallet} />
        <Payout wallet={wallet} show={showPayoutModal} onClose={() => setShowPayoutModal(false)} />
        <div className="bg-gray-50 lg:w-60 md:w-60 sm:w-60 rounded-3.5xl">
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
        <div className="px-7 pt-6 lg:w-96.5 md:w-8/12 sm:w-8/12 pb-24 lg:pb-24">
          {cashable ? (
            <div className="xl:w-72 md:w-72 lg:w-full text-sm text-gray-700">
              {address ? (
                <p className="leading-5 text-sm">
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
                <span className="cursor-pointer hover:underline" onClick={() => setShowEditModal(true)}>
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
              <ArrowButton disabled={!wallet.balance || !wallet.address || disabled} variant="outline-primary" min-width-class="min-w-40" onClick={cashout}>
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
          </span>
          {t("profile.wallet.payout.text")}
        </Hint>
      ))}
    </div>
  );
}
