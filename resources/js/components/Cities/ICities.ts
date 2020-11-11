import {
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
    cities: ICity[] | []
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

export type ICitiesActionTypes =
    IFetchCitiesStart | IFetchCitiesSuccess | IFetchCitiesError
