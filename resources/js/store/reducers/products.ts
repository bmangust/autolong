// Types
import {
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_START,
    CREATE_PRODUCT_SUCCESS,
    FETCH_BY_VENDOR_ERROR,
    FETCH_BY_VENDOR_SUCCESS,
    FETCH_PRODUCT_ERROR,
    FETCH_PRODUCT_PRICE,
    FETCH_PRODUCT_START,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_ERROR,
    UPDATE_PRODUCT_START,
    UPDATE_PRODUCT_SUCCESS,
    FETCH_BY_VENDOR_START, DELETE_PRODUCT_BY_ID
} from '../actions/actionTypes'

// Typescript
import {
    IProductsActionTypes,
    IProductsState
} from '../../components/Products/IProducts'

const initialState: IProductsState = {
    products: [],
    vendorProducts: [],
    product: {},
    price: {},
    loading: true,
    error: null
}

export default function productsReducer(
    state = initialState,
    action: IProductsActionTypes): IProductsState {
    switch (action.type) {
        case FETCH_PRODUCTS_START:
            return {
                ...state, loading: true
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state, loading: false, products: action.payload
            }
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case FETCH_PRODUCT_START:
            return {
                ...state, loading: true
            }
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state, loading: false, product: action.payload
            }
        case FETCH_PRODUCT_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case CREATE_PRODUCT_START:
            return {
                ...state, loading: true
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state, loading: false, product: action.payload
            }
        case CREATE_PRODUCT_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case UPDATE_PRODUCT_START:
            return {
                ...state, loading: true
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state, loading: false, product: action.payload
            }
        case UPDATE_PRODUCT_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case FETCH_BY_VENDOR_START:
            return {
                ...state, loading: true
            }
        case FETCH_BY_VENDOR_SUCCESS:
            return {
                ...state, loading: false, vendorProducts: action.payload
            }
        case FETCH_BY_VENDOR_ERROR:
            return {
                ...state, loading: false, error: action.payload
            }
        case FETCH_PRODUCT_PRICE:
            return {
                ...state, price: action.payload.price
            }
        case DELETE_PRODUCT_BY_ID:
            return {
                ...state, products: state.products.filter(({id}) =>
                    id !== action.payload), product: {}
            }
        default:
            return state
    }
}
