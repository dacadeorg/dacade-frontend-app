import { CSSProperties, ReactElement, useEffect, useState } from "react";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import Dropdown from "./Dropdown";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/Currency";
import { User } from "@/types/bounty";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { fetchAllWallets } from "@/store/services/wallets.service";
import { fetchUserReputations } from "@/store/services/user/userReputation.service";
import { Wallet } from "@/types/wallet";
import { IRootState } from "@/store";
import useUnlockPageScroll from "@/hooks/useUnlockPageScroll";

/**
 * interface for UserPopup multiSelector
 * @date 9/13/2023 - 9:03:14 AM
 *
 * @interface UserPopupMultiSelector
 * @typedef {UserPopupMultiSelector}
 */
interface UserPopupMultiSelector {
  mainWallet: Wallet | null;
  user: User | null;
}

/**
 * User popup component
 * @date 4/5/2023 - 12:17:46 AM
 *
 * @export
 * @param {{
  buttonStyles: CSSProperties;
}} {
  buttonStyles,
}
 * @returns {ReactElement}
 */
export default function UserPopup({ buttonStyles }: { buttonStyles: CSSProperties }): ReactElement {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { mainWallet, user } = useMultiSelector<unknown, UserPopupMultiSelector>({
    mainWallet: (state: IRootState) => state.wallets.main,
    user: (state: IRootState) => state.user.data,
  });

  useEffect(() => {
    Promise.all([dispatch(fetchAllWallets()), dispatch(fetchUserReputations())]);
  }, [dispatch]);

  const toggle = () => {
    setShow(!show);
    toggleBodyScrolling(!show)(dispatch);
  };

  const externalClick = () => {
    if (show) {
      setShow(false);
      toggleBodyScrolling(false)(dispatch);
    }
  };

  useUnlockPageScroll();

  return (
    <div>
      <div>
        <div className={`inline-block align-middle relative ${show === true ? "z-50" : "z-10"}`} onClick={toggle}>
          <Button customStyle={buttonStyles} padding={false} variant="secondary" className={`p-0.5 bg-gray-100 bg-opacity-75 hover:bg-gray-50 ${mainWallet ? "pr-5" : ""}`}>
            <Avatar user={user as User} useLink={false} hideVerificationBadge />
            {mainWallet ? (
              <span style={{ color: buttonStyles.color ? buttonStyles.color : undefined }} className="align-middle ml-2.5 font-medium text-gray-500">
                <Currency value={mainWallet.balance} token={mainWallet.token} />
              </span>
            ) : (
              <></>
            )}
          </Button>
        </div>
        {show && <Dropdown onClose={externalClick} />}
      </div>
      {show && <div onClick={externalClick} className="opacity-25 fixed inset-0 z-30 bg-black" />}
    </div>
  );
}
