import axios from 'axios'

export const getProducts = () => {
    return {
        type: 'GET_PRODUCTS',
        payload: axios.get('http://192.168.1.117:3333/api/v1/products')
    }
}

export const getProduct = (id) => {
    return {
        type: 'GET_PRODUCT',
        payload: axios.get(`http://192.168.1.117:3333/api/v1/product/${id}`)
    }
}
