// React
import React, {useContext, useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Actions
import {deleteProductById, fetchProducts} from '../../../store/actions/products'
import {fetchProviders} from '../../../store/actions/providers'

// Typescript
import {IProductsRootState} from '../IProducts'
import {IProvidersRootState} from '../../Providers/IProviders'

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
import Error from '../../UI/Error/Error'
import {SanctumContext} from '../../../Sanctum'

const ProductsTable: React.FC<{ unpublished?: boolean }> = (
    {unpublished = false}) => {
    const dispatch = useDispatch()
    const {user} = useContext(SanctumContext)

    let productsKey = 'products'

    if (unpublished) {
        productsKey = 'newProducts'
    }
    const link = `productscreate${unpublished ? '/unpublished' : '/published'}`

    useEffect(() => {
        dispatch(fetchProducts(unpublished))
        dispatch(fetchProviders())
    }, [dispatch, unpublished])

    const {products, loading, error} = useSelector(
        (state: IProductsRootState) => ({
            error: state.productsState.error,
            products: state.productsState[productsKey],
            loading: state.productsState.loading
        })
    )

    const {providers, loadingProviders} = useSelector(
        (state: IProvidersRootState) => ({
            providers: state.providersState.providers,
            loadingProviders: state.providersState.loading
        })
    )

    const filterOptions = providers.map((provider) => {
        return {
            label: provider.name,
            value: provider.id
        }
    })

    const filter = {
        options: filterOptions,
        field: 'provider.id',
        placeholder: 'Фильтр по поставщику',
        loading: loadingProviders
    }

    const checkFilter = {
        field: 'orders',
        placeholder: 'Активные товары',
        type: 'products'
    }

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }

    if (!products.length) {
        return <Placeholder
            description='Нажмите на кнопку «Добавить товар», чтобы он отображался в списке'
            link={user && user.role.accesses.productsCreate == 1 ? link : undefined}
            linkName='Добавить товар'
            title='В этом списке ещё нет товаров'/>
    }

    const onDeleteHandler = (id) => {
        dispatch(deleteProductById(id))
    }

    const deleteFormatter = (id) => {
        return (
            <button onClick={() => onDeleteHandler(id)}
                    className='btn btn-link btn-link-expend'>
                Удалить
            </button>
        )
    }

    const expandRowTable = [
        {
            dataField: 'price',
            text: 'Цена',
            classNameTh: 'expend-price',
            formatter: moneyFormatter
        },
        {
            dataField: 'vendorCode',
            text: 'Артикул'
        },
        {
            dataField: 'weightBrutto',
            text: 'Брутто'
        },
        {
            dataField: 'weightNetto',
            text: 'Нетто'
        },
        {
            dataField: 'id',
            text: 'Удалить',
            formatter: deleteFormatter
        }
    ]

    const columns: ColumnDescription[] = [
        {
            dataField: 'image',
            text: '',
            classes: 'product-image',
            headerStyle: {width: '120px'},
            formatter: (image, row) =>
                imgFormatter(image, row, '/imgs/placeholder-product-image.png')
        },
        {
            dataField: 'nameRu',
            text: 'Название',
            classes: 'title',
            sort: true,
            headerStyle: {width: '390px'},
            formatter: (nameRu, row) =>
                nameToLinkFormatter(nameRu, row, 'product')
        },
        {
            dataField: 'autolongNumber',
            text: 'Номер'
        },
        {
            dataField: 'price',
            text: 'Цена',
            classes: 'price',
            formatter: (price) => moneyFormatter(price, ['rub', 'usd'])
        },
        {
            dataField: 'updatedAt',
            text: 'Обновление',
            sort: true,
            headerStyle: {width: '125px'},
            formatter: timeConverter
        }
    ]
    return <AutoTable
        filter={filter}
        checkFilter={checkFilter}
        expandRowTable={expandRowTable}
        rowClickLink='product'
        keyField='id' data={products} columns={columns}
        button={user && user.role.accesses.productsCreate == 1
            ? {link: link, text: 'Добавить товары'}
            : undefined}
    />
}

export default ProductsTable
