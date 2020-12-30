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
}

const TableView: React.FC<Props> = (props) => {
    const {order, totalRubCourse, total, totalRub, orderingPrice} = props

    return <>
        <div className={classes.orderBody}>
            <Table bordered hover>
                <thead>
                <tr>
                    <th>Код</th>
                    <th>Кол-во</th>
                    <th>Цена, RMB</th>
                    <th>Цена, руб</th>
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
                />
            </Table>
        </div>
    </>
}

export default TableView
