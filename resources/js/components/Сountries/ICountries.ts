import {
    CREATE_COUNTRY_ERROR,
    CREATE_COUNTRY_START,
    CREATE_COUNTRY_SUCCESS, DELETE_COUNTRY_ERROR, DELETE_COUNTRY_START, DELETE_COUNTRY_SUCCESS,
    FETCH_COUNTRIES_ERROR,
    FETCH_COUNTRIES_START,
    FETCH_COUNTRIES_SUCCESS
} from '../../store/actions/actionTypes'

export interface ICountry {
    id: number
    name: string
    providers: []
    createdAt?: number
    updatedAt?: number
}

export interface ICountriesState {
    countries: ICountry[]
    loading: boolean;
    error: any
}

export interface ICountriesRootState {
    countriesState: ICountriesState
}

interface IFetchCountriesStart {
    type: typeof FETCH_COUNTRIES_START
    loading: boolean
}

interface IFetchCountriesSuccess {
    type: typeof FETCH_COUNTRIES_SUCCESS
    loading: boolean
    payload: ICountry[]
}

interface IFetchCountriesError {
    type: typeof FETCH_COUNTRIES_ERROR
    loading: boolean
    payload: any
}

interface ICreateCountriesStart {
    type: typeof CREATE_COUNTRY_START
    loading: boolean
}

interface ICreateCountriesSuccess {
    type: typeof CREATE_COUNTRY_SUCCESS
    loading: boolean
    payload: ICountry
}

interface ICreateCountriesError {
    type: typeof CREATE_COUNTRY_ERROR
    loading: boolean
    payload: any
}

interface IDeleteCountriesStart {
    type: typeof DELETE_COUNTRY_START
    loading: boolean
}

interface IDeleteCountriesSuccess {
    type: typeof DELETE_COUNTRY_SUCCESS
    loading: boolean
    payload: number
}

interface IDeleteCountriesError {
    type: typeof DELETE_COUNTRY_ERROR
    loading: boolean
    payload: any
}

export type ICountriesActionTypes =
    IFetchCountriesStart | IFetchCountriesSuccess | IFetchCountriesError |
    ICreateCountriesStart | ICreateCountriesSuccess | ICreateCountriesError |
    IDeleteCountriesStart | IDeleteCountriesSuccess | IDeleteCountriesError

