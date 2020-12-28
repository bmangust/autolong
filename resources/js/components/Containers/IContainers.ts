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
    FETCH_UNAPPLIED_ORDERS_ERROR,
    CHANGE_CONTAINER_STATUS_START,
    CHANGE_CONTAINER_STATUS_SUCCESS,
    CHANGE_CONTAINER_STATUS_ERROR,
    DELETE_CONTAINER_BY_ID,
    EDIT_CONTAINER_ADMIN,
    SET_ORDER_PAYMENT
} from '../../store/actions/actionTypes'
import {ICity} from '../Cities/ICities'
import {IOrder} from '../Orders/IOrders'
import {ISandboxFile} from '../SandboxCard/SandboxFilesCard'

export interface IContainer {
    id: number
    name: string
    status: string
    city: ICity
    orders: IOrder[]
    deliveryPrice: number
    identifier: string | null
    sandboxFiles: ISandboxFile[] | []
    arrivalDate: number | null
    releaseDate: number | null
    createdAt: number
    updatedAt: number
}

export interface IContainersState {
    containers: IContainer[]
    container: IContainer | null
    unappliedOrders: IOrder[]
    loadingUnapplied: boolean
    loading: boolean
    loadingStatus: boolean
    error: any
    statusError: any
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

interface IChangeContainerStatusStart {
    type: typeof CHANGE_CONTAINER_STATUS_START
    loadingStatus: boolean
}

interface IChangeContainerStatusSuccess {
    type: typeof CHANGE_CONTAINER_STATUS_SUCCESS
    payload: any
    loadingStatus: boolean
}

interface IChangeContainerStatusError {
    type: typeof CHANGE_CONTAINER_STATUS_ERROR
    payload: any
    loadingStatus: boolean
}

interface IDeleteContainerById {
    type: typeof DELETE_CONTAINER_BY_ID
    payload: any
}

interface IEditContainerAdmin {
    type: typeof EDIT_CONTAINER_ADMIN
    payload: IContainer
}

interface ISetContainerPayment {
    type: typeof SET_ORDER_PAYMENT
    payload: IContainer
}

export type IContainersActionTypes =
    IFetchContainersStart | IFetchContainersSuccess | IFetchContainersError |
    IFetchContainerStart | IFetchContainerSuccess | IFetchContainerError |
    ICreateContainerStart | ICreateContainerSuccess | ICreateContainerError |
    IFetchUnappliedOrdersStart | IFetchUnappliedOrdersSuccess |
    IFetchUnappliedOrdersError | IChangeContainerStatusStart |
    IChangeContainerStatusSuccess | IChangeContainerStatusError |
    IDeleteContainerById | IEditContainerAdmin | ISetContainerPayment
