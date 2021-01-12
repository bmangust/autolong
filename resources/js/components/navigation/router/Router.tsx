// React
import React, {useEffect} from 'react'

// Third-party
import {Switch} from 'react-router'
import {Redirect, Route, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'

// Typescript
import {IRoute} from './IRoute'

// App
import RouteWithSubRoutes from './RouteWithSubRoutes'

interface IProps {
    routes: IRoute[];
}

const Router: React.FC<IProps> = ({routes}) => {
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch({type: 'LOCATION_CHANGE'})
        }, [location.pathname, dispatch]
    )

    return <Switch>
        {routes.map((route: IRoute) => <RouteWithSubRoutes key={route.path} {...route} />)}
        <Route exact path="/">
            <Redirect to="/orders"/>
        </Route>
    </Switch>
}

export default Router
