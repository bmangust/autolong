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
        placeholder: '???????????? ???? ????????????????????',
        loading: loadingProviders
    }

    const checkFilter = {
        field: 'orders',
        placeholder: '???????????????? ????????????',
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
            description='?????????????? ???? ???????????? ?????????????????? ????????????, ?????????? ???? ?????????????????????? ?? ????????????'
            link={user && user.role.accesses.productsCreate == 1 ? link : undefined}
            linkName='???????????????? ??????????'
            title='?? ???????? ???????????? ?????? ?????? ??????????????'/>
    }

    const onDeleteHandler = (id) => {
        dispatch(deleteProductById(id, '', unpublished ? 'newProducts' : 'products'))
    }

    const deleteFormatter = (id) => {
        return user && user.role.accesses.productsDelete == 1
            ? <button onClick={() => onDeleteHandler(id)}
                      className='btn btn-link btn-link-expend'>
                ??????????????
            </button>
            : null
    }

    const expandRowTable = [
        {
            dataField: 'price',
            text: '????????',
            classNameTh: 'expend-price',
            formatter: moneyFormatter
        },
        {
            dataField: 'vendorCode',
            text: '??????????????'
        },
        {
            dataField: 'weightBrutto',
            text: '????????????'
        },
        {
            dataField: 'weightNetto',
            text: '??????????'
        },
        {
            dataField: 'id',
            text: '??????????????',
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
            text: '????????????????',
            classes: 'title',
            sort: true,
            headerStyle: {width: '390px'},
            formatter: (nameRu, row) =>
                nameToLinkFormatter(nameRu, row, 'product')
        },
        {
            dataField: 'autolongNumber',
            text: '??????????'
        },
        {
            dataField: 'price',
            text: '????????',
            classes: 'price',
            formatter: (price) => moneyFormatter(price, ['rub', 'usd'])
        },
        {
            dataField: 'updatedAt',
            text: '????????????????????',
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
            ? {link: link, text: '???????????????? ????????????'}
            : undefined}
    />
}

export default ProductsTable
