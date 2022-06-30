// React
import React from 'react'
import {render} from 'react-dom'

// Third-party
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk, {ThunkMiddleware} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction'
import {Router} from 'react-router'
import {routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from 'history'

// App
import Index from './index'
import createRootReducer from './store/reducers/rootReducer'
import Sanctum from './Sanctum/Sanctum'
import PusherListener from './components/PusherListener/PusherListener'

const middleware = thunk as ThunkMiddleware
export const history = createBrowserHistory()

const store = createStore(
    createRootReducer(history),
    composeWithDevTools(applyMiddleware(routerMiddleware(history), middleware))
)

const sanctumConfig = {
    apiUrl: process.env.MIX_API_URL || '',
    csrfCookieRoute: process.env.MIX_CSRF_COOKIE_ROUTE || '',
    signInRoute: process.env.MIX_SIGNIN_ROUTE || '',
    signOutRoute: process.env.MIX_SIGNOUT_ROUTE || '',
    userObjectRoute: process.env.MIX_USER_OBJECT_ROUTE || ''
}

const application = (
    <Sanctum checkOnInit={false} config={sanctumConfig}>
        <Provider store={store}>
            <Router history={history}>
                <Index />
            </Router>
        </Provider>
        <PusherListener />
    </Sanctum>
)

render(application, document.getElementById('root'))
