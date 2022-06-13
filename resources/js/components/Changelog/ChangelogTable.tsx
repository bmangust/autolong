// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Actions
import {fetchChangelog} from '../../store/actions/changelog';

// Typescript
import {IChangelogRootState} from './IChangelog';

// App
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import AutoTable from '../UI/AutoTable/AutoTable'
import {fullTimeConverter} from '../../utils'

const ChangelogTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchChangelog())
    }, [dispatch])

    const {changelog, loading, error} = useSelector(
            (state: IChangelogRootState) => ({
                changelog: state.changelogState.changelog,
                loading: state.changelogState.loading,
                error: state.changelogState.error
            })
    )

    const linkFormatter = (item) => {
        return <a href={item} target={'_blank'} rel="noreferrer">{item}</a>
    }

    const columns: ColumnDescription[] = [

        {
            dataField: 'created_at',
            text: 'Дата и время',
            sort: true,
            formatter: fullTimeConverter
        },
        {
            dataField: 'changes',
            text: 'Изменения',
            sort: true,
            style: {whiteSpace: 'pre-line'}
        },
        {
            dataField: 'link',
            text: 'Ссылка',
            sort: true,
            formatter: linkFormatter
        }
    ]

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }

    return <AutoTable
            keyField='id' data={changelog} columns={columns}
            button={{link: 'changelogcreate', text: 'Добавить лог'}}
    />
}

export default ChangelogTable
