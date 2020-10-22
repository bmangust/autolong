// React
import React from 'react'
import ReactDOM from 'react-dom'

// Third-party
import {BrowserRouter as Router} from 'react-router-dom'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunk, {ThunkMiddleware} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

// App
import Index from './index'
import rootReducer from './store/reducers/rootReducer'

const middleware = thunk as ThunkMiddleware

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(middleware)
))

const application = (
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Index/>
            </Router>
        </Provider>
    </React.StrictMode>
)

ReactDOM.render(application, document.getElementById('root'))
