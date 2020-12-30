// React
import React, {useEffect, useState} from 'react'

// Typescript
import {IOrder} from '../../../Orders/IOrders'

// Styles
import classes from './PaymentForms.module.css'

// App
import Input from '../../../UI/Inputs/Input/Input'
import PaymentForm from './PaymentForm/PaymentForm'

type Props = {
    orders: IOrder[]
    setIsShow: (boolean) => void
    deliveryPrice: number
}

const PaymentForms: React.FC<Props> = (props) => {
    const {orders, setIsShow, deliveryPrice} = props
    const [activeOrder, setActiveOrder] = useState<number>(orders[0].id)
    const [deliveryPriceState, setDeliveryPriceState] = useState<number>(deliveryPrice ? deliveryPrice : 0)

    useEffect(() => {
        if (deliveryPrice) {
            setDeliveryPriceState(deliveryPrice)
        }
    }, [deliveryPrice])

    const onChangeHandler = (e) => {
        const value = +e.target.value
        if (value < 0) {
            setDeliveryPriceState(0)
        }
        if (value >= 0) {
            setDeliveryPriceState(value)
        }
    }

    const activeOrderObject = orders.find(({id}) => id === activeOrder)

    return <>
        <div className={classes.header}>
            <div className="row">
                <Input
                    type='number'
                    value={deliveryPriceState}
                    onChange={(e) => onChangeHandler(e)}
                    label='Оплата за доставку контейнера (руб.)'
                    name='deliveryPrice'
                />
            </div>
        </div>
        <div className={classes.body}>
            {orders.length > 1
                ? <div className={classes.pagination}>{orders.map((order, index) => {
                    return <div
                        onClick={() => setActiveOrder(order.id)}
                        className={activeOrder === order.id ? classes.active : ''}
                        key={order.id}>
                        {index + 1}
                    </div>
                })}
                </div>
                : null
            }
            {activeOrderObject
                ? <div key={activeOrder} className='option'>
                    <PaymentForm
                        deliveryPriceOrder={deliveryPriceState}
                        setIsShow={setIsShow}
                        order={activeOrderObject}
                    />
                </div>
                : null
            }
        </div>
    </>
}

export default PaymentForms
