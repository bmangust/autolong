import {
    CREATE_CITY_ERROR,
    CREATE_CITY_START,
    CREATE_CITY_SUCCESS,
    DELETE_CITY_ERROR,
    DELETE_CITY_START,
    DELETE_CITY_SUCCESS,
    FETCH_CITIES_ERROR,
    FETCH_CITIES_START,
    FETCH_CITIES_SUCCESS
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'

export const fetchCities = () => async dispatch => {
    await dispatch({
        type: FETCH_CITIES_START
    })
    const url = '/api/cities'
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_CITIES_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_CITIES_ERROR,
                payload: error.response
            })
            toast.error(error.message)
        })
}

export const createCity = (data) => async dispatch => {
    await dispatch({
        type: CREATE_CITY_START
    })

    const url = '/api/cities'
    axios
        .post(url, data)
        .then((answer) => {
            dispatch({
                type: CREATE_CITY_SUCCESS,
                payload: answer.data
            })
            toast.success(createNotyMsg(answer.data.name, 'город добавлен'))
        })
        .catch((error: AxiosError) => {
            toast.error(error.message)
            if (error.response?.status === 400) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
                dispatch({
                    type: CREATE_CITY_ERROR,
                    payload: error.response
                })
            }
        })
}

export const deleteCityById = (id) => async dispatch => {
    await dispatch({
        type: DELETE_CITY_START
    })

    const url = `/api/cities/${id}`
    axios
        .delete(url)
        .then((answer) => {
            dispatch({
                type: DELETE_CITY_SUCCESS,
                payload: id
            })
            toast.success('Город удален')
        })
        .catch((error: AxiosError) => {
            toast.error(error.message)
            if (error.response?.status === 400) {
                toast.error(error.response.data)
            } else {
                toast.error(error.message)
                dispatch({
                    type: DELETE_CITY_ERROR,
                    payload: error.response
                })
            }
        })
}

