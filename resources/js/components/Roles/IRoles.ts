import {
    CREATE_ROLE_ERROR,
    CREATE_ROLE_START,
    CREATE_ROLE_SUCCESS,
    FETCH_ROLES_ERROR,
    FETCH_ROLES_START,
    FETCH_ROLES_SUCCESS,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_ERROR,
    UPDATE_ROLE_START,
    FETCH_ROLE_BY_ID_START,
    FETCH_ROLE_BY_ID_ERROR,
    FETCH_ROLE_BY_ID_SUCCESS
} from '../../store/actions/actionTypes'

export interface IRole {
    id: number
    name: string
    accesses: {
        id: number
        ordersCreate: 0 | 1
        ordersUpdate: 0 | 1
        ordersShowCargo: 0 | 1
        ordersDelete: 0 | 1
        ordersIndex: 0 | 1

        containersCreate: 0 | 1
        containersUpdate: 0 | 1
        containersDelete: 0 | 1
        containersIndex: 0 | 1

        catalogsCreate: 0 | 1
        catalogsUpdate: 0 | 1
        catalogsDelete: 0 | 1
        catalogsIndex: 0 | 1

        productsCreate: 0 | 1
        productsUpdate: 0 | 1
        productsDelete: 0 | 1
        productsIndex: 0 | 1

        providersCreate: 0 | 1
        providersUpdate: 0 | 1
        providersDelete: 0 | 1
        providersIndex: 0 | 1

        importersCreate: 0 | 1
        importersUpdate: 0 | 1
        importersDelete: 0 | 1
        importersIndex: 0 | 1

        userRolesCreate: 0 | 1
        userRolesUpdate: 0 | 1
        userRolesDelete: 0 | 1
        userRolesIndex: 0 | 1

        productsNewIndex: 0 | 1
        compareIndex: 0 | 1
        adminPower: 0 | 1

        userCreate: 0 | 1
        userUpdate: 0 | 1
        userDelete: 0 | 1
        userIndex: 0 | 1

        logsIndex: 0 | 1
    }
    createdAt: string
    updatedAt: string
}

export interface IRoleState {
    roles: IRole[] | []
    role: IRole | {}
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

interface IFetchRoleStart {
    type: typeof FETCH_ROLE_BY_ID_START
    loading: boolean
}

interface IFetchRoleSuccess {
    payload: IRole
    type: typeof FETCH_ROLE_BY_ID_SUCCESS
    loading: boolean
}

interface IFetchRoleError {
    payload: any
    type: typeof FETCH_ROLE_BY_ID_ERROR
    loading: boolean
}

interface IUpdateRoleStart {
    type: typeof UPDATE_ROLE_START
    loading: boolean
}

interface IUpdateRoleSuccess {
    payload: IRole
    type: typeof UPDATE_ROLE_SUCCESS
    loading: boolean
}

interface IUpdateRoleError {
    payload: any
    type: typeof UPDATE_ROLE_ERROR
    loading: boolean
}

export type IRolesActionTypes =
    IFetchRolesStart | IFetchRolesSuccess | IFetchRolesError |
    ICreateRolesStart | ICreateRolesSuccess | ICreateRolesError |
    IFetchRoleStart | IFetchRoleSuccess | IFetchRoleError |
    IUpdateRoleStart | IUpdateRoleSuccess | IUpdateRoleError
