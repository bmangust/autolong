import {ILogsActionTypes, ILogsState} from '../../components/Log/ILogs'
import {
    FETCH_LOGS_ERROR,
    FETCH_LOGS_START,
    FETCH_LOGS_SUCCESS
} from '../actions/actionTypes'

const initialState: ILogsState = {
    logs: [],
    loading: true,
    error: null
}

export default function logsReducer(
    state = initialState,
    action: ILogsActionTypes): ILogsState {
    switch (action.type) {
        case FETCH_LOGS_START:
            return {
                ...state, loading: true
            }
        case FETCH_LOGS_SUCCESS:
            return {
                ...state, logs: action.payload, loading: false
            }
        case FETCH_LOGS_ERROR:
            return {
                ...state, error: action.payload, loading: false
            }
        default:
            return state
    }
}
