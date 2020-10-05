import {IProvider} from '../Providers/IProviders'
import {
    FETCH_CATALOGS_ERROR,
    FETCH_CATALOGS_START,
    FETCH_CATALOGS_SUCCESS,
    FETCH_CATALOG_ERROR,
    FETCH_CATALOG_START,
    FETCH_CATALOG_SUCCESS
} from '../../store/actions/actionTypes'

export interface ICatalog {
    id: number | null
    name: string
    provider?: IProvider | {}
    catalogFile: ICatalogFile
    tags: ICatalogTag[]
    createdAt?: number
    updatedAt?: number
}

export interface ICatalogTag {
    key: string
    value: string
}

export interface ICatalogFile {
    name: string
    size: number
    type: string
}

export interface ICatalogsState {
    catalogs: ICatalog[] | []
    catalog: ICatalog | {}
    loading: boolean
    error: any
}

export interface ICatalogsRootState {
    catalogsState: ICatalogsState
}

interface IFetchCatalogsStart {
    type: typeof FETCH_CATALOGS_START
    loading: boolean
}

interface IFetchCatalogsSuccess {
    type: typeof FETCH_CATALOGS_SUCCESS
    payload: ICatalog[]
    loading: boolean
}

interface IFetchCatalogsError {
    type: typeof FETCH_CATALOGS_ERROR
    payload: any
    loading: boolean
}

interface IFetchCatalogStart {
    type: typeof FETCH_CATALOG_START
    loading: boolean
}

interface IFetchCatalogSuccess {
    type: typeof FETCH_CATALOG_SUCCESS
    payload: ICatalog
    loading: boolean
}

interface IFetchCatalogError {
    type: typeof FETCH_CATALOG_ERROR
    payload: any
    loading: boolean
}

export type ICatalogsActionTypes =
    IFetchCatalogsStart | IFetchCatalogsSuccess | IFetchCatalogsError |
    IFetchCatalogStart | IFetchCatalogSuccess | IFetchCatalogError
