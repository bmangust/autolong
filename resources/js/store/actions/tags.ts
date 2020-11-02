import {
    FETCH_TAGS_ERROR,
    FETCH_TAGS_START,
    FETCH_TAGS_SUCCESS
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'

export const fetchTags = () => async dispatch => {
    await dispatch({
        type: FETCH_TAGS_START
    })
    const url = '/api/tags'
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_TAGS_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_TAGS_ERROR,
                payload: error.response
            })
            toast.error(error.message)
        })
}
