import {
    FETCH_CONTAINERS_ERROR,
    FETCH_CONTAINERS_START,
    FETCH_CONTAINERS_SUCCESS,
    FETCH_CONTAINER_ERROR,
    FETCH_CONTAINER_START,
    FETCH_CONTAINER_SUCCESS,
    FETCH_UNAPPLIED_ORDERS_ERROR,
    FETCH_UNAPPLIED_ORDERS_START,
    FETCH_UNAPPLIED_ORDERS_SUCCESS
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'

export const fetchContainers = () => async dispatch => {
    await dispatch({
        type: FETCH_CONTAINERS_START
    })

    const url = '/api/containers'
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_CONTAINERS_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_CONTAINERS_ERROR,
                payload: error.response
            })
        })
}

export const fetchUnappliedOrders = () => async dispatch => {
    await dispatch({
        type: FETCH_UNAPPLIED_ORDERS_START
    })

    const url = '/api/orders/unapplied'
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_UNAPPLIED_ORDERS_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_UNAPPLIED_ORDERS_ERROR,
                payload: error.response
            })
        })
}

export const fetchContainerById = (id) => async dispatch => {
    await dispatch({
        type: FETCH_CONTAINER_START
    })

    const url = `/api/containers/${id}`
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_CONTAINER_SUCCESS,
                payload: answer.data
            })
            toast.success(
                createNotyMsg(answer.data.name, 'контейнер создан'))
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_CONTAINER_ERROR,
                payload: error.response
            })
        })
}

export const createContainer = (data) => async dispatch => {
    await dispatch({
        type: FETCH_UNAPPLIED_ORDERS_START
    })

    const url = '/api/orders/unapplied'
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_UNAPPLIED_ORDERS_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_UNAPPLIED_ORDERS_ERROR,
                payload: error.response
            })
        })
}
