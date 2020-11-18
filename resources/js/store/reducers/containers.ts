// Types
import {
    FETCH_CONTAINERS_ERROR,
    FETCH_CONTAINERS_START,
    FETCH_CONTAINERS_SUCCESS,
    FETCH_CONTAINER_ERROR,
    FETCH_CONTAINER_START,
    FETCH_CONTAINER_SUCCESS,
    CREATE_CONTAINER_ERROR,
    CREATE_CONTAINER_SUCCESS,
    CREATE_CONTAINER_START,
    FETCH_UNAPPLIED_ORDERS_SUCCESS,
    FETCH_UNAPPLIED_ORDERS_START,
    FETCH_UNAPPLIED_ORDERS_ERROR,
    CHANGE_CONTAINER_STATUS_START,
    CHANGE_CONTAINER_STATUS_SUCCESS,
    CHANGE_CONTAINER_STATUS_ERROR,
    DELETE_CONTAINER_BY_ID
} from '../actions/actionTypes'

// Typescript
import {
    IContainersActionTypes,
    IContainersState
} from '../../components/Containers/IContainers'

const initialState: IContainersState = {
    containers: [],
    container: {},
    unappliedOrders: [],
    loadingUnapplied: true,
    loading: true,
    loadingStatus: true,
    error: null,
    statusError: null
}

export default function containersReducer(
    state = initialState,
    action: IContainersActionTypes): IContainersState {
    switch (action.type) {
        case FETCH_CONTAINERS_START:
            return {
                ...state, loading: true
            }
        case FETCH_CONTAINERS_SUCCESS:
            return {
                ...state, loading: false, containers: action.payload
            }
        case FETCH_CONTAINERS_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case FETCH_CONTAINER_START:
            return {
                ...state, loading: true
            }
        case FETCH_CONTAINER_SUCCESS:
            return {
                ...state, loading: false, container: action.payload
            }
        case FETCH_CONTAINER_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case CREATE_CONTAINER_START:
            return {
                ...state, loading: true
            }
        case CREATE_CONTAINER_SUCCESS:
            return {
                ...state, loading: false, container: action.payload
            }
        case CREATE_CONTAINER_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case FETCH_UNAPPLIED_ORDERS_START:
            return {
                ...state, loadingUnapplied: true
            }
        case FETCH_UNAPPLIED_ORDERS_SUCCESS:
            return {
                ...state, loadingUnapplied: false,
                unappliedOrders: action.payload
            }
        case FETCH_UNAPPLIED_ORDERS_ERROR:
            return {
                ...state, loadingUnapplied: false, error: action.payload
            }
        case DELETE_CONTAINER_BY_ID:
            return {
                ...state, containers: state.containers.filter(({id}) =>
                    id !== action.payload), container: {}
            }
        case CHANGE_CONTAINER_STATUS_START:
            return {
                ...state, loadingStatus: true
            }
        case CHANGE_CONTAINER_STATUS_SUCCESS:
            return {
                ...state, loadingStatus: false, container: action.payload
            }
        case CHANGE_CONTAINER_STATUS_ERROR:
            return {
                ...state, loadingStatus: false, statusError: action.payload
            }
        default:
            return state
    }
}
