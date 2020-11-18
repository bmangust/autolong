// React
import React, {useEffect, useState} from 'react'

// Third-party
import {NavLink, useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Collapse from 'react-bootstrap/esm/Collapse'
import {useForm} from 'react-hook-form'

// Actions
import {
    changeOrderStatus,
    deleteOrderById,
    fetchOrderById,
} from '../../store/actions/orders'

// Typescript
import {IOrder, IOrdersRootState} from '../../components/Orders/IOrders'

// Styles
import classes from './Order.module.css'

// App
import Loader from '../../components/UI/Loader/Loader'
import Error from '../../components/UI/Error/Error'
import SvgArrowRight from '../../components/UI/iconComponents/ArrowRight'
import OrderItems from '../../components/Orders/OrderItems/OrderItems'
import SandboxFilesCard from '../../components/SandboxCard/SandboxFilesCard'
import DocumentsCreate from '../../components/DocumentCreate/DocumentsCreate'
import {
    getOrderStatusName,
    getPaymentStatusName,
    timeConverter,
} from '../../utils'
import Form from '../../components/UI/Form/Form'
import Input from '../../components/UI/Inputs/Input/Input'
import OrderStatuses from '../../components/Orders/OrderStatuses/OrderStatuses'

const Order: React.FC<IOrder> = () => {
    const {id}: any = useParams()
    const [isShow, setIsShow] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const {register, handleSubmit} = useForm()

    const {order, loading, error} = useSelector((state: IOrdersRootState) => ({
        error: state.ordersState.error,
        order: state.ordersState.order,
        loading: state.ordersState.loading,
        loadingStatus: state.ordersState.loadingStatus,
    }))

    useEffect(() => {
        dispatch(fetchOrderById(id))
    }, [dispatch, id])

    const showPaymentHandler = () => {
        setIsShow((oldState) => !oldState)
    }

    const changePaymentStatus = handleSubmit((formValues) => {
        formValues.statusPayment = order.statusPayment
        dispatch(changeOrderStatus(id, formValues))
    })

    const onDeleteHandler = (id) => {
        dispatch(deleteOrderById(id))
        history.push('/orders')
    }

    const cls = ['paymentCollapse']

    if (isShow) {
        cls.push('active')
    }

    if (error) {
        return <Error />
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div className='row'>
            <div className='col-lg-8'>
                <div className='card mb-3'>
                    <div className='card-body-info'>
                        <h2 className='mb-3'>
                            {'name' in order ? order.name : ''}
                            {order.cargo ? (
                                <span className='cargo'>Статус карго</span>
                            ) : null}
                        </h2>
                        <div className='row mb-3 flex-lg-row flex-column'>
                            <div className='col-md-5 mb-lg-0 mb-3'>
                                <p className='infoBlockHeaders'>
                                    Статус заказа
                                </p>
                                <span className='statusOrder'>
                                    {getOrderStatusName(order.status)}
                                </span>
                            </div>
                            <div className='col-md-7'>
                                <p className='infoBlockHeaders'>
                                    Статус оплаты
                                </p>
                                <span className='statusPayment'>
                                    {getPaymentStatusName(order.statusPayment)}
                                </span>
                                <span
                                    className={cls.join(' ')}
                                    onClick={showPaymentHandler}
                                >
                                    Сменить статус
                                </span>
                            </div>
                        </div>
                        <Collapse in={isShow}>
                            <div>
                                <hr className='m-0' />
                                <Form
                                    className='mb-4'
                                    onSubmit={changePaymentStatus}
                                >
                                    <div className='row'>
                                        <Input
                                            id='paymentAmount'
                                            type='number'
                                            label='Укажите сумму оплаты ¥'
                                            ref={register}
                                            name='paymentAmount'
                                        />
                                        <Input
                                            id='surchargeAmount'
                                            type='number'
                                            label='* Укажите сумму доплаты ¥'
                                            ref={register}
                                            name='surchargeAmount'
                                        />
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-6'>
                                            <label>Оплачено</label>
                                            <h2 className='m-0'>
                                                0 % + 12.800 ¥
                                            </h2>
                                        </div>
                                        <div className='col-6 m-auto'>
                                            <SandboxFilesCard
                                                id={order.id}
                                                isCheck={true}
                                                isShowFiles={false}
                                                label='+ Добавить чек'
                                                sandboxFiles={
                                                    order.sandboxFiles
                                                }
                                                page='orders'
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type='submit'
                                        className='btn btn-link'
                                    >
                                        Подтвердить оплату
                                    </button>
                                </Form>
                            </div>
                        </Collapse>
                        <button
                            onClick={() => onDeleteHandler(order.id)}
                            className='btn btn-danger'
                        >
                            Удалить заказ
                        </button>
                    </div>
                </div>

                <div className='mb-3'>
                    <OrderStatuses
                        id={order.id}
                        status={order.status}
                        container={order.container}
                    />
                </div>

                <div className='card mb-3 pb-lg-4 pb-0'>
                    <div className={classes.cardBody + ' card-body-info'}>
                        <div
                            className='mb-lg-4 mb-2
                        d-flex justify-content-between align-items-center'
                        >
                            <h2 className={classes.title}>Список заказа</h2>
                            <div className={classes.dropdownWrap}>
                                <span className={classes.dropdownTitle}>
                                    Валюта
                                </span>
                                <select>
                                    <option value='1' selected>
                                        ¥
                                    </option>
                                    <option value='2'>₽</option>
                                    <option value='3'>$</option>
                                </select>
                            </div>
                        </div>
                        {'items' in order ? (
                            <OrderItems items={order.items} />
                        ) : null}
                        <div className='row align-items-center mt-5'>
                            <div className='col-xl-6'>
                                <div className={classes.orderInfo}>
                                    <span className={classes.orderDate}>
                                        {timeConverter(order.createdAt)}
                                    </span>
                                    <span className={classes.orderRateRub}>
                                        1 ¥ = 11,84 ₽
                                    </span>
                                    <span className={classes.orderRateUSD}>
                                        1 ¥ = 0,15 $
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-6'>
                            <div className={classes.orderPriceTotal +
                            ' text-right'}>
                                Общая стоимость
                                <span className='text-orange ml-3'>
                                    {'price' in order
                                        ? order.price.cny.toFixed(2) + ' ¥'
                                        : null}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card mb-3'>
                    <div className='card-body'>
                        <h2 className='mb-4'>Документы</h2>
                        <DocumentsCreate id={order.id} />
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
                            <p className='infoBlockHeaders mb-1'>Поставщик</p>
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
                            <p
                                className='infoBlockHeaders mb-1 mt-lg-5
                                 mt-3'
                            >
                                Перейти на страницу поставщика
                            </p>
                            <NavLink to={'/provider/' + order.provider.id}>
                                <SvgArrowRight />
                            </NavLink>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Order
