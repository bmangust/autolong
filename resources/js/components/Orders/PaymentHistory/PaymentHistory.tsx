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
    orderPrice?: number
    paymentAmount: number
    surchargeAmount: number
}

const PaymentHistory: React.FC<Props> = (props) => {
    const {paymentHistory, orderPrice, paymentAmount, surchargeAmount} = props

    return <div className={classes.paymentHistory}>
        {paymentHistory && paymentHistory.length
            ? [...paymentHistory].reverse()
                .map((payment) => {
                    return <p key={payment.id}>
                        <span className={classes.date}>{timeConverter(payment.date)}</span>
                        <span className={classes.text}>
                    {orderPrice && 'paymentAmount' in payment && payment.paymentAmount >= orderPrice
                        ? `Заказ оплачен полностью - ${'paymentAmount' in payment && payment.paymentAmount ? `Оплата: ${payment.paymentAmount} ¥` : null}`
                        : <>
                            {'paymentAmount' in payment && payment.paymentAmount ? `Оплата: ${payment.paymentAmount} ¥` : null}
                            {'surchargeAmount' in payment && payment.surchargeAmount ? `Доплата: ${payment.surchargeAmount} ¥` : null}
                        </>
                    }
                </span>
                    </p>
                })
            : null
        }
        {paymentHistory && paymentHistory.length
            ? <>
                <hr/>
                <div>
                    <span className={classes.text + ' mr-4'}>{paymentAmount ? `Итого ${paymentAmount} ¥` : ''}</span>
                    <span className={classes.text}>{surchargeAmount ? `Доплата ${surchargeAmount} ¥` : ''}</span>
                </div>
            </>
            : null
        }
    </div>
}

export default PaymentHistory
