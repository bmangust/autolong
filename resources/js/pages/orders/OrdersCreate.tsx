// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'

// Typescript
import {IProvidersRootState} from '../../components/Providers/IProviders'
import {IOrdersRootState} from '../../components/Orders/IOrders'

// Styles
import classes from './Orders.module.css'

// Actions
import {fetchItemsByVendors} from '../../store/actions/orders'
import {fetchProviders} from '../../store/actions/providers'

// App
import OrdersForms from '../../components/Orders/OrderForm/OrdersForms'

const OrdersCreate: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {
        register, handleSubmit
    } = useForm()

    const getProductSubmitHandler = handleSubmit((formValues) => {
        dispatch(fetchItemsByVendors(formValues))
    })

    const {orderProducts, notFound} = useSelector(
        (state: IOrdersRootState) => ({
            orderProducts: state.ordersState.orderProducts,
            notFound: state.ordersState.notFound
        }))

    const createProductsHandler = () => {
        history.push('/productscreate/published')
    }

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
                            <button
                                className='btn btn-success mt-2'
                                type='submit'>
                                Добавить товары
                            </button>
                        </div>
                        <div className="col-lg-4">
                            {notFound && notFound.length
                                ? <p className={classes.notFound}>
                                    Для артикулов {notFound.join(', ')} не найдены записи.
                                    <span onClick={() => createProductsHandler()}>
                                        Создайте эти товары
                                    </span>
                                </p>
                                : null
                            }
                        </div>
                    </div>

                </div>
            </div>
        </form>
        {Object.keys(orderProducts).length
            ? <OrdersForms
                items={orderProducts}
                providers={providers}
            />
            : null
        }
    </>
}

export default OrdersCreate
