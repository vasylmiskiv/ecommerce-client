import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//Create new order

// POST API orders
//fetch all products
const addOrderItems= asyncHandler(async(req,res) => {
   const {
      orderItems,
      shippingAddress,
      paymentMethod, 
      itemsPrice, 
      taxPrice,
      shippingPrice,
      totalPrice,
      userId
    } = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user: userId._id,
            shippingAddress,
            paymentMethod,
            itemsPrice, 
            taxPrice,
            shippingPrice,
            totalPrice,
            userId: userId
        })
        
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//get order by id
//GET  api/orders/:id
const getOrderById = asyncHandler(async(req,res) => {
     const order= await (await Order.findById(req.params.id))

     if(order) {
         res.json(order)
     } else {
         res.status(404)
        throw Error ('Order not found')
     }
 })

//get api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async(req,res) => {
    const order = await (await Order.findById(req.params.id))

    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

    //save db
        const updateOrder = await order.save()

    res.json(updateOrder)
    } else {
        res.status(404)
        throw Error ('Order not found')
    }
})

//update order to delivered status
//get api/orders/:id/deliver
//Admin
const updateOrderToDelivered = asyncHandler(async(req,res) => {
    const order = await (await Order.findById(req.params.id))

    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

    //save db
        const updateOrder = await order.save()

    res.json(updateOrder)

    } else {
        res.status(404)
        throw Error ('Order not found')
    }
})

//get logged in user orders
//get api/orders/myorders.fi
const getMyOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({user: req.user._id })
    res.json(orders)
})

//get all orders
//get api/orders
//Admin
const getOrders = asyncHandler(async(req,res) => {
    const orders = await Order.find({})
    res.json(orders)
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivered
}
