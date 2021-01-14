// React
import React, {useState} from 'react'

// Third-party
import {useDispatch} from 'react-redux'

// Typescript
import {IOrder} from '../IOrders'

// Actions
import {changeOrderStatus} from '../../../store/actions/orders'

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
    const [activePayment, setActivePayment] = useState(null)
    const [paymentHistory] = useState([
        {
            id: 1,
            createdAt: 1610528133,
            updatedAt: 1610528153,
            paymentAmount: 25000,
            paymentType: 'Оплата за заказ'
        }])

    const onCheckHandler = (e) => {
        console.log(e.target.checked)
    }

    const returnPaymentHandler = (statusPayment) => {
        dispatch(changeOrderStatus(order.id, {statusPayment}))
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
                paymentHistory={paymentHistory}
                setActivePayment={setActivePayment}
                setIsOpen={setIsOpen}
            />
            <div className="row">
                <div className="col-6">
                    <button style={{textDecoration: 'none'}} className='btn btn-link' onClick={() => setIsOpen(true)}>
                        + Добавить оплату
                    </button>
                </div>
                <div className="col-6">
                    {paymentRefund}
                </div>
            </div>
            {paymentHistory.length
                ? <InputCheckbox
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
