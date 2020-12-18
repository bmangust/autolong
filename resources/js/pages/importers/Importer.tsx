// React
import React, {useContext, useEffect} from 'react'

// Third-party
import {NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// Actions
import {fetchImporterById} from '../../store/actions/importers'

// Typescript
import {
    IImporter,
    IImportersRootState
} from '../../components/Importers/IImporters'

// App
import Loader from '../../components/UI/Loader/Loader'
import Error from '../../components/UI/Error/Error'
import SandboxFilesCard from '../../components/SandboxCard/SandboxFilesCard'
import {SanctumContext} from '../../Sanctum'

const Importer: React.FC<IImporter> = () => {
    const {id}: any = useParams()
    const {user} = useContext(SanctumContext)

    const dispatch = useDispatch()

    const {importer, loading, error} = useSelector(
        (state: IImportersRootState) => ({
            error: state.importersState.error,
            importer: state.importersState.importer,
            loading: state.importersState.loading
        })
    )

    useEffect(() => {
        dispatch(fetchImporterById(id))
    }, [dispatch, id])

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    return (
        <div className='row'>
            <div className='col-lg-8'>
                <div className="card mb-3">
                    <div className="card-body-info">
                        <div className="row mb-3">
                            <div className="col-lg-5 infoBlockHeaders">
                                <p>Название:</p>
                                <p>Name:</p>
                                <p>Телефон:</p>
                                <p>Адрес:</p>
                            </div>
                            <div className="col-lg-7 infoBlockText">
                                <p>{'nameRu' in importer
                                    ? importer.nameRu
                                    : ''}</p>
                                <p>{'nameEn' in importer
                                    ? importer.nameEn
                                    : ''}</p>
                                <p>{'phone' in importer
                                    ? importer.phone
                                    : ''}</p>
                                <p>{'address' in importer
                                    ? importer.address
                                    : ''}</p>
                            </div>
                        </div>
                        {user && user.role.accesses.importersUpdate == 1
                            ? <NavLink
                                to={`/importeredit/${id}`}
                                className='editButton'>
                                Редактировать
                            </NavLink>
                            : null
                        }
                    </div>
                </div>
                <SandboxFilesCard
                    id={importer.id}
                    sandboxFiles={importer.sandboxFiles}
                    page='importers'
                />
            </div>
            <div className='col-lg-4'>
                <div className="card">
                    <div className="card-body">
                        Текущие заказы
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Importer
