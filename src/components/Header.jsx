import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useHistory } from "react-router-dom";
import SearchBox from "./SearchBox";
import CurrencyWidget from "./CurrencyWidget";

import "react-dropdown/style.css";

import LogoPath from "../assets/logo.svg";

import { Link } from "react-router-dom";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosLogIn } from "react-icons/io";
import { AiOutlineTool } from "react-icons/ai";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { FaUsers, FaProductHunt, FaMoneyBill } from "react-icons/fa";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";

const Header = () => {
  const [isProfileOpen, seIsProfileOpen] = useState(false);
  const [isAdminToolsOpen, setIsAdminToolsOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const profileDropdownRef = useRef(null);
  const adminToolsDropdownRef = useRef(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        seIsProfileOpen(false);
      }

      if (
        adminToolsDropdownRef.current &&
        !adminToolsDropdownRef.current.contains(event.target)
      ) {
        setIsAdminToolsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [profileDropdownRef, adminToolsDropdownRef]);

  return (
    <header className="bg-zinc-800 text-white py-4">
      <div className="container flex gap-8">
        <div className="flex justify-between">
          <Link
            to="/"
            className="text-white no-underline flex items-center justify-center"
          >
            <img src={LogoPath} alt="logo" className="w-5" />
            <div className="text-xl hover:decoration-none">
              <span className="text-green-500 text-2xl">E</span>commerce
            </div>
          </Link>
        </div>

        <SearchBox history={history} />
        <CurrencyWidget />

        <div className="flex items-center gap-8">
          <Link
            to="/cart"
            className="font-bold text-white no-underline flex justify-center items-center gap-2 hover:underline"
          >
            <AiOutlineShoppingCart size={16} />
            <div>Cart</div>
          </Link>

          {userInfo ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                className="font-bold rounded inline-flex items-center"
                onClick={() => seIsProfileOpen(!isProfileOpen)}
              >
                <span className="py-2 text-white flex items-center gap-2 hover:underline">
                  {isProfileOpen ? (
                    <SlArrowUp size={12} />
                  ) : (
                    <SlArrowDown size={12} />
                  )}
                  {userInfo.name}
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute z-50 right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
                  <div
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                  >
                    <Link
                      to="/profile"
                      className="text-black flex items-center gap-4 no-underline"
                      onClick={() => seIsProfileOpen(false)}
                    >
                      <CgProfile />
                      Profile
                    </Link>
                  </div>
                  <div
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={logoutHandler}
                  >
                    <div className="flex items-center gap-4">
                      <CgLogOut size={18} />
                      Log out
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white ml-4 no-underline font-bold flex flex-center items-center gap-2 hover:underline"
            >
              <IoIosLogIn size={16} /> Sign In
            </Link>
          )}

          {userInfo && userInfo.isAdmin && (
            <div className="relative" ref={adminToolsDropdownRef}>
              <button
                className="font-bold py-2 rounded inline-flex items-center"
                onClick={() => setIsAdminToolsOpen(!isAdminToolsOpen)}
              >
                <div className="flex items-center no-underline justify-center gap-2 hover:underline hover:text-gray-00">
                  <AiOutlineTool size={18} />
                  Admin tools
                </div>
              </button>

              {isAdminToolsOpen && (
                <div className="absolute z-50 right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
                  <Link
                    to="/admin/userslist"
                    className="text-black flex items-center px-4 py-2 gap-4 no-underline hover:text-black hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsAdminToolsOpen(false)}
                  >
                    <FaUsers />
                    Users
                  </Link>
                  <Link
                    to="/admin/productlist"
                    className="text-black flex items-center px-4 py-2 gap-4 no-underline hover:text-black hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsAdminToolsOpen(false)}
                  >
                    <FaProductHunt />
                    Products
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    className="text-black flex items-center px-4 py-2 gap-4 no-underline hover:text-black hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsAdminToolsOpen(false)}
                  >
                    <FaMoneyBill />
                    Orders
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
