import { createStore, combineReducers, applyMiddleware} from 'redux'

import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers.js'


const reducer = combineReducers({
     productList: productListReducer,
     productDetails: productDetailsReducer,
     cart: cartReducer,
     userLogin: userLoginReducer,
     userRegister: userRegisterReducer,
     userDetails: userDetailsReducer,
     userUpdateProfile: userUpdateProfileReducer,

})

// получаем items из локал сторедж для товаров
const cartItemsFromStorage = localStorage.getItem('cartItems') 
? JSON.parse(localStorage.getItem('cartItems')) : []

// получаем items из localstorage для юзеров
const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo')) : null

//get from localstorage itemss address
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

// origin state
const initialState = {
     cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
     userLogin: {userInfo: userInfoFromStorage},

}

const middleware = [thunkMiddleware]

const store = createStore(
     reducer,
     initialState,
     composeWithDevTools(applyMiddleware(...middleware))
)

export default store






