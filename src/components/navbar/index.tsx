import { useState } from 'react'
import SideBar from '../SideBar'
import ConnectButton from '../ConnectButton/ConnectButton'
import './style.css'
import menuUrl from './menu.json'

const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  console.log('navbar');
  return (
    <div>
      <div className="fixed top-0 left-0 w-screen text-white z-10">
        <nav
          className={`absolute bg-[#2c2b2be6] w-screen md:selection:bg-black/50 ${
            !toggle ? 'h-screen' : ''
          } h-min md:backdrop-blur-sm border-gray-200 px-2.5 py-2.5`}
        >
          <div className="flex flex-wrap justify-start">
            <div className="flex w-screen flex-wrap justify-between">
              <a
                href="https://staging.aneroverse.com"
                className="float-left flex items-center justify-between py-1"
              >
                <img
                  src={'/img/logo.png'}
                  alt="logo"
                  className="min-w-[114px] min-h-[29px] max-w-[114px] max-h-[29px]"
                />
              </a>
              
              <div
                className={`hidden menu ml-6 transition-all duration-500 ease-in-out justify-around items-center w-full md:flex md:w-auto`}
              >
                <ul className="flex flex-col md:flex-row gap-[40px] md:gap-0 text-[20px] leading-[20px] md:text-[13px] md:leading-[20px] font-['Abel'] md:font-[400] uppercase">
            
                  {menuUrl.map((item, index) => {
                    return(
                    <li key={index} className="group relative text-white after:content-[''] after:hidden md:after:block  after:absolute after:w-1 after:h-1/2 after:border-l-2 after:border-solid after:top-1/2 after:right-0 after:-translate-y-1/2 last:after:hidden">
                      <a href={item.link} className="block px-5 md:border-0 text-white">
                        {item.title}
                      </a>
                      <div className="transition-all duration-200 opacity-0 ease-in group-hover:ease-out absolute -bottom-[10px] group-hover:opacity-100 group-hover:bottom-0 w-full h-[3px] bg-[#5765F1]"></div>
                    </li>
                  )
                  })}

                </ul>
              </div>
              
              <div className='ml-auto'><ConnectButton /></div>
              
              <div
                className={`hidden social-layout lg:flex flex-wrap items-center justify-center mr-[48px]`}
              >
                <a className="social-btn" href="https://twitter.com/aneroverse" target="_blank">
                  <button
                    type="button"
                    className="relative mr-6 ml-6 text-sm w-[30px] h-[30px] bg-white rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <i className="social-icon-circle"></i>
                    <svg width="20" height="20" fill="#1DA1F2" className="social-svg">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                    <i className="dash-animation"></i>
                  </button>
                </a>
                <a className="social-btn" href="https://instagram.com/mangakaua983" target="_blank">
                  <button
                    type="button"
                    className="relative mr-6 ml-6 text-sm w-[30px] h-[30px] bg-white rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <i className="social-icon-circle"></i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#FF69B4"
                      className="social-svg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                    </svg>
                    <i className="dash-animation"></i>
                  </button>
                </a>
                <a className="social-btn" href="https://discord.gg/anero" target="_blank">
                  <button
                    type="button"
                    className="relative mr-6 ml-6 text-sm w-[30px] h-[30px] bg-white rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <i className="social-icon-circle"></i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#7289da"
                      className="social-svg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                    </svg>
                  </button>
                </a>
              </div>
              <div className='burger-icon items-center top-[10px] flex'>
                <div
                  onClick={() => {
                    setToggle(!toggle)
                  }}
                  className="cursor-pointer md:hidden  w-[30px] flex flex-col gap-[7px] ml-3 mt-1"
                >
                  <span className="w-full h-[4px] rounded-full bg-white" />
                  <span className="w-full h-[4px] rounded-full bg-white" />
                  <span className="w-full h-[4px] rounded-full bg-white" />
                </div>
              </div>
            </div>


            {toggle && (
            <div
              className="fixed sidebar-background w-screen h-screen top-0 left-0 bg-black/50"
              onClick={() => setToggle(false)}
            ></div>)}

            <SideBar
              isOpen={toggle}
              closeSideBar={(val: any) => {
                setToggle(val)
              }}
            />
            
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
