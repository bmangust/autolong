// React
import React, {useState} from 'react'

// Typescript
import {IOrder} from '../../Orders/IOrders'

// Styles
import classes from './FinalCalculation.module.css'

// App
import Modal from '../../UI/Modal/Modal'
import PaymentForms from './PaymentForms/PaymentForms'
import {toLocaleNumber} from '../../../utils'

type Props = {
    orders: IOrder[]
    deliveryPrice: number
}

const FinalCalculation: React.FC<Props> = (props) => {
    const {orders, deliveryPrice} = props
    const [isShow, setIsShow] = useState(false)

    let totalAmount = 0
    let totalCustoms = 0

    orders.map((order) => {
        totalAmount += order.totalPaymentHistoryRub
        totalCustoms += order.customsAmount
    })

    let deliveryAmount = 0

    if (totalAmount > 0) {
        deliveryAmount = +deliveryPrice / totalAmount
    }

    return <>
        <div className={classes.card}>
            <p className={classes.header}>Итоговый расчет</p>
            <ul className={classes.list}>
                <li>
                    <p className={classes.title}>Доставка</p>
                    <p>{deliveryPrice ? `${toLocaleNumber(deliveryPrice)} ₽` : '-'}</p>
                </li>
                <li>
                    <p className={classes.title}>Общая стоимость</p>
                    <p>{totalAmount ? `${toLocaleNumber(totalAmount)} ₽` : '-'}</p>
                </li>
                <li>
                    <p className={classes.title}>Стоимость доставки</p>
                    <p>{deliveryAmount ? `${toLocaleNumber(deliveryAmount)} ₽` : '-'}</p>
                </li>
                <li>
                    <p className={classes.title}>Итого таможня</p>
                    <p>{totalCustoms ? `${toLocaleNumber(totalCustoms)} ₽` : '-'}</p>
                </li>
            </ul>
            <button onClick={() => setIsShow(true)} className='btn btn-success'>Изменить данные</button>
        </div>
        {isShow
            ? <Modal
                size='size-600'
                title='Оплата контейнера'
                isOpen={isShow}
                setIsOpen={setIsShow}>
                <PaymentForms
                    setIsShow={setIsShow}
                    deliveryPrice={deliveryPrice}
                    orders={orders}/>
            </Modal>
            : null
        }
    </>
}

export default FinalCalculation
