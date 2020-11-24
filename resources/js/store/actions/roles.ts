import axios, {AxiosError} from 'axios'
import {
    CREATE_ROLE_ERROR,
    CREATE_ROLE_START,
    CREATE_ROLE_SUCCESS,
    FETCH_ROLES_ERROR,
    FETCH_ROLES_START,
    FETCH_ROLES_SUCCESS
} from './actionTypes'
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'

export const fetchRoles = () => async dispatch => {
    await dispatch({
        type: FETCH_ROLES_START
    })

    const url = '/api/userroles'
    axios.get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_ROLES_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_ROLES_ERROR,
                payload: error.response
            })
        })
}

export const createRole = (data) => async dispatch => {
    await dispatch({
        type: CREATE_ROLE_START
    })

    const url = '/api/userroles'
    axios.post(url, data)
        .then((answer) => {
            dispatch({
                type: CREATE_ROLE_SUCCESS,
                payload: answer.data
            })
            toast.success(createNotyMsg(answer.data.name, 'роль создана'))
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: CREATE_ROLE_ERROR,
                payload: error.message
            })
            toast.error(error.message)
        })
}
