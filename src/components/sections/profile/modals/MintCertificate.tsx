import { useState, useEffect, useMemo, ReactElement } from "react";
import Modal from "@/components/ui/Modal";
import AchievementCard from "@/components/cards/Achievement";
import ArrowButton from "@/components/ui/button/Arrow";
import ErrorBox from "@/components/ui/ErrorBox";
import Input from "@/components/ui/Input";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useTranslation } from "next-i18next";
import { check, connectWallet, disconnectWallet, getSignature } from "@/store/feature/wallet.slice";
import { mintCertificate } from "@/store/services/profile/certificate.service";
import { isError } from "lodash";

// Wallet interface
interface Wallet {
  address: string;
}

/**
 * MintCertificate component
 * @date 5/10/2023 - 7:37:31 PM
 *
 * @export
 * @param {{
  show: boolean;
  wallet?: Wallet;
  close?: (value: boolean) => void;
}} {
  show,
  wallet,
  close,
}
 * @returns {ReactElement}
 */
export default function MintCertificate({ show, wallet, close }: { show: boolean; wallet?: Wallet; close?: (value: boolean) => void }): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [txData, setTxData] = useState({ tx: "" });
  const { achievement, walletAddress } = useSelector((state) => ({
    achievement: state.profile.certificate.current,
    walletAddress: state.web3Wallet.address,
  }));

  const connected = useMemo(() => check(), []);

  // User wallet address
  const address = useMemo(() => walletAddress?.toLowerCase(), [walletAddress]);

  // Mint status
  const minted = useMemo(() => !!txData?.tx, [txData?.tx]);

  // Transaction url
  const txURL = useMemo(() => `${process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL}/tx/${txData?.tx}`, [txData?.tx]);

  /**
   * Button text according to the address or the loading state
   * @date 5/10/2023 - 7:39:31 PM
   *
   * @type {String}
   */
  const buttonText = useMemo(() => {
    if (!address) return "profile.connect.wallet.button";
    if (loading) return "profile.mint.certificate.button.loading";
    return "profile.mint.certificate.button";
  }, [address, loading]);

  useEffect(() => {
    setTxData((prev) => ({
      ...prev,
      tx: achievement?.minting.tx || "",
    }));
  }, [achievement]);

  const onClose = () => {
    setLoading(false);
    close?.(true);
  };

  /**
   * Mint certificate function
   * @date 5/10/2023 - 7:42:27 PM
   *
   * @async
   * @returns { () => Promise<void>}
   */
  const onSave = async () => {
    if (loading) return;
    setLoading(true);
    setError((prev: any) => ({ ...prev, message: "" }));
    try {
      const signature = await getSignature();

      const data = (
        await mintCertificate({
          id: achievement?.id as string,
          address: address as string,
          signature,
        })
      )(dispatch);

      setTxData((prev) => ({ ...prev, tx: data.txData }));
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Connect wallet function
  const connect = async () => {
    try {
      await dispatch(connectWallet());
    } catch (error) {
      console.log(isError);
    }
  };

  // Disconnect wallet function
  const disconnect = async () => {
    await dispatch(disconnectWallet());
  };

  const handleSave = () => {
    if (!address) return connect();
    onSave();
  };

  return (
    <Modal show={show} size="medium">
      <div className="px-6 pt-6">
        <div className="pb-7">
          <p className="text-.5xl font-medium leading-snug">{achievement?.metadata?.name}</p>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex-none w-2/3 mx-auto md:w-1/3 2xl:w-1/4 md:mx-0">
            <AchievementCard data={achievement} minting />
          </div>

          <div className="flex-1 overflow-hidden font-primary">
            {error && <ErrorBox className="my-4" error={error} />}
            {minted ? (
              <div className="flex flex-col gap-3">
                <div className="p-3 text-green-700 bg-green-100 border border-green-200 border-solid rounded">
                  <p>Your NFT has been successfully minted on chain</p>
                </div>
                <div className="px-3.5 py-2.5 border border-solid rounded">
                  <p>Transaction ID</p>
                  <p className="text-gray-400">
                    <a href={txURL} target="_blank" className="underline cursor-pointer">
                      {txData?.tx}
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="pt-3 pb-4">This certificate is awarded for passing the {achievement?.metadata?.name} course.</p>
                {!connected ? (
                  <div className="border-t border-gray-100 border-solid">
                    <p className="pt-4">Minting this certificate will not cost you gas fees.</p>
                    <Input value={address} placeholder="Wallet address" inputClass="h-12 mt-6 text-sm text-slate-500" fontSize="sm" required disabled />
                  </div>
                ) : (
                  <div className="bg-yellow-50 text-yellow-900 text-sm border border-solid border-yellow-100 w-full rounded px-3 py-0.5 inline-block">
                    <p className="font-bold">No wallet connected</p>
                    <p>Please connect a wallet to mint the certificate.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between my-8">
          <a className="text-sm font-medium cursor-pointer text-primary" onClick={onClose}>
            Close
          </a>
          {!minted ? (
            <ArrowButton loading={loading} disabled={loading} variant="primary" onClick={handleSave}>
              {buttonText}
            </ArrowButton>
          ) : (
            <ArrowButton link="/profile" variant="primary">
              {t("profile.mint.certificate.profile.button")}
            </ArrowButton>
          )}
        </div>
      </div>
    </Modal>
  );
}
