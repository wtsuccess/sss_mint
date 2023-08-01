import { Contract, BigNumber } from "ethers"
import { useContractFunction, useCall } from "@usedapp/core"
import { contractAddress } from "../config/config"
import contractAbi from "../abi/NFT.json";
import { useEffect, useState } from "react";

export enum SalePhase {
    None,
    PreSale,
    RaffleSale,
    ReservedSale
}

export const useContract = (address: string, abi: any, signer?: any) => {
    const contract = new Contract(address, abi, signer);
    return contract;
}

export const useMintRaffleSale = () => {
    const contract = useContract(contractAddress, contractAbi.abi);
    const { state, send } = useContractFunction(contract, 'raffleSaleMint');
    return {state, send};
}

export const useMintPreSale = () => {
    const contract = useContract(contractAddress, contractAbi.abi);
    const { state, send } = useContractFunction(contract, 'mint');
    return {state, send};
}

export const useMintReservedSale = () => {
    const contract = useContract(contractAddress, contractAbi.abi);
    const { state, send } = useContractFunction(contract, 'reservedSaleMint');
    return {state, send};
}

export const useSalePhase = (): SalePhase => {
    const contract = useContract(contractAddress, contractAbi.abi);
    const {value, error} = useCall({
        contract: contract,
        method: "getCurrentSaleMode",
        args: []
    }) || {value: [BigNumber.from(0)]};

    return value ? value[0] : SalePhase.None;
}

export const useTotalSupply = () => {
    const {value, error} = useCall({
        contract: new Contract(contractAddress, contractAbi.abi),
        method: "totalSupply",
        args: []
    }) || {value: [BigNumber.from(0)]};
    return value ? value[0] : BigNumber.from(0);
}

export const useNFTPrice = (): BigNumber => {
    const contract = useContract(contractAddress, contractAbi.abi);
    // const currentSalePhase = useSalePhase();

    // const getPriceMethod = (): string => {
    //     switch(currentSalePhase) {
    //         case SalePhase.PreSale:
    //             return 'preSalePrice';
    //         case SalePhase.RaffleSale:
    //             return 'raffleSalePrice';
    //         case SalePhase.ReservedSale:
    //             return 'reservedSalePrice';
    //         default:
    //             return 'preSalePrice';
    //     }
    // }

    const {value, error} = useCall({
        contract: contract,
        method: "cost",
        args: []
    }) || {value: [BigNumber.from(0)]};

    return value ? value[0] : BigNumber.from(0);
}

export const useMaxSupply = () => {
    const contract = useContract(contractAddress, contractAbi.abi);
    const {value, error} = useCall({
        contract: contract,
        method: "maxSupply",
        args: []
    }) || {value: [BigNumber.from(0)]};
    return value ? value[0] : BigNumber.from(0);
}

export const useMintEndTime = (): number => {
    const contract = useContract(contractAddress, contractAbi.abi);
    const currentSalePhase = useSalePhase();
    
    const getTime = () => {
        switch(currentSalePhase) {
            case SalePhase.None:
                return 'preSaleStartTime';
            case SalePhase.PreSale:
                return 'raffleSaleStartTime';
            case SalePhase.RaffleSale:
                return 'reservedSaleStartTime';
            default:
                return 'preSaleStartTime';
        }
    }

    const {value, error} = useCall({
        contract: contract,
        method: getTime(),
        args: []
    }) || {value: [BigNumber.from(0)]};

    return value ? value[0].toNumber() * 1000 : 0
    
}

export const useMaxMintAmount = () => {
    const contract = useContract(contractAddress, contractAbi.abi);
    const {value, error} = useCall({
        contract: contract,
        method: "maxMintAmount",
        args: []
    }) || {value: [BigNumber.from(0)]};
    return value ? value[0] : BigNumber.from(0);
}