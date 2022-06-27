// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Actions
import {
    fetchGoodsStocks
} from '../../../store/actions/ozon'

// Typescript
import {IGoodsStocksRootState} from './IGoods'

// App
import Loader from '../../../components/UI/Loader/Loader'
import AutoTable from '../../../components/UI/AutoTable/AutoTable'
import Error from '../../../components/UI/Error/Error'

const GoodsStocks: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGoodsStocks())
    }, [dispatch])

    const {goods, loading, error} = useSelector((state: IGoodsStocksRootState) => ({
        error: state.goodsStocksState.error,
        goods: state.goodsStocksState.goods,
        loading: state.goodsStocksState.loading
    }))

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }

    const columns: ColumnDescription[] = [
        {
            dataField: 'offer_id',
            text: 'ID 1C',
            sort: true,
        },
        {
            dataField: 'product_id',
            text: 'ID OZON',
            sort: true,
        },
        {
            dataField: 'product.name',
            text: 'Название',
            sort: true,
        },
        {
            dataField: 'stock',
            text: 'Остаток (1С)',
            sort: true,
        },
    ]

    return (
            <AutoTable keyField='id' data={goods} columns={columns}/>
    )
}

export default GoodsStocks
