// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Actions
import {fetchContainers} from '../../../store/actions/containers'

// Typescript
import {IContainersRootState} from '../IContainer'

// App
import Loader from '../../UI/Loader/Loader'
import Placeholder from '../../UI/Placeholder/Placeholder'
import AutoTable from '../../UI/AutoTable/AutoTable'
import {nameToLinkFormatter} from '../../../utils'
import {ColumnDescription} from 'react-bootstrap-table-next'
import Error from '../../UI/Error/Error'

const ContainersTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchContainers())
    }, [dispatch])

    const {containers, loading, error} = useSelector(
        (state: IContainersRootState) => ({
            error: state.containersState.error,
            containers: state.containersState.containers,
            loading: state.containersState.loading
        })
    )
    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (!containers.length) {
        return <Placeholder
            description='Нажмите на кнопку «Добавить контейнер»,
             чтобы он отображался в списке'
            link='/containercreate' linkName='Добавить контейнер'
            title='В этом списке ещё нет контейнеров'/>
    }

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Название контейнера',
            classes: 'title',
            sort: true,
            formatter: (name, row) =>
                nameToLinkFormatter(name, row, 'container')
        },
        {
            dataField: 'status',
            text: 'Статус',
            classes: 'status',
            sort: true
        },
        {
            dataField: 'city',
            text: 'Дополнительно'
        }
    ]

    return (
        <AutoTable
            keyField='id' data={containers} columns={columns}
            button={{link: 'importercreate', text: 'Добавить импортера'}}/>
    )
}

export default ContainersTable
