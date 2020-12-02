import axios, {AxiosError} from 'axios'
import {
    CREATE_USER_ERROR,
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
    FETCH_USERS_ERROR,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS,
    FETCH_USER_BY_ID_ERROR,
    FETCH_USER_BY_ID_START,
    FETCH_USER_BY_ID_SUCCESS,
    UPDATE_USER_START,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    DELETE_USER_BY_ID
} from './actionTypes'
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'
import {push} from 'connected-react-router'

export const fetchUsers = () => async dispatch => {
    await dispatch({
        type: FETCH_USERS_START
    })

    const url = '/api/users'
    axios
        .get(url)
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
    axios
        .post(url, data)
        .then((answer) => {
            dispatch({
                type: CREATE_USER_SUCCESS,
                payload: answer.data
            })
            dispatch(push('/settings/users'))
            toast.success(createNotyMsg(answer.data.name,
                'пользователь создан'))
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400) {
                toast.error(error.response.data)
            }
            if (error.response?.status === 422) {
                toast.error(error.response.data.errors?.email[0])
            } else {
                toast.error(error.message)
                dispatch({
                    type: CREATE_USER_ERROR,
                    payload: error.response
                })
            }
        })
}

export const updateUserById = (data, id) => async dispatch => {
    await dispatch({
        type: UPDATE_USER_START
    })

    const url = `/api/users/${id}`
    axios
        .put(url, data)
        .then((answer) => {
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: answer.data
            })
            dispatch(push('/settings/users'))
            toast.success(createNotyMsg(answer.data.name,
                'пользователь обновлен'))
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 422 ||
                error.response?.status === 400) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: error.response
                })
            }
        })
}

export const fetchUserById = (id) => async dispatch => {
    await dispatch({
        type: FETCH_USER_BY_ID_START
    })

    const url = `/api/users/${id}`
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_USER_BY_ID_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_USER_BY_ID_ERROR,
                payload: error.message
            })
            toast.error(error.message)
        })
}

export const deleteUserById = (id) => async dispatch => {
    const url = `/api/users/${id}`
    axios
        .delete(url)
        .then((answer) => {
            dispatch({
                type: DELETE_USER_BY_ID,
                payload: id
            })
            dispatch(push('/settings/users'))
        })
        .catch((error: AxiosError) => {
            toast.error(error.message)
        })
}
