import {
    CREATE_IMPORTER_ERROR,
    CREATE_IMPORTER_START,
    CREATE_IMPORTER_SUCCESS,
    FETCH_IMPORTERS_ERROR,
    FETCH_IMPORTERS_START,
    FETCH_IMPORTERS_SUCCESS,
    FETCH_IMPORTER_ERROR,
    FETCH_IMPORTER_START,
    FETCH_IMPORTER_SUCCESS
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'
import {push} from 'connected-react-router'

export const fetchImporters = () => async dispatch => {
    await dispatch({
        type: FETCH_IMPORTERS_START
    })

    const url = '/api/importers'
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_IMPORTERS_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_IMPORTERS_ERROR,
                payload: error.response
            })
        })
}

export const fetchImporterById = (id) => async dispatch => {
    await dispatch({
        type: FETCH_IMPORTER_START
    })

    const url = `/api/importers/${id}`
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_IMPORTER_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_IMPORTER_ERROR,
                payload: error.response
            })
        })
}

export const createImporter = (data, redirect = '') => async dispatch => {
    await dispatch({
        type: CREATE_IMPORTER_START
    })
    const url = '/api/importers'
    axios
        .post(url, data)
        .then((answer) => {
            dispatch({
                type: CREATE_IMPORTER_SUCCESS,
                payload: answer.data
            })
            toast.success(
                createNotyMsg(answer.data.nameRu, 'импортер создан'))
            dispatch(push(redirect))
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: CREATE_IMPORTER_ERROR,
                payload: error.response
            })
        })
}
