import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink';
import { INFURA_ID, NETWORK_ID, RPC_URL } from './config';

export const providerOptions = {
    injected: {
      display: {
        name: 'Metamask',
        description: 'Connect with the provider in your Browser',
      },
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID,
      },
    },
    'custom-walletlink': {
      display: {
        logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
        name: 'Coinbase',
        description: 'Connect to Coinbase Wallet (not Coinbase App)',
      },
      options: {
        appName: 'Coinbase', // Your app name
        networkUrl: RPC_URL,
        chainId: NETWORK_ID,
      },
      package: WalletLink,
      connector: async (_: any, options: any) => {
        const { appName, networkUrl, chainId } = options
        const walletLink = new WalletLink({
          appName,
        })
        const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
        await provider.enable()
        return provider
      },
    },
    binancechainwallet: {
      display: {
        name: "Binance Smart Chain"
      },
      package: true
    }
}
