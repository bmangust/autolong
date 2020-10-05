// React
import React, {Suspense} from 'react'

// Third-party
import {Redirect, Route, useHistory} from 'react-router-dom'

// Typescript
import {IRoute} from './IRoute'

const RouteWithSubRoutes: React.FC<IRoute> = (route => {
    /** Authenticated flag */
        // const authenticated: boolean = user.authenticated;
    const history = useHistory()
    history.location.state = route.pageName || route.name
    const authenticated: boolean = true
    return (
        <Suspense fallback={route.fallback}>
            <Route path={route.path} render={(props) => route.redirect
                ? <Redirect to={route.redirect}/>
                : route.private ?
                    (authenticated
                        ? route.component &&
                        <route.component
                            {...props} routes={route.routes}/>
                        : <Redirect to='/login'/>)
                    : route.component &&
                    <route.component
                        {...props} routes={route.routes}/>}
            />
        </Suspense>
    )
})

export default RouteWithSubRoutes
