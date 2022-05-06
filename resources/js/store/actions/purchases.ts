import {
    FETCH_LOGS_ERROR,
    FETCH_LOGS_START,
    FETCH_LOGS_SUCCESS
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'

export const fetchPurchases = () => async dispatch => {
    await dispatch({
        type: FETCH_LOGS_START
    })
    const url = '/api/purchases'
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_LOGS_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_LOGS_ERROR,
                payload: error.response
            })
            toast.error(error.message)
        })
}
