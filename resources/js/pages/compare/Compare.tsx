// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Typescript
import {IProductsRootState} from '../../components/Products/IProducts'
import {IProvidersRootState} from '../../components/Providers/IProviders'

// Actions
import {fetchCompareProductsByVendorCode} from '../../store/actions/products'
import {fetchProviders} from '../../store/actions/providers'

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
import InputCheckbox from '../../components/UI/Inputs/InputCheckbox/InputCheckbox'
import Form from '../../components/UI/Form/Form'

interface IFormData {
    isAutolongNumber: 1 | 0
    vendorCode: string
}

const Compare = () => {
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const compareSubmitHandler =
        handleSubmit((formValues: IFormData) => {
            const data = formValues
            data.isAutolongNumber = data.isAutolongNumber ? 1 : 0
            dispatch(fetchCompareProductsByVendorCode(data))
        })

    const {compareProducts, compareLoading, compareError} = useSelector(
        (state: IProductsRootState) => ({
            compareError: state.productsState.error,
            compareProducts: state.productsState.compareProducts,
            compareLoading: state.productsState.compareLoading
        })
    )

    const {providers, loading, error} = useSelector((state: IProvidersRootState) => ({
        providers: state.providersState.providers,
        loading: state.providersState.loading,
        error: state.providersState.error
    }))

    useEffect(() => {
        dispatch(fetchProviders())
    }, [dispatch])

    const providerFormatter = (providerId) => {
        return providers.find((provider) => provider.id === providerId)?.name || providerId
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
            dataField: 'providerId',
            text: 'Поставщик',
            formatter: providerFormatter
        },
        {
            dataField: 'price',
            text: 'Цена',
            sort: true,
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

    if (compareError || error) {
        table = <Error/>
    }

    if (compareLoading || loading) {
        table = <Loader/>
    }

    return <>
        <Form onSubmit={compareSubmitHandler}>
            <div className='card mb-3'>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-lg-5'>
                            <label htmlFor='articles'>
                                Введите артикул/внутренний код товара для сравнения
                            </label>
                            <input
                                ref={register({required: true})}
                                name='vendorCode'
                                placeholder='Артикул товара/внутренний код'
                            />
                        </div>
                        <div className="col-lg-3 mt-auto">
                            <InputCheckbox
                                label='Поиск по внутреннему коду'
                                name='isAutolongNumber'
                            />
                        </div>
                        <div className="col-lg-4">
                            <button
                                className='btn btn-success mt-4'
                                type='submit'>
                                Показать товары
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
        {table}
    </>
}

export default Compare
