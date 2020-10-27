// Third-party
import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

// Reducers
import importersReducer from './importers'
import productsReducer from './products'
import providersReducer from './providers'
import containersReducer from './containers'
import catalogsReducer from './catalogs'
import countryReducer from './countries'
import ordersReducer from './orders'
import tagsReducer from './tags'

export default combineReducers({
    importersState: importersReducer,
    productsState: productsReducer,
    providersState: providersReducer,
    ordersState: ordersReducer,
    containersState: containersReducer,
    catalogsState: catalogsReducer,
    countriesState: countryReducer,
    tagsState: tagsReducer,
    form: formReducer
})
