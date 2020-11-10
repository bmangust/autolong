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
    FETCH_ITEMS_BY_VENDOR_ERROR,
    CHANGE_ORDER_STATUS_START,
    CHANGE_ORDER_STATUS_SUCCESS,
    CHANGE_ORDER_STATUS_ERROR,
    DELETE_ORDER_BY_ID
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'
import {push} from 'connected-react-router'
import {saveAs} from 'file-saver'

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

export const createOrder = (data, redirect = '') => async dispatch => {
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
            dispatch(push(redirect))
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
                toast.warn(createNotyMsg(number,
                    'артикул не найден'))
            })
        }).catch((error: AxiosError) => {
        dispatch({
            type: FETCH_ITEMS_BY_VENDOR_ERROR,
            payload: error.response
        })
    })
}

export const changeOrderStatus = (id, data) => async dispatch => {
    await dispatch({
        type: CHANGE_ORDER_STATUS_START
    })
    let payment = ''
    if ('statusPayment' in data) {
        payment = 'payment'
    }
    const url = `/api/orders/${id}/changestatus${payment}`
    axios
        .post(url, data)
        .then((answer) => {
            dispatch({
                type: CHANGE_ORDER_STATUS_SUCCESS,
                payload: answer.data
            })
            toast.success(createNotyMsg(answer.data.name,
                'статус заказа изменен'))
        }).catch((error: AxiosError) => {
        dispatch({
            type: CHANGE_ORDER_STATUS_ERROR,
            payload: error.response
        })
        toast.error(error.message)
    })
}

export const deleteOrderById = (id) => async dispatch => {
    const url = `/api/orders/${id}`
    axios
        .delete(url)
        .then((answer) => {
            dispatch({
                type: DELETE_ORDER_BY_ID,
                payload: id
            })
            toast.success('Заказ удален')
        })
}


export const createOrderInvoice = (id) => async dispatch => {
    const url = `/api/orders/${id}/getpdfinvoice`
    axios
        .get(url, {
            headers: {
                'Content-Type': 'application/pdf'
            },
            responseType: 'blob'
        })
        .then(answer => {
            const blob = new Blob([answer.data], {type: 'application/pdf'})
            toast.success('Инвойс сгенерирован')
            saveAs(blob, 'invoice')
        })
        .catch((error: AxiosError) => {
            toast.error(error.message)
        })
}
