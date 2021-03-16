import React from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {saveShippingAdress} from "../actions/cartActions";

import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const PlaceOrderScreen = () => {

    const dispatch = useDispatch()

    const cart = useSelector((state => state.cart))

    //calc price
    cart.itemsPrice = cart.cartItems.reduce ((acc,i) => acc + i.price * i.qty, 0)

    //rounded
   const rounded = number => number.toFixed(2);

    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100
    cart.taxPrice = rounded(Number((0.2 * cart.itemsPrice)))
    cart.totalPrice = Number(cart.taxPrice) + Number(cart.itemsPrice)

    const placeOrderHandler = () => {
        console.log('ordrer')
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md = {8}>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong> <br/>
                                {cart.shippingAddress.address},<br/>
                                {cart.shippingAddress.city}, <br/>
                                {cart.shippingAddress.postalCode},<br/>
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message>
                            : (
                                <ListGroup variant= 'flush'>
                                    {cart.cartItems.map((item, index)=>(
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
                                                    {item.qty} x ${item.price} = ${rounded(item.qty
                                                    * item.price)}
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
                                    <Col>${rounded(cart.itemsPrice)}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shippings</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>VAT(20%)</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${rounded(cart.totalPrice)}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type = "button"
                                        className="btn-block"
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrderHandler}
                                >
                                    PlaceOrder
                                </Button>
                            </ListGroup.Item>


                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen