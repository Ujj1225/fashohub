import { Link } from "react-router-dom";
import { deliveryPartnerNavData } from "./data/deliveryPartnerNavData";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import Logo from "../../../public/logo.png";
const DeliveryPartnerSideNav = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      {/* sidebar for desktop view */}
      <div className="w-[25%] bg-blue-500 p-4 min-h-screen block md:hidden">
        <Link to="/delivery-partner" className="flex items-center">
          <img src={Logo} alt="Logo" className="w-16 h-16" />
          <p className="ml-4 text-4xl font-extrabold text-white">
            Delivery Partner
          </p>
        </Link>
        {deliveryPartnerNavData.map((item, index) => (
          <Link
            key={index}
            to={`/delivery-partner/${item.replace(/\s+/g, "-").toLowerCase()}`}
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
          <Link to="/delivery-partner" className="flex items-center md:mt-20">
            <img src={Logo} alt="Logo" className="w-12 h-12" />
            <p className="ml-4 text-3xl font-extrabold text-white">
              Delivery Partner
            </p>
          </Link>
          {deliveryPartnerNavData.map((item, index) => (
            <Link
              key={index}
              to={`/delivery-partner/${item
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
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

export default DeliveryPartnerSideNav;
