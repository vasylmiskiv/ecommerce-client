import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { login } from "../actions/userActions";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { HiOutlineLockClosed } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";

import LoginCover from "../assets/login-cover.jpg";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div className="w-full h-screen flex justify-between">
      <div className="w-1/2 h-full">
        <img
          src={LoginCover}
          alt="login-cover"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 flex justify-center">
        <div className="mt-36 w-[700px] h-[580px] border pt-10 pb-20 px-16 shadow-lg rounded-lg">
          <div className="text-3xl font-semibold mb-4">Sign In</div>
          {error && <Message variant="danger">{error}</Message>}
          <form onSubmit={submitHandler} className="mt-8">
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-gray-600">
                Email Address
              </label>
              <div className="flex items-center relative">
                <AiOutlineMail
                  size={18}
                  className="absolute left-3 text-gray-500 mb-[3px]"
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-b focus:outline-none focus:border-gray-400 transition-all outline-none duration-200"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-gray-600">
                Password
              </label>

              <div className="flex items-center relative">
                <HiOutlineLockClosed
                  size={18}
                  className="absolute left-3 text-gray-500 mb-[3px]"
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-b focus:outline-none focus:border-gray-400 transition-all outline-none duration-200"
                />
              </div>
              <div className="mt-2 text-right">
                <Link
                  className="text-xs text-gray-500 no-underline hover:text-gray-700 hover:underline"
                  to="#"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="mt-4 w-full text-center">
              <button
                type="submit"
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600 duration-200"
              >
                {loading ? (
                  <Loader className="absolute" button={true} />
                ) : (
                  `Sign In`
                )}
              </button>
              <div className="text-sm mt-4">
                <div>
                  New user?{" "}
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : "/register"
                    }
                    className="text-green-500 hover:text-green-600"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
