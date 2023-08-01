import ConnectButton from "../ConnectButton/ConnectButton";
import "./style.css";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-screen text-white z-10">
      <nav className="absolute w-screen md:selection:bg-black/50 h-min md:backdrop-blur-sm border-gray-200 px-2.5 py-2.5">
        <div className="flex flex-wrap justify-start">
          <div className="flex w-screen flex-wrap justify-between">
            <a
              href="https://mint.secretsealsociety.com"
              className="float-left py-1 px-3"
            >
              <img
                src={"/img/logo.png"}
                alt="logo"
                className="min-w-[150px] min-h-[35px] max-w-[150px] max-h-[35px]"
              />
            </a>
            <div className="ml-auto">
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
