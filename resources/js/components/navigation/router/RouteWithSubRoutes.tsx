// React
import React, {Suspense, useContext, useEffect} from 'react'

// Third-party
import {Redirect, Route, useHistory} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'

// Typescript
import {IRoute} from './IRoute'

// App
import Error from '../../UI/Error/Error'
import SanctumContext from '../../../Sanctum/SanctumContext'
import Layout from '../../../layout/Layout'

const RouteWithSubRoutes: React.FC<IRoute> = ((route) => {
    const history = useHistory()
    history.location.state = route.pageName || route.name
    /** Authenticated flag */
    const {authenticated, user, checkAuthentication} = useContext(SanctumContext)

    const objectAccess = {}

    useEffect(() => {
        if (checkAuthentication) {
            checkAuthentication()
        }
    }, [checkAuthentication])

    localStorage.getItem('access-autolong')
        ?.split(',')
        .map((item) => objectAccess[item] = 1)

    const userAccess = user?.role?.accesses || objectAccess

    const isShow = (!('access' in route) && !route.access?.length)
        || route.access?.map(access =>
            userAccess[access] == 1)
            .every(i => i === true)

    // console.log('user', user)
    // console.log('authenticated', authenticated)
    return <Layout>
        <ErrorBoundary FallbackComponent={Error}>
            <Suspense fallback={route.fallback}>
                <Route
                    path={route.path}
                    render={(props) =>
                        route.redirect
                            ? <Redirect to={route.redirect}/>
                            : route.private
                            ? (authenticated || authenticated === null
                                ? isShow
                                    ? route.component && <route.component{...props} routes={route.routes}/>
                                    : <Redirect to='/help'/>
                                : <Redirect to='/login'/>)
                            : route.component && <route.component{...props} routes={route.routes}/>}
                />
            </Suspense>
        </ErrorBoundary>
    </Layout>
})

export default RouteWithSubRoutes
