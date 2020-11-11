// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {ColumnDescription, SelectRowProps} from 'react-bootstrap-table-next'
import {toast} from 'react-toastify'

// Actions
import {
    createContainer,
    fetchUnappliedOrders
} from '../../../store/actions/containers'

// Typescript
import {IContainersRootState} from '../IContainers'

// App
import Loader from '../../UI/Loader/Loader'
import AutoTable from '../../UI/AutoTable/AutoTable'
import {getOrderStatusName, nameToLinkFormatter} from '../../../utils'
import Error from '../../UI/Error/Error'
import Placeholder from '../../UI/Placeholder/Placeholder'

const UnappliedOrdersTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUnappliedOrders())
    }, [dispatch])

    const {unappliedOrders, loadingUnapplied, error} =
        useSelector(
            (state: IContainersRootState) => ({
                error: state.containersState.error,
                unappliedOrders: state.containersState.unappliedOrders,
                loadingUnapplied: state.containersState.loadingUnapplied
            })
        )

    const [selectedRows, setSelectedRows] = useState<Array<Number>>([])

    const createContainerHandler = () => {
        if (selectedRows.length) {
            dispatch(createContainer(selectedRows, '/containers'))
        } else {
            toast.error('Выберите заказ для создания контейнера')
        }
    }

    const nonSelectable: number[] = []

    function onRowSelect(row, isSelect) {
        if (row.city) {
            const cityId = row.city.id
            unappliedOrders.forEach((order, index) => {
                if (order.city && (order.city.id !== cityId)) {
                    nonSelectable.push(index)
                }
            })
        }
        console.log(nonSelectable)
        if (isSelect) {
            setSelectedRows((oldState) => (
                [...oldState, row.id]
            ))
        } else {
            setSelectedRows((oldState) => (
                oldState.filter((rowId) => (
                    rowId !== row.id
                ))
            ))
        }
    }

    const cityFormatter = (city) => {
        return city
            ? city.name
            : null
    }

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Название',
            classes: 'title',
            sort: true,
            formatter: (name, row) => nameToLinkFormatter(name, row, 'order')
        },
        {
            dataField: 'id',
            text: 'ID',
            headerStyle: {width: '85px'},
            sort: true
        },
        {
            dataField: 'status',
            text: 'Статус',
            classes: 'status',
            formatter: getOrderStatusName,
            sort: true
        },
        {
            dataField: 'city',
            text: 'Город',
            formatter: cityFormatter,
            sort: true
        }
    ]

    const selectRow: SelectRowProps<any> = {
        mode: 'checkbox',
        clickToSelect: true,
        hideSelectAll: true,
        onSelect: onRowSelect
    }

    if (error) {
        return <Error/>
    }
    if (loadingUnapplied) {
        return <Loader/>
    }
    if (!unappliedOrders.length) {
        return <Placeholder
            description='Добавьте новые заказы или поменяйте
            статус у существующих'
            link='/orders' linkName='Перейти к заказам'
            title='Доступных заказов нет'/>
    }

    return (
        <>
            <AutoTable
                selectRow={selectRow}
                keyField='id' data={unappliedOrders} columns={columns}/>
            <div className="card card-body mt-3">
                <button onClick={createContainerHandler}
                        className='btn btn-success'>
                    Сформировать контейнер
                </button>
            </div>
        </>
    )
}

export default UnappliedOrdersTable
