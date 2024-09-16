import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "next-i18next";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { setCurrentWallet } from "@/store/feature/user/wallets.slice";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";
import { useSelector } from "@/hooks/useTypedSelector";
import { openVerificationModal } from "@/store/feature/kyc.slice";
import { Wallet } from "@/types/wallet";
import { ReactElement, useCallback, useMemo } from "react";
import AddressDisplay from "./AddressDisplay";

interface CashoutProps {
  wallet: Wallet;
  setShowEditModal: (show: boolean) => void;
  disabled: boolean;
  setShowPayoutModal: (show: boolean) => void;
  testId?: string;
}

/**
 * Cashout address component
 *
 * @returns {ReactElement}
 */
export default function Cashout({ wallet, setShowEditModal, disabled, setShowPayoutModal, testId = "cashoutAddressId" }: CashoutProps): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const isKycVerified = useMemo(() => user?.kycStatus === "VERIFIED", [user?.kycStatus]);
  const cashable = useMemo(() => String(wallet.token).toUpperCase() !== "DAC", [wallet.token]);

  const triggerEditAddress = useCallback(() => {
    dispatch(setCurrentWallet(wallet));
    setShowEditModal(true);
    dispatch(toggleBodyScrolling(true));
  }, [dispatch, setShowEditModal, wallet]);

  const triggerCashout = useCallback(() => {
    setShowPayoutModal(true);
    dispatch(toggleBodyScrolling(true));
  }, [setShowPayoutModal, dispatch]);

  const triggerKYCVerification = useCallback(() => {
    dispatch(
      openVerificationModal({
        description: t("kyc.payout.reason"),
        completedActionText: t("kyc.payout.button.completed"),
        completedAction: () => {
          triggerCashout();
        },
      })
    );
  }, [dispatch, t, triggerCashout]);
  const cashout = () => {
    if (!isKycVerified) return triggerKYCVerification();
    triggerCashout();
  };
  return (
    <div className="px-7 pt-6 flex-1 pb-24 lg:pb-24" data-testid={testId}>
      {cashable ? (
        <AddressDisplay walletAddress={wallet.address} description={wallet.description} triggerEditAddress={triggerEditAddress} />
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
  );
}
