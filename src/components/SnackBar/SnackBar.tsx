import { useEthers } from "@usedapp/core"
import { useEffect, useState } from "react";
import { NETWORK_ID, NETWORK_NAME, RPC_URL } from "../../config/config";

const SnackBar = () => {
    const {account, chainId, library, activate, activateBrowserWallet} = useEthers();
    const [visible, setVisible] = useState<boolean>(false);
    
    useEffect(() => {
        setVisible((chainId !== NETWORK_ID))
    }, [chainId, account]);

    const switchChain = async (e: any) => {
        activateBrowserWallet();
        try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${NETWORK_ID}` }],
            });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
                try {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainId: NETWORK_ID,
                        chainName: NETWORK_NAME,
                        rpcUrls: [RPC_URL] /* ... */,
                      },
                    ],
                  });
                } catch (addError: any) {
                  console.log('net add error: ', addError)
                }
            }
        }
    }


    return (
        <div className={`${visible ? '' : 'hidden' } fixed w-[100%] md:w-[50vw] md:left-[25vw] bg-[#f35] p-[15px] bottom-[50px] text-white text-center`}>
            You are not on {NETWORK_NAME}. Please switch to <span className="cursor-pointer underline" onClick={switchChain}>{NETWORK_NAME}</span>.
            <img className="w-[30px] h-[30px] absolute top-[11px] right-[10px] cursor-pointer" src="/img/xmark.png" onClick={(e:any) => setVisible(false)}/>
        </div>
    )
}


export default SnackBar