import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//get all products
// GET api/products
const getProducts = asyncHandler(async(req,res) => {
    const products = await Product.find({})
    res.json(products)
})

//get product by id
//route get /api/products/:id
const getProductById = asyncHandler(async(req, res) => {
    const product  = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not find')
    }
})

//delete product
//route delete /api/products/:id
//Admin
const deleteProduct = asyncHandler(async(req, res) => {
    const product  = await Product.findById(req.params.id)
    if(product) {
        //monggose remove
        await product.remove()
        res.json({message:`${product.name} has been removed`})
       
    } else {
        res.status(404)
        throw new Error('Product not find')
    }
})

//create product
//route post /api/products
//Admin
const createProduct = asyncHandler(async(req, res) => {
   const product = new Product ({
       name: 'HOCO C12 Smart Dual USB Micro Cable',
       price: 9.99,
       user: req.user._id,
       image: '/images/charger.jpg',
       brand: 'Sample brand',
       category: 'sample category',
       countInStock: 2,
       numReviews: 1,
       description: 'Sample description'
   })
   
   const createdProduct = await product.save()
   res.status(201).json(createdProduct)
})

//change product
//route put /api/products/:id
//Admin
const updateProduct = asyncHandler(async(req, res) => {
   const {
        _id,
        name,
        price, 
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body
    
   
    const product = await Product.findById(req.body._id)
    

    if(product) {
    product._id = _id,
    product.name = name
    product.price = price
    product.description = description
    product.image =  image
    product.brand =  brand
    product.category = category
    product.countInStock = countInStock

        const updatedProduct = await product.save()

        res.json({message:`${updatedProduct.name} has been updated`})
    } else {
       res.status(404) 
       throw new Error('Product not found')
    }
 })

export {
    getProductById, 
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct
}


