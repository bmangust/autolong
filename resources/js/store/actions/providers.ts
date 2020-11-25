import axios, {AxiosError} from 'axios'
import {
    CREATE_PROVIDER_ERROR,
    CREATE_PROVIDER_START,
    CREATE_PROVIDER_SUCCESS,
    FETCH_PROVIDERS_ERROR,
    FETCH_PROVIDERS_START,
    FETCH_PROVIDERS_SUCCESS,
    FETCH_PROVIDER_ERROR,
    FETCH_PROVIDER_START,
    FETCH_PROVIDER_SUCCESS,
    DELETE_PROVIDER_BY_ID,
    UPDATE_PROVIDER_SUCCESS,
    UPDATE_PROVIDER_ERROR,
    UPDATE_PROVIDER_START, SET_BLACK_LABEL
} from './actionTypes'
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'
import {push} from 'connected-react-router'

export const fetchProviders = () => async dispatch => {
    await dispatch({
        type: FETCH_PROVIDERS_START
    })

    const url = '/api/providers'
    axios.get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_PROVIDERS_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_PROVIDERS_ERROR,
                payload: error.response
            })
        })
}

export const fetchProviderById = (id) => async dispatch => {
    await dispatch({
        type: FETCH_PROVIDER_START
    })

    const url = `/api/providers/${id}`
    axios.get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_PROVIDER_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_PROVIDER_ERROR,
                payload: error.response
            })
        })
}

export const createProvider = (data, redirect = '') => async dispatch => {
    await dispatch({
        type: CREATE_PROVIDER_START
    })
    const url = '/api/providers'
    axios
        .post(url, data)
        .then((answer) => {
            dispatch({
                type: CREATE_PROVIDER_SUCCESS,
                payload: answer.data
            })
            toast.success(
                createNotyMsg(answer.data.name, 'поставщик создан'))
            dispatch(push(redirect))
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: CREATE_PROVIDER_ERROR,
                payload: error.response
            })
        })
}

export const updateProvider = (data, providerId, redirect = '') =>
    async dispatch => {
        await dispatch({
            type: UPDATE_PROVIDER_START
        })
        const url = `/api/providers/${providerId}`
        axios
            .put(url, data)
            .then((answer) => {
                dispatch({
                    type: UPDATE_PROVIDER_SUCCESS,
                    payload: answer.data
                })
                toast.success(
                    createNotyMsg(answer.data.name, 'поставщик обновлен'))
                dispatch(push(redirect))
            })
            .catch((error: AxiosError) => {
                dispatch({
                    type: UPDATE_PROVIDER_ERROR,
                    payload: error.response
                })
            })
    }

export const deleteProviderById = (id) => async dispatch => {
    const url = `/api/providers/${id}`
    axios
        .delete(url)
        .then((answer) => {
            dispatch({
                type: DELETE_PROVIDER_BY_ID,
                payload: id
            })
            toast.success('Поставщик удален')
        })
}

export const setBlackLabelById = (id, unscrupulous) => async dispatch => {
    const url = `/api/providers/${id}/setblacklabel`
    axios
        .put(url, {unscrupulous})
        .then((answer) => {
            dispatch({
                type: SET_BLACK_LABEL,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            toast.error(error.message)
        })
}
