import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { listUsers, deleteUser } from "../actions/userActions";
import useAppSelector from "../hooks/useAppSelector";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";

import { Link } from "react-router-dom";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { userList, userLogin, userDelete } = useAppSelector((state) => ({
    userList: state.userList,
    userLogin: state.userLogin,
    userDelete: state.userDelete,
  }));

  const { loading, error, users } = userList;
  const { userInfo } = userLogin;
  const { success } = userDelete;

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, success, userInfo]);

  const deleleteHandler = (id) => {
    if (window.confirm("Do u confirm it?")) {
      dispatch(deleteUser(id));
    }
  };

  console.log(users);

  return (
    <>
      <h1 className="mt-4 text-3xl font-semibold">Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">NAME</th>
                <th className="py-2 px-4 border">EMAIL</th>
                <th className="py-2 px-4 border">ADMIN</th>
                <th className="py-2 px-4 border">TOOLS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{user._id}</td>
                  {user.isAdmin ? (
                    <td className="py-2 px-4 border">
                      <div className="flex justify-center text-red-600 font-medium">
                        {user.name}
                      </div>
                    </td>
                  ) : (
                    <td className="py-2 px-4 border">
                      <div className="flex justify-center">{user.name}</div>
                    </td>
                  )}
                  <td className="py-2 px-4 border">
                    <a href={`mailto: ${user.email}`}>{user.email}</a>
                  </td>
                  <td className="py-2 px-4 border">
                    {user.isAdmin && (
                      <div className="flex justify-center">
                        <FaUserCheck size={18} />
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 border">
                    <div className="flex justify-center gap-2">
                      <Link to={`user/${user._id}/edit`}>
                        <button className="bg-green-200 btn-sm">
                          <MdEditNote size={18} color="black" />
                        </button>
                      </Link>
                      {!user.isAdmin ? (
                        <button
                          className="bg-red-200 btn-sm hover:bg-red-400"
                          onClick={() => {
                            deleleteHandler(user._id);
                          }}
                        >
                          <FaTrashAlt />
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-gray-200 btn-sm cursor-not-allowed"
                          onClick={() => {
                            deleleteHandler(user._id);
                          }}
                        >
                          <FaTrashAlt />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UserListScreen;
