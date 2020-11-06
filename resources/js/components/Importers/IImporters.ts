import {
    CREATE_IMPORTER_ERROR,
    CREATE_IMPORTER_START,
    CREATE_IMPORTER_SUCCESS,
    FETCH_IMPORTERS_ERROR,
    FETCH_IMPORTERS_START,
    FETCH_IMPORTERS_SUCCESS,
    FETCH_IMPORTER_ERROR,
    FETCH_IMPORTER_START,
    FETCH_IMPORTER_SUCCESS
} from '../../store/actions/actionTypes'
import {IDocuments} from '../DocumentsCard/DocumentsCard'

export interface IImporter {
    id: number | null
    nameRu: string
    nameEn: string
    address: string
    phone: string
    documents: IDocuments[]
    createdAt?: number
    updatedAt?: number
}

export interface IImportersState {
    importers: IImporter[] | []
    importer: IImporter | {}
    loading: boolean;
    error: any
}

export interface IImportersRootState {
    importersState: IImportersState
}

interface IFetchImportersStart {
    type: typeof FETCH_IMPORTERS_START
    loading: boolean
}

interface IFetchImportersSuccess {
    type: typeof FETCH_IMPORTERS_SUCCESS
    payload: IImporter[]
    loading: boolean
}

interface IFetchImportersError {
    type: typeof FETCH_IMPORTERS_ERROR
    payload: any
    loading: boolean
}

interface IFetchImporterStart {
    type: typeof FETCH_IMPORTER_START
    loading: boolean
}

interface IFetchImporterSuccess {
    type: typeof FETCH_IMPORTER_SUCCESS
    payload: IImporter;
    loading: boolean
}

interface IFetchImporterError {
    type: typeof FETCH_IMPORTER_ERROR
    payload: any
    loading: boolean
}

interface ICreateImporterStart {
    type: typeof CREATE_IMPORTER_START
    loading: boolean
}

interface ICreateImporterSuccess {
    type: typeof CREATE_IMPORTER_SUCCESS
    payload: IImporter;
    loading: boolean
}

interface ICreateImporterError {
    type: typeof CREATE_IMPORTER_ERROR
    payload: any
    loading: boolean
}

export type IImportersActionTypes =
    IFetchImportersStart | IFetchImportersSuccess | IFetchImportersError |
    IFetchImporterStart | IFetchImporterSuccess | IFetchImporterError |
    ICreateImporterStart | ICreateImporterSuccess | ICreateImporterError
