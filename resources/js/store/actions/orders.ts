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
    DELETE_ORDER_BY_ID,
    FETCH_ORDER_INVOICE_SUCCESS,
    FETCH_ORDER_INVOICE_START,
    FETCH_ORDER_INVOICE_ERROR,
    REMOVE_INPUT_FROM_INVOICE, CHECK_BAIKAL_STATUS, DELETE_BAIKAL_ID, EDIT_ORDER_ADMIN
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {createNotyMsg, timeConverter} from '../../utils'
import {push} from 'connected-react-router'
import {saveAs} from 'file-saver'
import {fetchContainerById} from './containers'

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
            toast.success(createNotyMsg(answer.data.name, 'заказ создан'))
            if (redirect) {
                dispatch(push(redirect))
            }
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
    const numbers = data.numbers.split('\n')
        .filter(el => {
            return el != null && el != ''
        })
    const url = '/api/orders/checkproductnumberwithus'
    axios
        .post(url, {numbers})
        .then((answer) => {
            const notFound: any[] = []
            Object.entries(answer.data)
                .forEach(([key, value]: any) => {
                    if (key === 'number') {
                        value.forEach(item => {
                            notFound.push(item)
                            toast.warn(createNotyMsg(item,
                                'артикул не найден'))
                        })
                    }
                })
            delete answer.data.number
            dispatch({
                type: FETCH_ITEMS_BY_VENDOR_SUCCESS,
                payload: answer.data,
                notFound: notFound
            })
        })
        .catch((error: AxiosError) => {
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
            toast.success(createNotyMsg(answer.data.name, 'статус заказа изменен'))
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400) {
                toast.error(error.response.data.message)
            } else {
                dispatch({
                    type: CHANGE_ORDER_STATUS_ERROR,
                    payload: error.response
                })
                toast.error(error.message)
            }
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


export const fetchOrderInvoice = (id, type) => async dispatch => {
    await dispatch({
        type: FETCH_ORDER_INVOICE_START
    })
    const url = `/api/orders/${id}/getpdf${type}`
    axios
        .get(url)
        .then(answer => {
            dispatch({
                type: FETCH_ORDER_INVOICE_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400) {
                toast.warn(error.response.data)
            } else {
                dispatch({
                    type: FETCH_ORDER_INVOICE_ERROR,
                    payload: error.message
                })
                toast.error(error.message)
            }
        })
}

export const createOrderInvoice = (id: number, data: any, type: string, date: number, containerId?: number) =>
    async dispatch => {
        const url = `/api/orders/${id}/generatepdf${type}`
        let formData = data
        if (type !== 'packinglist') {
            formData = new FormData()
            Object.entries(data)
                .forEach(([key, val]) => {
                    if (Array.isArray(val)) {
                        return formData.append(key, JSON.stringify(val))
                    } else {
                        return formData.append(key, val)
                    }
                })
        }
        axios
            .post(url, formData, {responseType: 'blob'})
            .then(answer => {
                const blob = new Blob([answer.data],
                    {type: 'application/pdf;charset=utf-8'})
                if (type === 'packinglist' && containerId) {
                    dispatch(fetchContainerById(containerId, false))
                }
                toast.success(`${type} сгенерирован`)
                saveAs(blob, `${type === 'account' ? 'bill' : type}-${id}-${timeConverter(date)}.pdf`)
            })
            .catch((error: AxiosError) => {
                if (error.response?.status === 400) {
                    toast.error(error.response.data)
                } else {
                    toast.error(error.message)
                }
            })
    }

export const removeStampByType = (orderId, type) => async dispatch => {
    const url = `/api/orders/${orderId}/deletepdfcontract${type.toLowerCase()}`
    axios
        .delete(url)
        .then(() => {
            dispatch({
                type: REMOVE_INPUT_FROM_INVOICE,
                payload: type
            })
            toast.success(createNotyMsg(type, 'печать удалена'))
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
            }
        })
}

export const checkBaikalStatus = (baikalId, id) => async dispatch => {
    const url = `/api/orders/${id}/checkbaikalstatus`

    axios
        .post(url, {baikalId})
        .then(({data}) => {
            toast.success(`${baikalId} Идентификатор сохранен`)
            dispatch({
                type: CHECK_BAIKAL_STATUS,
                payload: data
            })
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400 || error.response?.status === 404) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
            }
        })
}

export const deleteBaikalId = (id) => async dispatch => {
    const url = `/api/orders/${id}/deletebaikalstatus`

    axios
        .delete(url)
        .then(({data}) => {
            toast.success(`Идентификатор удален`)
            dispatch({
                type: DELETE_BAIKAL_ID,
                payload: data
            })
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400 || error.response?.status === 404) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
            }
        })
}

export const editOrderAdmin = (id, data) => async dispatch => {
    const url = `/api/orders/${id}`

    axios
        .put(url, data)
        .then(({data}) => {
            toast.success(`Заказ успешно изменен`)
            dispatch({
                type: EDIT_ORDER_ADMIN,
                payload: data
            })
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400 || error.response?.status === 404) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
            }
        })
}
