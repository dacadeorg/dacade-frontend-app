import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import AchievementCard from "@/components/cards/Achievement";
import ArrowButton from "@/components/ui/button/Arrow";
import ErrorBox from "@/components/ui/ErrorBox";
import Input from "@/components/ui/Input";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useTranslation } from "next-i18next";

interface Wallet {
  address: string;
}

interface Achievement {
  id: string;
  metadata: {
    name: string;
  };
  minting: {
    tx: string;
  };
}

export default function MintCertificate({
  show,
  wallet = {},
}: {
  show: boolean;
  wallet?: Wallet;
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [txData, setTxData] = useState({ tx: "" });
  // TODO: Should be uncommented when the wallet slice is implemented
  //   const achievement = useSelector(
  //     (state) => state.profile.certificates.current
  //   );
  //   const walletAddress = useSelector((state) => state.wallet.address);

  const connected = false;
  const address = walletAddress?.toLowerCase();
  const minted = !!txData?.tx;
  const txURL = `${process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL}/tx/${txData?.tx}`;

  const buttonText = () => {
    if (!address) return "profile.connect.wallet.button";
    if (loading) return "profile.mint.certificate.button.loading";
    return "profile.mint.certificate.button";
  };

  // TODO: Should be uncommented when the wallet slice is implemented
  //   useEffect(() => {
  //     setTxData(achievement?.minting);
  //   }, [achievement]);

  const close = () => {
    setLoading(false);
    // emit close event
  };

  const onSave = async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const signature = await dispatch("wallet/getSignature");
      const data = await dispatch("profile/certificates/mint", {
        id: achievement.id,
        address,
        signature,
      });
      setTxData(data.txData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const connect = async () => {
    try {
      await dispatch("wallet/connect");
    } catch (e) {
      console.log(e);
    }
  };

  const disconnect = () => {
    dispatch("wallet/disconnect");
  };

  const handleSave = () => {
    if (!address) return connect();
    onSave();
  };

  return (
    <Modal show={show} size="medium">
      <div className="px-6 pt-6">
        <div className="pb-7">
          <p className="text-.5xl font-medium leading-snug">
            {achievement?.metadata?.name}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-2/3 md:w-1/3 2xl:w-1/4 flex-none mx-auto md:mx-0">
            <AchievementCard data={achievement} minting />
          </div>

          <div className="flex-1 font-primary overflow-hidden">
            {error && <ErrorBox className="my-4" error={error} />}
            {minted ? (
              <div className="flex flex-col gap-3">
                <div className="text-green-700 bg-green-100 p-3 border border-solid border-green-200 rounded">
                  <p>
                    Your NFT has been successfully minted on chain
                  </p>
                </div>
                <div className="px-3.5 py-2.5 border border-solid rounded">
                  <p>Transaction ID</p>
                  <p className="text-gray-400">
                    <a
                      href={txURL}
                      target="_blank"
                      className="underline cursor-pointer"
                    >
                      {txData?.tx}
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="pb-4 pt-3">
                  This certificate is awarded for passing the{" "}
                  {achievement?.metadata?.name} course.
                </p>
                {!connected ? (
                  <div className="border-t border-gray-100 border-solid">
                    <p className="pt-4">
                      Minting this certificate will not cost you gas
                      fees.
                    </p>
                    <Input
                      value={address}
                      placeholder="Wallet address"
                      inputClass="h-12 mt-6 text-sm text-slate-500"
                      fontSize="sm"
                      required
                      disabled
                    />
                  </div>
                ) : (
                  <div className="bg-yellow-50 text-yellow-900 text-sm border border-solid border-yellow-100 w-full rounded px-3 py-0.5 inline-block">
                    <p className="font-bold">No wallet connected</p>
                    <p>
                      Please connect a wallet to mint the certificate.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex my-8 items-center justify-between">
          <a
            className="cursor-pointer text-sm font-medium text-primary"
            onClick={close}
          >
            Close
          </a>
          {!minted ? (
            <ArrowButton
              loading={loading}
              disabled={loading}
              variant="primary"
              onClick={handleSave}
            >
              {buttonText()}
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
