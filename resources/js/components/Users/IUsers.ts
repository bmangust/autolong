import {
    CREATE_USER_ERROR,
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
    FETCH_USERS_ERROR,
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS
} from '../../store/actions/actionTypes'


export interface IUser {
    id: number
    name: string
    email: string
    role: string
    createdAt: string
    updatedAt: string
}

export interface IUsersState {
    users: IUser[] | []
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

export type IUsersActionTypes =
    IFetchUsersStart | IFetchUsersSuccess | IFetchUsersError |
    ICreateUserStart | ICreateUserSuccess | ICreateUserError
