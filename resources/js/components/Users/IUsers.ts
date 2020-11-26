import {
    CREATE_USER_ERROR,
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
    FETCH_USER_BY_ID_ERROR,
    FETCH_USER_BY_ID_START,
    FETCH_USER_BY_ID_SUCCESS,
    FETCH_USERS_ERROR,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS,
    UPDATE_USER_ERROR,
    UPDATE_USER_START,
    UPDATE_USER_SUCCESS
} from '../../store/actions/actionTypes'
import {IRole} from '../Roles/IRoles'


export interface IUser {
    id: number
    name: string
    lastname: string
    email: string
    phone: string
    patronymic: string
    role: IRole
    createdAt: string
    updatedAt: string
}

export interface IUsersState {
    users: IUser[] | []
    user: IUser | {}
    loading: boolean
    error: any
}

export interface IUsersRootState {
    usersState: IUsersState
}

interface IFetchUsersStart {
    type: typeof FETCH_USERS_START
    loading: boolean
}

interface IFetchUsersSuccess {
    payload: IUser[]
    type: typeof FETCH_USERS_SUCCESS
    loading: boolean
}

interface IFetchUsersError {
    payload: any
    type: typeof FETCH_USERS_ERROR
    loading: boolean
}

interface ICreateUserStart {
    type: typeof CREATE_USER_START
    loading: boolean
}

interface ICreateUserSuccess {
    payload: IUser
    type: typeof CREATE_USER_SUCCESS
    loading: boolean
}

interface ICreateUserError {
    payload: any
    type: typeof CREATE_USER_ERROR
    loading: boolean
}

interface IUpdateUserStart {
    type: typeof UPDATE_USER_START
    loading: boolean
}

interface IUpdateUserSuccess {
    payload: IUser
    type: typeof UPDATE_USER_SUCCESS
    loading: boolean
}

interface IUpdateUserError {
    payload: any
    type: typeof UPDATE_USER_ERROR
    loading: boolean
}

interface IFetchUserStart {
    type: typeof FETCH_USER_BY_ID_START
    loading: boolean
}

interface IFetchUserSuccess {
    payload: IUser
    type: typeof FETCH_USER_BY_ID_SUCCESS
    loading: boolean
}

interface IFetchUserError {
    payload: any
    type: typeof FETCH_USER_BY_ID_ERROR
    loading: boolean
}

export type IUsersActionTypes =
    IFetchUsersStart | IFetchUsersSuccess | IFetchUsersError |
    ICreateUserStart | ICreateUserSuccess | ICreateUserError |
    IUpdateUserStart | IUpdateUserSuccess | IUpdateUserError |
    IFetchUserStart | IFetchUserSuccess | IFetchUserError
