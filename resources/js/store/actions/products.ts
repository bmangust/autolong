import {
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_START,
    CREATE_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCT_ERROR,
    FETCH_PRODUCT_START,
    FETCH_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,
    UPDATE_PRODUCT_START,
    UPDATE_PRODUCT_SUCCESS,
    FETCH_PRODUCT_PRICE,
    FETCH_BY_VENDOR_START,
    FETCH_BY_VENDOR_SUCCESS,
    FETCH_BY_VENDOR_ERROR, DELETE_PRODUCT_BY_ID
} from './actionTypes'

import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'

export const fetchProducts = () => async dispatch => {
    await dispatch({
        type: FETCH_PRODUCTS_START
    })

    const url = '/api/products'
    axios.get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_PRODUCTS_ERROR,
                payload: error.response
            })
        })
}

export const fetchProductById = (id) => async dispatch => {
    await dispatch({
        type: FETCH_PRODUCT_START
    })

    const url = `/api/products/${id}`
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_PRODUCT_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_PRODUCT_ERROR,
                payload: error.response
            })
        })
}

export const createProduct = (data) => async dispatch => {
    const formData = new FormData()
    Object.entries(data).map(([key, val]) => {
        if (Array.isArray(val)) {
            return formData.append(key, JSON.stringify(val))
        } else {
            return formData.append(key, val)
        }
    })
    await dispatch({
        type: CREATE_PRODUCT_START
    })
    const url = '/api/products'
    axios
        .post(url, formData)
        .then((answer) => {
            dispatch({
                type: CREATE_PRODUCT_SUCCESS,
                payload: answer.data
            })
            toast.success(`${answer.data.nameRu} - товар создан`)
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: CREATE_PRODUCT_ERROR,
                payload: error.response
            })
            toast.error(error.message)
        })
}

export const updateProduct = (id, data) => async dispatch => {
    const formData = new FormData()
    Object.entries(data).map(([key, val]) => {
        if (Array.isArray(val)) {
            return formData.append(key, JSON.stringify(val))
        } else {
            return formData.append(key, val)
        }
    })
    await dispatch({
        type: UPDATE_PRODUCT_START
    })
    const url = `/api/products/${id}`
    axios
        .put(url, formData)
        .then((answer) => {
            dispatch({
                type: UPDATE_PRODUCT_SUCCESS,
                payload: answer.data
            })
            toast.success(`${answer.data.nameRu} - товар обновлен`)
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: UPDATE_PRODUCT_ERROR,
                payload: error.response
            })
            toast.error(error.message)
        })
}

export const fetchProductPrice = (priceCny) =>
    async dispatch => {
        const data = {
            priceCny
        }
        const url = '/api/products/calculateprice'
        axios
            .post(url, data)
            .then((answer) => {
                    dispatch({
                        type: FETCH_PRODUCT_PRICE,
                        payload: answer.data
                    })
                }
            )
    }

export const fetchProductsByVendors = (data) => async dispatch => {
    await dispatch({
        type: FETCH_BY_VENDOR_START
    })
    const numbers = data.numbers.split('\n').filter(el => {
        return el != null && el != ''
    })
    const url = '/api/products/checknumbercode'
    axios
        .post(url, {numbers})
        .then((answer) => {
            dispatch({
                type: FETCH_BY_VENDOR_SUCCESS,
                payload: answer.data
            })
        }).catch((error: AxiosError) => {
        dispatch({
            type: FETCH_BY_VENDOR_ERROR,
            payload: error.response
        })
    })
}

export const deleteProductById = (id) => async dispatch => {
    const url = `/api/products/${id}`
    axios
        .delete(url)
        .then((answer) => {
            dispatch({
                type: DELETE_PRODUCT_BY_ID,
                payload: id
            })
            toast.success('Товар удален')
        })
}
