import {
    CREATE_ROLE_ERROR,
    CREATE_ROLE_START,
    CREATE_ROLE_SUCCESS,
    FETCH_ROLE_BY_ID_ERROR,
    FETCH_ROLE_BY_ID_START,
    FETCH_ROLE_BY_ID_SUCCESS,
    FETCH_ROLES_ERROR,
    FETCH_ROLES_START,
    FETCH_ROLES_SUCCESS,
    UPDATE_ROLE_ERROR,
    UPDATE_ROLE_START,
    UPDATE_ROLE_SUCCESS
} from '../actions/actionTypes'
import {IRolesActionTypes, IRoleState} from '../../components/Roles/IRoles'

const initialState: IRoleState = {
    roles: [],
    role: {},
    loading: true,
    error: null
}

export default function rolesReducer(
    state = initialState,
    action: IRolesActionTypes) {
    switch (action.type) {
        case FETCH_ROLES_START:
            return {
                ...state, loading: true
            }
        case FETCH_ROLES_SUCCESS:
            return {
                ...state, loading: false, roles: action.payload
            }
        case FETCH_ROLES_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case CREATE_ROLE_START:
            return {
                ...state, loading: true
            }
        case CREATE_ROLE_SUCCESS:
            return {
                ...state, loading: false
            }
        case CREATE_ROLE_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case FETCH_ROLE_BY_ID_START:
            return {
                ...state, loading: true
            }
        case FETCH_ROLE_BY_ID_SUCCESS:
            return {
                ...state, loading: false, role: action.payload
            }
        case FETCH_ROLE_BY_ID_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case UPDATE_ROLE_START:
            return {
                ...state, loading: true
            }
        case UPDATE_ROLE_SUCCESS:
            return {
                ...state, loading: false, role: action.payload
            }
        case UPDATE_ROLE_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        default:
            return state
    }
}
