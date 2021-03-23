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


export {
    getProductById, getProducts, deleteProduct
}