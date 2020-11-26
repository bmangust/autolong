import {
    ICountriesActionTypes,
    ICountriesState
} from '../../components/Сountries/ICountries'
import {
    CREATE_COUNTRY_ERROR,
    CREATE_COUNTRY_START,
    CREATE_COUNTRY_SUCCESS,
    DELETE_COUNTRY_ERROR,
    DELETE_COUNTRY_START,
    DELETE_COUNTRY_SUCCESS,
    FETCH_COUNTRIES_ERROR,
    FETCH_COUNTRIES_START,
    FETCH_COUNTRIES_SUCCESS
} from '../actions/actionTypes'

const initialState: ICountriesState = {
    countries: [],
    loading: true,
    error: null
}

export default function countryReducer(
    state = initialState,
    action: ICountriesActionTypes): ICountriesState {
    switch (action.type) {
        case FETCH_COUNTRIES_START:
            return {
                ...state, loading: true
            }
        case FETCH_COUNTRIES_SUCCESS:
            return {
                ...state, countries: action.payload, loading: false
            }
        case FETCH_COUNTRIES_ERROR:
            return {
                ...state, error: action.payload, loading: false
            }
        case CREATE_COUNTRY_START:
            return {
                ...state, loading: true
            }
        case CREATE_COUNTRY_SUCCESS:
            return {
                ...state,
                countries: [...state.countries, action.payload],
                loading: false
            }
        case CREATE_COUNTRY_ERROR:
            return {
                ...state, error: action.payload, loading: false
            }
        case DELETE_COUNTRY_START:
            return {
                ...state, loading: true
            }
        case DELETE_COUNTRY_SUCCESS:
            return {
                ...state,
                countries: state.countries
                    .filter(({id}) => id !== action.payload),
                loading: false
            }
        case DELETE_COUNTRY_ERROR:
            return {
                ...state, error: action.payload, loading: false
            }
        default:
            return state
    }
}
