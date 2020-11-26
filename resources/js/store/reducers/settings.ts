import {
    DELETE_EMAIL_SETTINGS_ERROR,
    DELETE_EMAIL_SETTINGS_START, DELETE_EMAIL_SETTINGS_SUCCESS,
    FETCH_EMAIL_SETTINGS_ERROR,
    FETCH_EMAIL_SETTINGS_START,
    FETCH_EMAIL_SETTINGS_SUCCESS,
    UPDATE_EMAIL_SETTINGS_ERROR,
    UPDATE_EMAIL_SETTINGS_START,
    UPDATE_EMAIL_SETTINGS_SUCCESS
} from '../actions/actionTypes'

const initialState = {
    loadingEmail: true,
    errorEmail: null,
    emailSettings: {}
}

export default function settingsReducer(
    state = initialState,
    action) {
    switch (action.type) {
        case FETCH_EMAIL_SETTINGS_START:
            return {
                ...state, loadingEmail: true
            }
        case FETCH_EMAIL_SETTINGS_SUCCESS:
            return {
                ...state, loadingEmail: false, emailSettings: action.payload
            }
        case FETCH_EMAIL_SETTINGS_ERROR:
            return {
                ...state, loadingEmail: false, errorEmail: action.payload
            }
        case UPDATE_EMAIL_SETTINGS_START:
            return {
                ...state, loadingEmail: true
            }
        case UPDATE_EMAIL_SETTINGS_SUCCESS:
            return {
                ...state, loadingEmail: false, emailSettings: action.payload
            }
        case UPDATE_EMAIL_SETTINGS_ERROR:
            return {
                ...state, loadingEmail: false, errorEmail: action.payload
            }
        case DELETE_EMAIL_SETTINGS_START:
            return {
                ...state, loadingEmail: true
            }
        case DELETE_EMAIL_SETTINGS_SUCCESS:
            return {
                ...state, loadingEmail: false, emailSettings: {}
            }
        case DELETE_EMAIL_SETTINGS_ERROR:
            return {
                ...state, loadingEmail: false, errorEmail: action.payload
            }
        default:
            return state
    }
}
