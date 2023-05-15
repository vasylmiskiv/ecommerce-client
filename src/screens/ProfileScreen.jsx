import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import useAppSelector from "../hooks/useAppSelector";

import Message from "../components/Message";
import Loader from "../components/Loader";

import { AiOutlineCheck } from "react-icons/ai";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { userDetails, userLogin, userUpdateProfile, orderListMy } =
    useAppSelector((state) => ({
      userDetails: state.userDetails,
      userLogin: state.userLogin,
      userUpdateProfile: state.userUpdateProfile,
      orderListMy: state.orderListMy,
    }));

  const { loading, error, user } = userDetails;
  const { userInfo } = userLogin;
  const { success } = userUpdateProfile;
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    dispatch(listMyOrders());

    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, user, dispatch, history]);

  const sumbitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className="container mt-4 flex gap-5">
      <div className="w-1/2">
        <h1 className="text-3xl font-semibold">User Profile</h1>
        <div className="h-[1px] w-full bg-gray-200"></div>
        {success && (
          <div className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-5 py-2 shadow-md mt-2">
            <p className="font-bold flex gap-1 items-center">
              <AiOutlineCheck size={16} className="mb-0.5" />
              Success: <span className="font-normal">{success}</span>
            </p>
          </div>
        )}
        {message && (
          <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md my-2">
            <p className="font-bold">Error:</p>
            <p>{message}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md my-2">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}
        {loading && <Loader />}
        <form
          onSubmit={sumbitHandler}
          className="mt-3.5 border py-5 px-20 rounded-md shadow "
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email Adress
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full py-3.5 px-3 outline-none text-gray-700 focus:border"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Your confirmed password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="appearance-none border rounded w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </form>
      </div>

      <div className="w-1/2">
        <h1 className="text-3xl font-bold">My orders</h1>
        <div className="h-[1px] w-full bg-gray-200"></div>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <div className="mt-3.5 overflow-x-auto shadow-lg rounded-lg">
            <table className="table-auto w-full border-collapse border">
              <thead>
                <tr className="bg-zinc-600 text-white">
                  <th className="px-4 text-left border">ID</th>
                  <th className="px-4 py-2 text-left border">Date</th>
                  <th className="px-4 py-2 text-left border">Total</th>
                  <th className="px-4 py-2 text-left border">Paid</th>
                  <th className="px-4 py-2 text-left border">Delivered</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border hover:bg-gray-100">
                    <td className="px-4">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          to={`/order/${order._id}`}
                          className="text-black no-underline hover:underline"
                        >
                          {order._id}
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-2 border">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="px-4 py-2 border">{order.totalPrice}</td>
                    <td className="px-4 py-2 border">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times text-red-500"></i>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times text-red-500"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
