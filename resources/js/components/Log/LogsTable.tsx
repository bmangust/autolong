// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Actions
import {fetchLogs} from '../../store/actions/logs'

// Typescript
import {ILogsRootState} from './ILogs'

// App
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import AutoTable from '../UI/AutoTable/AutoTable'
import {timeConverter} from '../../utils'

const LogsTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchLogs())
    }, [dispatch])

    const {log, loading, error} = useSelector(
        (state: ILogsRootState) => ({
            log: state.logsState.logs,
            loading: state.logsState.loading,
            error: state.logsState.error
        })
    )

    const logActionFormatter = (modelName, row) => {
        return `${row.action} ${modelName}`
    }

    const logBeforeFormatter = (before) => {
        if (before) {
            const beforeObj = JSON.parse(before)
            return Object.entries(beforeObj).map(([key, value]) => {
                if (key !== 'updated_at' && key !== 'created_at') {
                    return <p key={key + value} className='mb-0'>
                        {key} : {value}
                    </p>
                } else {
                    return null
                }
            })
        } else {
            return null
        }
    }

    const logAfterFormatter = (after) => {
        if (after) {
            const afterObj = JSON.parse(after)
            return Object.entries(afterObj).map(([key, value]) => {
                if (key !== 'updated_at' && key !== 'created_at') {
                    return <p key={key + value} className='mb-0'>
                        {value}
                    </p>
                } else {
                    return null
                }
            })
        } else {
            return null
        }
    }

    const expandRowTable = [
        {
            dataField: 'before',
            text: 'До изменений',
            formatter: logBeforeFormatter
        },
        {
            dataField: 'after',
            text: 'После',
            formatter: logAfterFormatter
        }
    ]

    const columns: ColumnDescription[] = [
        {
            dataField: 'user',
            text: 'Пользователь',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'modelName',
            text: 'Действие',
            classes: 'email',
            sort: true,
            formatter: logActionFormatter
        },
        {
            dataField: 'createdAt',
            text: 'Дата и время',
            formatter: timeConverter
        }
    ]

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }

    return <AutoTable
        expandRowTable={expandRowTable}
        keyField='createdAt' data={log} columns={columns}
    />
}

export default LogsTable
