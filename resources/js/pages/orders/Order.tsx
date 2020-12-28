// React
import React, {useContext, useEffect, useState} from 'react'

// Third-party
import {NavLink, useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Collapse from 'react-bootstrap/esm/Collapse'

// Actions
import {
    deleteOrderById,
    fetchOrderById
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
    getPaymentStatusName, moneyFormatter,
    timeConverter
} from '../../utils'
import OrderStatuses from '../../components/Orders/OrderStatuses/OrderStatuses'
import OrderPayment from '../../components/Orders/OrderPayment/OrderPayment'
import courses from '../../../courses/courses.json'
import {SanctumContext} from '../../Sanctum'
import OrderBaikal from '../../components/Orders/OrderBaikal/OrderBaikal'
import Modal from '../../components/UI/Modal/Modal'
import OrderEdit from '../../components/Orders/OrderEdit/OrderEdit'

const Order: React.FC<IOrder> = () => {
    const {id}: any = useParams()
    const [isShow, setIsShow] = useState(false)
    const [course, setCourse] = useState('cny')
    const {user} = useContext(SanctumContext)
    const [isShowAdminModal, setIsShowAdminModal] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const {order, loading, error} = useSelector((state: IOrdersRootState) => ({
        error: state.ordersState.error,
        order: state.ordersState.order,
        loading: state.ordersState.loading,
        loadingStatus: state.ordersState.loadingStatus
    }))

    useEffect(() => {
        dispatch(fetchOrderById(id))
    }, [dispatch, id])

    const showPaymentHandler = () => {
        setIsShow((oldState) => !oldState)
    }

    const onDeleteHandler = (id) => {
        dispatch(deleteOrderById(id))
        history.push('/orders')
    }

    const courseChangeHandler = (e) => {
        setCourse(e.target.value)
    }

    let courseBlock
    let coursesWithout
    const usdCourse = courses.usd
    const rubCourse = courses.rub

    switch (course) {
        case 'usd': {
            coursesWithout = ['cny', 'rub']
            const usdToCny = 1 / usdCourse
            const usdToRub = usdToCny * rubCourse
            courseBlock = <>
                <span className={classes.orderRateRub}>
                    1 $ = {usdToRub.toFixed(2)} ₽
                </span>
                <span className={classes.orderRateUSD}>
                    1 $ = {usdToCny.toFixed(2)} ¥
                </span>
            </>
            break
        }
        case 'rub': {
            coursesWithout = ['cny', 'usd']
            const rubToCny = 1 / rubCourse
            const rubToRub = rubToCny * usdCourse
            courseBlock = <>
                <span className={classes.orderRateRub}>
                    1 ₽ = {rubToCny.toFixed(2)} $
                </span>
                <span className={classes.orderRateUSD}>
                    1 ₽ = {rubToRub.toFixed(2)} ¥
                </span>
            </>
            break
        }
        case 'cny':
        default: {
            coursesWithout = ['usd', 'rub']
            courseBlock = <>
                <span className={classes.orderRateRub}>
                    1 ¥ = {courses.rub.toFixed(2)} ₽
                </span>
                <span className={classes.orderRateUSD}>
                    1 ¥ = {courses.usd.toFixed(2)} $
                </span>
            </>
            break
        }
    }

    const cls = ['paymentCollapse']

    if (isShow) {
        cls.push('active')
    }

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (!order) {
        return null
    }
    return <div className='row'>
        <div className='col-lg-8'>
            <div className='card mb-3'>
                <div className='card-body-info'>
                    <h2 className='mb-3'>
                        {order.name}
                        {user.role.accesses.adminPower == 1
                            ? <>
                                <button
                                    onClick={() => setIsShowAdminModal(true)}
                                    className='editButton ml-4'>
                                    Редактировать
                                </button>
                                {isShowAdminModal
                                    ? <Modal
                                        size='size-700'
                                        title='Редактирование заказа'
                                        isOpen={isShowAdminModal}
                                        setIsOpen={setIsShowAdminModal}>
                                        <OrderEdit setIsOpen={setIsShowAdminModal} order={order}/>
                                    </Modal>
                                    : null
                                }
                            </>
                            : null
                        }
                        {order.cargo && user.role.accesses.ordersShowCargo
                            ? <span className='cargo'>Статус карго</span>
                            : null}
                    </h2>
                    <div className='row mb-3 flex-lg-row flex-column'>
                        <div className='col-md-5 mb-xl-0 mb-3'>
                            <p className='infoBlockHeaders'>
                                Статус заказа
                            </p>
                            <span className='statusOrder'>
                                {getOrderStatusName(order.status)}
                            </span>
                        </div>
                        <div className='col-xl-7'>
                            <p className='infoBlockHeaders'>
                                Статус оплаты
                            </p>
                            <span className='statusPayment'>
                                {order.statusPayment === 'paymentPaidFor'
                                    ? `${getPaymentStatusName(order.statusPayment)}
                                     ${Math.round(order.paymentAmount / +order.price.cny * 100)} %`
                                    : getPaymentStatusName(order.statusPayment)
                                }
                            </span>
                            <span
                                className={cls.join(' ')}
                                onClick={showPaymentHandler}>
                                    Изменить
                            </span>
                        </div>
                    </div>
                    <Collapse in={isShow}>
                        <div>
                            <OrderPayment order={order}/>
                        </div>
                    </Collapse>
                    {user && user.role.accesses.ordersDelete == 1
                        ? <button
                            onClick={() => onDeleteHandler(order.id)}
                            className='btn btn-danger'>
                            Удалить заказ
                        </button>
                        : null
                    }
                </div>
            </div>

            <div className='mb-3'>
                <OrderStatuses
                    arrivalDate={order.arrivalDate}
                    orderCity={order.city}
                    id={order.id}
                    providerId={order.provider.id}
                    status={order.status}
                    container={order.container}
                    unscrupulous={order.provider.unscrupulous}
                />
            </div>

            <div className='card mb-3 pb-lg-4 pb-0'>
                <div className={classes.cardBody + ' card-body-info'}>
                    <div className='mb-lg-4 mb-2
                        d-flex justify-content-between align-items-center'>
                        <h2 className={classes.title}>Список заказа</h2>
                        <div className={classes.dropdownWrap}>
                                <span className={classes.dropdownTitle}>
                                    Валюта
                                </span>
                            <select onChange={courseChangeHandler}>
                                <option value='cny' defaultValue='cny'>
                                    ¥
                                </option>
                                <option value='rub'>₽</option>
                                <option value='usd'>$</option>
                            </select>
                        </div>
                    </div>
                    <OrderItems
                        coursesWithout={coursesWithout}
                        items={order.items}/>
                    <div className='row align-items-center mt-5'>
                        <div className='col-xl-6'>
                            <div className={classes.orderInfo}>
                                <span className={classes.orderDate}>
                                    {timeConverter(courses.updatedAt)}
                                </span>
                                {courseBlock}
                            </div>
                        </div>
                        <div className='col-xl-6'>
                            <div className={classes.orderPriceTotal}>
                                Общая стоимость {moneyFormatter(order.price, coursesWithout)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card mb-3'>
                <div className='card-body'>
                    <h2 className='mb-4'>Документы</h2>
                    <DocumentsCreate date={order.createdAt} id={order.id}/>
                </div>
            </div>

            <SandboxFilesCard
                id={order.id}
                sandboxFiles={order.sandboxFiles}
                page='orders'
            />
        </div>
        <div className='col-lg-4'>
            {order.cargo && user.role.accesses.ordersShowCargo
                ? <OrderBaikal
                    orderId={order.id}
                    baikalTrackerLink={order.baikalTrackerLink}
                    baikalTrackerHistory={order.baikalTrackerHistory}/>
                : null}
            {order.provider
                ?
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
                            <a href={order.provider.website}
                               target='_blank'
                               rel='noreferrer'>
                                {order.provider.website}
                            </a>
                        </p>
                        <p className='infoBlockHeaders mb-1 mt-lg-5 mt-3'>
                            Перейти на страницу поставщика
                        </p>
                        <NavLink to={'/provider/' + order.provider.id}>
                            <SvgArrowRight/>
                        </NavLink>
                    </div>
                </div>
                : null}
        </div>
    </div>
}

export default Order
