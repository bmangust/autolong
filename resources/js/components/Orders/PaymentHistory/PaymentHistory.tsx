// React
import React from 'react'

// Typescript
import {IPaymentHistory} from '../IOrders'

// Styles
import classes from './PaymentHistory.module.css'

// App
import {timeConverter} from '../../../utils'

type Props = {
    paymentHistory: IPaymentHistory[]
    orderPrice: number
}

const PaymentHistory: React.FC<Props> = (props) => {
    const {paymentHistory, orderPrice} = props

    return <div className={classes.paymentHistory}>
        {paymentHistory.length && [...paymentHistory].reverse()
            .map((payment) => {
                return <p key={payment.date}>
                    <span className={classes.date}>{timeConverter(payment.date)}</span>
                    <span className={classes.text}>
                    {payment.paymentAmount >= orderPrice
                        ? 'Заказ оплачен полностью'
                        : <>
                            {payment.paymentAmount ? `Оплата: ${payment.paymentAmount} ¥` : null}
                            {payment.surchargeAmount ? ` Доплата: ${payment.surchargeAmount} ¥` : null}
                        </>
                    }
                </span>
                </p>
            })}
    </div>
}

export default PaymentHistory
