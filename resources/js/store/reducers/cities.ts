import {
    FETCH_CITIES_ERROR,
    FETCH_CITIES_START,
    FETCH_CITIES_SUCCESS
} from '../actions/actionTypes'
import {ICitiesActionTypes, ICitiesState} from '../../components/Cities/ICities'

const initialState: ICitiesState = {
    cities: [],
    loading: true,
    error: null
}

export default function citiesReducer(
    state = initialState,
    action: ICitiesActionTypes): ICitiesState {
    switch (action.type) {
        case FETCH_CITIES_START:
            return {
                ...state, loading: true
            }
        case FETCH_CITIES_SUCCESS:
            return {
                ...state, loading: true, cities: action.payload
            }
        case FETCH_CITIES_ERROR:
            return {
                ...state, loading: true, error: action.payload
            }
        default:
            return state
    }
}