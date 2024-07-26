import { ReactElement, useCallback, useState } from "react";
import EditAddress from "@/components/sections/profile/modals/EditAddress";
import Payout from "@/components/sections/profile/modals/Payout";
import { Wallet } from "@/types/wallet";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import CashoutAddress from "./CashoutAddress";
import Overview from "./Overview";
import WalletHint from "./WalletHint";

/**
 * Cards wallet props interface
 */
interface CardsWalletProps {
  wallet: Wallet;
  disabled?: boolean;
  testId?: string;
}

/**
 * Cards wallet component
 *
 * @returns {ReactElement}
 */

export default function CardsWallet({ wallet, disabled = false, testId = "cardWalletId" }: CardsWalletProps): ReactElement {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    setShowEditModal(false);
    setShowPayoutModal(false);
    dispatch(toggleBodyScrolling(false));
  }, [dispatch]);

  return (
    <div className="relative mb-7" data-testid={testId}>
      <div className="relative lg:flex md:flex sm:flex rounded-3.5xl">
        {showEditModal && <EditAddress show={showEditModal} onClose={onClose} wallet={wallet} />}
        <Payout wallet={wallet} show={showPayoutModal} onClose={onClose} />
        <Overview wallet={wallet} />
        <CashoutAddress wallet={wallet} setShowEditModal={setShowEditModal} disabled={disabled} setShowPayoutModal={setShowPayoutModal} />
      </div>
      <WalletHint wallet={wallet} />
    </div>
  );
}
