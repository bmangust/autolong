// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {ColumnDescription} from 'react-bootstrap-table-next'

// Actions
import {fetchCatalogs} from '../../../store/actions/catalogs'

// Typescript
import {ICatalogsRootState} from '../ICatalogs'

// App
import Loader from '../../UI/Loader/Loader'
import Placeholder from '../../UI/Placeholder/Placeholder'
import AutoTable from '../../UI/AutoTable/AutoTable'
import {nameToLinkFormatter, tagsConverter, timeConverter} from '../../../utils'
import Error from '../../UI/Error/Error'

const CatalogsTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCatalogs())
    }, [dispatch])

    const {catalogs, loading, error} = useSelector(
        (state: ICatalogsRootState) => ({
            error: state.catalogsState.error,
            catalogs: state.catalogsState.catalogs,
            loading: state.catalogsState.loading
        })
    )

    const tagsFirst = (tags) => {
        if (tags.length) {
            return <span className='tag tag-first'>
            {tags[tags.length - 1].name}</span>
        } else {
            return null
        }
    }

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (!catalogs.length) {
        return <Placeholder
            description='Нажмите на кнопку «Добавить каталог»,
             чтобы он отображался в списке'
            link='/catalogcreate' linkName='Добавить каталог'
            title='В этом списке ещё нет каталогов'/>
    }

    const expandRowTable = [
        {
            dataField: 'updatedAt',
            text: 'Дата загрузки',
            formatter: timeConverter
        },
        {
            dataField: 'id',
            text: 'ID'
        },
        {
            dataField: 'tags',
            text: 'Все теги',
            formatter: tagsConverter
        }
    ]

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Название',
            classes: 'title',
            sort: true,
            formatter: (name, row) =>
                nameToLinkFormatter(name, row, 'catalog')
        },
        {
            dataField: 'provider.name',
            text: 'Поставщик',
            sort: true
        },
        {
            dataField: 'updatedAt',
            text: 'Обновление',
            sort: true,
            formatter: timeConverter
        },
        {
            dataField: 'tags',
            text: 'Теги',
            formatter: tagsFirst
        }
    ]

    return (
        <AutoTable
            expandRowTable={expandRowTable}
            keyField='id' data={catalogs} columns={columns}
            button={{link: 'catalogcreate', text: 'Добавить каталог'}}/>
    )
}

export default CatalogsTable
