// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Actions
import {
    fetchContainers
} from '../../../store/actions/containers'

// Typescript
import {IContainersRootState} from '../IContainers'

// App
import Loader from '../../UI/Loader/Loader'
import Placeholder from '../../UI/Placeholder/Placeholder'
import AutoTable from '../../UI/AutoTable/AutoTable'
import {getContainerStatusName, nameToLinkFormatter} from '../../../utils'
import Error from '../../UI/Error/Error'
import statuses from '../../../../statuses/statuses.json'

const ContainersTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchContainers())
    }, [dispatch])

    const {containers, loading, error} =
        useSelector(
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

    const cityFormatter = (city) => {
        return city
            ? city.name
            : null
    }

    const filterOptions = Object.entries(statuses.containerStatuses)
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
            formatter: getContainerStatusName,
            sort: true
        },
        {
            dataField: 'city',
            text: 'Дополнительно',
            formatter: cityFormatter
        },
        {
            dataField: 'quantityItems',
            text: 'Кол-во товаров',
            sort: true
        }
    ]

    return (
        <AutoTable
            keyField='id' data={containers} columns={columns}
            rowClickLink='container'
            filter={filter}
            button={{link: 'containercreate', text: 'Добавить контейнер'}}/>
    )
}

export default ContainersTable
