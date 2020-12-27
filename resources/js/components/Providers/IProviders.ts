import {
    FETCH_PROVIDER_START,
    FETCH_PROVIDERS_ERROR,
    FETCH_PROVIDERS_START,
    FETCH_PROVIDERS_SUCCESS,
    FETCH_PROVIDER_SUCCESS,
    FETCH_PROVIDER_ERROR,
    CREATE_PROVIDER_START,
    CREATE_PROVIDER_SUCCESS,
    CREATE_PROVIDER_ERROR,
    DELETE_PROVIDER_BY_ID,
    UPDATE_PROVIDER_START,
    UPDATE_PROVIDER_SUCCESS,
    UPDATE_PROVIDER_ERROR,
    SET_BLACK_LABEL
} from '../../store/actions/actionTypes'
import {ICountry} from '../Сountries/ICountries'
import {IOrder} from '../Orders/IOrders'
import {ICatalog} from '../Catalogs/ICatalogs'
import {ISandboxFile} from '../SandboxCard/SandboxFilesCard'

export interface IProvider {
    id: number
    name: string
    nameCompany: string
    email: string
    website: string
    phone: string
    wechat: string
    unscrupulous: 1 | 0
    country: ICountry | null
    beneficiaryName: string
    beneficiaryAccountName: string
    beneficiaryBankAddress: string
    beneficiaryAddress: string
    beneficiaryBankName: string
    beneficiaryBankCode: string
    beneficiarySwiftAddress: string
    manufacturer: string
    sandboxFiles: ISandboxFile[]
    catalogs: ICatalog[]
    orders: IOrder[]
    createdAt?: number;
    updatedAt?: number;
}


export interface IProvidersState {
    providers: IProvider[]
    provider: IProvider | null
    loading: boolean;
    error: any
}

export interface IProvidersRootState {
    providersState: IProvidersState
}

interface IFetchProvidersStart {
    type: typeof FETCH_PROVIDERS_START
    loading: boolean
}

interface IFetchProvidersSuccess {
    type: typeof FETCH_PROVIDERS_SUCCESS
    loading: boolean
    payload: IProvider[]
}

interface IFetchProvidersError {
    type: typeof FETCH_PROVIDERS_ERROR
    loading: boolean
    payload: any
}

interface IFetchProviderStart {
    type: typeof FETCH_PROVIDER_START
    loading: boolean
}

interface IFetchProviderSuccess {
    type: typeof FETCH_PROVIDER_SUCCESS
    loading: boolean
    payload: IProvider
}

interface IFetchProviderError {
    type: typeof FETCH_PROVIDER_ERROR
    loading: boolean
    payload: any
}

interface ICreateProviderStart {
    type: typeof CREATE_PROVIDER_START
    loading: boolean
}

interface ICreateProviderSuccess {
    type: typeof CREATE_PROVIDER_SUCCESS
    loading: boolean
    payload: IProvider
}

interface ICreateProviderError {
    type: typeof CREATE_PROVIDER_ERROR
    loading: boolean
    payload: any
}

interface IUpdateProviderStart {
    type: typeof UPDATE_PROVIDER_START
    loading: boolean
}

interface IUpdateProviderSuccess {
    type: typeof UPDATE_PROVIDER_SUCCESS
    loading: boolean
    payload: IProvider
}

interface IUpdateProviderError {
    type: typeof UPDATE_PROVIDER_ERROR
    loading: boolean
    payload: any
}

interface IDeleteProviderById {
    type: typeof DELETE_PROVIDER_BY_ID
    payload: number
}

interface ISetBlackLabel {
    type: typeof SET_BLACK_LABEL
    payload: IProvider
}

export type IProvidersActionTypes =
    IFetchProvidersStart | IFetchProvidersSuccess | IFetchProvidersError |
    IFetchProviderStart | IFetchProviderSuccess | IFetchProviderError |
    ICreateProviderStart | ICreateProviderSuccess | ICreateProviderError |
    IDeleteProviderById | IUpdateProviderStart | IUpdateProviderSuccess |
    IUpdateProviderError | ISetBlackLabel
