// Types
import {
    CREATE_CATALOG_ERROR,
    CREATE_CATALOG_START,
    CREATE_CATALOG_SUCCESS,
    DELETE_CATALOG_SUCCESS,
    FETCH_CATALOGS_ERROR,
    FETCH_CATALOGS_START,
    FETCH_CATALOGS_SUCCESS,
    FETCH_CATALOG_ERROR,
    FETCH_CATALOG_START,
    FETCH_CATALOG_SUCCESS,
    UPDATE_CATALOG_FILE,
    UPDATE_CATALOG_SUCCESS
} from '../actions/actionTypes'

// Typescript
import {
    ICatalogsActionTypes,
    ICatalogsState
} from '../../components/Catalogs/ICatalogs'

const initialState: ICatalogsState = {
    catalogs: [],
    catalog: {},
    loading: true,
    error: null
}

export default function catalogsReducer(
    state = initialState,
    action: ICatalogsActionTypes): ICatalogsState {
    switch (action.type) {
        case FETCH_CATALOGS_START:
            return {
                ...state, loading: true
            }
        case FETCH_CATALOGS_SUCCESS:
            return {
                ...state, loading: false, catalogs: action.payload
            }
        case FETCH_CATALOGS_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case FETCH_CATALOG_START:
            return {
                ...state, loading: true
            }
        case FETCH_CATALOG_SUCCESS:
            return {
                ...state, loading: false, catalog: action.payload
            }
        case FETCH_CATALOG_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case CREATE_CATALOG_START:
            return {
                ...state, loading: true
            }
        case CREATE_CATALOG_SUCCESS:
            return {
                ...state, loading: false, catalog: action.payload
            }
        case CREATE_CATALOG_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case DELETE_CATALOG_SUCCESS:
            return {
                ...state,
                catalog: {},
                catalogs: state.catalogs.filter(({id}) => id !== action.payload)
            }
        case UPDATE_CATALOG_SUCCESS:
            return {
                ...state, catalog: action.payload
            }
        case UPDATE_CATALOG_FILE:
            return {
                ...state
            }
        default:
            return state
    }
}
