import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'


const ProductScreen = ({match}) => {
    const [product, setProduct] =  useState({})
         useEffect(() => {
            const fetchProduct = async () => {
                const {data} = await axios.get(`/api/products/${match.params.id}`)
                setProduct(data)
                console.log(data)
            }
            fetchProduct()
        }, [match])

    return (
    
        <div>
            <Link className= 'btn btn-dark my-3' to ='/'>
            GO BACK
            </Link>
            <Row>
            <Col md ={5}>
                <Image src = {product.image} alt = {product.name} fluid/>
            </Col>
            <Col md ={4}>
                <ListGroup variant = 'flush'>
                    <ListGroup.Item>
                        <h2>{product.name}</h2>
                    </ListGroup.Item>
                   <ListGroup.Item>
                       <Rating value = {product.rating}
                        text = {`${product.numReviews} reviews`}
                        color = {'#ff6863'} 
                    />
                   </ListGroup.Item>
                   <ListGroup.Item>
                     <strong>Price: </strong>  <i>${product.price}</i>
                   </ListGroup.Item>
                   <ListGroup.Item>
                     <strong>Description:</strong> <br/> {product.description}
                   </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md = {3}>
                <Card>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                  Price:
                                </Col>
                                <Col>
                                    <strong>
                                        ${product.price}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    <strong>
                                        {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className = 'btn-block' type = 'button' disabled = {product.countInStock === 0}>
                                Add to cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            </Row>
        </div>
       
        )
   
}

export default ProductScreen
