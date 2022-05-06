// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Actions
import {fetchPurchases} from '../../store/actions/purchases'

// Typescript
import {ILogsRootState} from './ILogs'

// App
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import AutoTable from '../UI/AutoTable/AutoTable'
import {timeConverter} from '../../utils'
import logsTranslate from '../../../logs/logsTranslate.json'

const LogsTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPurchases())
    }, [dispatch])

    const {log, loading, error} = useSelector(
        (state: ILogsRootState) => ({
            log: state.logsState.logs,
            loading: state.logsState.loading,
            error: state.logsState.error
        })
    )

    const logActionFormatter = (modelName, row) => {
        const item = JSON.parse(row.model)
        const itemLink = item.name || item.nameRu
        return `${logsTranslate.actions[row.action]}
         ${logsTranslate.classes[modelName]} "${itemLink}"`
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
            dataField: 'deliveryTime',
            text: 'Срок поставки',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'balance',
            text: 'Остаток',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'currentSales',
            text: 'Текущие продажи',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'lastSales',
            text: 'Прошлогодние продажи',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'inventoryDays',
            text: 'Запасы на дней',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'orderByCurrent',
            text: 'Уже заказано',
            classes: 'title',
            sort: true
        }
    ]

    const columns: ColumnDescription[] = [
        {
            dataField: 'autolongNumber',
            text: 'Код',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'sku',
            text: 'Артикул',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'nameRu',
            text: 'Наменклатура',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'direction',
            text: 'Направление',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'providerName',
            text: 'Поставщик',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'lastProviderName',
            text: 'Последний поставщик',
            classes: 'title',
            sort: true
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
        keyField='id' data={log} columns={columns}
    />
}

export default LogsTable
