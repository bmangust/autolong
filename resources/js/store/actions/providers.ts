import axios, {AxiosError} from 'axios';
import {
    CREATE_PROVIDER_ERROR,
    CREATE_PROVIDER_START,
    CREATE_PROVIDER_SUCCESS,
    FETCH_PROVIDERS_ERROR,
    FETCH_PROVIDERS_START,
    FETCH_PROVIDERS_SUCCESS,
    FETCH_PROVIDER_ERROR,
    FETCH_PROVIDER_START,
    FETCH_PROVIDER_SUCCESS
} from './actionTypes';
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'

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

export const createProvider = (data) => async dispatch => {
    await dispatch({
        type: CREATE_PROVIDER_START,
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
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: CREATE_PROVIDER_ERROR,
                payload: error.response
            })
        })
}
