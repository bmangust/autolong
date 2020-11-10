// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {ColumnDescription, SelectRowProps} from 'react-bootstrap-table-next'

// Actions
import {
    fetchUnappliedOrders
} from '../../../store/actions/containers'

// Typescript
import {IContainersRootState} from '../IContainers'

// App
import Loader from '../../UI/Loader/Loader'
import AutoTable from '../../UI/AutoTable/AutoTable'
import {getOrderStatusName, nameToLinkFormatter} from '../../../utils'
import Error from '../../UI/Error/Error'
import {toast} from 'react-toastify'

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
            dispatch(createContaine(selectedRows))
        } else {
            toast.error('Выберите заказ для создания контейнера')
        }
    }

    if (error) {
        return <Error/>
    }
    if (loadingUnapplied) {
        return <Loader/>
    }

    function onRowSelect(row, isSelect) {
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

    function onRowSelectAll(row, isSelect) {
        if (isSelect) {
            setSelectedRows((oldState) => (
                [...oldState, row.id]
            ))
        } else {
            selectedRows.filter((rowId) => (
                rowId !== row.id
            ))
        }
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
            formatter: (status) => getOrderStatusName(status),
            sort: true
        }
    ]

    const selectRow: SelectRowProps<any> = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: onRowSelect,
        onSelectAll: onRowSelectAll
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
