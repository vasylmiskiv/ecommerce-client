import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'

const HomeScreen = ({ match }) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const keyword = match.params.keyword

    //like component did mount
    useEffect(()=>{
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])
    
    return (
        <div>
            <h1>Latest products</h1>
            {loading ?<Loader /> : error ? <Message variant = 'danger'>{error}</Message>
             : (<Row>
                {products.length === 0 ? <Col><Message><i class="far fa-times-circle"></i> Product not found</Message></Col> : products.map((product) => (
                     <Col key = {product._id} sm = {12} md = {6} lg = {4} xl = {3}>
                    <Product product = {product}/>
                    </Col>
                     )   
                   )  
                 }
               </Row>
             )
            
            }   
        </div>
    )
}

export default HomeScreen
