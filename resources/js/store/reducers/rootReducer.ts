// Third-party
import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {connectRouter} from 'connected-react-router'

// Reducers
import importersReducer from './importers'
import productsReducer from './products'
import providersReducer from './providers'
import containersReducer from './containers'
import catalogsReducer from './catalogs'
import countryReducer from './countries'
import ordersReducer from './orders'
import tagsReducer from './tags'
import logsReducer from './Logs'
import citiesReducer from './cities'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    importersState: importersReducer,
    productsState: productsReducer,
    providersState: providersReducer,
    ordersState: ordersReducer,
    containersState: containersReducer,
    catalogsState: catalogsReducer,
    countriesState: countryReducer,
    tagsState: tagsReducer,
    citiesState: citiesReducer,
    logsState: logsReducer,
    form: formReducer
})

export default createRootReducer
