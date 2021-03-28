import React, {useEffect}from 'react'
import  {LinkContainer} from 'react-router-bootstrap'
import {Table,Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from "../components/Message"
import {listProducts, deleteProduct, createProduct} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'


const ProductListScreen = ({history, match}) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin   

    const productDelete = useSelector(state => state.productDelete)
    const { success: successDelete, loading: loadingDelete, error: errorDelete, product: deletedProduct } = productDelete 

    const productCreate = useSelector(state => state.productCreate)
    const { success: successCreate, loading: loadingCreate, error: errorCreate, product: createdProduct } = productCreate 

    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin) {
            history.push('/login')
        } else {
            dispatch(listProducts('', pageNumber))
        }
    }, [
        dispatch,
        userInfo,
        history,
        successDelete,
        successCreate,
        createdProduct,
        pageNumber
    ])

    const deleleteHandler = (id) => {
        if(window.confirm('Do u confirm it?')){
            dispatch(deleteProduct(id))
        }
    }

    // const createProductHandler = () => {
    //     dispatch(createProduct())
    // }

    return (
        <>
        <Row className = "align-items-center">
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className = "text-right">
            <LinkContainer to = {`/admin/product/create`}>
                <Button className = "my-3">
                     <i className = "fas fa-plus"></i>   Create a Product
                </Button>
                </LinkContainer>
            </Col>
        </Row>

          {loadingDelete && loadingCreate && (<Loader/>) }
          {errorDelete && (<Message variant = "danger">{errorDelete}</Message>) }
          {successDelete && (<Message variant = "primary">{deletedProduct.message}</Message>)}

          {errorCreate && (<Message variant = "danger">{errorCreate}</Message>) }
          {successCreate && (<Message variant = "primary">{createdProduct.message}</Message>)}
          {loading ? <Loader/> : error ? <Message variant = "danger">{error}</Message>
          : (
              <>
              <Table striped bordered hover responsive className = "table-sm">
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>NAME</th>
                          <th>PRICE</th>
                          <th>CATEGORY</th>
                          <th>BRAND</th>
                          <th>TOOLS</th>
                      </tr>
                  </thead>
                  <tbody>
                        {products.map(product => (
                            <tr key = {product._id}>
                               <td>{product._id}</td> 
                               <td>{product.name}</td> 
                               <td>
                               ${product.price}
                               </td>
                                <td>
                                    {product.category}
                                </td>
                                <td>
                                    {product.brand}
                                </td>
                               <td>
                                   <LinkContainer to = {`/admin/product/${product._id}/edit`}>
                                       <Button variant = "light" className = "btn-sm">
                                           <i className = "fas fa-edit"></i>
                                       </Button>
                                   </LinkContainer>
                
                                    <Button variant = "danger" className = "btn-sm" onClick = {()=>{
                                            deleleteHandler(product._id)
                                        }}>
                                            <i className = "fas fa-trash"></i>
                                        </Button>
                                        
                                   
                               </td>
                            </tr>
                      ))
                    }
                  </tbody>
              </Table>
              <Paginate pages = {pages} page = {page} isAdmin ={true}/>
              </>
          )}  
  
        </>
    )
}

export default ProductListScreen