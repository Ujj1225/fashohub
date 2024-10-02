import { Link } from "react-router-dom";
import { vendorNavData } from "./data/vendorNavData";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import Logo from "../../../public/logo.png";
const VendorSideNav = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      {/* sidebar for desktop view */}
      <div className="w-[25%] bg-blue-500 p-4 min-h-screen block md:hidden">
        <Link to="/vendor" className="flex items-center">
          <img src={Logo} alt="Logo" className="w-16 h-16" />
          <p className="ml-4 text-4xl font-extrabold text-white">Vendor</p>
        </Link>
        {vendorNavData.map((item, index) => (
          <Link
            key={index}
            to={`/vendor/${item.replace(/\s+/g, "-").toLowerCase()}`}
          >
            <button className="flex text-white hover:text-gray-300 mt-14">
              {item}
            </button>
          </Link>
        ))}
        <Link to="/">
          <button className="flex text-white hover:text-gray-300 mt-14">
            FashoHub Home
          </button>
        </Link>
      </div>

      {/* sidebar for mobile view */}
      <CiMenuBurger
        className="hidden md:block absolute top-14 left-4 bg-gray-200 p-2 rounded-sm z-50"
        size={30}
        onClick={() => setShowNav(!showNav)}
      />
      {showNav && (
        <div className="md:fixed top-0 left-0 md:w-[75%] h-full bg-blue-500 p-4 z-40">
          <Link to="/vendor" className="flex items-center md:mt-20">
            <img src={Logo} alt="Logo" className="w-12 h-12" />
            <p className="ml-4 text-3xl font-extrabold text-white">Vendor</p>
          </Link>
          {vendorNavData.map((item, index) => (
            <Link
              key={index}
              to={`/vendor/${item.replace(/\s+/g, "-").toLowerCase()}`}
              onClick={() => setShowNav(false)}
            >
              <button className="flex text-white hover:text-gray-300 mt-10">
                {item}
              </button>
            </Link>
          ))}
          <Link to="/" onClick={() => setShowNav(false)}>
            <button className="flex text-white hover:text-gray-300 mt-10">
              FashoHub Home
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default VendorSideNav;
