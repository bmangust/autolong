import axios, {AxiosError} from 'axios'
import {
    CREATE_USER_ERROR,
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
    FETCH_USERS_ERROR,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS
} from './actionTypes'
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'

export const fetchUsers = () => async dispatch => {
    await dispatch({
        type: FETCH_USERS_START
    })

    const url = '/api/users'
    axios.get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_USERS_ERROR,
                payload: error.response
            })
        })
}

export const createUser = (data) => async dispatch => {
    await dispatch({
        type: CREATE_USER_START
    })

    const url = '/api/users'
    axios.post(url, data)
        .then((answer) => {
            dispatch({
                type: CREATE_USER_SUCCESS,
                payload: answer.data
            })
            toast.success(createNotyMsg(answer.data.name,
                'пользователь создан'))
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: CREATE_USER_ERROR,
                payload: error.message
            })
            toast.error(error.message)
        })
}
