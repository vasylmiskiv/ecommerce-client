import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetails, payOrder, deliverOrder} from "../actions/orderActions"
import axios from "axios";
import  {PayPalButton} from 'react-paypal-button-v2'
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET, ORDER_DETAILS_RESET} from "../constants/orderConstants"
import {removeAllFromCart} from '../actions/cartActions'


import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const rounded = number => {
        return parseFloat(number).toFixed(2);
    }

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    //getting user info from state
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading:loadingDeliver, success: successDeliver} = orderDeliver

    useEffect(()=> {
        if(!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async() => {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () =>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
     
        if(!order || successPay || successDeliver) {
            dispatch({type: ORDER_DETAILS_RESET})
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid) {
            if(!window.paypal) {
                dispatch(removeAllFromCart())
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    },[orderId, dispatch, successPay, order, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>
        :  <div>
            <ListGroup variant = 'flush'> </ListGroup>
            
            <Row>
                <Col md = {8}>
                    <ListGroup variant = 'flush'>
                    {order.isPaid ? (<ListGroup.Item variant="success"><h1>Order {order.userId._id}</h1></ListGroup.Item>) :
                                        (<ListGroup.Item variant="dark"><h1>Order {order.userId._id}</h1></ListGroup.Item>)}
                   
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                          <p>  <strong>Name: </strong> {userInfo.name}</p>
                            <p>
                           <strong>Email: </strong>
                                <a href={`mailto:${userInfo.email}`}>
                                 {userInfo.email}
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
                                <div>
                                    {order.isDelivered ? <Message variant = "success"> Has been delivered {order.deliveredAt} </Message>:
                                        <Message variant = "primary"> Have not delivered yet</Message>}
                                </div>

                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                           <p><strong>Method: </strong> {order.paymentMethod}</p>

                            <p>
                          
                                    {order.isPaid ? <Message variant = "success"> Has been paid {order.paidAt} </Message>:
                                        <Message variant = "primary"> Have not paid yet</Message>}
                            

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
                                    <Col>Shipping</Col>
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

                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader/>}
                                        {!sdkReady ? <Loader/> : (
                                            <PayPalButton 
                                            amount = {order.totalPrice} 
                                            onSuccess= {successPaymentHandler}
                                            />
                                        )}
                                        {loadingDeliver && <Loader/>}
                                        
                                    </ListGroup.Item>
                                    
                                )}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&(
                                            <ListGroup.Item>
                                                <Button 
                                                type = "button" 
                                                className = "btn btn-block"
                                                onClick = {deliverHandler}
                                                >
                                                    Mark as delivered
                                                </Button>
                                            </ListGroup.Item>
                                        )}
                        </ListGroup>
                    </Card>

                </Col>
            </Row>
   </div>

};

export default OrderScreen