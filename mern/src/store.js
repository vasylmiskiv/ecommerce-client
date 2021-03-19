import { createStore, combineReducers, applyMiddleware} from 'redux'

import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { 
     userLoginReducer,
     userRegisterReducer,
     userDetailsReducer,
     userUpdateProfileReducer,
     userListReducer
} from './reducers/userReducers.js'

import {
     orderCreateReducer,
     orderDetailsReducer,
     orderPayReducer,
     orderListMyReducer
} from './reducers/orderReducers'

const reducer = combineReducers({
     productList: productListReducer,
     productDetails: productDetailsReducer,
     cart: cartReducer,
     userLogin: userLoginReducer,
     userRegister: userRegisterReducer,
     userDetails: userDetailsReducer,
     userUpdateProfile: userUpdateProfileReducer,
     orderCreate: orderCreateReducer,
     orderDetails: orderDetailsReducer,
     orderPay: orderPayReducer,
     orderListMy: orderListMyReducer,
     userList: userListReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo')) : null

//get from localstorage items address
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

// get from localstorage payment method
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod')) : {}

const initialState = {
     cart: {
          cartItems: cartItemsFromStorage,
          shippingAddress: shippingAddressFromStorage,
          paymentMethod: paymentMethodFromStorage,
     },
     userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunkMiddleware]

const store = createStore(
     reducer,
     initialState,
     composeWithDevTools(applyMiddleware(...middleware))
)

export default store






