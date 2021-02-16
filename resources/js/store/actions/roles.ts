import axios, {AxiosError} from 'axios'
import {
    CREATE_ROLE_ERROR,
    CREATE_ROLE_START,
    CREATE_ROLE_SUCCESS,
    FETCH_ROLES_ERROR,
    FETCH_ROLES_START,
    FETCH_ROLES_SUCCESS,
    UPDATE_ROLE_ERROR,
    UPDATE_ROLE_START,
    UPDATE_ROLE_SUCCESS,
    FETCH_ROLE_BY_ID_START,
    FETCH_ROLE_BY_ID_SUCCESS,
    FETCH_ROLE_BY_ID_ERROR
} from './actionTypes'
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'
import {history} from '../../app'

export const fetchRoles = () => async dispatch => {
    await dispatch({
        type: FETCH_ROLES_START
    })

    const url = '/api/userroles'
    axios
        .get(url)
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
    axios
        .post(url, data)
        .then((answer) => {
            dispatch({
                type: CREATE_ROLE_SUCCESS,
                payload: answer.data
            })
            toast.success(createNotyMsg(answer.data.name, 'роль создана'))
            history.push('/settings/roles')
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: CREATE_ROLE_ERROR,
                payload: error.message
            })
            toast.error(error.message)
        })
}

export const fetchRoleById = (id) => async dispatch => {
    await dispatch({
        type: FETCH_ROLE_BY_ID_START
    })

    const url = `/api/userroles/${id}`
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_ROLE_BY_ID_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_ROLE_BY_ID_ERROR,
                payload: error.message
            })
            toast.error(error.message)
        })
}

export const updateRole = (data, id) => async dispatch => {
    await dispatch({
        type: UPDATE_ROLE_START
    })

    const url = `/api/userroles/${id}`
    axios
        .put(url, data)
        .then((answer) => {
            dispatch({
                type: UPDATE_ROLE_SUCCESS,
                payload: answer.data
            })
            toast.success(createNotyMsg(answer.data.name, 'роль обновлена'))
            history.push('/settings/roles')
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: UPDATE_ROLE_ERROR,
                payload: error.message
            })
            toast.error(error.message)
        })
}
