import {
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_START,
    CREATE_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCT_ERROR,
    FETCH_PRODUCT_PRICE,
    FETCH_PRODUCT_START,
    FETCH_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,
    UPDATE_PRODUCT_START,
    UPDATE_PRODUCT_SUCCESS,
    FETCH_BY_VENDOR_SUCCESS,
    FETCH_BY_VENDOR_ERROR,
    FETCH_BY_VENDOR_START,
    DELETE_PRODUCT_BY_ID,
    UPDATE_PRODUCT_IMAGE,
    FETCH_COMPARE_PRODUCTS_START,
    FETCH_COMPARE_PRODUCTS_SUCCESS,
    FETCH_COMPARE_PRODUCTS_ERROR
} from '../../store/actions/actionTypes'
import {LOCATION_CHANGE} from 'connected-react-router'
import {IProvider} from '../Providers/IProviders'
import {ISandboxFile} from '../SandboxCard/SandboxFilesCard'
import {IOrder} from '../Orders/IOrders'

export interface IProduct {
    id: number
    productId: number
    nameRu: string
    nameEn: string
    aboutRu: string
    aboutEn: string
    provider: IProvider
    providerId: number
    priceCny: number
    sandboxFiles: ISandboxFile[]
    vendorCode: string
    published: '1' | '0'
    quantity: number
    orders: IOrder[] | null
    autolongNumber: number
    image: string
    price: IProductPrice
    fullPrice: IProductPrice
    hsCode: string
    pcsCtnCtns: { pcsCtn: number[], ctns: number[] } | null
    weightNetto: number
    weightBrutto: number
    createdAt: number
    updatedAt: number
}

export interface IProductPrice {
    rub?: string
    usd?: string
    cny: string
}

export interface IProductAutolong {
    number: number
    name?: string
    articul?: string
    text?: string
    price?: string
    photo?: string
}

export interface IProductsState {
    products: IProduct[]
    vendorProducts: IProduct[] | IProductAutolong[]
    product: IProduct | null
    newProducts: IProduct[]
    compareProducts: IProduct[]
    price: IProductPrice | {}
    loading: boolean
    vendorLoading: boolean
    compareLoading: boolean
    error: any
}

export interface IProductsRootState {
    productsState: IProductsState
}

interface IFetchProductsStart {
    type: typeof FETCH_PRODUCTS_START
    loading: boolean
}

interface IFetchProductsSuccess {
    type: typeof FETCH_PRODUCTS_SUCCESS
    payload: IProduct[]
    unpublished: boolean
    loading: boolean
}

interface IFetchProductsError {
    type: typeof FETCH_PRODUCTS_ERROR
    payload: any
    loading: boolean
}

interface IFetchProductStart {
    type: typeof FETCH_PRODUCT_START
    loading: boolean
}

interface IFetchProductSuccess {
    type: typeof FETCH_PRODUCT_SUCCESS
    payload: IProduct
    loading: boolean
}

interface IFetchProductError {
    type: typeof FETCH_PRODUCT_ERROR
    payload: any
    loading: boolean
}

interface ICreateProductStart {
    type: typeof CREATE_PRODUCT_START
    loading: boolean
}

interface ICreateProductSuccess {
    type: typeof CREATE_PRODUCT_SUCCESS
    payload: IProduct
    loading: boolean
}

interface ICreateProductError {
    type: typeof CREATE_PRODUCT_ERROR
    payload: any
    loading: boolean
}

interface IUpdateProductStart {
    type: typeof UPDATE_PRODUCT_START
    loading: boolean
}

interface IUpdateProductSuccess {
    type: typeof UPDATE_PRODUCT_SUCCESS
    payload: IProduct
    loading: boolean
}

interface IUpdateProductError {
    type: typeof UPDATE_PRODUCT_ERROR
    payload: any
    loading: boolean
}

interface IFetchByVendorStart {
    type: typeof FETCH_BY_VENDOR_START
    loading: boolean
}

interface IFetchByVendorSuccess {
    type: typeof FETCH_BY_VENDOR_SUCCESS
    payload: IProduct[] | IProductAutolong[]
    loading: boolean
}

interface IFetchByVendorError {
    type: typeof FETCH_BY_VENDOR_ERROR
    payload: any
    loading: boolean
}

interface IFetchProductPrice {
    type: typeof FETCH_PRODUCT_PRICE
    vendorCode: string
    payload: any
    loading: boolean
}

interface IDeleteProductById {
    type: typeof DELETE_PRODUCT_BY_ID
    payload: number
}

interface IUpdateProductImage {
    type: typeof UPDATE_PRODUCT_IMAGE
    payload: {
        id: number
        url: string
    }
}

interface IClearVendorProducts {
    type: typeof LOCATION_CHANGE
}

interface IFetchCompareProductsStart {
    type: typeof FETCH_COMPARE_PRODUCTS_START
    compareLoading: boolean
}

interface IFetchCompareProductsSuccess {
    type: typeof FETCH_COMPARE_PRODUCTS_SUCCESS
    payload: IProduct[]
    compareLoading: boolean
}

interface IFetchCompareProductsError {
    type: typeof FETCH_COMPARE_PRODUCTS_ERROR
    payload: any
    compareLoading: boolean
}

export type IProductsActionTypes =
    IFetchProductsStart | IFetchProductsSuccess | IFetchProductsError |
    IFetchProductStart | IFetchProductSuccess | IFetchProductError |
    ICreateProductStart | ICreateProductSuccess | ICreateProductError |
    IUpdateProductStart | IUpdateProductSuccess | IUpdateProductError |
    IFetchProductPrice | IFetchByVendorStart | IFetchByVendorSuccess |
    IFetchByVendorError | IDeleteProductById | IUpdateProductImage |
    IClearVendorProducts | IFetchCompareProductsStart |
    IFetchCompareProductsSuccess | IFetchCompareProductsError
