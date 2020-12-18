// React
import React, {useContext, useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Actions
import {fetchImporters} from '../../../store/actions/importers'

// Typescript
import {IImportersRootState} from '../IImporters'

// App
import Placeholder from '../../UI/Placeholder/Placeholder'
import Loader from '../../UI/Loader/Loader'
import {nameToLinkFormatter} from '../../../utils'
import AutoTable from '../../UI/AutoTable/AutoTable'
import {ColumnDescription} from 'react-bootstrap-table-next'
import Error from '../../UI/Error/Error'
import {SanctumContext} from '../../../Sanctum'

const ImportersTable: React.FC = () => {
    const dispatch = useDispatch()
    const {user} = useContext(SanctumContext)

    useEffect(() => {
        dispatch(fetchImporters())
    }, [dispatch])

    const {importers, loading, error} = useSelector(
        (state: IImportersRootState) => ({
            error: state.importersState.error,
            importers: state.importersState.importers,
            loading: state.importersState.loading
        })
    )

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (!importers.length) {
        return <Placeholder
            description='Нажмите на кнопку «Добавить импортера», чтобы он отображался в списке'
            link={user && user.role.accesses.importersCreate == 1 ? 'importercreate' : undefined}
            linkName='Добавить импортера'
            title='В этом списке ещё нет импортеров'/>
    }

    const columns: ColumnDescription[] = [
        {
            dataField: 'nameRu',
            text: 'Название',
            classes: 'title',
            sort: true,
            formatter: (nameRu, row) =>
                nameToLinkFormatter(nameRu, row, 'importer')
        },
        {
            dataField: 'address',
            text: 'Адрес',
            classes: 'email',
            sort: true
        },
        {
            dataField: 'phone',
            text: 'Телефон',
            classes: 'phone'
        }
    ]

    return (
        <AutoTable
            rowClickLink='importer'
            keyField='id' data={importers} columns={columns}
            button={user && user.role.accesses.importersCreate == 1
                ? {link: 'importercreate', text: 'Добавить импортера'}
                : undefined}/>
    )
}

export default ImportersTable
