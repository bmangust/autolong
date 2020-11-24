import {
    CREATE_ROLE_ERROR,
    CREATE_ROLE_START,
    CREATE_ROLE_SUCCESS,
    FETCH_ROLES_ERROR,
    FETCH_ROLES_START,
    FETCH_ROLES_SUCCESS
} from '../../store/actions/actionTypes'

export interface IRole {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export interface IRoleState {
    roles: IRole[] | []
    loading: boolean
    error: any
}

export interface IRolesRootState {
    rolesState: IRoleState
}

interface IFetchRolesStart {
    type: typeof FETCH_ROLES_START
    loading: boolean
}

interface IFetchRolesSuccess {
    payload: IRole[]
    type: typeof FETCH_ROLES_SUCCESS
    loading: boolean
}

interface IFetchRolesError {
    payload: any
    type: typeof FETCH_ROLES_ERROR
    loading: boolean
}

interface ICreateRolesStart {
    type: typeof CREATE_ROLE_START
    loading: boolean
}

interface ICreateRolesSuccess {
    payload: IRole
    type: typeof CREATE_ROLE_SUCCESS
    loading: boolean
}

interface ICreateRolesError {
    payload: any
    type: typeof CREATE_ROLE_ERROR
    loading: boolean
}

export type IRolesActionTypes =
    IFetchRolesStart | IFetchRolesSuccess | IFetchRolesError |
    ICreateRolesStart | ICreateRolesSuccess | ICreateRolesError
