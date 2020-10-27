// React
import React from 'react'
import {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Actions
import {fetchOrders} from '../../../store/actions/orders'

// Typescript
import {IOrdersRootState} from '../IOrders'

// App
import Placeholder from '../../UI/Placeholder/Placeholder'
import Loader from '../../UI/Loader/Loader'
import {getOrderStatusName, nameToLinkFormatter} from '../../../utils'
import AutoTable from '../../UI/AutoTable/AutoTable'
import {ColumnDescription} from 'react-bootstrap-table-next'
import Error from '../../UI/Error/Error'

const OrdersTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    const {orders, loading, error} = useSelector(
        (state: IOrdersRootState) => ({
            error: state.ordersState.error,
            orders: state.ordersState.orders,
            loading: state.ordersState.loading
        })
    )

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (!orders.length) {
        return <Placeholder
            description='Нажмите на кнопку «Создать заказ»,
             чтобы он отображался в списке'
            link='ordercreate' linkName='Создать заказ'
            title='В этом списке ещё нет заказов'/>
    }

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Название',
            classes: 'title',
            headerStyle: {width: '285px'},
            sort: true,
            formatter: (name, row) =>
                nameToLinkFormatter(name, row, 'order')
        },
        {
            dataField: 'id',
            text: 'ID',
            headerStyle: {width: '85px'},
            classes: 'email',
            sort: true
        },
        {
            dataField: 'status',
            text: 'Статус',
            classes: 'status',
            formatter: (status) =>
                getOrderStatusName(status),
            sort: true
        },
        {
            dataField: 'dop',
            headerStyle: {width: '200px'},
            text: 'Дополнительно'
        }
    ]

    return (
        <AutoTable
            keyField='id' data={orders} columns={columns}
            button={{link: 'ordercreate', text: 'Новый заказ'}}/>
    )
}

export default OrdersTable
