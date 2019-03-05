const initialState = {
    data: [],
    details: {},
    isLoading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_PRODUCTS_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_PRODUCTS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        case 'GET_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_PRODUCT_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_PRODUCT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                details: action.payload.data
            }
        default:
            return state
    }
}