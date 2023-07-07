import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";

import { GrClose } from "react-icons/gr";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import { listOrders, getOrderDetails } from "../actions/orderActions";
import useAppSelector from "../hooks/useAppSelector";

import Loader from "../components/Loader";
import Message from "../components/Message";

const tableHeaders = [
  { id: 1, name: "USER", order: "user", sorted: false },
  { id: 2, name: "EMAIL", order: "email", sorted: false },
  { id: 3, name: "DATE", order: "date", sorted: false },
  { id: 4, name: "TOTAL", order: "total", sorted: false },
  { id: 5, name: "PAID", order: "paid", sorted: false },
  { id: 6, name: "DELIVERED", order: "delivered", sorted: false },
];

const OrderListScreen = ({ history }) => {
  const [tableHeaderItems, setTableHeaderItems] = useState(tableHeaders);
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

  const handleItemSort = (id, order) => {
    setTableHeaderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, sorted: !item.sorted }
          : { ...item, sorted: false }
      )
    );

    const sort = (order) => {
      // need to rewire to redux toolkit rtk query/thunk
      switch (order) {
        case "name":
          dispatch(sortOrdersByName());
          break;
        case "email":
          dispatch(sortOrdersByEmail());
          break;
        case "date":
          dispatch(sortOrdersByDate());
          break;
        case "total":
          dispatch(sortOrdersByDate());
          break;
        case "paid":
          dispatch(sortOrdersByDate());
          break;
        case "delivered":
          dispatch(sortByDelivered());
          break;
        default:
          break;
      }
    };

    sort(order);
  };

  const handleGetOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
  };

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
                <th className="px-3 py-2">ID</th>
                {tableHeaderItems.map((item) => (
                  <th className="px-3 py-2">
                    <div className="flex justify-between items-center">
                      <div>{item.name}</div>
                      <div>
                        {item.sorted ? (
                          <SlArrowUp
                            size={12}
                            className="text-gray-200 hover:text-white cursor-pointer"
                            onClick={() => handleItemSort(item.id, item.order)}
                          />
                        ) : (
                          <SlArrowDown
                            size={12}
                            className="text-gray-200 hover:text-white cursor-pointer"
                            onClick={() => handleItemSort(item.id, item.order)}
                          />
                        )}
                      </div>
                    </div>
                  </th>
                ))}
                <th className="px-3 py-2">
                  <div className="flex justify-center items-center">REVIEW</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.length ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-100 duration-200"
                  >
                    <td className="border px-3 py-2 ">{order._id}</td>
                    {order.customer.isAdmin ? (
                      <td className="border px-3 py-2">
                        <div className="flex items-center justify-center">
                          <div className="text-red-500">
                            {order.customer.name}
                          </div>
                        </div>
                      </td>
                    ) : (
                      <td className="border px-3 py-2">
                        {order.customer.name}
                      </td>
                    )}
                    {!order.customer.isAdmin && order.customer ? (
                      <td className="border px-4 py-2">
                        <a
                          href={`mailto:${order.userId.email}`}
                          className="text-blue-500 hover:underline"
                        >
                          {order.userId.email}
                        </a>
                      </td>
                    ) : (
                      <td className="border px-3 py-2">
                        <a href={`mailto:${order.customer.email}`}>
                          {order.customer.email}
                        </a>
                      </td>
                    )}
                    <td className="border px-3 py-2">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="border px-3 py-2">{order.totalPrice}</td>
                    <td className="border px-3 py-2">
                      <div className="flex items-center justify-center">
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <GrClose />
                        )}
                      </div>
                    </td>
                    <td className="border">
                      <div className="flex items-center justify-center">
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <GrClose />
                        )}
                      </div>
                    </td>
                    <td className="border px-3 py-2">
                      <LinkContainer to={`/order/${order._id}`}>
                        <div className="flex justify-center">
                          <button
                            className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-2 py-1 rounded-md"
                            onClick={() => handleGetOrderDetails(order._id)}
                          >
                            Details
                          </button>
                        </div>
                      </LinkContainer>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-3 py-2" colSpan="8">
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
