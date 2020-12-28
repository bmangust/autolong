import {
    IProvidersActionTypes,
    IProvidersState
} from '../../components/Providers/IProviders'
import {
    CREATE_PROVIDER_ERROR,
    CREATE_PROVIDER_START,
    CREATE_PROVIDER_SUCCESS,
    DELETE_PROVIDER_BY_ID,
    FETCH_PROVIDERS_ERROR,
    FETCH_PROVIDERS_START,
    FETCH_PROVIDERS_SUCCESS,
    FETCH_PROVIDER_ERROR,
    FETCH_PROVIDER_START,
    FETCH_PROVIDER_SUCCESS,
    SET_BLACK_LABEL,
    UPDATE_PROVIDER_ERROR,
    UPDATE_PROVIDER_START,
    UPDATE_PROVIDER_SUCCESS
} from '../actions/actionTypes'

const initialState: IProvidersState = {
    providers: [],
    provider: null,
    loading: true,
    error: null
}

export default function providersReducer(
    state = initialState,
    action: IProvidersActionTypes): IProvidersState {
    switch (action.type) {
        case FETCH_PROVIDERS_START:
            return {
                ...state, loading: true
            }
        case FETCH_PROVIDERS_SUCCESS:
            return {
                ...state, loading: false, providers: action.payload
            }
        case FETCH_PROVIDERS_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case FETCH_PROVIDER_START:
            return {
                ...state, loading: true
            }
        case FETCH_PROVIDER_SUCCESS:
            return {
                ...state, loading: false, provider: action.payload
            }
        case FETCH_PROVIDER_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case CREATE_PROVIDER_START:
            return {
                ...state, loading: true
            }
        case CREATE_PROVIDER_SUCCESS:
            return {
                ...state, loading: false, provider: action.payload
            }
        case CREATE_PROVIDER_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case DELETE_PROVIDER_BY_ID:
            return {
                ...state, providers: state.providers.filter(({id}) =>
                    id !== action.payload), provider: {}
            }
        case UPDATE_PROVIDER_START:
            return {
                ...state, loading: true
            }
        case UPDATE_PROVIDER_SUCCESS:
            return {
                ...state, provider: action.payload, loading: false
            }
        case UPDATE_PROVIDER_ERROR:
            return {
                ...state, error: action.payload, loading: false
            }
        case SET_BLACK_LABEL:
            return {
                ...state, provider: action.payload
            }
        default:
            return state
    }
}
