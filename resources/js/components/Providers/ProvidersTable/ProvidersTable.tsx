// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Actions
import {fetchProviders} from '../../../store/actions/providers'

// Typescript
import {IProvidersRootState} from '../IProviders'

// App
import Loader from '../../UI/Loader/Loader'
import Placeholder from '../../UI/Placeholder/Placeholder'
import AutoTable from '../../UI/AutoTable/AutoTable'
import {nameToLinkFormatter} from '../../../utils'
import {ColumnDescription} from 'react-bootstrap-table-next'
import Error from '../../UI/Error/Error'

const ProvidersTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProviders())
    }, [dispatch])

    const {providers, loading, error} = useSelector(
        (state: IProvidersRootState) => ({
            providers: state.providersState.providers,
            loading: state.providersState.loading,
            error: state.providersState.error
        }))

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (!providers.length) {
        return <Placeholder
            description='Нажмите на кнопку «Добавить поставщика»,
             чтобы он отображался в списке'
            link='/providerscreate' linkName='Добавить поставщика'
            title='В этом списке ещё нет поставщиков'/>
    }

    function catalogsFormatter(catalogs, _) {
        return (catalogs.length)
    }

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Название',
            classes: 'title',
            sort: true,
            formatter: (name, row) =>
                nameToLinkFormatter(name, row, 'provider')
        },
        {
            dataField: 'email',
            text: 'Почта',
            classes: '',
            sort: true
        },
        {
            dataField: 'wechat',
            text: 'Wechat',
            classes: '',
            sort: true
        },
        {
            dataField: 'catalogs',
            text: 'Каталоги',
            classes: '',
            sort: true,
            formatter: catalogsFormatter
        }
    ]

    return (
        <AutoTable
            keyField='id' data={providers} columns={columns}
            button={{link: 'providercreate', text: 'Добавить поставщика'}}/>
    )
}

export default ProvidersTable
