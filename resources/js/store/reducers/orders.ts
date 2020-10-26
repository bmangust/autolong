// Types
import {
    CHANGE_ORDER_STATUS_ERROR,
    CHANGE_ORDER_STATUS_START,
    CHANGE_ORDER_STATUS_SUCCESS,
    CREATE_ORDER_ERROR,
    CREATE_ORDER_START,
    CREATE_ORDER_SUCCESS,
    FETCH_ITEMS_BY_VENDOR_ERROR,
    FETCH_ITEMS_BY_VENDOR_START,
    FETCH_ITEMS_BY_VENDOR_SUCCESS,
    FETCH_ORDER_ERROR,
    FETCH_ORDER_START,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDERS_ERROR,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS
} from '../actions/actionTypes'

// Typescript
import {IOrdersActionTypes, IOrdersState} from '../../components/Orders/IOrders'

const initialState: IOrdersState = {
    orders: [],
    order: {},
    orderProducts: [],
    loading: true,
    loadingStatus: false,
    error: null,
    statusError: null
}

export default function ordersReducer(
    state = initialState,
    action: IOrdersActionTypes): IOrdersState {
    switch (action.type) {
        case FETCH_ORDERS_START:
            return {
                ...state, loading: true
            }
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state, loading: false, orders: action.payload
            }
        case FETCH_ORDERS_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case FETCH_ORDER_START:
            return {
                ...state, loading: true
            }
        case FETCH_ORDER_SUCCESS:
            return {
                ...state, loading: false, order: action.payload
            }
        case FETCH_ORDER_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case CREATE_ORDER_START:
            return {
                ...state, loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state, loading: false, order: action.payload
            }
        case CREATE_ORDER_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case FETCH_ITEMS_BY_VENDOR_START:
            return {
                ...state, loading: false
            }
        case FETCH_ITEMS_BY_VENDOR_SUCCESS:
            return {
                ...state, loading: false, orderProducts: action.payload
            }
        case FETCH_ITEMS_BY_VENDOR_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case CHANGE_ORDER_STATUS_START:
            return {
                ...state, loadingStatus: true
            }
        case CHANGE_ORDER_STATUS_SUCCESS:
            return {
                ...state, loadingStatus: false, order: action.payload
            }
        case CHANGE_ORDER_STATUS_ERROR:
            return {
                ...state, loadingStatus: false, statusError: action.payload
            }
        default:
            return state
    }
}
