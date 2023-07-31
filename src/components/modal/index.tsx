import { Transition } from '@headlessui/react'
import { BigNumber, ethers } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import React, { useState } from 'react'
import { SalePhase } from '../../hook'
import image from '../../resources/art.png'
import ConnectButton from '../ConnectButton/ConnectButton'

export default function MintingModal({
  isOpen,
  changeOpen,
  onMint,
  price,
  totalCount,
  mintedCount,
  saleMode,
  isConnected,
  maxNum
}: {
  isOpen: boolean
  changeOpen: any
  onMint: any
  price: BigNumber
  totalCount: BigNumber
  mintedCount: BigNumber
  saleMode: SalePhase
  isConnected: boolean
  maxNum: number
}) {
  const [amount, setAmount] = useState(1)

  const increaseAmount = () => {
    if (amount < maxNum) {
      setAmount(amount + 1)
    }
  }

  const decreaseAmount = () => {
    setAmount(amount - 1 < 1 ? 1 : amount - 1)
  }

  const handleKeyEvent = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    event = event || window.event

    console.log(typeof event, event.code)
    if (event.code === 'ArrowUp') {
      increaseAmount()
    }

    if (event.code === 'ArrowDown') {
      decreaseAmount()
    }
  }

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let count = parseInt(event.target.value)
    if (count > maxNum) {
      count = maxNum;
    }
    setAmount(count >= 1 ? count : 1)
  }

  const getSalePhase = (salePhase: SalePhase): string => {
    switch(salePhase) {
      case SalePhase.None:
        return 'Not started';
      case SalePhase.PreSale:
        return 'Presale';
      case SalePhase.RaffleSale:
        return 'Raffle';
      case SalePhase.ReservedSale:
        return 'Final';
    }
  }

  return (
    <Transition
      show={isOpen}
      enter="transition-all duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed top-0 left-0 w-screen h-screen text-black z-20">
        <div
          className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-50"
          onClick={() => changeOpen(false)}
        ></div>
        <div className="
          flex  
          flex-col
          absolute
          left-1/2 
          -translate-x-1/2
          top-1/2
          -translate-y-1/2 
          md:w-[100%]
          w-[85%]
          max-w-[375px]
          h-[500px]
          gap-[40.5px] 
          rounded-2xl 
          bg-white 
          md:px-[40.5px]
          px-[30px] 
          py-[36.99px] 
          text-left 
          shadow-xl 
          transition-all"
        >
          <label htmlFor="" className="absolute top-[6px] right-[5px] py-[0.5px] px-[5px] text-[12px] text-[#a91313] bg-[#dfdda1] rounded-[7px]">{getSalePhase(saleMode)}</label>
          
          <div className="flex flex-1 w-[100%] flex-col items-center text-center" onKeyDown={handleKeyEvent}>
              <p className="scale-x-[1.7] text-[38px] italic font-[800] leading-[44.7px] font-['Sequel 100 Black']">
                {mintedCount.toNumber()}/{totalCount.toNumber()}
              </p>
              <p className="text-[28px] font-['Abel']">
                RIDERS
              </p>
              <p className="text-[28px] font-['Abel']">
                1 Rider ={' '}
                {parseFloat(ethers.utils.formatEther(price)).toFixed(2)} ETH
              </p>
              <p className="mt-[37px] text-[32px] font-['Abel']">
                How many?
              </p>
              <div className="flex justify-center mt-[14.5px]">
                <div>
                  <input
                    className="h-[63.5px] w-[105px] border-black border focus:outline-none] text-[38px] font-['Abel'] text-center text-black"
                    id="amount"
                    type="number"
                    max={maxNum}
                    name="amount"
                    autoComplete="off"
                    onChange={inputHandler}
                    value={amount}
                  />
                </div>
                <div className="self-center ml-[18px]">
                <svg
                      version="1.2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 17"
                      width="25"
                      height="17"
                      className="cursor-pointer h-[15px] md:h-[20px] transition ease-in-out delay-100 hover:scale-125 duration-200"
                      onClick={() => {
                        increaseAmount()
                      }}
                    >
                      <defs>
                        <image
                          width="25"
                          height="17"
                          id="img1"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAMAAAAfZPc8AAAAAXNSR0IB2cksfwAAADNQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAowVGyQAAABF0Uk5TABB/rzDv/88gsE8/4NCAQHCdO8GuAAAAYElEQVR4nHXOWxKAIAwEwQ3yVpH7n1ZQUAgwv12VDfBFYhOESVJprZVcwIwKjPSAsWagFwjEqQI4/cCohY56aIhDJQvHoZBDdr/3+XRH4dDzToSFBJCbgsuDVwy8mJ6+Ad8BBrUxgoalAAAAAElFTkSuQmCC"
                        />
                      </defs>
                      <style></style>
                      <use href="#img1" x="0" y="0" />
                    </svg>

                    <svg
                      version="1.2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 17"
                      width="25"
                      height="17"
                      onClick={() => {
                        decreaseAmount()
                      }}
                      className="rotate-180 cursor-pointer h-[20px] transition ease-in-out delay-100 hover:scale-125 duration-200"
                    >
                      <defs>
                        <image
                          width="25"
                          height="17"
                          id="img1"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAMAAAAfZPc8AAAAAXNSR0IB2cksfwAAADNQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAowVGyQAAABF0Uk5TABB/rzDv/88gsE8/4NCAQHCdO8GuAAAAYElEQVR4nHXOWxKAIAwEwQ3yVpH7n1ZQUAgwv12VDfBFYhOESVJprZVcwIwKjPSAsWagFwjEqQI4/cCohY56aIhDJQvHoZBDdr/3+XRH4dDzToSFBJCbgsuDVwy8mJ6+Ad8BBrUxgoalAAAAAElFTkSuQmCC"
                        />
                      </defs>
                      <style></style>
                      <use href="#img1" x="0" y="0" />
                    </svg>
                  </div>
              </div>
              {
                (
                  <button
                    type="button"
                    onClick={(e: any) => {
                      e.preventDefault()
                      onMint(amount)
                    }}
                    className="mt-auto group flex justify-center items-center relative md:w-full h-[80px] w-[100%] bg-[#5765F1] text-white rounded-2xl lg:text-[38px] md:text-[32px] text-[28px] font-bold font-['Abel'] cursor-pointer overflow-hidden transition duration-200 ease-in-out hover:bg-[#5764f1dc]"
                  >
                    MINT
                    {/* NFT Art price */}
                    <span className="ml-5">
                      ({parseFloat(formatEther(price.mul(amount))).toFixed(2)}ETH)
                    </span>
                    {/* shine box */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
                  </button>
                )
              }
              
            </div>
        </div>
      </div>
    </Transition>
  )
}
