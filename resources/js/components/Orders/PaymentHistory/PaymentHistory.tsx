// React
import React from 'react'

// Third-party
import ReactTooltip from 'react-tooltip'
import {useDispatch} from 'react-redux'

// Typescript
import {IPaymentHistory} from '../IOrders'

// Styles
import classes from './PaymentHistory.module.css'

// Actions
import {paymentHandler} from '../../../store/actions/orders'

// App
import {timeConverter} from '../../../utils'
import SvgEdit from '../../UI/iconComponents/Edit'
import SvgDelete from '../../UI/iconComponents/Delete'

type Props = {
    orderId: number
    paymentHistory: IPaymentHistory[]
    setActivePayment: (IPaymentHistory) => void
    setIsOpen: (boolean) => void
}

const PaymentHistory: React.FC<Props> = (props) => {
    const {orderId, paymentHistory, setIsOpen, setActivePayment} = props
    const dispatch = useDispatch()

    const onEditHandler = (payment: IPaymentHistory) => {
        setActivePayment(payment)
        setIsOpen(true)
    }

    const onDeleteHandler = (id: number) => {
        dispatch(paymentHandler(orderId, {id}, 'delete'))
    }

    return <div className={classes.paymentHistory}>
        {paymentHistory.length
            ? <>
                <div className={classes.list}>
                    {paymentHistory.map((payment) => {
                        return <div className={classes.payment + ' row'} key={payment.id}>
                            <div className='col-4'>
                                <span>{payment.paymentType}</span>
                            </div>
                            <div className='col-3'>
                                Дата: {timeConverter(payment.updatedAt)}
                            </div>
                            <div className='col-3'>
                                Сумма: {payment.paymentAmount} ¥
                            </div>
                            <div className='col-2'>
                                <div className={classes.icons}>
                                    <SvgEdit
                                        data-tip="Редактировать оплату"
                                        className={classes.edit}
                                        onClick={() => onEditHandler(payment)}
                                    />
                                    <SvgDelete
                                        data-tip="Удалить"
                                        className={classes.delete}
                                        onClick={() => onDeleteHandler(payment.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <ReactTooltip place="bottom" type="dark" effect="solid"/>
            </>
            : <p className={classes.empty}>Нажмите кнопку «Добавить оплату», чтобы отобразить оплату в системе</p>
        }
    </div>
}

export default PaymentHistory
