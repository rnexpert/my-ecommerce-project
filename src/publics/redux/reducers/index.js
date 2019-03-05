import { combineReducers } from 'redux'

import products from './products'
import carts from './carts'
import users from './users'

const appReducer = combineReducers({
    products,
    carts,
    users
})

export default appReducer