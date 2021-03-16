import React, {useState}from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {savePaymentMethod} from "../actions/cartActions";

import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const PaymentScreen= ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('')


    const onSubmitHandler = e => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
        console.log(paymentMethod)
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group>
                    <Form.Label as = "legend" >Select Method</Form.Label>

                <Col>
                    <Form.Check type = "radio"
                                label = "Paypal or Credit Card"
                                id = "PayPal"
                                name = "paymentMethod"
                                value = "PayPal"
                                checked
                                onChange={e => setPaymentMethod(e.target.value)}>
                    </Form.Check>

                    <Form.Check type = "radio"
                                label = "Stripe"
                                id = "Stripe"
                                name = "paymentMethod"
                                value = "Stripe"
                                onChange={e => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                </Col>
                </Form.Group>
                <Button type="submit" variant = "primary" >Conteinue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen