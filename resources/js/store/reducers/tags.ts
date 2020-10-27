import {
    FETCH_TAGS_ERROR,
    FETCH_TAGS_START,
    FETCH_TAGS_SUCCESS
} from '../actions/actionTypes'
import {ITagsActionTypes, ITagsState} from '../../components/Catalogs/ITags'

const initialState: ITagsState = {
    tags: [{key: 'tagTest', value: 'tagTest'}],
    loading: true,
    error: null
}

export default function tagsReducer(
    state = initialState,
    action: ITagsActionTypes): ITagsState {
    switch (action.type) {
        case FETCH_TAGS_START:
            return {
                ...state, loading: true
            }
        case FETCH_TAGS_SUCCESS:
            return {
                ...state, loading: true, tags: action.payload
            }
        case FETCH_TAGS_ERROR:
            return {
                ...state, loading: true, error: action.payload
            }
        default:
            return state
    }
}
