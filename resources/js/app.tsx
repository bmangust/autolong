// React
import React from 'react'
import ReactDOM from 'react-dom'

// Third-party
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk, {ThunkMiddleware} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {ConnectedRouter, routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from 'history'
import {Sanctum} from 'react-sanctum'


// App
import Index from './index'
import createRootReducer from './store/reducers/rootReducer'

const middleware = thunk as ThunkMiddleware
const history = createBrowserHistory()

const store = createStore(
    createRootReducer(history),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            middleware
        )
    )
)

const sanctumConfig = {
    api_url: process.env.MIX_API_URL || '',
    csrf_cookie_route: process.env.MIX_CSRF_COOKIE_ROUTE || '',
    signin_route: process.env.MIX_SIGNIN_ROUTE || '',
    signout_route: process.env.MIX_SIGNOUT_ROUTE || '',
    user_object_route: process.env.MIX_USER_OBJECT_ROUTE || ''
}

const application = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Sanctum config={sanctumConfig}>
                <Index/>
            </Sanctum>
        </ConnectedRouter>
    </Provider>
)

ReactDOM.render(application, document.getElementById('root'))
