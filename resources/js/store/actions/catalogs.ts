import {
    CREATE_CATALOG_START,
    CREATE_CATALOG_SUCCESS,
    CREATE_CATALOG_ERROR,
    FETCH_CATALOGS_ERROR,
    FETCH_CATALOGS_START,
    FETCH_CATALOGS_SUCCESS,
    FETCH_CATALOG_ERROR,
    FETCH_CATALOG_START,
    FETCH_CATALOG_SUCCESS
} from './actionTypes'
import axios, {AxiosError} from 'axios'

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

export const createCatalog = (data) => async dispatch => {
    const formData = new FormData()
    Object.entries(data).map(([key, val]) => {
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
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: CREATE_CATALOG_ERROR,
                payload: error.response
            })
        })
}
