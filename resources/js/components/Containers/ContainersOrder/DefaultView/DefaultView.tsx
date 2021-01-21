// React
import React from 'react'

// Styles
import classes from './DefaultView.module.css'

// Typescript
import {IOrder} from '../../../Orders/IOrders'

// App
import OrderItems from '../../../Orders/OrderItems/OrderItems'
import {toLocaleNumber} from '../../../../utils'

type Props = {
    order: IOrder
}

const DefaultView: React.FC<Props> = (props) => {
    const {order} = props

    return <>
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
                <span>{toLocaleNumber(parseFloat(order.price.cny))} ¥</span>
            </p>
        </div>
    </>
}

export default DefaultView
