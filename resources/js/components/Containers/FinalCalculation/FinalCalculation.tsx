// React
import React, {useState} from 'react'

// Typescript
import {IOrder} from '../../Orders/IOrders'

// Styles
import classes from './FinalCalculation.module.css'

// App
import Modal from '../../UI/Modal/Modal'
import PaymentForms from './PaymentForms/PaymentForms'

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
        totalAmount += (order.paymentAmountRub + order.surchargeAmountRub)
        totalCustoms += order.customsAmount
    })

    let deliveryAmount = 0

    if (totalAmount > 0) {
        deliveryAmount = deliveryPrice / totalAmount
    }

    return <>
        <div className={classes.card}>
            <p className={classes.header}>Итоговый расчет</p>
            <ul className={classes.list}>
                <li>
                    <p className={classes.title}>Доставка</p>
                    <p>{deliveryPrice ? `${deliveryPrice.toFixed(2)} ₽` : '-'}</p>
                </li>
                <li>
                    <p className={classes.title}>Общая стоимость</p>
                    <p>{totalAmount ? `${totalAmount.toFixed(2)} ₽` : '-'}</p>
                </li>
                <li>
                    <p className={classes.title}>Стоимость доставки</p>
                    <p>{deliveryAmount ? `${deliveryAmount.toFixed(2)} ₽` : '-'}</p>
                </li>
                <li>
                    <p className={classes.title}>Итого таможня</p>
                    <p>{totalCustoms ? `${totalCustoms.toFixed(2)} ₽` : '-'}</p>
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
