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
    DELETE_ORDER_BY_ID,
    FETCH_ORDER_INVOICE_START,
    FETCH_ORDER_INVOICE_SUCCESS,
    FETCH_ORDER_INVOICE_ERROR, REMOVE_INPUT_FROM_INVOICE, CHECK_BAIKAL_STATUS, DELETE_BAIKAL_ID, EDIT_ORDER_ADMIN
} from '../../store/actions/actionTypes'
import {LOCATION_CHANGE} from 'connected-react-router'

import {IProvider} from '../Providers/IProviders'
import {IProduct, IProductPrice} from '../Products/IProducts'
import {ISandboxFile} from '../SandboxCard/SandboxFilesCard'
import {ICity} from '../Cities/ICities'
import {IContainer} from '../Containers/IContainers'

export interface IOrder {
    id: number
    name: string
    status: string
    statusPayment: string
    baikalTrackerLink: string | null
    baikalTrackerHistory: { date: string, text: string }[]
    items: IProduct[]
    priceCny: number
    city: ICity
    paymentHistory: IPaymentHistory[]
    cargo: number
    packingList: boolean
    container: IContainer
    paymentAmount: number
    surchargeAmount: number
    sandboxFiles: ISandboxFile[]
    price: IProductPrice
    provider: IProvider
    createdAt: number
    updatedAt: number
}

export interface IPaymentHistory {
    id: number
    date: number
    paymentAmount?: number
    surchargeAmount?: number
}

export interface IOrdersState {
    orders: IOrder[]
    order: IOrder | null
    orderProducts: IProduct[]
    loading: boolean;
    loadingStatus: boolean
    loadingInvoice: boolean
    invoiceInputs: any
    notFound: any[]
    locationChangeCount: number
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
    notFound: any[]
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

interface IClearOrderProducts {
    type: typeof LOCATION_CHANGE
}

interface IFetchOrderInvoiceStart {
    type: typeof FETCH_ORDER_INVOICE_START
    loadingInvoice: boolean
}

interface IFetchOrderInvoiceSuccess {
    type: typeof FETCH_ORDER_INVOICE_SUCCESS
    payload: any
    loadingInvoice: boolean
}

interface IFetchOrderInvoiceError {
    type: typeof FETCH_ORDER_INVOICE_ERROR
    payload: any
    loadingInvoice: boolean
}

interface IRemoveInputFromInvoice {
    type: typeof REMOVE_INPUT_FROM_INVOICE
    payload: string
}

interface ICheckBaikalStatus {
    type: typeof CHECK_BAIKAL_STATUS
    payload: IOrder
}

interface IDeleteBaikalId {
    type: typeof DELETE_BAIKAL_ID
    payload: IOrder
}

interface IEditOrderAdmin {
    type: typeof EDIT_ORDER_ADMIN
    payload: IOrder
}

export type IOrdersActionTypes =
    IFetchOrdersStart | IFetchOrdersSuccess | IFetchOrdersError |
    IFetchOrderStart | IFetchOrderSuccess | IFetchOrderError |
    ICreateOrderStart | ICreateOrderSuccess | ICreateOrderError |
    IFetchOrderProducts | IFetchItemsByVendorStart | IFetchItemsByVendorError |
    IFetchItemsByVendorSuccess | IChangeOrderStatusStart |
    IChangeOrderStatusSuccess | IChangeOrderStatusError |
    IDeleteOrderById | IClearOrderProducts | IFetchOrderInvoiceStart |
    IFetchOrderInvoiceSuccess | IFetchOrderInvoiceError |
    IRemoveInputFromInvoice | ICheckBaikalStatus | IDeleteBaikalId |
    IEditOrderAdmin
