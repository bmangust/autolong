// React
import React, {useContext} from 'react'

// Third-party
import {useDispatch} from 'react-redux'
import {Accordion, AccordionContext, useAccordionToggle} from 'react-bootstrap'

// Actions
import {getMarkingList} from '../../../store/actions/containers'
import {createOrderInvoice} from '../../../store/actions/orders'

// Typescript
import {IOrder} from '../../Orders/IOrders'

// Styles
import classes from './ContainersOrder.module.css'

// App
import DefaultView from './DefaultView/DefaultView'
import SvgPlusGrey from '../../UI/iconComponents/PlusGrey'
import SvgDownloadGrey from '../../UI/iconComponents/DownloadGrey'
import TableView from './TableView/TableView'
import {toFixed} from '../../../utils'

type Props = {
    order: IOrder
    setPackingList: (boolean) => void
    setActiveOrder: (IOrder) => void
    setIsOpen: (boolean) => void
    activeView: number
    totalAmount: number
}

const ContainersOrder: React.FC<Props> = (props) => {
    const {order, setPackingList, setActiveOrder, setIsOpen, activeView, totalAmount} = props
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

    const total = +order.totalPaymentHistory
    const totalRub = +order.totalPaymentHistoryRub
    const additionalTotal = (+order.refusalAmount || 0) + (+order.orderingAmount || 0) + (+order.customsAmount || 0)

    const totalRubCourse = total ? totalRub / total : 0
    const orderingPrice = totalRub ? additionalTotal / totalRub : 0

    return <div className={classes.order}>
        <CustomToggle eventKey={order.id + order.name}>
            {order.name}
        </CustomToggle>
        <Accordion.Collapse eventKey={order.id + order.name}>
            <div key={activeView} className='option'>
                {activeView === 0
                    ? <DefaultView order={order}/>
                    : <TableView
                        total={total}
                        totalRub={totalRub}
                        totalRubCourse={totalRubCourse}
                        orderingPrice={orderingPrice}
                        order={order}
                        totalAmount={totalAmount}
                    />
                }
                {activeView === 1
                    ? <div className={classes.total}>
                        <p className={classes.orderTotal}>
                            <span>Итого стоимость товаров:</span>
                            <span>
                                <b> {toFixed(total, 2)} ¥ </b>
                                {total > 0
                                    ? `(${toFixed(totalRub, 2)} ₽ по курсу ${toFixed(totalRubCourse, 2)})`
                                    : null
                                }
                            </span>
                        </p>
                        <p className={classes.orderTotal}>
                            <span>Стоимость оформления:</span>
                            <span>
                                <b> {toFixed(additionalTotal, 2)} ₽ </b>
                                {additionalTotal > 0
                                    ? `(+${toFixed(orderingPrice, 2)} ₽)`
                                    : null
                                }
                            </span>
                        </p>
                    </div>
                    : null
                }
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
            </div>
        </Accordion.Collapse>
    </div>
}

export default ContainersOrder
