import NFT from '../abi/NFT.json';

export const DEBUG = false;
// export const INFURA_ID = '07b7bfdd677d4fcf82e1afeae533e668';
export const INFURA_ID = '70b9e05e5ac5434bad96f634c669283d';

export const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${INFURA_ID}`;
export const TESTNET_RPC_URL = `https://rinkeby.infura.io/v3/${INFURA_ID}`;
// export const HARDHAT_URL = "http://localhost:8545";
export const USEDAPP_RPC_URL = "https://eth-mainnet.public.blastapi.io";

export const contractAddress = NFT.address;

export const NETWORK_ID = DEBUG ? 4 : 1;
export const RPC_URL = DEBUG ? TESTNET_RPC_URL : MAINNET_RPC_URL;
export const NETWORK_NAME = DEBUG ? 'Rinkeby' : 'Mainnet'

export const OPENSEA_LINK = 'https://opensea.io/Aneroverse';

export const PRESALE_DATE = 1655262000;
export const RAFFLESALE_DATE = 1655348400;
export const RESERVEDSALE_DATE = 1655391600;

