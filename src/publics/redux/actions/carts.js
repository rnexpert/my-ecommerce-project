import axios from 'axios'

export const postOrder = (data) => {
    return {
        type: 'POST_ORDER',
        payload: axios.post('http://192.168.43.229:3333/api/v1/order',
            data
        )
    }
}

export const getOrders = () => {
    return {
        type: 'GET_ORDERS',
        payload: axios.get('http://192.168.43.229:3333/api/v1/orders')
    }
}


export const getOrder = (id) => {
    return {
        type: 'GET_ORDER',
        payload: axios.get(`http://192.168.43.229:3333/api/v1/order/${id}`)
    }
}


export const getTotalPrice = () => {
    return {
        type: 'GET_PRICE',
        payload: axios.get('http://192.168.43.229:3333/api/v1/get_total')
    }
}



export const deleteOrder = (id) => {
    return {
        type: 'DELETE_ORDER',
        payload: axios.delete(`http://192.168.43.229:3333/api/v1/order/${id}`)
    }
}

export const patchOrder = (id, qty, price) => {
    return {
        type: 'PATCH_ORDER',
        payload: axios.patch(`http://192.168.43.229:3333/api/v1/order/${id}/${qty}/${price}`)
    }
}

export const totalPrice = () => {
    return {
        type: 'GET_TOTAL'
    }
}

export const deleteAll = () => {
    return {
        type: 'CLEAR_CART',
        payload: axios.delete('http://192.168.43.229:3333/api/v1/clear_cart')
    }
}





