import {
    FETCH_COUNTRIES_START,
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_ERROR,
    CREATE_COUNTRY_ERROR,
    CREATE_COUNTRY_START,
    CREATE_COUNTRY_SUCCESS,
    DELETE_COUNTRY_START,
    DELETE_COUNTRY_SUCCESS,
    DELETE_COUNTRY_ERROR
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'

export const fetchCountries = () => async dispatch => {
    await dispatch({
        type: FETCH_COUNTRIES_START
    })

    const url = '/api/countries'
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_COUNTRIES_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_COUNTRIES_ERROR,
                payload: error.response
            })
        })
}

export const createCountry = (data) => async dispatch => {
    await dispatch({
        type: CREATE_COUNTRY_START
    })

    const url = '/api/countries'
    axios
        .post(url, data)
        .then((answer) => {
            dispatch({
                type: CREATE_COUNTRY_SUCCESS,
                payload: answer.data
            })
            toast.success(createNotyMsg(answer.data.name, 'страна добавлена'))
        })
        .catch((error: AxiosError) => {
            toast.error(error.message)
            if (error.response?.status === 400) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
                dispatch({
                    type: CREATE_COUNTRY_ERROR,
                    payload: error.response
                })
            }
        })
}

export const deleteCountryById = (id) => async dispatch => {
    await dispatch({
        type: DELETE_COUNTRY_START
    })

    const url = `/api/countries/${id}`
    axios
        .delete(url)
        .then((answer) => {
            dispatch({
                type: DELETE_COUNTRY_SUCCESS,
                payload: id
            })
            toast.success('Страна удалена')
        })
        .catch((error: AxiosError) => {
            toast.error(error.message)
            if (error.response?.status === 400) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
                dispatch({
                    type: DELETE_COUNTRY_ERROR,
                    payload: error.response
                })
            }
        })
}

