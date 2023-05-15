import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";

import { listOrders } from "../actions/orderActions";
import useAppSelector from "../hooks/useAppSelector";

import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { orderList, userLogin } = useAppSelector((state) => ({
    orderList: state.orderList,
    userLogin: state.userLogin,
  }));

  const { loading, error, orders } = orderList;
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <div className="container">
      <h1 className="mt-4 text-3xl font-semibold">Orders</h1>
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
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">USER</th>
                <th className="px-4 py-2">EMAIL</th>
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">TOTAL</th>
                <th className="px-4 py-2">PAID</th>
                <th className="px-4 py-2">DELIVERED</th>
                <th className="px-4 py-2">REVIEW</th>
              </tr>
            </thead>
            <tbody>
              {orders.length ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="border px-4 py-2">{order._id}</td>
                    {order.userId.isAdmin ? (
                      <td className="border px-4 py-2">
                        <p className="text-red-500">{order.userId.name}</p>
                      </td>
                    ) : (
                      <td className="border px-4 py-2">{order.userId.name}</td>
                    )}
                    {!order.userId.isAdmin && order.userId ? (
                      <td className="border px-4 py-2">
                        <a
                          href={`mailto:${order.userId.email}`}
                          className="text-blue-500 hover:underline"
                        >
                          {order.userId.email}
                        </a>
                      </td>
                    ) : (
                      <td className="border px-4 py-2"></td>
                    )}
                    <td className="border px-4 py-2">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="border px-4 py-2">{order.totalPrice}</td>
                    <td className="border px-4 py-2">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times text-red-500"></i>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times text-red-500"></i>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <LinkContainer to={`/admin/user/${order._id}`}>
                        <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-2 py-1 rounded-md">
                          Details
                        </button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2" colSpan="8">
                    Order list is empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;
