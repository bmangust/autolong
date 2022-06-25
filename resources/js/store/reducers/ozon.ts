import {
    FETCH_OZON_GOODS_STOCKS_ERROR,
    FETCH_OZON_GOODS_STOCKS_START,
    FETCH_OZON_GOODS_STOCKS_SUCCESS
} from '../actions/actionTypes'
import {IGoodsActionTypes, IGoodsStocksState} from '../../pages/marketplaces/ozon/IGoods'

const initialState: IGoodsStocksState = {
    goods: [],
    loading: true,
    error: null
}

export default function goodsStocksReducer(
    state = initialState,
    action: IGoodsActionTypes): IGoodsStocksState {
    switch (action.type) {
        case FETCH_OZON_GOODS_STOCKS_START:
            return {
                ...state, loading: true
            }
        case FETCH_OZON_GOODS_STOCKS_SUCCESS:
            return {
                ...state, goods: action.payload, loading: false
            }
        case FETCH_OZON_GOODS_STOCKS_ERROR:
            return {
                ...state, error: action.payload, loading: false
            }
        default:
            return state
    }
}
