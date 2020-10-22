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
    FETCH_BY_VENDOR_START
} from '../../store/actions/actionTypes'

export interface IProduct {
    id: number
    nameRu: string
    nameEn?: string
    aboutRu?: string
    aboutEn?: string
    providerId?: number
    priceCny?: number
    vendorCode: string
    quantity?: number
    autolongNumber: string
    image: string
    price: IProductPrice
    weightNetto: number
    weightBrutto: number
    createdAt?: number
    updatedAt?: number
}

export interface IProductPrice {
    rub?: number
    usd?: number
    cny: number
}

export interface IProductAutolong {
    number: string
    name: string
    articul: string
    text: string
    price: string
}

export interface IProductsState {
    products: IProduct[] | []
    vendorProducts: IProduct[] | IProductAutolong[] | []
    product: IProduct | {}
    price: IProductPrice | {}
    loading: boolean
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

export type IProductsActionTypes =
    IFetchProductsStart | IFetchProductsSuccess | IFetchProductsError |
    IFetchProductStart | IFetchProductSuccess | IFetchProductError |
    ICreateProductStart | ICreateProductSuccess | ICreateProductError |
    IUpdateProductStart | IUpdateProductSuccess | IUpdateProductError |
    IFetchProductPrice | IFetchByVendorStart | IFetchByVendorSuccess |
    IFetchByVendorError
