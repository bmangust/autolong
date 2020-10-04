import {
    FETCH_CONTAINERS_ERROR,
    FETCH_CONTAINERS_START,
    FETCH_CONTAINERS_SUCCESS,
    FETCH_CONTAINER_ERROR,
    FETCH_CONTAINER_START,
    FETCH_CONTAINER_SUCCESS
} from './actionTypes'
import axios, {AxiosError} from 'axios'

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

export const fetchContainerById = (id) => async dispatch => {
    await dispatch({
        type: FETCH_CONTAINER_START
    })

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
