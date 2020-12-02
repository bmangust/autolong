import {
    CREATE_USER_ERROR,
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
    FETCH_USER_BY_ID_ERROR,
    FETCH_USER_BY_ID_START,
    FETCH_USER_BY_ID_SUCCESS,
    FETCH_USERS_ERROR,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_USER_START,
    UPDATE_USER_SUCCESS,
    DELETE_USER_BY_ID
} from '../actions/actionTypes'
import {IUsersActionTypes, IUsersState} from '../../components/Users/IUsers'

const initialState: IUsersState = {
    loading: true,
    user: {},
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
                ...state, loading: false, user: action.payload
            }
        case CREATE_USER_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case FETCH_USER_BY_ID_START:
            return {
                ...state, loading: true
            }
        case FETCH_USER_BY_ID_SUCCESS:
            return {
                ...state, loading: false, user: action.payload
            }
        case FETCH_USER_BY_ID_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case UPDATE_USER_START:
            return {
                ...state, loading: true
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state, loading: false, user: action.payload
            }
        case UPDATE_USER_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case DELETE_USER_BY_ID:
            return {
                ...state,
                users: state.users.filter(({id}) => id !== action.payload)
            }
        default:
            return state
    }
}
