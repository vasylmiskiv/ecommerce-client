import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//get all products
// GET api/products / products?keyword=
const getProducts = asyncHandler(async(req,res) => {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keyword})

    const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    
    res.json({products, page, pages: Math.ceil(count / pageSize)})
})

//get product by id
//route get /api/products/:id
const getProductById = asyncHandler(async(req, res) => {
    const product  = await Product.findById(req.params.id)
    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
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
    const {
        name,
        price, 
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body

   const product = new Product ({
            name: name,
            price: price,
            user: req.user._id,
            image: image,
            brand: brand,
            category: category,
            countInStock: countInStock,
            numReviews: 0,
            description:  description
   })
   
   const createdProduct = await product.save()
   console.log(createdProduct)
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


//create new review
//route post /api/products/:id/review
const createProductReview = asyncHandler(async(req, res) => {
    const {
        rating, comment
     } = req.body
     
     const product = await Product.findById(req.params.id)

     if(product) {

       /* limit of reviews*/
       
        // const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        // if(alreadyReviewed) {
        //     res.status(400)
        //     throw new Error('Product already reviewed')
        // }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length
        
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.numReviews

        await product.save()

        res.status(201).json({ message:'Review added' })
    } else {
        res.status(404) 
        throw new Error('Product not found')
     }
  })

//get top rated products
//route get /api/products/top
  const getTopProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})
    .sort({ rating: -1})
    .limit(5)
    res.json(products)
  })

export {
    getProductById, 
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}


