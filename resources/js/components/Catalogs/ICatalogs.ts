import {IProvider} from '../Providers/IProviders'
import {
    CREATE_CATALOG_ERROR,
    CREATE_CATALOG_START,
    CREATE_CATALOG_SUCCESS,
    DELETE_CATALOG_SUCCESS,
    FETCH_CATALOGS_ERROR,
    FETCH_CATALOGS_START,
    FETCH_CATALOGS_SUCCESS,
    FETCH_CATALOG_ERROR,
    FETCH_CATALOG_START,
    FETCH_CATALOG_SUCCESS,
    UPDATE_CATALOG_FILE,
    UPDATE_CATALOG_SUCCESS
} from '../../store/actions/actionTypes'
import {ITag} from './ITags'
import {ISandboxFile} from '../SandboxCard/SandboxFilesCard'

export interface ICatalog {
    id: number
    name: string
    provider: IProvider | {}
    file: string
    tags: ITag[]
    sandboxFiles: ISandboxFile[]
    createdAt?: number
    updatedAt?: number
}

export interface ICatalogsState {
    catalogs: ICatalog[]
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

interface ICreateCatalogStart {
    type: typeof CREATE_CATALOG_START
    loading: boolean
}

interface ICreateCatalogSuccess {
    type: typeof CREATE_CATALOG_SUCCESS
    payload: ICatalog
    loading: boolean
}

interface ICreateCatalogError {
    type: typeof CREATE_CATALOG_ERROR
    payload: any
    loading: boolean
}

interface IDeleteCatalog {
    type: typeof DELETE_CATALOG_SUCCESS
    payload: number
}

interface IUpdateCatalog {
    type: typeof UPDATE_CATALOG_SUCCESS
    payload: ICatalog
}

interface IUpdateFileCatalog {
    type: typeof UPDATE_CATALOG_FILE
    payload: ICatalog
}

export type ICatalogsActionTypes =
    IFetchCatalogsStart | IFetchCatalogsSuccess | IFetchCatalogsError |
    IFetchCatalogStart | IFetchCatalogSuccess | IFetchCatalogError |
    ICreateCatalogStart | ICreateCatalogSuccess | ICreateCatalogError |
    IDeleteCatalog | IUpdateCatalog | IUpdateFileCatalog
