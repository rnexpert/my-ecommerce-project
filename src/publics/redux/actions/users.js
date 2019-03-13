import axios from 'axios'

export const postUser = (data) => {
    return {
        type: 'POST_USER',
        payload: axios.post('http://192.168.1.117:3333/api/v1/user',
            data
        )
    }
}

export const postLogin = (data) => {
    // return async (dispatch)=> {
    //     const a = await dispatch(postLogin())
    //     dispatch(getProfile(a.result.value.data))
    // }
    return {
        type: 'POST_LOGIN',
        payload: axios.post('http://192.168.1.117:3333/api/v1/login',
            data
        )
    }
}

export const getProfile = (id, token) => {
    return {
        type: 'GET_PROFILE',
        payload: axios.get(`http://192.168.1.117:3333/api/v1/user/${id}`,
            { headers: { Authorization: `Bearer ${token}` } })
    }
}

export const postTransaction = (data) => {
    return {
        type: 'POST_TRANSACTION',
        payload: axios.post('http://192.168.1.117:3333/api/v1/transaction',
            data
        )
    }
}

export const getTransaction = (id) => {
    return {
        type: 'GET_TRANSACTION',
        payload: axios.get(`http://192.168.1.117:3333/api/v1/transaction/${id}`)
    }
}





