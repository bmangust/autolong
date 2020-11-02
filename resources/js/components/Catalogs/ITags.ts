import {
    FETCH_TAGS_ERROR,
    FETCH_TAGS_START,
    FETCH_TAGS_SUCCESS
} from '../../store/actions/actionTypes'

export interface ITag {
    id?: string
    name: string
}

export interface ITagsState {
    tags: ITag[] | []
    loading: boolean
    error: any
}

export interface ITagsRootState {
    tagsState: ITagsState
}

interface IFetchTagsStart {
    type: typeof FETCH_TAGS_START
    loading: true
}

interface IFetchTagsSuccess {
    type: typeof FETCH_TAGS_SUCCESS
    payload: ITag[]
    loading: true
}

interface IFetchTagsError {
    type: typeof FETCH_TAGS_ERROR
    payload: any
    loading: true
}

export type ITagsActionTypes =
    IFetchTagsStart | IFetchTagsSuccess | IFetchTagsError


