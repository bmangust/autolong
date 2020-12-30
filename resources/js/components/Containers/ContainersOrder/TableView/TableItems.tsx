// React
import React from 'react'
import {toFixed} from '../../../../utils'

// Typescript
import {IProduct} from '../../../Products/IProducts'

type Props = {
    items: IProduct[]
    totalRubCourse: number
    total: number
    totalRub: number
    orderingPrice: number
    deliveryPrice: number
}

const TableItems: React.FC<Props> = (props) => {
    const {items, totalRubCourse, totalRub, orderingPrice, deliveryPrice} = props

    return <tbody>
    {items.map((item) => {
        const priceRub = totalRubCourse * +item.price.cny
        let delivery
        if (totalRub) {
            delivery = priceRub * (+deliveryPrice / totalRub)
        }
        const additionalSpending = priceRub * orderingPrice
        const totalPrice = priceRub + delivery + additionalSpending

        return <tr key={item.productId}>
            <td>{item.autolongNumber}</td>
            <td>{item.quantity}</td>
            <td>{toFixed(+item.price.cny, 2)} ¥</td>
            <td>{priceRub ? `${toFixed(priceRub, 2)} ₽` : '-'}</td>
            <td>{delivery ? `${toFixed(delivery, 2)} ₽` : '-'}</td>
            <td>{additionalSpending ? `${toFixed(additionalSpending, 2)} ₽` : '-'}</td>
            <td>{totalPrice ? `${toFixed(totalPrice, 2)} ₽` : '-'}</td>
        </tr>
    })}
    </tbody>
}

export default TableItems


