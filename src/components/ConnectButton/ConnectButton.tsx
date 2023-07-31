import React, { useCallback, useEffect, useMemo } from 'react'
import { useEtherBalance, useEthers } from '@usedapp/core'
import { BigNumber, ethers } from 'ethers'
import { displayAddress } from '../../utils/helpers'
import Web3Modal from 'web3modal';
import { providerOptions } from '../../config/web3.config'
import "./style.css";

const ConnectButton = () => {
  let provider: any;
  const { account, deactivate, activate } = useEthers()
  const etherBalance = useEtherBalance(account)
  
  const connectWallet = useCallback( 
    async () => {
      web3Modal.clearCachedProvider();
      activateProvider()
    },
    [providerOptions]
  )
  console.log('connect')
  const web3Modal = useMemo<Web3Modal>(() => 
    new Web3Modal({
      providerOptions
    })
  , [providerOptions]);


  const activateProvider = useCallback(
    async () => {
      provider = await web3Modal.connect()
      await activate(provider);
    },
    [web3Modal]
  ); 

  const disconnect = useCallback(
    () => {
      deactivate();
      const disConnectProvider = async () => {
        if(provider?.close) {
          await provider.close();
          await web3Modal.clearCachedProvider();
          provider = null;
        }
      }
      disConnectProvider();
    },
    [web3Modal]
  ); 

  useEffect(() => {
    const container = document.querySelector('.web3modal-modal-card');
    const existSpan = document.querySelector('.walletmodal-modal-title');
    if (existSpan) {
      container?.removeChild(existSpan);
    }
    const span = document.createElement('span');
    span.style.order = "-1";
    span.style.color = "black";
    span.style.fontWeight = "700";
    span.style.fontSize = "20px";
    span.style.marginRight = "auto";
    span.style.marginLeft = "10px";
    span.style.marginBottom = "10px";
    span.innerText = "Connect Wallet";
    span.className = "walletmodal-modal-title";
    container?.append(span);

    connectWallet();
  }, []);

  return (
    <>
      {!account && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            connectWallet()
          }}
          type="button"
          className="flex items-center transition ease-in-out duration-300 bg-[#5765F1] hover:bg-[#5065F1]
          hover:opacity-90 px-3 md:px-4 h-[40px] md:h-[35px] text-sm md:translate-x-0 font-mono text-white leading-[31px] rounded-md justify-center cursor-pointer"
        >
          CONNECT WALLET
        </button>
      )}

      {account && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            disconnect()
          }}
          className="flex items-center transition ease-in-out duration-300 bg-[#6c6c6c44] hover:bg-[#5065F1]
          hover:opacity-90 px-3 md:px-4 h-[40px] md:h-[35px] text-sm md:translate-x-0 font-mono text-white leading-[31px] rounded-md justify-center cursor-pointer"
        >
          <img src={'/img/eth.png'} className="h-[28px] w-[28px]" alt="eth" />
          <div className="ml-3">
            {etherBalance && (
              <div className="balance leading-[15px]">
                {parseFloat(ethers.utils.formatEther(etherBalance)).toFixed(2)}
                ETH
              </div>
            )}
            <div className="account leading-[15px]">{displayAddress(account)}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default ConnectButton
