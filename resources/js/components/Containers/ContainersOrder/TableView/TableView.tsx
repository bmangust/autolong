// React
import React from 'react'

// Third-party
import {Table} from 'react-bootstrap'

// Styles
import classes from './TableView.module.css'

// Typescript
import {IOrder} from '../../../Orders/IOrders'

// App
import TableItems from './TableItems'

type Props = {
    order: IOrder
    totalRubCourse: number
    total: number
    totalRub: number
    orderingPrice: number
    totalAmount: number
}

const TableView: React.FC<Props> = (props) => {
    const {order, totalRubCourse, total, totalRub, orderingPrice, totalAmount} = props

    return <>
        <div className={classes.orderBody}>
            <Table bordered hover>
                <thead>
                <tr>
                    <th>Код</th>
                    <th>Кол-во</th>
                    <th>RMB</th>
                    <th>РУБ</th>
                    <th>Доставка</th>
                    <th>Доп. расходы</th>
                    <th>Итоговая цена</th>
                </tr>
                </thead>
                <TableItems
                    total={total}
                    totalRub={totalRub}
                    totalRubCourse={totalRubCourse}
                    orderingPrice={orderingPrice}
                    items={order.items}
                    totalAmount={totalAmount}
                />
            </Table>
        </div>
    </>
}

export default TableView
