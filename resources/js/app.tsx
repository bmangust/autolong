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

const application = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Index/>
        </ConnectedRouter>
    </Provider>
)

ReactDOM.render(application, document.getElementById('root'))
