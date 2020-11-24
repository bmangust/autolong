import {
    CREATE_ROLE_ERROR,
    CREATE_ROLE_START, CREATE_ROLE_SUCCESS,
    FETCH_ROLES_ERROR,
    FETCH_ROLES_START,
    FETCH_ROLES_SUCCESS
} from '../actions/actionTypes'
import {IRolesActionTypes, IRoleState} from '../../components/Roles/IRoles'

const initialState: IRoleState = {
    loading: true,
    error: null,
    roles: []
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
        default:
            return state
    }
}
