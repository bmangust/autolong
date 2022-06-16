import {IChangelogActionTypes, IChangelogState} from '../../components/Changelog/IChangelog'
import {
    FETCH_CHANGELOG_ERROR,
    FETCH_CHANGELOG_START,
    FETCH_CHANGELOG_SUCCESS,
} from '../actions/actionTypes'

const initialState: IChangelogState = {
    changelog: [],
    loading: true,
    error: null
}

export default function changelogReducer(
    state = initialState,
    action: IChangelogActionTypes): IChangelogState {
    switch (action.type) {
        case FETCH_CHANGELOG_START:
            return {
                ...state, loading: true
            }
        case FETCH_CHANGELOG_SUCCESS:
            return {
                ...state, changelog: action.payload, loading: false
            }
        case FETCH_CHANGELOG_ERROR:
            return {
                ...state, error: action.payload, loading: false
            }
        default:
            return state
    }
}
