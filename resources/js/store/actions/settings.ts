import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {
    DELETE_EMAIL_SETTINGS_ERROR,
    DELETE_EMAIL_SETTINGS_START,
    DELETE_EMAIL_SETTINGS_SUCCESS,
    FETCH_EMAIL_SETTINGS_ERROR,
    FETCH_EMAIL_SETTINGS_START,
    FETCH_EMAIL_SETTINGS_SUCCESS,
    UPDATE_EMAIL_SETTINGS_ERROR,
    UPDATE_EMAIL_SETTINGS_START,
    UPDATE_EMAIL_SETTINGS_SUCCESS
} from './actionTypes'

export const fetchEmailSettings = () => async dispatch => {
    await dispatch({
        type: FETCH_EMAIL_SETTINGS_START
    })

    const url = '/api/mailtask'
    axios.get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_EMAIL_SETTINGS_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_EMAIL_SETTINGS_ERROR,
                payload: error.response
            })
        })
}

export const updateEmailSettings = (data) => async dispatch => {
    await dispatch({
        type: UPDATE_EMAIL_SETTINGS_START
    })

    const url = '/api/mailtask'
    axios.post(url, data)
        .then((answer) => {
            dispatch({
                type: UPDATE_EMAIL_SETTINGS_SUCCESS,
                payload: answer.data
            })
            toast.success('Настройки сохранены')
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400) {
                toast.error(error.response.data)
            } else {
                dispatch({
                    type: UPDATE_EMAIL_SETTINGS_ERROR,
                    payload: error.message
                })
                toast.error(error.message)
            }
        })
}

export const deleteEmailSettings = () => async dispatch => {
    await dispatch({
        type: DELETE_EMAIL_SETTINGS_START
    })

    const url = '/api/mailtask'
    axios.delete(url)
        .then((answer) => {
            dispatch({
                type: DELETE_EMAIL_SETTINGS_SUCCESS,
                payload: answer.data
            })
            toast.success('Настройки сохранены')
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400
                || error.response?.status === 404) {
                toast.error(error.response.data)
            } else {
                dispatch({
                    type: DELETE_EMAIL_SETTINGS_ERROR,
                    payload: error.message
                })
                toast.error(error.message)
            }
        })
}
