// React
import React, {useEffect} from 'react'

// Third-party
import {NavLink, useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Select from 'react-select'

// Actions
import {
    changeOrderStatus,
    deleteOrderById, fetchOrderById
} from '../../store/actions/orders'

// Typescript
import {IOrder, IOrdersRootState} from '../../components/Orders/IOrders'

// App
import Loader from '../../components/UI/Loader/Loader'
import Error from '../../components/UI/Error/Error'
import SvgArrowRight from '../../components/UI/iconComponents/ArrowRight'
import OrderItems from '../../components/Orders/OrderItems/OrderItems'
import statuses from '../../../statuses/statuses.json'
import SandboxFilesCard from '../../components/SandboxCard/SandboxFilesCard'
import OrderStatuses from '../../components/Orders/OrderStatuses/OrderStatuses'
import DocumentsCreate from '../../components/DocumentCreate/DocumentsCreate'

const Order: React.FC<IOrder> = () => {
    const {id}: any = useParams()

    const dispatch = useDispatch()
    const history = useHistory()

    const {order, loading, loadingStatus, error} = useSelector(
        (state: IOrdersRootState) => ({
            error: state.ordersState.error,
            order: state.ordersState.order,
            loading: state.ordersState.loading,
            loadingStatus: state.ordersState.loadingStatus
        })
    )

    useEffect(() => {
        dispatch(fetchOrderById(id))
    }, [dispatch, id])

    const onChangeHandler = (id, e, action) => {
        const value = {
            [action.name]: e.value
        }
        dispatch(changeOrderStatus(id, value))
    }

    const orderStatuses = Object.entries(
        statuses.orderStatuses).map(
        ([key, value]) => {
            return {label: value, value: key}
        }
    )

    const paymentStatuses = Object.entries(
        statuses.paymentStatuses).map(
        ([key, value]) => {
            return {label: value, value: key}
        }
    )

    const onDeleteHandler = (id) => {
        dispatch(deleteOrderById(id))
        history.push('/orders')
    }

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    return (
        <div>
            <div className='row'>
                <div className='col-lg-8'>
                    <div className='card mb-3'>
                        <div className='card-body-info'>
                            <h2 className='mb-3'>
                                {'name' in order ? order.name : ''}
                            </h2>
                            <div className='row mb-3'>
                                <div className='col-md-6 mb-lg-0 mb-3'>
                                    <p className='infoBlockHeaders'>
                                        Статус заказа
                                    </p>
                                    <Select
                                        placeholder='Выберите статус заказа'
                                        isSearchable={false}
                                        value={orderStatuses.filter(
                                            ({value}) => value === order.status
                                        )}
                                        isLoading={loadingStatus}
                                        isDisabled={loadingStatus}
                                        onChange={(e, action) =>
                                            onChangeHandler(order.id, e, action)
                                        }
                                        classNamePrefix='select-mini'
                                        className='select-mini'
                                        name='status'
                                        options={orderStatuses}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <p className='infoBlockHeaders'>
                                        Статус оплаты
                                    </p>
                                    <Select
                                        placeholder='Выберите статус оплаты'
                                        isSearchable={false}
                                        value={paymentStatuses.filter(
                                            ({value}) =>
                                                value === order.statusPayment
                                        )}
                                        isLoading={loadingStatus}
                                        isDisabled={loadingStatus}
                                        onChange={(e, action) =>
                                            onChangeHandler(order.id, e, action)
                                        }
                                        classNamePrefix='select-mini'
                                        className='select-mini'
                                        name='statusPayment'
                                        options={paymentStatuses}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => onDeleteHandler(order.id)}
                                className='btn btn-danger'
                            >
                                Удалить заказ
                            </button>
                        </div>
                        <OrderStatuses id={order.id} status={order.status}/>
                    </div>

                    <div className='card mb-3 pb-lg-4 pb-0'>
                        <div className='card-body-info'>
                            <h2 className='mb-lg-4 mb-2'>Список заказа</h2>
                            {'items' in order ? (
                                <OrderItems items={order.items}/>
                            ) : null}
                            <div className='text-right font-weight-bold mt-3'>
                                Общая стоимость
                                <span className='text-orange ml-3'>
                                    {'price' in order
                                        ? order.price.cny.toFixed(2) + ' ¥'
                                        : null}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body">
                            <h2 className="mb-4">Документы</h2>
                            <DocumentsCreate id={order.id}/>
                        </div>
                    </div>

                    <SandboxFilesCard
                        id={order.id}
                        sandboxFiles={order.sandboxFiles}
                        page='orders'
                    />
                </div>

                {'provider' in order && order.provider ? (
                    <div className='col-lg-4'>
                        <div className='card'>
                            <div className='card-body-info'>
                                <p className='infoBlockHeaders mb-1'>
                                    Поставщик
                                </p>
                                <p className='infoBlockText'>
                                    {order.provider.name}
                                </p>
                                <p className='infoBlockHeaders mb-1'>Страна</p>
                                <p className='infoBlockText'>
                                    {order.provider.country
                                        ? order.provider.country.name
                                        : null}
                                </p>
                                <p className='infoBlockHeaders mb-1'>Почта</p>
                                <p className='infoBlockText'>
                                    {order.provider.email}
                                </p>
                                <p className='infoBlockHeaders mb-1'>Телефон</p>
                                <p className='infoBlockText'>
                                    {order.provider.phone}
                                </p>
                                <p className='infoBlockHeaders mb-1'>Wechat</p>
                                <p className='infoBlockText'>
                                    {order.provider.wechat}
                                </p>
                                <p className='infoBlockHeaders mb-1'>Сайт</p>
                                <p className='infoBlockText'>
                                    <a
                                        href={order.provider.website}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        {order.provider.website}
                                    </a>
                                </p>
                                <p className='infoBlockHeaders mb-1 mt-lg-5
                                 mt-3'>
                                    Перейти на страницу поставщика
                                </p>
                                <NavLink to={'/provider/' + order.provider.id}>
                                    <SvgArrowRight/>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Order
