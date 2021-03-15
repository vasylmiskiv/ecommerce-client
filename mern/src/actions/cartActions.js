import axios from 'axios'

import { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADRESS } from '../constants/cartConstans.js'
//action add to card
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// action remove from cart
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    console.log('action')
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const  saveShippingAdress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADRESS,
        payload: data
    })
    console.log('action')
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}


