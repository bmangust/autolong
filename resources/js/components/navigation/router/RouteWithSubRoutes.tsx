// React
import React, {Suspense, useContext} from 'react'
import {ErrorBoundary} from 'react-error-boundary'

// Third-party
import {Redirect, Route, useHistory} from 'react-router-dom'

// Typescript
import {IRoute} from './IRoute'

// App
import Error from '../../UI/Error/Error'
import SanctumContext from '../../../Sanctum/SanctumContext'

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
                    : route.private ?
                        (authenticated || authenticated === null
                            ? route.component &&
                            <route.component
                                {...props} routes={route.routes}/>
                            : <Redirect to='/login'/>)
                        : route.component &&
                        <route.component
                            {...props} routes={route.routes}/>}
                />
            </Suspense>
        </ErrorBoundary>
    )
})

export default RouteWithSubRoutes
