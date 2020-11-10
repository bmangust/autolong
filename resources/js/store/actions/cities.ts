import {
    FETCH_CITIES_ERROR,
    FETCH_CITIES_START,
    FETCH_CITIES_SUCCESS
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'

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
