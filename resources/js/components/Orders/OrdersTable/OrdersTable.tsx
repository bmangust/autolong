// React
import React from 'react'
import {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Actions
import {fetchOrders} from '../../../store/actions/orders'

// Typescript
import {IOrdersRootState} from '../IOrders'
import {ColumnDescription} from 'react-bootstrap-table-next'

// App
import Placeholder from '../../UI/Placeholder/Placeholder'
import Loader from '../../UI/Loader/Loader'
import {
    getOrderStatusName, nameToLinkFormatter
} from '../../../utils'
import AutoTable from '../../UI/AutoTable/AutoTable'
import Error from '../../UI/Error/Error'

const OrdersTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    const {orders, loading, error} = useSelector((state: IOrdersRootState) => ({
        error: state.ordersState.error,
        orders: state.ordersState.orders,
        loading: state.ordersState.loading
    }))

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (!orders.length) {
        return (
            <Placeholder
                description='Нажмите на кнопку «Добавить заказы»,
             чтобы он отображался в списке'
                link='orderscreate'
                linkName='Добавить заказы'
                title='В этом списке ещё нет заказов'
            />
        )
    }

    const itemsFormatter = (items) => {
        return items.length
    }

    const providerFormatter = (provider) => {
        return 'name' in provider
            ? provider.name
            : null
    }

    const orderMoneyFormatter = (price) => {
        if ('cny' in price) {
            return <span className='pricesBlock'>
            <span>{price.cny} ¥</span>
        </span>
        } else {
            return null
        }
    }

    const expandRowTable = [
        {
            dataField: 'provider',
            text: 'Поставщик',
            formatter: providerFormatter
        },
        {
            dataField: 'dop',
            text: 'Дополнительно'
        }
    ]

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Название',
            classes: 'title',
            headerStyle: {width: '285px'},
            sort: true,
            formatter: (name, row) => nameToLinkFormatter(name, row, 'order')
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
            formatter: (status) => getOrderStatusName(status),
            sort: true
        },
        {
            dataField: 'items',
            text: 'Кол.наим.',
            headerStyle: {width: '88px'},
            formatter: itemsFormatter
        },
        {
            dataField: 'price',
            text: 'Сумма',
            headerStyle: {width: '90px'},
            formatter: orderMoneyFormatter
        }
    ]

    return (
        <AutoTable
            expandRowTable={expandRowTable}
            keyField='id' data={orders} columns={columns}
            button={{link: 'orderscreate', text: 'Добавить заказы'}}
        />
    )
}

export default OrdersTable
