// React
import React, {useContext} from 'react'

// Third-party
import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {Accordion, AccordionContext, useAccordionToggle} from 'react-bootstrap'

// Typescript
import {IOrder} from '../../Orders/IOrders'

// Actions
import {getMarkingList} from '../../../store/actions/containers'

// Styles
import classes from './ContainersOrder.module.css'

// App
import OrderItems from '../../Orders/OrderItems/OrderItems'
import SvgPlusGrey from '../../UI/iconComponents/PlusGrey'
import SvgDownloadGrey from '../../UI/iconComponents/DownloadGrey'
import {createOrderInvoice} from '../../../store/actions/orders'

type Props = {
    order: IOrder
    setPackingList: (any) => void
    setActiveOrder: (any) => void
    setIsOpen: (boolean) => void
}

const ContainersOrder: React.FC<Props> = (props) => {
    const {order, setPackingList, setActiveOrder, setIsOpen} = props
    const dispatch = useDispatch()
    const currentEventKey = useContext(AccordionContext)

    const downloadPack = (order, old) => {
        dispatch(createOrderInvoice(order.id, {old: old ? 1 : 0}, 'packinglist', order.createdAt))
    }

    const showPackage = (order, old) => {
        setIsOpen(true)
        setPackingList(old)
        setActiveOrder(order)
    }

    const CustomToggle = ({children, eventKey}) => {
        const decoratedOnClick = useAccordionToggle(eventKey)
        const cls = [classes.orderHeader]
        if (currentEventKey === eventKey) {
            cls.push(classes.active)
        }

        return <div
            className={cls.join(' ')}
            onClick={decoratedOnClick}>
            {children}
        </div>
    }


    return <div className={classes.order}>
        <CustomToggle eventKey={order.id + order.name}>
            <NavLink to={`/order/${order.id}`}>
                {order.name}
            </NavLink>
        </CustomToggle>
        <Accordion.Collapse eventKey={order.id + order.name}>
            <>
                <div className={classes.orderBody}>
                    <OrderItems items={order.items}/>
                </div>
                <div className={classes.orderFooter}>
                    <p className={classes.orderItemsQrt}>
                        Товаров в заказе
                        ({order.items.length})
                    </p>
                    <p className={classes.orderPrice}>
                        Стоимость заказа
                        <span>{parseFloat(order.price.cny)
                            .toFixed(2)} ¥</span>
                    </p>
                </div>
                <div className={classes.documents}>
                    {order.packingList
                        ? <>
                            <p className={classes.btn}
                               onClick={() => showPackage(order, false)}>
                                <SvgPlusGrey/>
                                Новый упаковочный лист
                            </p>
                            <p className={classes.btn}
                               onClick={() => downloadPack(order, true)}>
                                <SvgDownloadGrey/>
                                Упаковочный лист
                            </p>
                        </>
                        : <p className={classes.btn}
                             onClick={() => showPackage(order, false)}>
                            <SvgPlusGrey/>
                            Создать упаковочный лист
                        </p>
                    }
                    <p className={classes.btn}
                       onClick={() => getMarkingList(order.id, order.createdAt)}>
                        <SvgDownloadGrey/>
                        Маркировка
                    </p>
                </div>
            </>
        </Accordion.Collapse>
    </div>
}

export default ContainersOrder
