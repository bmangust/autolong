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
    getPaymentStatusName,
    imgFormatter,
    moneyFormatter,
    nameToLinkFormatter, timeConverter
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
            data.isAutolongNumber = formValues.isAutolongNumber ? 1 : 0
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

    // const moneyWithTotalFormatter = (price, row) => {
    //     let totalAmount = 0
    //     row.orders[0].container && row.orders[0].container.orders && row.orders[0].container.orders.map((order) => {
    //         totalAmount += order.totalPaymentHistoryRub
    //     })
    //     const total = +row.orders[0].totalPaymentHistory
    //     const totalRub = +row.orders[0].totalPaymentHistoryRub
    //     const totalRubCourse = total ? totalRub / total : 0
    //     const priceRub = totalRubCourse * +price.cny
    //     const additionalTotal = (+row.orders[0].refusalAmount || 0) + (+row.orders[0].orderingAmount || 0)
    //         + (+row.orders[0].customsAmount || 0)
    //     const orderingPrice = totalRub ? additionalTotal / totalRub : 0
    //     let delivery
    //     if (totalRub) {
    //         delivery = priceRub * totalAmount
    //     }
    //     const additionalSpending = priceRub * orderingPrice
    //     const totalPrice = priceRub + delivery + additionalSpending
    //     return `${price.cny} ${totalPrice}`
    // }

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

    const idFormatter = (id, row) => {
        if (!row.orders.length) {
            return null
        }
        return row.orders[0].id
    }

    const nameFormatter = (name, row) => {
        if (!row.orders.length) {
            return null
        }
        return row.orders[0].name
    }

    const itemsFormatter = (items, row) => {
        if (!row.orders.length) {
            return null
        }
        return row.orders[0].items.length
    }

    const expandRowTable = [
        {
            dataField: 'id',
            text: 'ID',
            headerStyle: {width: '85px'},
            formatter: idFormatter
        },
        {
            dataField: 'name',
            text: 'Название',
            headerStyle: {width: '270px'},
            formatter: nameFormatter
        },
        {
            dataField: 'hsCode',
            text: 'Кол.наим.',
            formatter: itemsFormatter
        },
        {
            dataField: 'statusPayment',
            text: 'Статус оплаты',
            headerStyle: {width: '250px'},
            formatter: (statusPayment, row) => row.orders.length
                ? getPaymentStatusName(row.orders[0].statusPayment)
                : null
        },
        {
            dataField: 'createdAt',
            text: 'Создан',
            formatter: (createdAt, row) => row.orders.length
                ? timeConverter(row.orders[0].createdAt)
                : null
        }
    ]

    let table = <AutoTable
        expandRowTable={expandRowTable}
        keyField='fakeId'
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
                                ref={register}
                                defaultChecked={true}
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
