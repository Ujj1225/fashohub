import React, { useState } from "react";
import { ProfileIcon, WishlistIcon, BagIcon, SearchIcon } from "./Navicons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../store/slices/userApiSlice";
import { logout } from "../../store/slices/authSlice";
import Navlinks from "./Navlinks";
import { toast } from "react-toastify";
import { useGetWishlistQuery } from "../../store/slices/wishlistApiSlice";
import { useGetBagItemsQuery } from "../../store/slices/bagApiSlice";
import { Affix } from "@mantine/core";
import Logo from "../../../public/logo.png";

function Navbar() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdownTimer, setDropdownTimer] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: wishlist } = useGetWishlistQuery();
  const { data: bag } = useGetBagItemsQuery();

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleMouseEnter = () => setIsDropdownVisible(true);

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsDropdownVisible(false);
    }, 200);
    setDropdownTimer(timer);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimer) {
      clearTimeout(dropdownTimer);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (dropdownTimer) {
      clearTimeout(dropdownTimer);
    }
  };

  const handleCloseDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <Affix position={{ top: 0, left: 0, right: 0 }}>
      <nav className="flex items-center justify-center bg-white font-medium drop-shadow-md py-4 pr-6 pl-10 z-50 relative">
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            className="cursor-pointer w-10 h-10 justify-start"
          />
        </Link>
        <div className="w-[50%] flex items-center uppercase justify-center gap-6 xxl:gap-3">
          <Navlinks />
        </div>
        <div className="w-[30%] flex gap-2 p-2 rounded-sm justify-center items-center pr-3 bg-gray-100">
          <SearchIcon />
          <input
            className="w-full bg-transparent outline-none placeholder:font-light text-sm"
            type="text"
            placeholder="Search for products, brands and many more"
          />
        </div>
        <div className="w-[20%] flex justify-evenly items-center relative">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <div className="cursor-pointer">
              <ProfileIcon />
            </div>

            {isDropdownVisible && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 mt-4 bg-white border border-gray-300 shadow-xl w-72 rounded-md p-8 max-w-sm border-t-0 z-50"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <div className="drop-shadow-sm border-b border-gray-400 pb-4">
                  <p className="font-bold text-lg">Welcome</p>
                  <p className="font-light text-sm text-gray-600 whitespace-nowrap">
                    To access account and manage orders
                  </p>
                  {userInfo ? (
                    <Link to="/profile" onClick={handleCloseDropdown}>
                      <div className="text-red-600 font-semibold border w-fit mt-2 px-4 py-1 rounded-md cursor-pointer transition-all duration-200 hover:border-red-600 hover:bg-red-50">
                        View Profile
                      </div>
                    </Link>
                  ) : (
                    <Link to="/login" onClick={handleCloseDropdown}>
                      <div className="text-red-600 font-semibold border w-fit mt-2 px-4 py-1 rounded-md cursor-pointer transition-all duration-200 hover:border-red-600 hover:bg-red-50">
                        LOGIN/SIGNUP
                      </div>
                    </Link>
                  )}
                </div>
                <div className="drop-shadow-lg border-b border-gray-400 pb-4 mt-4">
                  <ul className="font-light text-gray-700">
                    <Link to="/myorders">
                      <li className="hover:font-bold hover:text-gray-900 transition-all duration-150 cursor-pointer">
                        Orders
                      </li>
                    </Link>
                    <Link to="/wishlist">
                      <li className="hover:font-bold hover:text-gray-900 transition-all duration-150 cursor-pointer mt-2">
                        Wishlist
                      </li>
                    </Link>
                    {/* <li className="hover:font-bold hover:text-gray-900 transition-all duration-150 cursor-pointer mt-2">
                    GiftCards
                  </li> */}
                    <li className="hover:font-bold hover:text-gray-900 transition-all duration-150 cursor-pointer mt-2">
                      Contact Us
                    </li>
                  </ul>
                </div>
                <div className="mt-4">
                  <ul className="font-light text-gray-700">
                    {/* <li className="hover:font-bold hover:text-gray-900 transition-all duration-150 cursor-pointer">
                    Coupons
                  </li> */}
                    <Link to="/myaddress">
                      <li className="hover:font-bold hover:text-gray-900 transition-all duration-150 cursor-pointer mt-2">
                        Saved Address
                      </li>
                    </Link>
                    {userInfo && (
                      <button
                        className="font-bold text-red-600 hover:text-red-800 transition-all duration-150 cursor-pointer mt-2"
                        onClick={() => {
                          handleLogout();
                          handleCloseDropdown();
                        }}
                      >
                        Logout
                      </button>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <Link to="/wishlist" className="relative">
            <WishlistIcon />
            {wishlist && userInfo && wishlist.length > 0 && (
              <p className="absolute -top-2 -right-3 border px-2 py-0.5 text-center rounded-md bg-pink-500 font-bold text-white text-xs">
                {wishlist.length}
              </p>
            )}
          </Link>
          <Link to="/bag" className="relative">
            <BagIcon />
            {bag && userInfo && bag.products.length > 0 && (
              <p className="absolute -top-2 -right-5 border px-2 py-0.5 text-center rounded-md bg-green-500 font-bold text-white text-xs">
                {bag.products.length}
              </p>
            )}
          </Link>
        </div>
      </nav>
    </Affix>
  );
}

export default Navbar;
