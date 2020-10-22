// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Actions
import {fetchProducts} from '../../../store/actions/products'

// Typescript
import {IProductsRootState} from '../IProducts'

// App
import Loader from '../../UI/Loader/Loader'
import Placeholder from '../../UI/Placeholder/Placeholder'
import {
    imgFormatter,
    moneyFormatter,
    nameToLinkFormatter,
    timeConverter
} from '../../../utils'
import AutoTable from '../../UI/AutoTable/AutoTable'
import {ColumnDescription} from 'react-bootstrap-table-next'
import Error from '../../UI/Error/Error'

const ProductsTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const {products, loading, error} = useSelector(
        (state: IProductsRootState) => ({
            error: state.productsState.error,
            products: state.productsState.products,
            loading: state.productsState.loading
        })
    )

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (!products.length) {
        return <Placeholder
            description='Нажмите на кнопку «Добавить товар»,
             чтобы он отображался в списке'
            link='/productcreate' linkName='Добавить товар'
            title='В этом списке ещё нет товаров'/>
    }

    const expandRowTable = [
        {
            dataField: 'vendorCode',
            text: 'Артикул'
        },
        {
            dataField: 'aboutRu',
            text: 'Описание'
        },
        {
            dataField: 'weightBrutto',
            text: 'Брутто'
        },
        {
            dataField: 'weightNetto',
            text: 'Нетто'
        }
    ]

    const columns: ColumnDescription[] = [
        {
            dataField: 'image',
            text: '',
            classes: 'product-image',
            formatter: (image, row) =>
                imgFormatter(image, row, '/imgs/placeholder-product-image.png')
        },
        {
            dataField: 'nameRu',
            text: 'Название',
            classes: 'title',
            sort: true,
            formatter: (nameRu, row) =>
                nameToLinkFormatter(nameRu, row, 'product')
        },
        {
            dataField: 'price',
            text: 'Цена',
            classes: 'price',
            formatter: moneyFormatter,
            sort: true
        },
        {
            dataField: 'updatedAt',
            text: 'Обновление',
            sort: true,
            formatter: timeConverter
        }
    ]

    return (
        <AutoTable
            expandRowTable={expandRowTable}
            keyField='id' data={products} columns={columns}
            secondBtn={{link: 'productscreate', text: 'Добавить несколько'}}
            button={{link: 'productcreate', text: 'Добавить товар'}}/>
    )
}

export default ProductsTable
