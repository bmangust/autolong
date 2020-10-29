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
    FETCH_ORDER_PRODUCTS,
    FETCH_ITEMS_BY_VENDOR_START,
    FETCH_ITEMS_BY_VENDOR_ERROR,
    FETCH_ITEMS_BY_VENDOR_SUCCESS,
    CHANGE_ORDER_STATUS_START,
    CHANGE_ORDER_STATUS_SUCCESS,
    CHANGE_ORDER_STATUS_ERROR,
    DELETE_ORDER_BY_ID
} from '../../store/actions/actionTypes'
import {IProvider} from '../Providers/IProviders'
import {IProduct, IProductPrice} from '../Products/IProducts'

export interface IOrder {
    id: number
    name: string
    status: string
    statusPayment: string
    items: IProduct[]
    priceCny: number
    price: IProductPrice
    provider: IProvider
    createdAt?: number
    updatedAt?: number
}

export interface IOrdersState {
    orders: IOrder[] | []
    order: IOrder | {}
    orderProducts: IProduct[] | []
    loading: boolean;
    loadingStatus: boolean
    error: any
    statusError: any
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
    payload: IOrder
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

interface IFetchItemsByVendorStart {
    type: typeof FETCH_ITEMS_BY_VENDOR_START
    loading: boolean
}

interface IFetchItemsByVendorError {
    type: typeof FETCH_ITEMS_BY_VENDOR_ERROR
    payload: any
    loading: boolean
}

interface IFetchItemsByVendorSuccess {
    type: typeof FETCH_ITEMS_BY_VENDOR_SUCCESS
    payload: IProduct[]
    loading: boolean
}

interface IChangeOrderStatusStart {
    type: typeof CHANGE_ORDER_STATUS_START
    loadingStatus: boolean
}

interface IChangeOrderStatusSuccess {
    type: typeof CHANGE_ORDER_STATUS_SUCCESS
    payload: IOrder
    loadingStatus: boolean
}

interface IChangeOrderStatusError {
    type: typeof CHANGE_ORDER_STATUS_ERROR
    payload: any
    loadingStatus: boolean
}

interface IDeleteOrderById {
    type: typeof DELETE_ORDER_BY_ID
    payload: number
}

export type IOrdersActionTypes =
    IFetchOrdersStart | IFetchOrdersSuccess | IFetchOrdersError |
    IFetchOrderStart | IFetchOrderSuccess | IFetchOrderError |
    ICreateOrderStart | ICreateOrderSuccess | ICreateOrderError |
    IFetchOrderProducts | IFetchItemsByVendorStart | IFetchItemsByVendorError |
    IFetchItemsByVendorSuccess | IChangeOrderStatusStart |
    IChangeOrderStatusSuccess | IChangeOrderStatusError |
    IDeleteOrderById
