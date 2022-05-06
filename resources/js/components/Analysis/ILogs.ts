import {FETCH_LOGS_ERROR, FETCH_LOGS_START, FETCH_LOGS_SUCCESS} from '../../store/actions/actionTypes'

export interface ILog {
    id: number
    user: string
    action: string
    model: string
    modelName: string
    before: string
    after: string
    createdAt: string
    updatedAt: string
}

export interface ILogsState {
    logs: ILog[]
    loading: boolean
    error: any
}

export interface ILogsRootState {
    logsState: ILogsState
}

interface IFetchLogsStart {
    type: typeof FETCH_LOGS_START
    loading: boolean
}

interface IFetchLogsSuccess {
    type: typeof FETCH_LOGS_SUCCESS
    payload: ILog[]
    loading: boolean
}

interface IFetchLogsError {
    type: typeof FETCH_LOGS_ERROR
    payload: any
    loading: boolean
}

export type ILogsActionTypes =
    IFetchLogsStart | IFetchLogsSuccess | IFetchLogsError
