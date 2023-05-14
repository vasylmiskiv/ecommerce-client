import { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useHistory, Route } from "react-router-dom";
import SearchBox from "./SearchBox";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { Link } from "react-router-dom";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosLogIn } from "react-icons/io";
import { GrUp, GrDown } from "react-icons/gr";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineTool,
} from "react-icons/ai";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { FaUsers, FaProductHunt, FaMoneyBill } from "react-icons/fa";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";

const Header = () => {
  const [headerColor, setHeaderColor] = useState("#3B82F6");

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
            className="text-white hover:no-underline flex items-center justify-center"
          >
            <img
              alt="logo"
              style={{ height: "18px" }}
              src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyLjAwOSA1MTIuMDA5IiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMi4wMDkgNTEyLjAwOSIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48cGF0aCBkPSJtNDMyLjAwOCA0MGgtMTYyLjc1Yy0xMC42OCAwLTIwLjczIDQuMTYtMjguMjggMTEuNzJsLTIzMC4xNCAyMzAuMTRjLTE0LjQ1OCAxNC40NTgtMTQuNDQ0IDM3LjgzNiAwIDUyLjI4bDE2Ny4wMyAxNjcuMDNjMTQuNDU5IDE0LjQ1OCAzNy44MzYgMTQuNDQ0IDUyLjI4IDAgMTIwLjA2NC0xMjAuMDUxIDY3LjA0Ni02Ny4wMzMgMjMwLjE0LTIzMC4xNCA3LjU2LTcuNTYgMTEuNzItMTcuNiAxMS43Mi0yOC4yOHYtMTYyLjc1YzAtMjIuMDYtMTcuOTQtNDAtNDAtNDB6bS01NiAxMjhjLTE3LjY1IDAtMzItMTQuMzYtMzItMzJzMTQuMzUtMzIgMzItMzIgMzIgMTQuMzYgMzIgMzItMTQuMzUgMzItMzIgMzJ6IiBmaWxsPSIjNzljYjljIi8+PHBhdGggZD0ibTQzMi4wMDggNDBoLTQwYzIyLjA2IDAgNDAgMTcuOTQgNDAgNDB2MTYyLjc1YzAgMTAuNjgtNC4xNiAyMC43Mi0xMS43MiAyOC4yOC0yNDguNjkxIDI0OC43MS0yMzEuMTA4IDIzMS43NTItMjM2LjI4IDIzNS4wOTQgMTMuOTc0IDkuMDMgMzMuMzI3IDcuODU5IDQ2LjE0LTQuOTU0IDEyMC4wNjQtMTIwLjA1MSA2Ny4wNDYtNjcuMDMzIDIzMC4xNC0yMzAuMTQgNy41Ni03LjU2IDExLjcyLTE3LjYgMTEuNzItMjguMjh2LTE2Mi43NWMwLTIyLjA2LTE3Ljk0LTQwLTQwLTQweiIgZmlsbD0iIzYzYWM3ZCIvPjxwYXRoIGQ9Im0zNzYuMDA4IDE0NGMtNy4wNjQgMC0xMC43MTEtOC42MDItNS42NTctMTMuNjU3bDEyOC0xMjhjMy4xMjQtMy4xMjMgOC4xODktMy4xMjMgMTEuMzEzIDAgMy4xMjUgMy4xMjUgMy4xMjUgOC4xODkgMCAxMS4zMTRsLTEyOCAxMjhjLTEuNTYxIDEuNTYyLTMuNjA4IDIuMzQzLTUuNjU2IDIuMzQzeiIgZmlsbD0iI2YxY2M3NiIvPjwvZz48L3N2Zz4="
            />
            <div className="text-xl">
              <span className="text-green-500 text-2xl">E</span>commerce
            </div>
          </Link>
        </div>

        <SearchBox history={history} onChangeHeaderColor={setHeaderColor} />

        <div className="flex items-center gap-8">
          <Link
            to="/cart"
            className="font-bold text-white flex justify-center items-center gap-2"
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
                    <SlArrowUp size={16} />
                  ) : (
                    <SlArrowDown size={16} />
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
                      className="text-black flex items-center gap-4 hover:no-underline hover:text-black"
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
              className="text-white ml-4 font-bold flex flex-center items-center gap-2"
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
                <div className="flex items-center justify-center gap-2 hover:underline hover:text-gray-00">
                  <AiOutlineTool size={18} />
                  Admin tools
                </div>
              </button>

              {isAdminToolsOpen && (
                <div className="absolute z-50 right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
                  <Link
                    to="/admin/userslist"
                    className="text-black flex items-center px-4 py-2 gap-4 hover:no-underline hover:text-black hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsAdminToolsOpen(false)}
                  >
                    <FaUsers />
                    Users
                  </Link>
                  <Link
                    to="/admin/productlist"
                    className="text-black flex items-center px-4 py-2 gap-4 hover:no-underline hover:text-black hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsAdminToolsOpen(false)}
                  >
                    <FaProductHunt />
                    Products
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    className="text-black flex items-center px-4 py-2 gap-4 hover:no-underline hover:text-black hover:bg-gray-100 cursor-pointer"
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
