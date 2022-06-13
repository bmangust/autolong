import {FETCH_CHANGELOG_ERROR, FETCH_CHANGELOG_START, FETCH_CHANGELOG_SUCCESS} from '../../store/actions/actionTypes'

export interface IChangelog {
    id: number
    link: string
    changes: string
    created_at: string
    updated_at: string
}

export interface IChangelogState {
    changelog: IChangelog[]
    loading: boolean
    error: any
}

export interface IChangelogRootState {
    changelogState: IChangelogState
}

interface IFetchChangelogStart {
    type: typeof FETCH_CHANGELOG_START
    loading: boolean
}

interface IFetchChangelogSuccess {
    type: typeof FETCH_CHANGELOG_SUCCESS
    payload: IChangelog[]
    loading: boolean
}

interface IFetchChangelogError {
    type: typeof FETCH_CHANGELOG_ERROR
    payload: any
    loading: boolean
}

export type IChangelogActionTypes =
    IFetchChangelogStart | IFetchChangelogSuccess | IFetchChangelogError
