import {
    CREATE_CHANGELOG_ERROR,
    CREATE_CHANGELOG_START,
    CREATE_CHANGELOG_SUCCESS,
    FETCH_CHANGELOG_ERROR,
    FETCH_CHANGELOG_START,
    FETCH_CHANGELOG_SUCCESS
} from './actionTypes'
import axios, {AxiosError} from 'axios'
import {toast} from 'react-toastify'
import {createNotyMsg} from '../../utils'
import {history} from '../../app'

export const fetchChangelog = () => async dispatch => {
    await dispatch({
        type: FETCH_CHANGELOG_START
    })
    const url = '/api/changelog'
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_CHANGELOG_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_CHANGELOG_ERROR,
                payload: error.response
            })
            toast.error(error.message)
        })
}

export const createChangelog = (data, redirect = '') => async dispatch => {
    await dispatch({
        type: CREATE_CHANGELOG_START
    })
    const url = '/api/changelog'
    axios
        .post(url, data)
        .then((answer) => {
            dispatch({
                type: CREATE_CHANGELOG_SUCCESS,
                payload: answer.data
            })
            toast.success(createNotyMsg(answer.data.nameRu, 'Лог создан'))
            history.push(redirect)
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: CREATE_CHANGELOG_ERROR,
                payload: error.response
            })
        })
}
