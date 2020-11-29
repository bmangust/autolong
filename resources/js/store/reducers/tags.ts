import {
    FETCH_TAGS_ERROR,
    FETCH_TAGS_START,
    FETCH_TAGS_SUCCESS
} from '../actions/actionTypes'
import {ITagsActionTypes, ITagsState} from '../../components/Catalogs/ITags'

const initialState: ITagsState = {
    tags: [],
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
                ...state, loading: false, tags: action.payload
            }
        case FETCH_TAGS_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        default:
            return state
    }
}
