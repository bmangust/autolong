import {ReactNode} from 'react'
import {LoadableComponent} from '@loadable/component'

export interface IRoute {
    name: string
    path: string
    hide: boolean
    exact: boolean
    fallback: NonNullable<ReactNode> | null
    component?: any
    pageName?: string
    routes?: IRoute[]
    redirect?: string
    private?: boolean
    icon?: NonNullable<ReactNode>
}
