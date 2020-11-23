// React
import React, {Suspense, useContext} from 'react'
import {ErrorBoundary} from 'react-error-boundary'

// Third-party
import {Redirect, Route, useHistory} from 'react-router-dom'
import {SanctumContext} from 'react-sanctum'

// Typescript
import {IRoute} from './IRoute'

// App
import Error from '../../UI/Error/Error'

const RouteWithSubRoutes: React.FC<IRoute> = ((route) => {
    const history = useHistory()
    history.location.state = route.pageName || route.name
    /** Authenticated flag */
    const {authenticated, user} = useContext(SanctumContext)
    console.log('user', user)
    console.log('authenticated', authenticated)
    return (
        <ErrorBoundary FallbackComponent={Error}>
            <Suspense fallback={route.fallback}>
                <Route path={route.path} render={(props) => route.redirect
                    ? <Redirect to={route.redirect}/>
                    : (authenticated === true || authenticated === null)
                    && route.private
                        ? route.component && route.private &&
                        <route.component
                            {...props} routes={route.routes}/>
                        : (route.path === '/login' ||
                        route.path === '/forgotpassword')
                        && <route.component
                            {...props} routes={route.routes}/>
                }
                />
            </Suspense>
        </ErrorBoundary>
    )
})

export default RouteWithSubRoutes
