import React, {useState, useEffect}from 'react'
import  {Link} from 'react-router-dom'
import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, createProduct } from '../actions/productActions'
import Message from "../components/Message"
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

const ProductCreateScreen = ({history}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productLogin = useSelector(state => state.userLogin)
    const {userInfo} = productLogin

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error} = productDetails

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product} = productCreate

    useEffect(()=>{
       if(successCreate) {
        history.push('/admin/productlist')
       }
        
    },[history, successCreate])

    //submit
    const submitHandler = (e) => {
       e.preventDefault()
       
       console.log(typeof countInStock)
       dispatch(createProduct({
         name, 
         price, 
         brand, 
         image, 
         category,
         description,
         countInStock,
         _id:userInfo._id
    }))
    }

    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch(error) {
            console.log(error)
            setUploading(false)
        }
    }
    
    console.log(typeof countInStock)
    return (
        <>
        <Link to = '/admin/productlist' className = 'btn btn-light my-3'>
            Go back
        </Link>
<FormContainer>
        <h1>Create product</h1>
        {loadingCreate && <Loader/>}
      {errorCreate && <Message variant ="danger">{errorCreate}</Message>}
        {loading ? <Loader/> : error ? <Message variant ="danger">{error}</Message> : (

<Form onSubmit ={submitHandler}>
<Form.Group controlId = 'name'>
    <Form.Label>Name</Form.Label>
    <Form.Control
        type = "name"
        placeholder = "Product name"
        value = {name}
        onChange = {e => setName(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId = 'price'>
    <Form.Label>Price</Form.Label>
    <Form.Control
        type = "number"
        placeholder = "Product price"
        value = {price < 0 ? 0 : price}
        onChange = {e => setPrice(parseFloat(e.target.value))}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId = 'image'>
    <Form.Label>Image</Form.Label>
    <Form.Control
        type = "text"
        placeholder = "Enter image URL"
        value = {image}
        onChange = {e => setImage(e.target.value)}
    >
    </Form.Control>
    <Form.File id = "image-file" label = "or choose file" custom onChange = {uploadFileHandler} ></Form.File>
            {uploading && <Loader/>}
</Form.Group>

<Form.Group controlId = 'brand'>
    <Form.Label>Brand</Form.Label>
    <Form.Control
        type = "text"
        placeholder = "Enter brand"
        value = {brand}
        onChange = {e => setBrand(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId = 'count in stock'>
<Col md = {3}>
    <Form.Label>Count in stock</Form.Label>
    <Form.Control
        type = "number"
        placeholder = "Enter count in stock"
        value = {countInStock < 0 ? 0 : countInStock}
        onChange = {e => setCountInStock(parseInt(e.target.value))}
    >
    </Form.Control>
    </Col>
</Form.Group>



<Form.Group controlId = 'category'>
    <Form.Label>Category</Form.Label>
    <Form.Control
        type = "text"
        placeholder = "Enter brand"
        value = {category}
        onChange = {e => setCategory(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Form.Group controlId = 'description'>
    <Form.Label>Description</Form.Label>
    <Form.Control
        type = "text"
        placeholder = "Enter description"
        value = {description}
        onChange = {e => setDescription(e.target.value)}
    >
    </Form.Control>
</Form.Group>

<Button type = "submit" variant="success">
    Create
</Button>
</Form>
        )}

    </FormContainer>

    </>
    )
}


export default ProductCreateScreen