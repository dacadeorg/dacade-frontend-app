import React, { ReactElement } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

/**
 *  Interface for Address component props
 * @date 3/28/2023 - 9:32:01 PM
 *
 * @interface AddressProps
 * @typedef {AddressProps}
 */
interface AddressProps {
  hasAddress: boolean;
}

/**
 *  Wallet component
 * @date 3/28/2023 - 9:31:12 PM
 *
 * @export
 * @param {WalletProps} {
  hasAddress,
}
 * @returns {ReactElement}
 */

export default function Address({
  hasAddress,
}: AddressProps): ReactElement {
  const { t } = useTranslation();
  return (
    <div className="lg:pt-5 sm:pt-5 md:pt-5 pt-14 absolute text-sm lg:text-gray-700 md:text-gray-700 sm:text-gray-700 cursor-pointer text-primary font-medium lg:font-normal md:font-normal sm:font-normal">
      {hasAddress ? (
        <div>
          <Link href="#">{t("profile.wallets.address-set")}</Link>
        </div>
      ) : (
        <div>
          <Link href="#">{t("profile.wallets.address-change")}</Link>
        </div>
      )}
    </div>
  );
}
