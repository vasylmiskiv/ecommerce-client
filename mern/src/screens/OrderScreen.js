import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetails} from "../actions/orderActions";

import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderScreen = ({ match }) => {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const rounded = number => {
        return parseFloat(number).toFixed(2);
    }

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    useEffect(()=> {
        dispatch(getOrderDetails(orderId))
    },[orderId, dispatch])

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>
        : <>
        <h1>Order {order._id}</h1>
            <Row>
                <Col md = {8}>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                          <p>  <strong>Name: </strong> {order.user.name}</p>
                            <p>
                           <strong>Email: </strong>  <a href={`mailto:${order.user.email}`}>
                                 {order.user.email}
                            </a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address},&nbsp;
                               {order.shippingAddress.city},&nbsp;
                                {order.shippingAddress.postalCode},&nbsp;
                                {order.shippingAddress.country}&nbsp;
                            </p>
                            <p>
                                {order.isDelivered ? <Message variant = "success"> Has been delivered {order.deliveredAt} </Message>:
                                    <Message variant = "primary"> Not delivered yet</Message>}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                           <p><strong>Method: </strong> {order.paymentMethod}</p>

                            <p>
                                {order.isPaid ? <Message variant = "success"> Has been paid  </Message>:
                                <Message variant = "primary"> Not paid yet</Message>}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Orders are empty</Message>
                                : (
                                    <ListGroup variant= 'flush'>
                                        {order.orderItems.map((item, index)=>(
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md = {3}>
                                                        <Image src = {item.image} alt ={item.name}
                                                               fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to ={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md = {4}>
                                                        {item.qty} x ${item.price} = ${item.qty
                                                        * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md ={4}>
                    <Card>
                        <ListGroup varient = "flush">

                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${rounded(order.itemsPrice)}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shippings</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>VAT(20%)</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        </>

};

export default OrderScreen