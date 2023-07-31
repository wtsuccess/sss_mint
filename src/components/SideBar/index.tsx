import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import sideMenu from './menu.json'

interface PropsType {
  isOpen: boolean,
  closeSideBar: any
}
const SideBar = ({ isOpen, closeSideBar }: PropsType) => {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition-all duration-700"
      enterFrom="-translate-x-[400px]"
      enterTo=""
      leave="transition-all duration-700"
      leaveFrom=""
      leaveTo="-translate-x-[400px]"
    >
      <div className="absolute top-0 left-0 w-[300px] h-screen">
        <div className="flex md:hidden flex-col bg-black pl-10 z-40 h-screen">
          <button
            className="grow-[3] ml-auto mr-4"
            onClick={() => closeSideBar(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 absolute top-[10px] right-[20px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="grow-[8]">
            <ul className="grid text-base text-white text-[14px] leading-[14px] font-['Abel'] gap-3">
              {sideMenu.map((menu,index) => {
                return (
                <li key={index} className="group hover:cursor-pointer  transition-all duration-300 uppercase">
                  <a className='pl-[10px] group-hover:text-[#5765F1]' href={menu.link}>{menu.title}</a>
                  <div className="transition-all -ml-10px mt-[5px] duration-200 opacity-0 ease-in group-hover:ease-out group-hover:opacity-100 w-full h-[3px] bg-[#5765F1]"></div>
                </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default SideBar
