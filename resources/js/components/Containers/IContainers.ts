import {
    CREATE_CONTAINER_ERROR,
    CREATE_CONTAINER_START,
    CREATE_CONTAINER_SUCCESS,
    FETCH_CONTAINERS_ERROR,
    FETCH_CONTAINERS_START,
    FETCH_CONTAINERS_SUCCESS,
    FETCH_CONTAINER_ERROR,
    FETCH_CONTAINER_START,
    FETCH_CONTAINER_SUCCESS,
    FETCH_UNAPPLIED_ORDERS_START,
    FETCH_UNAPPLIED_ORDERS_SUCCESS,
    FETCH_UNAPPLIED_ORDERS_ERROR
} from '../../store/actions/actionTypes'
import {ICity} from '../Cities/ICities'
import {IOrder} from '../Orders/IOrders'

export interface IContainer {
    id: number | null
    name: string
    status: string // Нужно переписать под все возможные статусы
    city: ICity
    createdAt?: number
    updatedAt?: number
}

export interface IContainersState {
    containers: IContainer[] | []
    container: IContainer | {}
    unappliedOrders: IOrder[] | []
    loadingUnapplied: boolean
    loading: boolean
    error: any
}

export interface IContainersRootState {
    containersState: IContainersState
}

interface IFetchContainersStart {
    type: typeof FETCH_CONTAINERS_START
    loading: boolean
}

interface IFetchContainersSuccess {
    type: typeof FETCH_CONTAINERS_SUCCESS
    payload: IContainer[]
    loading: boolean
}

interface IFetchContainersError {
    type: typeof FETCH_CONTAINERS_ERROR
    payload: any
    loading: boolean
}

interface IFetchContainerStart {
    type: typeof FETCH_CONTAINER_START
    loading: boolean
}

interface IFetchContainerSuccess {
    type: typeof FETCH_CONTAINER_SUCCESS
    payload: IContainer
    loading: boolean
}

interface IFetchContainerError {
    type: typeof FETCH_CONTAINER_ERROR
    payload: any
    loading: boolean
}

interface ICreateContainerStart {
    type: typeof CREATE_CONTAINER_START
    loading: boolean
}

interface ICreateContainerSuccess {
    type: typeof CREATE_CONTAINER_SUCCESS
    payload: IContainer
    loading: boolean
}

interface ICreateContainerError {
    type: typeof CREATE_CONTAINER_ERROR
    payload: any
    loading: boolean
}

interface IFetchUnappliedOrdersStart {
    type: typeof FETCH_UNAPPLIED_ORDERS_START
    loadingUnapplied: boolean
}

interface IFetchUnappliedOrdersSuccess {
    type: typeof FETCH_UNAPPLIED_ORDERS_SUCCESS
    payload: IOrder[]
    loadingUnapplied: boolean
}

interface IFetchUnappliedOrdersError {
    type: typeof FETCH_UNAPPLIED_ORDERS_ERROR
    payload: any
    loadingUnapplied: boolean
}

export type IContainersActionTypes =
    IFetchContainersStart | IFetchContainersSuccess | IFetchContainersError |
    IFetchContainerStart | IFetchContainerSuccess | IFetchContainerError |
    ICreateContainerStart | ICreateContainerSuccess | ICreateContainerError |
    IFetchUnappliedOrdersStart | IFetchUnappliedOrdersSuccess |
    IFetchUnappliedOrdersError
