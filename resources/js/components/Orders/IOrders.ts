import {
    CREATE_ORDER_ERROR,
    CREATE_ORDER_START,
    CREATE_ORDER_SUCCESS,
    FETCH_ORDERS_ERROR,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDER_ERROR,
    FETCH_ORDER_START,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_PRODUCTS
} from '../../store/actions/actionTypes'
import {IProvider} from '../Providers/IProviders'
import {IProduct} from '../Products/IProducts'

export interface IOrder {
    id: number
    name: string
    status: string
    items: IProduct[]
    priceCny: number
    provider: IProvider
    createdAt?: number
    updatedAt?: number
}

export interface IOrdersState {
    orders: IOrder[] | []
    order: IOrder | {}
    orderProducts: []
    loading: boolean;
    error: any
}

export interface IOrdersRootState {
    ordersState: IOrdersState
}

interface IFetchOrdersStart {
    type: typeof FETCH_ORDERS_START
    loading: boolean
}

interface IFetchOrdersSuccess {
    type: typeof FETCH_ORDERS_SUCCESS
    payload: IOrder[]
    loading: boolean
}

interface IFetchOrdersError {
    type: typeof FETCH_ORDERS_ERROR
    payload: any
    loading: boolean
}

interface IFetchOrderStart {
    type: typeof FETCH_ORDER_START
    loading: boolean
}

interface IFetchOrderSuccess {
    type: typeof FETCH_ORDER_SUCCESS
    payload: IOrder;
    loading: boolean
}

interface IFetchOrderError {
    type: typeof FETCH_ORDER_ERROR
    payload: any
    loading: boolean
}

interface ICreateOrderStart {
    type: typeof CREATE_ORDER_START
    loading: boolean
}

interface ICreateOrderSuccess {
    type: typeof CREATE_ORDER_SUCCESS
    payload: IOrder;
    loading: boolean
}

interface ICreateOrderError {
    type: typeof CREATE_ORDER_ERROR
    payload: any
    loading: boolean
}

interface IFetchOrderProducts {
    type: typeof FETCH_ORDER_PRODUCTS
    payload: any
    loading: boolean
}

export type IOrdersActionTypes =
    IFetchOrdersStart | IFetchOrdersSuccess | IFetchOrdersError |
    IFetchOrderStart | IFetchOrderSuccess | IFetchOrderError |
    ICreateOrderStart | ICreateOrderSuccess | ICreateOrderError |
    IFetchOrderProducts
