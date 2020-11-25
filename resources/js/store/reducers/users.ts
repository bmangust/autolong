import {
    CREATE_USER_ERROR,
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
    FETCH_USERS_ERROR,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS
} from '../actions/actionTypes'
import {IUsersActionTypes, IUsersState} from '../../components/Users/IUsers'

const initialState: IUsersState = {
    loading: true,
    error: null,
    users: []
}

export default function usersReducer(
    state = initialState,
    action: IUsersActionTypes) {
    switch (action.type) {
        case FETCH_USERS_START:
            return {
                ...state, loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state, loading: false, users: action.payload
            }
        case FETCH_USERS_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case CREATE_USER_START:
            return {
                ...state, loading: true
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state, loading: false
            }
        case CREATE_USER_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        default:
            return state
    }
}
