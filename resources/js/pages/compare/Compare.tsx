// React
import React from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Typescript
import {IProductsRootState} from '../../components/Products/IProducts'

// Actions
import {fetchCompareProductsByArticle} from '../../store/actions/products'

// App
import AutoTable from '../../components/UI/AutoTable/AutoTable'
import {
    imgFormatter,
    moneyFormatter,
    nameToLinkFormatter
} from '../../utils'
import Loader from '../../components/UI/Loader/Loader'
import Error from '../../components/UI/Error/Error'
import SvgPrices from '../../components/UI/iconComponents/Prices'

const Compare = () => {
    const dispatch = useDispatch()

    const {
        register, handleSubmit
    } = useForm()

    const compareSubmitHandler =
        handleSubmit((formValues) => {
            dispatch(fetchCompareProductsByArticle(formValues))
        })

    const {compareProducts, compareLoading, error} = useSelector(
        (state: IProductsRootState) => ({
            error: state.productsState.error,
            compareProducts: state.productsState.compareProducts,
            compareLoading: state.productsState.compareLoading
        })
    )

    const providerFormatter = (provider) => {
        return provider.name
    }

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
            dataField: 'provider',
            text: 'Поставщик',
            formatter: providerFormatter
        },
        {
            dataField: 'price',
            text: 'Цена',
            classes: 'price',
            formatter: (price) => moneyFormatter(price, ['rub', 'usd'])
        }
    ]

    let table = <AutoTable
        keyField='id'
        header={false}
        data={compareProducts}
        columns={columns}
    />

    if (compareProducts && !compareProducts.length) {
        table = <div className='card card-body'>
            <SvgPrices
                className='d-block ml-auto mr-auto mb-4'
                width={75} height={75}/>
            <h2 className='text-center mb-0'>
                Введите артикул для сравнения
            </h2>
        </div>
    }

    if (error) {
        table = <Error/>
    }

    if (compareLoading) {
        table = <Loader/>
    }

    return <>
        <form onSubmit={compareSubmitHandler}>
            <div className='card mb-3'>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-lg-7'>
                            <label htmlFor='articles'>
                                Введите артикул товара для сравнения
                            </label>
                            <input
                                ref={register({required: true})}
                                name='vendorCode'
                                placeholder='артикул товара для сравнения'
                            />
                        </div>
                        <div className="col-lg-5">
                            <button
                                className='btn btn-success mt-4'
                                type='submit'>
                                Показать товары
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        {table}
    </>
}

export default Compare
