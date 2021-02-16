import {
    FETCH_CONTAINERS_ERROR,
    FETCH_CONTAINERS_START,
    FETCH_CONTAINERS_SUCCESS,
    FETCH_CONTAINER_ERROR,
    FETCH_CONTAINER_START,
    FETCH_CONTAINER_SUCCESS,
    FETCH_UNAPPLIED_ORDERS_ERROR,
    FETCH_UNAPPLIED_ORDERS_START,
    FETCH_UNAPPLIED_ORDERS_SUCCESS,
    CREATE_CONTAINER_SUCCESS,
    CREATE_CONTAINER_ERROR,
    CREATE_CONTAINER_START,
    CHANGE_CONTAINER_STATUS_START,
    CHANGE_CONTAINER_STATUS_SUCCESS,
    CHANGE_CONTAINER_STATUS_ERROR,
    DELETE_CONTAINER_BY_ID,
    EDIT_CONTAINER_ADMIN,
    SET_ORDER_PAYMENT
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {createNotyMsg, timeConverter} from '../../utils'
import {history} from '../../app'
import {saveAs} from 'file-saver'

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

export const fetchContainerById = (id, isWithLoading = true) =>
    async dispatch => {
        if (isWithLoading) {
            await dispatch({
                type: FETCH_CONTAINER_START
            })
        }

        const url = `/api/containers/${id}`
        axios
            .get(url)
            .then((answer) => {
                dispatch({
                    type: FETCH_CONTAINER_SUCCESS,
                    payload: answer.data
                })
            })
            .catch((error: AxiosError) => {
                dispatch({
                    type: FETCH_CONTAINER_ERROR,
                    payload: error.response
                })
            })
    }

export const deleteContainerById = id => async dispatch => {
    const url = `/api/containers/${id}`
    axios
        .delete(url)
        .then(() => {
            dispatch({
                type: DELETE_CONTAINER_BY_ID,
                payload: id
            })
            history.push('/containers')
            toast.success('Контейнер удален')
        })
}

export const createContainer = (data, redirect) => async dispatch => {
    await dispatch({
        type: CREATE_CONTAINER_START
    })

    const url = '/api/containers'
    axios
        .post(url, {orders: data})
        .then((answer) => {
            dispatch({
                type: CREATE_CONTAINER_SUCCESS,
                payload: answer.data
            })
            toast.success(
                createNotyMsg(answer.data.name, 'контейнер создан'))
            history.push(redirect)
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400) {
                toast.error(error.response.data.message)
            } else {
                dispatch({
                    type: CREATE_CONTAINER_ERROR,
                    payload: error.response
                })
                toast.error(error.response)
            }
        })
}

export const changeContainerStatus = (id, data) => async dispatch => {
    await dispatch({
        type: CHANGE_CONTAINER_STATUS_START
    })
    const url = `/api/containers/${id}/changestatus`
    axios
        .post(url, data)
        .then((answer) => {
            dispatch({
                type: CHANGE_CONTAINER_STATUS_SUCCESS,
                payload: answer.data
            })
            toast.success(createNotyMsg(answer.data.name,
                'статус контейнера изменен'))
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: CHANGE_CONTAINER_STATUS_ERROR,
                payload: error.response
            })
            if (error.response?.status === 400) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
            }
        })
}

export const getMarkingList = (id, date) => {
    const url = `/api/orders/${id}/getpdfmarkinglist`
    axios
        .get(url, {
            responseType: 'blob'
        })
        .then((answer) => {
            const blob = new Blob([answer.data],
                {type: 'application/pdf;charset=utf-8'})
            toast.success(`Маркировочный лист сгенерирован`)
            saveAs(blob, `markinglist-${id}-${timeConverter(date)}.pdf`)
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
            }
        })
}

export const editContainerAdmin = (id, data) => async dispatch => {
    const url = `/api/containers/${id}`

    axios
        .put(url, data)
        .then(({data}) => {
            dispatch({
                type: EDIT_CONTAINER_ADMIN,
                payload: data
            })
            toast.success('Данные контейнера успешно изменены')
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
            }
        })
}

export const setOrderPayment = (id, data) => async dispatch => {
    const url = `/api/orders/${id}/setprices`

    axios
        .put(url, data)
        .then(({data}) => {
            toast.success(`Информация об оплате успешно записана`)
            dispatch({
                type: SET_ORDER_PAYMENT,
                payload: data
            })
        })
        .catch((error: AxiosError) => {
            if (error.response?.status === 400 || error.response?.status === 404) {
                toast.error(error.response.data.message)
            } else {
                toast.error(error.message)
            }
        })
}
