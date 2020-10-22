// React
import React, {useEffect} from 'react'

// Third-party
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Css
import classes from './Orders.module.css';

// Actions
import {fetchOrderById} from '../../store/actions/orders'
import {fetchProviderById} from '../../store/actions/providers'

// Typescript
import {
    IOrder,
    IOrdersRootState
} from '../../components/Orders/IOrders'

import {
    // IProvider,
    IProvidersRootState
} from '../../components/Providers/IProviders'

// App
import Loader from '../../components/UI/Loader/Loader'
import Error from '../../components/UI/Error/Error'
import SvgArrowRight from '../../components/UI/iconComponents/ArrowRight';

const Order: React.FC<IOrder> = () => {
    const {id}: any = useParams()

    const dispatch = useDispatch()

    const {order, loading, error} = useSelector(
        (state: IOrdersRootState) => ({
            error: state.ordersState.error,
            order: state.ordersState.order,
            loading: state.ordersState.loading
        })
    )

    const {provider} = useSelector(
        (state: IProvidersRootState) => ({
            provider: state.providersState.provider
        })
    )

    useEffect(() => {
        dispatch(fetchProviderById(id))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchOrderById(id))
    }, [dispatch])

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    return (
        <div>
            <div className="row">

                <div className="col-lg-8">
                    <div className="card mb-3">
                        <div className="card-body-info">

                            <h2 className="mb-3">{'name' in order
                                ? order.name
                                : ''}</h2>

                            <div className="row">

                                <div className="col-lg-6">
                                    <p className="infoBlockHeaders mb-2">
                                        Статус заказа
                                    </p>
                                    <div className="d-flex">
                                        <span className={
                                            'bg-primary text-white '
                                        + classes.orderStatus}>
                                            Создан
                                        </span>
                                    </div>
                                </div>

                                <div className="col-lg-6">

                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body-info">
                            <h2 className="mb-0">Список заказа</h2>
                        </div>
                    </div>

                </div>

                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body-info">
                            <p className="infoBlockHeaders mb-1">
                                Поставщик
                            </p>
                            <p className="infoBlockText">
                                {'name' in provider
                                    ? provider.name
                                    : ''}
                            </p>
                            <p className="infoBlockHeaders mb-1">
                                Страна
                            </p>
                            <p className="infoBlockText">
                                {'country' in provider
                                    ? provider.country
                                        ? provider.country.name : ''
                                    : ''}
                            </p>
                            <p className="infoBlockHeaders mb-1">
                                Почта
                            </p>
                            <p className="infoBlockText">
                                {'email' in provider
                                    ? provider.email
                                    : ''}
                            </p>
                            <p className="infoBlockHeaders mb-1">
                                Телефон
                            </p>
                            <p className="infoBlockText">
                                {'phone' in provider
                                    ? provider.phone
                                    : ''}
                            </p>
                            <p className="infoBlockHeaders mb-1">
                                Wechat
                            </p>
                            <p className="infoBlockText">
                                {'wechat' in provider
                                    ? provider.wechat
                                    : ''}
                            </p>
                            <p className="infoBlockHeaders mb-1">
                                Сайт
                            </p>
                            <p className="infoBlockText">
                                <a href={'website' in provider
                                    ? provider.website
                                    : ''}
                                   target="_blank"
                                   rel="noreferrer">
                                    {'website' in provider
                                        ? provider.website
                                        : ''}
                                </a>
                            </p>
                            <p className="infoBlockHeaders mb-1 mt-5">
                                Перейти на страницу поставщика
                            </p>
                            <NavLink to={'id' in provider
                                ? '/provider/' + provider.id
                                : ''}>
                                <SvgArrowRight/>
                            </NavLink>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Order
