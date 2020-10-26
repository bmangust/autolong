// React
import React, {useEffect} from 'react'

// Third-party
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Css
import classes from './Orders.module.css'

// Actions
import {changeOrderStatus, fetchOrderById} from '../../store/actions/orders'

// Typescript
import {
    IOrder,
    IOrdersRootState
} from '../../components/Orders/IOrders'

// App
import Loader from '../../components/UI/Loader/Loader'
import Error from '../../components/UI/Error/Error'
import SvgArrowRight from '../../components/UI/iconComponents/ArrowRight'
import OrderItems from '../../components/Orders/OrderItems/OrderItems'
import statuses from '../../../statuses/statuses.json'

const Order: React.FC<IOrder> = () => {
    const {id}: any = useParams()

    const dispatch = useDispatch()

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

    const onChangeHandler = (id, e) => {
        const value = {
            [e.target.name]: e.target.value
        }
        dispatch(changeOrderStatus(id, value))
    }

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    let totalPrice = 0
    return (
        <div>
            <div className="row">

                <div className="col-lg-8">
                    <div className="card mb-3">
                        <div className="card-body-info">

                            <h2 className="mb-3">
                                {'name' in order
                                    ? order.name
                                    : ''}
                            </h2>
                            <div className='mb-3'>
                                <p className="infoBlockHeaders">
                                    Статус заказа
                                </p>
                                <div className="row">
                                    <div className="col-6">
                                        <span className={
                                            'bg-primary text-white '
                                            + classes.orderStatus}>
                                            {'status' in order
                                                ? statuses
                                                    .orderStatuses[order.status]
                                                : ''}
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <select
                                            className={loadingStatus
                                                ? 'loading select-mini'
                                                : 'select-mini'}
                                            disabled={loadingStatus}
                                            name="status"
                                            onChange={(e) =>
                                                onChangeHandler(order.id, e)}
                                            id="status">
                                            <option disabled defaultValue="">
                                                Выберите статус закза
                                            </option>
                                            {Object.entries(
                                                statuses.orderStatuses)
                                                .map(([key, value]) => {
                                                    return (<option
                                                        key={key}
                                                        value={key}>
                                                        {value}
                                                    </option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="infoBlockHeaders">
                                    Статус оплаты
                                </p>
                                <div className="row">
                                    <div className="col-6">
                                        <span className={
                                            'bg-primary text-white '
                                            + classes.orderStatus}>
                                            {'status' in order
                                                ? statuses
                                                    .paymentStatuses[order
                                                    .statusPayment]
                                                : ''}
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <select
                                            className={loadingStatus
                                                ? 'loading select-mini'
                                                : 'select-mini'}
                                            disabled={loadingStatus}
                                            name="statusPayment"
                                            onChange={(e) =>
                                                onChangeHandler(order.id, e)}
                                            id="statusPayment">
                                            <option disabled defaultValue="">
                                                Выберите статус оплаты
                                            </option>
                                            {Object.entries(
                                                statuses.paymentStatuses)
                                                .map(([key, value]) => {
                                                    return (<option
                                                        key={key}
                                                        value={key}>
                                                        {value}
                                                    </option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3 pb-4">
                        <div className="card-body-info">
                            <h2 className="mb-4">Список заказа</h2>
                            {'items' in order
                                ? <OrderItems items={order.items}/>
                                : null
                            }
                            <div
                                className="text-right font-weight-bold mt-3">
                                Общая стоимость
                                <span
                                    className="text-orange ml-3"
                                >
                                    {'items' in order
                                        ? order.items.map(el => {
                                            totalPrice = totalPrice
                                                + el.price.cny
                                                * el.quantity
                                        }) : null
                                    }
                                    {totalPrice + ' ¥'}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {'provider' in order
                    ? <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body-info">
                                <p className="infoBlockHeaders mb-1">
                                    Поставщик
                                </p>
                                <p className="infoBlockText">
                                    {order.provider.name}
                                </p>
                                <p className="infoBlockHeaders mb-1">
                                    Страна
                                </p>
                                <p className="infoBlockText">
                                    {order.provider.country ?
                                        order.provider.country.name
                                        : null
                                    }
                                </p>
                                <p className="infoBlockHeaders mb-1">
                                    Почта
                                </p>
                                <p className="infoBlockText">
                                    {order.provider.email}
                                </p>
                                <p className="infoBlockHeaders mb-1">
                                    Телефон
                                </p>
                                <p className="infoBlockText">
                                    {order.provider.phone}
                                </p>
                                <p className="infoBlockHeaders mb-1">
                                    Wechat
                                </p>
                                <p className="infoBlockText">
                                    {order.provider.wechat}
                                </p>
                                <p className="infoBlockHeaders mb-1">
                                    Сайт
                                </p>
                                <p className="infoBlockText">
                                    <a href={order.provider.website}
                                       target="_blank"
                                       rel="noreferrer">
                                        {order.provider.website}
                                    </a>
                                </p>
                                <p className="infoBlockHeaders mb-1 mt-5">
                                    Перейти на страницу поставщика
                                </p>
                                <NavLink to={'/provider/' + order.provider.id}>
                                    <SvgArrowRight/>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default Order
