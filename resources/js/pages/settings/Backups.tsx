// react
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {ColumnDescription} from 'react-bootstrap-table-next';

// Actions
import {fetchBackups} from '../../store/actions/settings'

// App
import Error from '../../components/UI/Error/Error';
import Loader from '../../components/UI/Loader/Loader';
import {timeConverter} from '../../utils';
import AutoTable from '../../components/UI/AutoTable/AutoTable';

const Backups: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBackups())
    }, [dispatch])
    const {loading, error, backups} = useSelector((state) => ({
        loading: state.settingsState.loading,
        error: state.settingsState.error,
        backups: state.settingsState.backups
    }))

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (backups && backups.length === 0) {
        return <div className='card card-body'>Бекапов нет</div>
    }

    const downloadLink = (path) => {
        return <a href={path} download>Скачать бекап</a>
    }

    const columns: ColumnDescription[] = [
        {
            dataField: 'path',
            text: '',
            classes: 'title',
            formatter: (name) => downloadLink(name)
        },
        {
            dataField: 'createdAt',
            text: 'Создан',
            sort: true,
            formatter: timeConverter
        }
    ]

    return <AutoTable keyField='id' data={backups} columns={columns}/>
}

export default Backups
