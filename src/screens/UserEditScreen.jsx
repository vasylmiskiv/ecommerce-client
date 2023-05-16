import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { USER_UPDATE_RESET } from "../constants/userConstants";
import { getUserDetails, updateUser } from "../actions/userActions";
import useAppSelector from "../hooks/useAppSelector";

import Loader from "../components/Loader";
import Message from "../components/Message";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { userDetails, userUpdate } = useAppSelector((state) => ({
    userDetails: state.userDetails,
    userUpdate: state.userUpdate,
  }));

  const { loading, error, user } = userDetails;
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      history.push(`/admin/userslist`);
      dispatch({ type: USER_UPDATE_RESET });
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, dispatch, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, _id: userId, isAdmin }));
  };

  return (
    <div className="container">
      <Link
        to="/admin/userslist"
        className="inline-block my-10 bg-zinc-600 px-4 py-2 text-white no-underline rounded-lg hover:bg-zinc-800"
      >
        Go back
      </Link>
      <div className="max-w-[650px] mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">Edit user</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="w-full ">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="isAdmin"
              >
                Password
              </label>
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <span className="text-sm">isAdmin</span>
            </div>

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditScreen;
