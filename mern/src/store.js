import { createStore, combineReducers, applyMiddleware} from 'redux'

import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';
import { productListReducer } from './reducers/productReducers'

const reducer = combineReducers({
     productList: productListReducer
})


const initialState = {}

const middleware = [thunkMiddleware]


const store = createStore(
     reducer,
     initialState,
     composeWithDevTools(applyMiddleware(...middleware))
)



export default store






