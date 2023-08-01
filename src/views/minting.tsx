import { useRef, useEffect, useState } from "react";
import MintingModal from "../components/modal";

import Bigimage from "../resources/background.png";
import Smallimage from "../resources/background_small.jpg";
import {
  SalePhase,
  useContract,
  useMaxSupply,
  useMintEndTime,
  useMintPreSale,
  useMintRaffleSale,
  useMintReservedSale,
  useNFTPrice,
  useSalePhase,
  useTotalSupply,
} from "../hook";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { toast } from "react-toastify";
import { getWhiteListInfo } from "../utils/whitelist";
import { MintCountdown } from "../components/Countdown/Countdown";
import SnackBar from "../components/SnackBar/SnackBar";

export default function Minting() {
  const [isOpen, setIsOpen] = useState(false);

  const { account, active, library } = useEthers();
  const balance = useEtherBalance(account);
  const totalCount = useMaxSupply();
  const price = useNFTPrice();
  const mintedCount = useTotalSupply();
  const salePhase = useSalePhase();

  const mintEndTime = useMintEndTime();
  const [maxNum, setMaxNum] = useState(2);

  const { state: stateForMintRaffle, send: mintRaffle } = useMintRaffleSale();
  const { state: stateForMintPreSale, send: mintPreSale } = useMintPreSale();
  const { state: stateForMintReservedSale, send: mintReserved } =
    useMintReservedSale();

  useEffect(() => {
    if (stateForMintRaffle) {
      stateForMintRaffle.status === "Exception" &&
        toast.error(stateForMintRaffle.errorMessage);
      stateForMintRaffle.status === "Success" && toast.success("Mint success!");
    }
    if (stateForMintPreSale) {
      stateForMintPreSale.status === "Exception" &&
        toast.error(stateForMintPreSale.errorMessage);
      stateForMintPreSale.status === "Success" &&
        toast.success("Mint success!");
    }
    if (stateForMintReservedSale) {
      stateForMintReservedSale.status === "Exception" &&
        toast.error(stateForMintReservedSale.errorMessage);
      stateForMintReservedSale.status === "Success" &&
        toast.success("Mint success!");
    }

    stateForMintReservedSale.status = "None";
    stateForMintRaffle.status = "None";
    stateForMintPreSale.status = "None";
  }, [stateForMintRaffle, stateForMintPreSale, stateForMintReservedSale]);

  useEffect(() => {
    if (account && salePhase !== SalePhase.None) {
      let s = "PRESALE";
      if (salePhase === SalePhase.PreSale) {
        s = "PRESALE";
      } else if (salePhase === SalePhase.RaffleSale) {
        s = "RAFFLESALE";
      } else if (salePhase === SalePhase.ReservedSale) {
        s = "RESERVEDSALE";
      }
      getWhiteListInfo(account, s).then((data) => {
        if (!data.success) {
          setMaxNum(0);
          // toast.warning("This wallet is not allowed to mint at this sale.");
        } else {
          setMaxNum(data.limit);
        }
      });
    }
  }, [account, salePhase]);

  const mintNow = async (count: number) => {
    try {
      if (!active || !account) {
        toast.warning("Please connect your wallet!");
        return;
      } else if (balance?.lt(price?.mul(count))) {
        toast.error("Not enough ETH to mint!");
        return;
      }

      let result;
      if (salePhase === SalePhase.PreSale) {
        const data = await getWhiteListInfo(account, "PRESALE");
        if (!data.success) {
          toast.warning("You are not eligible to mint.");
          return;
        }
        result = await mintPreSale(count, data.signature, {
          value: price.mul(count),
        });
      } else if (salePhase == SalePhase.RaffleSale) {
        const data = await getWhiteListInfo(account, "RAFFLESALE");
        if (!data.success) {
          toast.warning("You are not eligible to mint.");
          return;
        }
        result = await mintRaffle(count, data.signature, {
          value: price.mul(count),
        });
      } else if (salePhase == SalePhase.ReservedSale) {
        const data = await getWhiteListInfo(account, "RESERVEDSALE");
        if (!data.success) {
          toast.warning("You are not eligible to mint.");
          return;
        }
        result = await mintReserved(count, data.signature, {
          value: price.mul(count),
        });
      } else {
        toast.warning("Sale has not started yet.");
        return;
      }
    } catch (err: any) {
      const errStr = JSON.stringify(err);
      toast.warning(err);
      console.log("mintErr: ", errStr);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative h-screen overflow-x-hidden">
      <img
        src={Bigimage}
        alt="Background"
        className="w-full h-full absolute top-0"
      />

      <div className="counter-container mt-[200px] z-[1] absolute w-screen">
        <MintCountdown
          date={
            new Date(
              salePhase === SalePhase.ReservedSale
                ? 1655478000000
                : 1655434800000
            )
          }
          status={salePhase}
        />
      </div>

      <button
        onClick={() => {
          openModal();
        }}
        className="m-auto text-white absolute top-[55%] left-1/2 -translate-x-1/2 px-5 py-2 bg-blue-600 rounded-md hover:bg-blue-500"
      >
        Mint Now
      </button>

      <MintingModal
        isOpen={isOpen}
        onMint={mintNow}
        price={price}
        totalCount={totalCount}
        mintedCount={mintedCount}
        maxNum={maxNum}
        saleMode={salePhase}
        isConnected={!!account}
        changeOpen={(val: boolean) => {
          setIsOpen(val);
        }}
      />
      <SnackBar />
    </div>
  );
}
