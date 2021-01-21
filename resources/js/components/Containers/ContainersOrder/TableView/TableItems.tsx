// React
import React from 'react'
import {toFixed, toLocaleNumber} from '../../../../utils'

// Typescript
import {IProduct} from '../../../Products/IProducts'

type Props = {
    items: IProduct[]
    totalRubCourse: number
    total: number
    totalRub: number
    orderingPrice: number
    totalAmount: number
}

const TableItems: React.FC<Props> = (props) => {
    const {items, totalRubCourse, totalRub, orderingPrice, totalAmount} = props

    return <tbody>
    {items.map((item) => {
        const priceRub = totalRubCourse * +item.price.cny
        let delivery
        if (totalRub) {
            delivery = priceRub * totalAmount
        }
        const additionalSpending = priceRub * orderingPrice
        const totalPrice = priceRub + delivery + additionalSpending

        return <tr key={item.productId}>
            <td>{item.autolongNumber}</td>
            <td>{item.quantity}</td>
            <td>{toFixed(+item.price.cny, 2)} ¥</td>
            <td>{priceRub ? `${toLocaleNumber(priceRub)} ₽` : '-'}</td>
            <td>{delivery ? `${toLocaleNumber(delivery)} ₽` : '-'}</td>
            <td>{additionalSpending ? `${toLocaleNumber(additionalSpending)} ₽` : '-'}</td>
            <td>{totalPrice ? `${toLocaleNumber(totalPrice)} ₽` : '-'}</td>
        </tr>
    })}
    </tbody>
}

export default TableItems


