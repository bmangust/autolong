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
    FETCH_BY_VENDOR_START,
    DELETE_PRODUCT_BY_ID,
    UPDATE_PRODUCT_IMAGE
} from '../actions/actionTypes'
import {LOCATION_CHANGE} from 'connected-react-router'

// Typescript
import {
    IProductsActionTypes,
    IProductsState
} from '../../components/Products/IProducts'

const initialState: IProductsState = {
    products: [],
    newProducts: [],
    vendorProducts: [],
    product: {},
    price: {},
    loading: true,
    vendorLoading: false,
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
        case FETCH_PRODUCTS_SUCCESS: {
            const productsKey = action.unpublished ? 'newProducts' : 'products'
            return {
                ...state, loading: false, [productsKey]: action.payload
            }
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
                ...state, vendorLoading: true
            }
        case FETCH_BY_VENDOR_SUCCESS:
            return {
                ...state, vendorLoading: false, vendorProducts: action.payload
            }
        case FETCH_BY_VENDOR_ERROR:
            return {
                ...state, vendorLoading: false, error: action.payload
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
        case UPDATE_PRODUCT_IMAGE:
            return {
                ...state
            }
        case LOCATION_CHANGE:
            return {
                ...state, vendorProducts: []
            }
        default:
            return state
    }
}
