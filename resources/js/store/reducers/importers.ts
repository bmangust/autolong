// Types
import {
    CREATE_IMPORTER_ERROR,
    CREATE_IMPORTER_START,
    CREATE_IMPORTER_SUCCESS,
    FETCH_IMPORTER_ERROR,
    FETCH_IMPORTER_START,
    FETCH_IMPORTER_SUCCESS,
    FETCH_IMPORTERS_ERROR,
    FETCH_IMPORTERS_START,
    FETCH_IMPORTERS_SUCCESS,
    UPDATE_IMPORTER_ERROR,
    UPDATE_IMPORTER_SUCCESS, UPDATE_IMPORTER_START
} from '../actions/actionTypes'

// Typescript
import {
    IImportersActionTypes,
    IImportersState
} from '../../components/Importers/IImporters'

const initialState: IImportersState = {
    importers: [],
    importer: {},
    loading: true,
    error: null
}

export default function importersReducer(
    state = initialState,
    action: IImportersActionTypes): IImportersState {
    switch (action.type) {
        case FETCH_IMPORTERS_START:
            return {
                ...state, loading: true
            }
        case FETCH_IMPORTERS_SUCCESS:
            return {
                ...state, loading: false, importers: action.payload
            }
        case FETCH_IMPORTERS_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case FETCH_IMPORTER_START:
            return {
                ...state, loading: true
            }
        case FETCH_IMPORTER_SUCCESS:
            return {
                ...state, loading: false, importer: action.payload
            }
        case FETCH_IMPORTER_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case CREATE_IMPORTER_START:
            return {
                ...state, loading: true
            }
        case CREATE_IMPORTER_SUCCESS:
            return {
                ...state, loading: false, importer: action.payload
            }
        case CREATE_IMPORTER_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case UPDATE_IMPORTER_START:
            return {
                ...state, loading: true
            }
        case UPDATE_IMPORTER_SUCCESS:
            return {
                ...state, loading: false, importer: action.payload
            }
        case UPDATE_IMPORTER_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        default:
            return state
    }
}
