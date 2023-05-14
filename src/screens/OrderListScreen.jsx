import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
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
    <>
      <h1 className="mt-4 text-3xl font-semibold">Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>EMAIL</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>REVIEW</th>
            </tr>
          </thead>
          <tbody>
            {orders.length ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  {order.userId.isAdmin ? (
                    <td>
                      <p style={{ color: "red" }}>{order.userId.name} </p>
                    </td>
                  ) : (
                    <td>{order.userId.name}</td>
                  )}
                  {!order.userId.isAdmin && order.userId ? (
                    <td>
                      <a href={`mailto: ${order.userId.email}`}>
                        {order.userId.email}
                      </a>
                    </td>
                  ) : (
                    <td></td>
                  )}
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    <LinkContainer to={`/admin/user/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))
            ) : (
              <div>Order list is empty</div>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
