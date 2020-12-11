// react
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchBackups} from '../../store/actions/settings'
import Error from '../../components/UI/Error/Error';
import Loader from '../../components/UI/Loader/Loader';
import {timeConverter} from '../../utils';

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
    return <div className='card card-body'>
        {backups.map((backup) => {
            return <a key={backup.id} download href={backup.path}>Скачать бекап от {timeConverter(backup.createdAt)}</a>
        })}
    </div>
}

export default Backups
