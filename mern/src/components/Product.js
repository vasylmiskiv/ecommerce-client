//rafce
import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from '../components/Rating'


const Product = ({ product }) => {
    return (
         

        <Card style = {{boxShadow:"1px 1px 3px #777676"}} className = 'my-3 p-3 rounded'>
            <Link to = {`/product/${product._id}`}>
                <Card.Img  src = {product.image} variant= 'top'/>
            </Link>

        <Card.Body>
        <Link to = {`/product/${product._id}`}>
                <Card.Title as = 'div' style ={{color: '#3f3f3f', height: "50px"}}>
                    <div>{product.name}</div>
                </Card.Title>
        </Link>

        <Card.Text  as = 'div'> 
        <Link to = {`/product/${product._id}`}>
            <Rating 
            value = {product.rating}
            text = {`${product.numReviews} reviews`}
            color = {'#ff6863'}
            />
              </Link>
        </Card.Text>

        <Card.Text as = 'h3'>${product.price}</Card.Text>
        </Card.Body>
        </Card>
    )
}

export default Product
