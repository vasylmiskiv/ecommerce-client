import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { listUsers, deleteUser } from "../actions/userActions";
import useAppSelector from "../hooks/useAppSelector";

import Loader from "../components/Loader";
import Message from "../components/Message";

import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const UserListScreen = () => {
  const { userList, userLogin, userDelete } = useAppSelector((state) => ({
    userList: state.userList,
    userLogin: state.userLogin,
    userDelete: state.userDelete,
  }));

  const { loading, error, users } = userList;
  const { userInfo } = userLogin;
  const { success } = userDelete;

  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, success, userInfo]);

  const deleleteHandler = (id) => {
    if (window.confirm(`Do you want to delete ${id}?`)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-3xl font-bold">Users</h1>
      <div className="h-[1px] w-full bg-gray-200"></div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="mt-3.5 overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-zinc-600 text-white">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Admin</th>
                <th className="py-2 px-4 border">Tools</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{user._id}</td>
                  {user.isAdmin ? (
                    <td className="py-2 px-4 border">
                      <div className="flex justify-center text-green-600 font-medium">
                        {user.name}
                      </div>
                    </td>
                  ) : (
                    <td className="py-2 px-4 border">
                      <div className="flex justify-center">{user.name}</div>
                    </td>
                  )}
                  <td className="py-2 px-4 border">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
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
                      <Link
                        to={`/admin/user/${user._id}/edit`}
                        className="h-full px-3 py-1.5 rounded-lg bg-green-300 hover:bg-green-500"
                      >
                        <MdEditNote size={18} color="black" />
                      </Link>
                      {!user.isAdmin ? (
                        <button
                          className="px-3 py-1 rounded-lg bg-red-200  hover:bg-red-400"
                          onClick={() => {
                            deleleteHandler(user._id);
                          }}
                        >
                          <FaTrashAlt />
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-3 py-1 rounded-lg bg-gray-200 cursor-not-allowed"
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
    </div>
  );
};

export default UserListScreen;
