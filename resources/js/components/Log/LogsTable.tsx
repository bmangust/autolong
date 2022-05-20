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
import {fullTimeConverter, capitalize, nameToLinkFormatter} from '../../utils'
import logsTranslate from '../../../logs/logsTranslate.json'

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

    const itemsToGLow = [
        'App\\Container',
        'App\\Order'
    ]

    const filterGlowedOptions = Object.entries(logsTranslate.classes)
            .map(([key, value]) => {
                return {
                    label: capitalize(value),
                    value: key
                }
            })

    const filterGlowedItems = {
        options: filterGlowedOptions,
        field: 'modelName',
        placeholder: 'Фильтр по объектам'
    }

    const logActionFormatter = (modelName, row) => {
        const item = JSON.parse(row.model)
        const itemLink = item.name || item.nameRu
        const action = `${logsTranslate.actions[row.action]}
         ${logsTranslate.classes[modelName]} "${itemLink}"`

        let className = ''

        if (itemsToGLow.includes(modelName)) className = 'status'

        return nameToLinkFormatter(action, {id: item.id}, logsTranslate.routes[modelName], className)
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

    const columns: ColumnDescription[] = [
        {
            dataField: 'user',
            text: 'Пользователь',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'role',
            text: 'Роль',
            sort: true
        },
        {
            dataField: 'modelName',
            text: 'Действие',
            sort: true,
            // headerClasses: 'w-50',
            formatter: logActionFormatter
        },
        {
            dataField: 'before',
            text: 'До изменений',
            sort: true,
            formatter: logBeforeFormatter
        },
        {
            dataField: 'after',
            text: 'После изменений',
            sort: true,
            style: {maxWidth: '150px'},
            formatter: logAfterFormatter
        },
        {
            dataField: 'createdAt',
            text: 'Дата и время',
            sort: true,
            formatter: fullTimeConverter
        }
    ]

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }

    return <AutoTable
            filter={filterGlowedItems}
            keyField='id' data={log} columns={columns}
    />
}

export default LogsTable
