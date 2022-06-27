import {
    FETCH_OZON_GOODS_STOCKS_ERROR,
    FETCH_OZON_GOODS_STOCKS_START,
    FETCH_OZON_GOODS_STOCKS_SUCCESS,
} from '../../../store/actions/actionTypes'

export interface IGoodStock {
    id: number
}

export interface IGoodsStocksState {
    goods: IGoodStock[]
    loading: boolean
    error: any
}

export interface IGoodsStocksRootState {
    goodsStocksState: IGoodsStocksState
}

interface IFetchGoodsStocksStart {
    type: typeof FETCH_OZON_GOODS_STOCKS_START
    loading: boolean
}

interface IFetchGoodsStocksSuccess {
    type: typeof FETCH_OZON_GOODS_STOCKS_SUCCESS
    payload: IGoodStock[]
    loading: boolean
}

interface IFetchGoodsStocksError {
    type: typeof FETCH_OZON_GOODS_STOCKS_ERROR
    payload: any
    loading: boolean
}

export type IGoodsActionTypes =
        IFetchGoodsStocksStart | IFetchGoodsStocksSuccess | IFetchGoodsStocksError
