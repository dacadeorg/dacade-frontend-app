import { useState, useEffect, useMemo, ReactElement, useCallback } from "react";
import Modal from "@/components/ui/Modal";
import AchievementCard from "@/components/cards/Achievement";
import ArrowButton from "@/components/ui/button/Arrow";
import ErrorBox from "@/components/ui/ErrorBox";
import Input from "@/components/ui/Input";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useTranslation } from "next-i18next";
import { mintCertificate } from "@/store/services/profile/certificate.service";
import { Certificate, Minting } from "@/types/certificate";
import { IRootState } from "@/store";
import { useAccount, useSignMessage } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

/**
 * interface for MintCertificate multiSelector
 * @date 9/13/2023 - 9:20:47 AM
 *
 * @interface MintCertificateMultiSelector
 * @typedef {MintCertificateMultiSelector}
 */
interface MintCertificateMultiSelector {
  achievement: Certificate | null;
  walletAddress: string | null;
  mintingTx: Minting | null;
}

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
export default function MintCertificate({ show, close }: { show: boolean; wallet?: Wallet; close?: (value: boolean) => void }): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [txData, setTxData] = useState({ tx: "" });
  const { achievement, walletAddress, mintingTx } = useMultiSelector<unknown, MintCertificateMultiSelector>({
    achievement: (state: IRootState) => state.profileCertificate.current,
    walletAddress: (state: IRootState) => state.web3Wallet.address,
    mintingTx: (state: IRootState) => state.certificates?.mintingTx,
  });

  const { isConnected, address: walletConnectAddress } = useAccount();
  const { open: openWeb3Modal } = useWeb3Modal();
  const { data: signature, isLoading: signatureLoading, signMessage, error: getSignatureError } = useSignMessage();

  // User wallet address
  const address = useMemo(() => {
    const userAddress = walletAddress || walletConnectAddress;
    return userAddress?.toLowerCase();
  }, [walletAddress, walletConnectAddress]);

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
    if (!achievement?.minting?.tx || !mintingTx) return;
    const tx = achievement?.minting?.tx || mintingTx.tx;
    setTxData((prev) => ({
      ...prev,
      tx,
    }));
  }, [achievement, mintingTx]);

  const onClose = () => {
    setLoading(false);
    close?.(true);
  };

  const onSave = async () => {
    if (loading) return;
    setError((prev: any) => ({ ...prev, message: "" }));
    try {
      // Trigger the modal to get the signature
      signMessage({ message: `Mint ${achievement?.metadata?.name} certificate from Dacade` });
    } catch (error: any) {
      setError(error);
    }
  };

  /**
   * Mint the certificate
   * @date 11/1/2023 - 5:56:59 PM
   *
   * @type {*}
   */
  const mint = useCallback(async () => {
    if (!signature || !achievement?.id) return;
    setLoading(true);
    await dispatch(
      mintCertificate({
        id: achievement.id as string,
        address: address as string,
        signature,
      })
    );
    setLoading(false);
  }, [achievement?.id, address, dispatch, signature]);

  // Connect wallet function
  const connect = async () => {
    try {
      openWeb3Modal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    if (!address) return connect();
    onSave();
  };

  useEffect(() => {
    if (!getSignatureError) return;
    setError({ name: "Minting failed", message: "Failed connection", details: { one: "User denied message signature" } });
  }, [getSignatureError]);

  useEffect(() => {
    setLoading(signatureLoading);
  }, [signatureLoading]);

  useEffect(() => {
    mint();
  }, [mint, signature]);

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
                {isConnected || address ? (
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
              {t(buttonText)}
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
