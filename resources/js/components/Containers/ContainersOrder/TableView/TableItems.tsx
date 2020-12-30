// React
import React from 'react'

// Typescript
import {IProduct} from '../../../Products/IProducts'

type Props = {
    items: IProduct[]
    totalRubCourse: number
    total: number
    totalRub: number
    orderingPrice: number
}

const TableItems: React.FC<Props> = (props) => {
    const {items, totalRubCourse, total, totalRub, orderingPrice} = props


    return <tbody>
    {items.map((item) => {
        const priceRub = totalRubCourse * +item.price.cny
        let delivery
        if (totalRub) {
            delivery = priceRub * (total / totalRub)
        }
        const additionalSpending = priceRub * orderingPrice
        const totalPrice = priceRub + delivery + additionalSpending

        return <tr key={item.productId}>
            <td>{item.autolongNumber}</td>
            <td>{item.quantity}</td>
            <td>{Math.round(+item.price.cny)} ¥</td>
            <td>{priceRub ? `${priceRub.toFixed(2)} ₽` : '-'}</td>
            <td>{delivery ? `${delivery.toFixed(2)} ₽` : '-'}</td>
            <td>{additionalSpending ? `${additionalSpending.toFixed(2)} ₽` : '-'}</td>
            <td>{totalPrice ? `${totalPrice.toFixed(2)} ₽` : '-'}</td>
        </tr>
    })}
    </tbody>
}

export default TableItems


