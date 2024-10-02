import { CiHeart, CiSearch, CiMenuBurger } from "react-icons/ci";
import {
  IoBagOutline,
  IoChevronDown,
  IoChevronForward,
  IoPersonCircle,
  IoLogInOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { useState, useEffect } from "react";
import MSearch from "./MSearch";
import { Link, useNavigate } from "react-router-dom";
import { categoriesData } from "../../data/categoriesData";
import "./MNavbar.css";
import { images } from "../../data/imageData";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../store/slices/userApiSlice";
import { logout } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import { useGetWishlistQuery } from "../../store/slices/wishlistApiSlice";
import { useGetBagItemsQuery } from "../../store/slices/bagApiSlice";

const MNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchClicked, setSearchClicked] = useState(false);
  const [burgerClicked, setBurgerClicked] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubCategories, setExpandedSubCategories] = useState({});

  const { data: wishlist } = useGetWishlistQuery();
  const { data: bag } = useGetBagItemsQuery();

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
      setBurgerClicked(false);
    } catch (error) {
      console.log("Logout error:", error);
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleSearchClick = () => {
    setSearchClicked(!searchClicked);
  };

  const handleBurger = (e) => {
    e.stopPropagation();
    setBurgerClicked(!burgerClicked);
  };

  const handleOutsideClick = (e) => {
    if (burgerClicked && !e.target.closest(".menu-container")) {
      setBurgerClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [burgerClicked]);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleSubCategory = (category, subCategory) => {
    setExpandedSubCategories((prev) => ({
      ...prev,
      [`${category}-${subCategory}`]: !prev[`${category}-${subCategory}`],
    }));
  };

  const mobNav = (
    <div className="flex justify-between items-center p-5 border-b-2">
      <div className="flex items-center space-x-3">
        <div className="cursor-pointer" onClick={handleBurger}>
          <CiMenuBurger className="w-8 h-8" />
        </div>
        <div className="text-lg font-semibold cursor-pointer">
          <Link to="/">FashoHub</Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="msearch" onClick={handleSearchClick}>
          <CiSearch className="w-8 h-8" />
        </div>
        <Link to="/wishlist" className="relative">
          <CiHeart className="w-8 h-8" />
          {wishlist && userInfo && wishlist.length > 0 && (
            <p className="absolute -top-2 -right-3 border px-2 py-0.5 text-center rounded-md bg-pink-500 font-bold text-white text-xs">
              {wishlist.length}
            </p>
          )}
        </Link>
        <Link to="/bag" className="relative">
          <IoBagOutline className="w-8 h-8" />
          {bag && userInfo && bag.products.length > 0 && (
            <p className="absolute -top-2 -right-2 border px-2 py-0.5 text-center rounded-md bg-green-500 font-bold text-white text-xs">
              {bag.products.length}
            </p>
          )}
        </Link>
      </div>
    </div>
  );

  const renderMenuItems = () => {
    return Object.keys(categoriesData).map((category) => (
      <div key={category}>
        <div className="category" onClick={() => toggleCategory(category)}>
          <span>{category}</span>
          {expandedCategories[category] ? (
            <IoChevronDown
              className="expansion-icon expanded"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <IoChevronForward
              className="expansion-icon"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
        <div
          className={`category-content ${
            expandedCategories[category] ? "expanded" : "collapsed"
          }`}
        >
          {Object.keys(categoriesData[category]).map((subCategory) => (
            <div key={subCategory}>
              <div
                className="subcategory"
                onClick={() => toggleSubCategory(category, subCategory)}
              >
                <span>{subCategory}</span>
                {expandedSubCategories[`${category}-${subCategory}`] ? (
                  <IoChevronDown
                    className="expansion-icon expanded"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <IoChevronForward
                    className="expansion-icon"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
              <div
                className={`subcategory-content ${
                  expandedSubCategories[`${category}-${subCategory}`]
                    ? "expanded"
                    : "collapsed"
                }`}
              >
                <ul onClick={handleBurger}>
                  {categoriesData[category][subCategory].map((item) => (
                    <li key={item} className="item">
                      <Link
                        to={`/${category
                          .replace(/\s+/g, "-")
                          .toLowerCase()}/${subCategory
                          .replace(/\s+/g, "-")
                          .toLowerCase()}/${item
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                        className="hover:text-gray-800"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div>
      {searchClicked ? (
        <MSearch handleSearchClick={handleSearchClick} />
      ) : (
        mobNav
      )}
      {burgerClicked && (
        <div className="overlay show">
          <div className="menu-container">
            <div className="menu-header">
              <img src={images[0].image} alt="Menu" className="menu-image" />
            </div>
            <div className="menu-content drop-shadow-md border-b border-gray-200">
              {renderMenuItems()}
            </div>
            <div className="additional-options pl-6 drop-shadow border-b border-gray-200">
              <div>Gift Cards</div>
              <div>Contact Us</div>
              <div>FAQ</div>
              <div>Legals</div>
            </div>
            <div className="flex flex-col items-center mt-4 mb-4 space-y-2 w-full px-4">
              {userInfo ? (
                <Link to="/profile" className="w-full" onClick={handleBurger}>
                  <div className="text-white bg-red-600 font-semibold border w-full py-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-red-700 flex items-center justify-center space-x-2 shadow-lg">
                    <IoPersonCircle className="w-6 h-6" />
                    <span>View Profile</span>
                  </div>
                </Link>
              ) : (
                <Link to="/login" className="w-full" onClick={handleBurger}>
                  <div className="text-white bg-blue-600 font-semibold border w-full py-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-blue-700 flex items-center justify-center space-x-2 shadow-lg">
                    <IoLogInOutline className="w-6 h-6" />
                    <span>LOGIN/SIGNUP</span>
                  </div>
                </Link>
              )}
              {userInfo && (
                <button
                  className="text-white bg-gray-600 font-semibold border w-full py-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-700 flex items-center justify-center space-x-2 shadow-lg"
                  onClick={handleLogout}
                >
                  <IoLogOutOutline className="w-6 h-6" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MNavbar;
