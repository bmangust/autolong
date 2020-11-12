// React
import React, {useEffect} from 'react'

// Third-party
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Typescript
import {IImportersRootState} from '../../components/Importers/IImporters'

// Actions
import {fetchImporterById} from '../../store/actions/importers'

// App
import ImporterFormEdit
    from '../../components/Importers/ImporterForm/ImporterFormEdit'
import Error from '../../components/UI/Error/Error'
import Loader from '../../components/UI/Loader/Loader'

const ImporterEdit: React.FC = () => {
    const {id}: any = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchImporterById(id))
    }, [dispatch, id])

    const {importer, loading, error} = useSelector(
        (state: IImportersRootState) => ({
            importer: state.importersState.importer,
            loading: state.importersState.loading,
            error: state.importersState.error
        }))

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }

    return (
        <ImporterFormEdit importer={importer}/>
    )
}

export default ImporterEdit
