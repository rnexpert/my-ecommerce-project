const initialState = {
    dcart: {},
    isLoading: false,
    dcarts: [],
    price: {},
    total: 0,
    msg: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'POST_ORDER_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'POST_ORDER_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'POST_ORDER_FULFILLED':
            let index = state.dcarts.findIndex((item) => {
                return item.id == action.payload.data.id
            })
            let cart
            if (index >= 0) {
                cart = [
                    ...state.dcarts.slice(0, index),
                    {
                        ...state.dcarts[index],
                        qty: action.payload.data.qty
                    },
                    ...state.dcarts.slice(index + 1)
                ]
            }
            else {
                cart = [...state.dcarts, action.payload.data]

            }
            return {
                ...state,
                isLoading: false,
                dcarts: cart
            }

        case 'GET_ORDERS_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_ORDERS_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_ORDERS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                dcarts: action.payload.data
            }
        case 'DELETE_ORDER_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'DELETE_ORDER_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'DELETE_ORDER_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'GET_PRICE_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_PRICE_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_PRICE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                price: action.payload.data
            }
        case 'GET_TOTAL':
            return {
                ...state,
                total: state.dcarts.reduce((tmp, val) => {
                    return tmp + val.price
                }, 0
                )
            }
        case 'CLEAR_CART_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'CLEAR_CART_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'CLEAR_CART_FULFILLED':
            return {
                ...state,
                isLoading: false,
                dcarts: []
            }
        default:
            return state
    }

}