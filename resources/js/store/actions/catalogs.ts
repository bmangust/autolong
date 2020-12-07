import {
    CREATE_CATALOG_START,
    CREATE_CATALOG_SUCCESS,
    CREATE_CATALOG_ERROR,
    FETCH_CATALOGS_ERROR,
    FETCH_CATALOGS_START,
    FETCH_CATALOGS_SUCCESS,
    FETCH_CATALOG_ERROR,
    FETCH_CATALOG_START,
    FETCH_CATALOG_SUCCESS,
    DELETE_CATALOG_SUCCESS,
    UPDATE_CATALOG_SUCCESS, UPDATE_CATALOG_FILE
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'
import {push} from 'connected-react-router'

export const fetchCatalogs = () => async dispatch => {
    await dispatch({
                       type: FETCH_CATALOGS_START
                   })

    const url = '/api/catalogs'
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                         type: FETCH_CATALOGS_SUCCESS,
                         payload: answer.data
                     })
        })
        .catch((error: AxiosError) => {
            dispatch({
                         type: FETCH_CATALOGS_ERROR,
                         payload: error.response
                     })
        })
}

export const fetchCatalogById = (id) => async dispatch => {
    await dispatch({
                       type: FETCH_CATALOG_START
                   })

    const url = `/api/catalogs/${id}`
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                         type: FETCH_CATALOG_SUCCESS,
                         payload: answer.data
                     })
        })
        .catch((error: AxiosError) => {
            dispatch({
                         type: FETCH_CATALOG_ERROR,
                         payload: error.response
                     })
        })
}

export const createCatalog = (data, redirect = '') => async dispatch => {
    const formData = new FormData()
    Object.entries(data)
        .map(([key, val]) => {
            if (Array.isArray(val)) {
                return formData.append(key, JSON.stringify(val))
            } else {
                return formData.append(key, val)
            }
        })
    await dispatch({
                       type: CREATE_CATALOG_START
                   })
    const url = '/api/catalogs'
    axios
        .post(url, formData)
        .then((answer) => {
            dispatch({
                         type: CREATE_CATALOG_SUCCESS,
                         payload: answer.data
                     })
            toast.success(
                createNotyMsg(answer.data.name, 'каталог создан'))
            dispatch(push(redirect))
        })
        .catch((error: AxiosError) => {
            dispatch({
                         type: CREATE_CATALOG_ERROR,
                         payload: error.response
                     })
        })
}

export const deleteCatalogById = (id) => async dispatch => {
    const url = `/api/catalogs/${id}`
    axios
        .delete(url)
        .then((answer) => {
            dispatch({
                         type: DELETE_CATALOG_SUCCESS,
                         payload: id
                     })
            toast.success('Каталог удален')
            dispatch(push('/catalogs'))
        })
        .catch((error: AxiosError) => {
            toast.error(error.message)
        })
}

export const updateCatalogFileById = (id, data) => async dispatch => {
    const formData = new FormData()
    Object.entries(data)
        .forEach(([key, val]) => {
            if (Array.isArray(val)) {
                return formData.append(key, JSON.stringify(val))
            } else {
                return formData.append(key, val)
            }
        })
    const url = `/api/catalogs/${id}/addfile`
    axios
        .post(url, formData)
        .then((answer) => {
            dispatch({
                         type: UPDATE_CATALOG_FILE
                     })
        })
}

export const updateCatalogById = (data, id, redirect = '') =>
    async dispatch => {
        const url = `/api/catalogs/${id}`
        axios
            .put(url, data)
            .then((answer) => {
                dispatch({
                             type: UPDATE_CATALOG_SUCCESS,
                             payload: answer.data
                         })
                toast.success(
                    createNotyMsg(answer.data.name, 'каталог обновлен'))
                dispatch(push(redirect))
            })
            .catch((error: AxiosError) => {
                toast.error(error.message)
            })
    }
