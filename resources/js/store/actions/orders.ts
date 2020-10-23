import {
    CREATE_ORDER_ERROR,
    CREATE_ORDER_START,
    CREATE_ORDER_SUCCESS,
    FETCH_ORDERS_ERROR,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDER_ERROR,
    FETCH_ORDER_PRODUCTS,
    FETCH_ORDER_START,
    FETCH_ORDER_SUCCESS,
    FETCH_ITEMS_BY_VENDOR_START,
    FETCH_ITEMS_BY_VENDOR_SUCCESS,
    FETCH_ITEMS_BY_VENDOR_ERROR
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'

export const fetchOrders = () => async dispatch => {
    await dispatch({
        type: FETCH_ORDERS_START
    })

    const url = '/api/orders'
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_ORDERS_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_ORDERS_ERROR,
                payload: error.response
            })
        })
}

export const fetchOrderById = (id) => async dispatch => {
    await dispatch({
        type: FETCH_ORDER_START
    })

    const url = `/api/orders/${id}`
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_ORDER_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_ORDER_ERROR,
                payload: error.response
            })
        })
}

export const createOrder = (data) => async dispatch => {
    await dispatch({
        type: CREATE_ORDER_START
    })
    const url = '/api/orders'
    axios
        .post(url, data)
        .then((answer) => {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: CREATE_ORDER_ERROR,
                payload: error.response
            })
        })
}

export const fetchProductsByVendor = (data) => async dispatch => {
    const vendorCodesArr = data.vendorCodes.split(' ')
    const url = `/api/orders/checkvendorcode`
    axios
        .post(url, {
            vendorCodes: vendorCodesArr
        })
        .then((answer) => {
            dispatch({
                type: FETCH_ORDER_PRODUCTS,
                payload: answer.data
            })
        })
}

export const fetchItemsByVendors = (data) => async dispatch => {
    await dispatch({
        type: FETCH_ITEMS_BY_VENDOR_START
    })
    const numbers = data.numbers.split('\n').filter(el => {
        return el != null && el != ''
    })
    const url = '/api/orders/checkproductnumberwithus'
    axios
        .post(url, {numbers})
        .then((answer) => {
            dispatch({
                type: FETCH_ITEMS_BY_VENDOR_SUCCESS,
                payload: answer.data
            })
            answer.data.filter(el => !('id' in el)).map(({number}) => {
                toast.warn(`${number} - артикул не найден`)
            })
        }).catch((error: AxiosError) => {
        dispatch({
            type: FETCH_ITEMS_BY_VENDOR_ERROR,
            payload: error.response
        })
    })
}
