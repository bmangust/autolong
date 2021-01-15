// React
import React, {useState} from 'react'

// Third-party
import {useDispatch} from 'react-redux'

// Typescript
import {IOrder, IPaymentHistory} from '../IOrders'

// Actions
import {changeOrderStatus, setPaymentStatusPaidInFull} from '../../../store/actions/orders'

// Styles
import classes from './OrderPayments.module.css'

// App
import PaymentModal from './PaymentModal'
import PaymentHistory from '../PaymentHistory/PaymentHistory'
import InputCheckbox from '../../UI/Inputs/InputCheckbox/InputCheckbox'

type Props = {
    order: IOrder
}

const OrderPayments: React.FC<Props> = (props) => {
    const {order} = props
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [activePayment, setActivePayment] = useState<IPaymentHistory | null>(null)

    const onCheckHandler = (e) => {
        const isPaidInFull = e.target.checked ? 1 : 0
        dispatch(setPaymentStatusPaidInFull(order.id, {isPaidInFull}))
    }

    const returnPaymentHandler = (statusPayment) => {
        dispatch(changeOrderStatus(order.id, {statusPayment}))
    }

    const onAddHandler = () => {
        setIsOpen(true)
        setActivePayment(null)
    }

    let paymentRefund

    switch (order.statusPayment) {
        case 'paymentPaidFor': {
            paymentRefund = <button
                type='button'
                onClick={() => returnPaymentHandler('paymentAwaitingRefund')}
                className='btn btn-link btn-refund'>
                Возврат оплаты
            </button>
            break
        }
        case 'paymentPrepaymentMade': {
            paymentRefund = <button
                type='button'
                onClick={() => returnPaymentHandler('paymentAwaitingRefund')}
                className='btn btn-link btn-refund'>
                Возврат оплаты
            </button>
            break
        }
        case 'paymentAwaitingRefund': {
            paymentRefund = <button
                onClick={() => returnPaymentHandler('paymentRefunded')}
                className='btn btn-link'>
                Подтвердить возврат оплаты
            </button>
            break
        }
        default: {
            paymentRefund = null
        }
    }

    return <div className={classes.orderPayments}>
        <hr className={classes.hr}/>
        <div className={classes.orderPaymentsBody}>
            <PaymentHistory
                orderId={order.id}
                paymentHistory={order.paymentHistory}
                setIsOpen={setIsOpen}
                setActivePayment={setActivePayment}
            />
            <div className="row">
                <div className="col-6">
                    <button style={{textDecoration: 'none'}} className='btn btn-link' onClick={() => onAddHandler()}>
                        + Добавить оплату
                    </button>
                </div>
                <div className="col-6">
                    {paymentRefund}
                </div>
            </div>
            {order.paymentHistory.length
                ? <InputCheckbox
                    defaultChecked={order.isPaidInFull}
                    onChange={(e) => onCheckHandler(e)}
                    label='Заказ оплачен полностью'
                    name='isPaidInFull'
                />
                : null
            }
        </div>
        <PaymentModal activePayment={activePayment} orderId={order.id} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
}

export default OrderPayments
