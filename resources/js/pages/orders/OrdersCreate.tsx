// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'

// Actions
import {fetchItemsByVendors} from '../../store/actions/orders'
import OrdersForms from '../../components/Orders/OrderForm/OrdersFroms'
import {IProvidersRootState} from '../../components/Providers/IProviders'
import {fetchProviders} from '../../store/actions/providers'
import {IOrdersRootState} from '../../components/Orders/IOrders'

const OrdersCreate: React.FC = () => {
    const dispatch = useDispatch()

    const {
        register, handleSubmit
    } = useForm()

    const getProductSubmitHandler = handleSubmit((formValues) => {
        dispatch(fetchItemsByVendors(formValues))
    })

    const {orderProducts} = useSelector((state: IOrdersRootState) => ({
        orderProducts: state.ordersState.orderProducts
    }))

    const {providers} = useSelector(
        (state: IProvidersRootState) => ({
            providers: state.providersState.providers
        }))

    useEffect(() => {
        dispatch(fetchProviders())
    }, [dispatch])

    return <>
        <form onSubmit={getProductSubmitHandler}>
            <div className='card mb-3'>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-lg-7'>
                            <label htmlFor='articles'>
                                Добавить товар по внутреннему номер
                            </label>
                            <textarea
                                ref={register}
                                name='numbers'
                                rows={4}
                                placeholder='
                            Добавляйте каждый внутреннему номер через enter
                            '/>
                        </div>
                    </div>
                    <button className='btn btn-success mt-2' type='submit'>
                        Добавить товары
                    </button>
                </div>
            </div>
        </form>
        {
            Object.keys(orderProducts).length
                ? <>
                    <h2 className='mb-3'>Товары</h2>
                    <OrdersForms
                        items={orderProducts}
                        providers={providers}
                    />
                </>
                : null
        }
    </>
}

export default OrdersCreate
