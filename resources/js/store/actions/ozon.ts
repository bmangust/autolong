import {
    FETCH_OZON_GOODS_STOCKS_ERROR,
    FETCH_OZON_GOODS_STOCKS_START,
    FETCH_OZON_GOODS_STOCKS_SUCCESS,
} from './actionTypes'
import axios, {AxiosError} from 'axios'

export const fetchGoodsStocks = () => async dispatch => {
    await dispatch({
        type: FETCH_OZON_GOODS_STOCKS_START
    })

    const url = '/api/marketplaces/ozon/goods/stocks'
    axios
        .get(url)
        .then((answer) => {
            dispatch({
                type: FETCH_OZON_GOODS_STOCKS_SUCCESS,
                payload: answer.data
            })
        })
        .catch((error: AxiosError) => {
            dispatch({
                type: FETCH_OZON_GOODS_STOCKS_ERROR,
                payload: error.response
            })
        })
}
