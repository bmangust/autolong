// React
import React, {useContext} from 'react'
import {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Actions
import {fetchOrders} from '../../../store/actions/orders'

// Typescript
import {IOrdersRootState} from '../IOrders'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Styles
import classes from './OrdersTable.module.css'

// App
import Placeholder from '../../UI/Placeholder/Placeholder'
import Loader from '../../UI/Loader/Loader'
import {
    getOrderStatusName,
    getPaymentStatusName,
    moneyFormatter,
    nameToLinkFormatter,
    toLocaleNumber
} from '../../../utils'
import AutoTable from '../../UI/AutoTable/AutoTable'
import Error from '../../UI/Error/Error'
import statuses from '../../../../statuses/statuses.json'
import {SanctumContext} from '../../../Sanctum'
import courses from '../../../../courses/courses.json'

const OrdersTable: React.FC = () => {
    const dispatch = useDispatch()
    const {user} = useContext(SanctumContext)

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
                description='Нажмите на кнопку «Добавить заказы», чтобы он отображался в списке'
                link={user && user.role.accesses.ordersCreate == 1 ? 'orderscreate' : undefined}
                linkName='Добавить заказы'
                title='В этом списке ещё нет заказов'
            />
        )
    }

    const filterOptions = Object.entries(statuses.orderStatuses)
        .map(([key, value]) => {
            return {
                label: value,
                value: key
            }
        })

    const filter = {
        options: filterOptions,
        field: 'status',
        placeholder: 'Фильтр по статусу'
    }

    const itemsFormatter = (items) => {
        return items.length
    }

    const providerFormatter = (provider) => {
        return 'name' in provider
            ? provider.name
            : null
    }

    const containerFormatter = (container) => {
        return container && Object.keys(container).length ? container.id : null
    }

    const footerFormatter = (column, colIndex, {text}) => {
        return <span className='pricesBlock'><span>{text}</span></span>
    }


    const footerFormatterMain = () => {
        return <div>
            <p className='mb-0'>Общая стоимость на странице:</p>
            <div className={classes.orderInfo}>
                <span className={classes.orderRateRub}>1 ¥ = {courses.rub.toFixed(2)} ₽</span>
                <span className={classes.orderRateUSD}>1 ¥ = {courses.usd.toFixed(2)} $</span>
            </div>
        </div>
    }

    const footerPriceFormatter = (columnData) => {
        const totalCny: number = columnData.reduce((acc: number, price: { cny: number }) => +acc + +price.cny, 0)
        return <>
            <span className='d-block' style={{lineHeight: '15px'}}>{toLocaleNumber(totalCny)} ¥</span>
            <span>{toLocaleNumber((totalCny * courses.rub))} ₽</span>
        </>
    }

    const expandRowTable = [
        {
            dataField: 'id',
            text: 'ID',
            headerStyle: {width: '85px'}
        },
        {
            dataField: 'provider',
            text: 'Поставщик',
            formatter: providerFormatter
        },
        {
            dataField: 'statusPayment',
            text: 'Статус оплаты',
            formatter: (statusPayment) => getPaymentStatusName(statusPayment)
        }
    ]

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Название',
            classes: 'title',
            headerStyle: {width: '285px'},
            sort: true,
            formatter: (name, row) => nameToLinkFormatter(name, row, 'order'),
            footer: footerFormatterMain
        },
        {
            dataField: 'container',
            text: '№ кон.',
            headerStyle: {width: '90px'},
            classes: 'email',
            sort: true,
            formatter: containerFormatter,
            footer: ''
        },
        {
            dataField: 'status',
            text: 'Статус',
            classes: 'status',
            formatter: (status) => getOrderStatusName(status),
            sort: true,
            footer: ''
        },
        {
            dataField: 'items',
            text: 'Кол.наим.',
            headerStyle: {width: '88px'},
            formatter: itemsFormatter,
            footer: ''
        },
        {
            dataField: 'price',
            text: 'Сумма',
            headerStyle: {width: '90px'},
            formatter: (price) => moneyFormatter(price, ['rub', 'usd']),
            footer: columnData => footerPriceFormatter(columnData),
            footerFormatter: footerFormatter
        }
    ]

    return (
        <AutoTable
            filter={filter}
            expandRowTable={expandRowTable}
            rowClickLink='order'
            keyField='id' data={orders} columns={columns}
            button={user && user.role.accesses.ordersCreate == 1
                ? {link: 'orderscreate', text: 'Добавить заказы'}
                : undefined}
        />
    )
}

export default OrdersTable
