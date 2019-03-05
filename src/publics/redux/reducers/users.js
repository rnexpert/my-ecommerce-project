const initialState = {
    data: {},
    isLoading: false,
    profile: {},
    msg: {},
    transaction: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'POST_USER_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'POST_USER_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'POST_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'POST_LOGIN_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'POST_LOGIN_REJECTED':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        case 'POST_LOGIN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        case 'GET_PROFILE_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_PROFILE_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_PROFILE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                profile: action.payload.data
            }
        case 'POST_TRANSACTION_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'POST_TRANSACTION_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'POST_TRANSACTION_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'GET_TRANSACTION_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_TRANSACTION_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_TRANSACTION_FULFILLED':
            return {
                ...state,
                isLoading: false,
                transaction: [action.payload.data]
            }
        default:
            return state
    }
}