import {
    CREATE_CITY_ERROR,
    CREATE_CITY_START,
    CREATE_CITY_SUCCESS,
    DELETE_CITY_ERROR,
    DELETE_CITY_START,
    DELETE_CITY_SUCCESS,
    FETCH_CITIES_ERROR,
    FETCH_CITIES_START,
    FETCH_CITIES_SUCCESS
} from '../../store/actions/actionTypes'

export interface ICity {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export interface ICitiesState {
    cities: ICity[]
    loading: boolean
    error: any
}

export interface ICitiesRootState {
    citiesState: ICitiesState
}

interface IFetchCitiesStart {
    type: typeof FETCH_CITIES_START
    loading: true
}

interface IFetchCitiesSuccess {
    type: typeof FETCH_CITIES_SUCCESS
    payload: ICity[]
    loading: true
}

interface IFetchCitiesError {
    type: typeof FETCH_CITIES_ERROR
    payload: any
    loading: true
}

interface ICreateCitiesStart {
    type: typeof CREATE_CITY_START
    loading: true
}

interface ICreateCitiesSuccess {
    type: typeof CREATE_CITY_SUCCESS
    payload: ICity
    loading: true
}

interface ICreateCitiesError {
    type: typeof CREATE_CITY_ERROR
    payload: any
    loading: true
}

interface IDeleteCitiesStart {
    type: typeof DELETE_CITY_START
    loading: true
}

interface IDeleteCitiesSuccess {
    type: typeof DELETE_CITY_SUCCESS
    payload: number
    loading: true
}

interface IDeleteCitiesError {
    type: typeof DELETE_CITY_ERROR
    payload: any
    loading: true
}

export type ICitiesActionTypes =
    IFetchCitiesStart | IFetchCitiesSuccess | IFetchCitiesError |
    ICreateCitiesStart | ICreateCitiesSuccess | ICreateCitiesError |
    IDeleteCitiesStart | IDeleteCitiesSuccess | IDeleteCitiesError
