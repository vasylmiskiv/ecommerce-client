import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {FaArrowCircleRight} from 'react-icons/fa'

export default function CheckoutSteps({step1, step2, step3, step4}) {
    return (
        <div>
            <Nav style = {{fontSize: '17px'}} className = "justify-content-around mb-4">

                <Nav.Item>
                    {step1 ? (
                        <LinkContainer to = "/login">
                            <Nav.Link>Sign In</Nav.Link>
                        </LinkContainer>
                    ): <Nav.Link disabled>sign In</Nav.Link>}
                </Nav.Item>
                <FaArrowCircleRight style={{margin:'12px'}} />

                <Nav.Item>
                    {step2 ? (
                        <LinkContainer to = "/shipping">
                            <Nav.Link>Shipping</Nav.Link>
                        </LinkContainer>
                    ): <Nav.Link disabled>Shipping</Nav.Link>}
                </Nav.Item>
                <FaArrowCircleRight style={{margin:'12px'}} />

                <Nav.Item>
                    {step3 ? (
                        <LinkContainer to = "/payment">
                            <Nav.Link>Payment</Nav.Link>
                        </LinkContainer>
                    ): <Nav.Link disabled>Payment</Nav.Link>}
                </Nav.Item>
                <FaArrowCircleRight style={{margin:'12px'}} />

                <Nav.Item>
                    {step4 ? (
                        <LinkContainer to = "/plcaeorder">
                            <Nav.Link>Placeorder</Nav.Link>
                        </LinkContainer>
                    ): <Nav.Link disabled>Placeorder</Nav.Link>}
                </Nav.Item>

            </Nav>
        </div>
    )
}
