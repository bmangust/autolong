// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'

// Typescript
import {IRolesRootState} from '../../../components/Roles/IRoles'

// Actions
import {fetchRoleById} from '../../../store/actions/roles'


// App
import Error from '../../../components/UI/Error/Error'
import Loader from '../../../components/UI/Loader/Loader'
import roleTranslate from '../../../components/Roles/rolesTranslate.json'

const EditUser: React.FC = () => {
    const dispatch = useDispatch()
    const {id}: any = useParams()

    useEffect(() => {
        dispatch(fetchRoleById(id))
    }, [dispatch, id])

    const {role, loading, error} = useSelector(
        (state: IRolesRootState) => ({
            role: state.rolesState.role,
            loading: state.rolesState.loading,
            error: state.rolesState.error
        }))
    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    return <div className='card card-body-info'>
        <div className="row">
            <div className='col-lg-5 infoBlockHeaders'>
                <p>Название роли </p>
                <p>Доступные права:</p>
            </div>
            <div className="col-lg-7 infoBlockText">
                <p>
                    {'name' in role
                        ? role.name
                        : '-'}
                </p>
            </div>
            {'accesses' in role && Object.entries(role.accesses)
                .map(([key, value]) => {
                    if (key === 'id' ||
                        key === 'createdAt' ||
                        key === 'updatedAt') {
                        return null
                    } else {
                        return <>
                            <div className='col-lg-5 infoBlockHeaders'
                                 key={key}>
                                <p className='pl-3'>
                                    {key in roleTranslate
                                        ? roleTranslate[key] + ':'
                                        : key
                                    }
                                </p>
                            </div>
                            <div className='col-lg-7 infoBlockText'>
                                <p>
                                    {value == 1
                                        ? 'разрешено'
                                        : 'не разрешено'}
                                </p>
                            </div>
                        </>
                    }
                })}
        </div>
        <NavLink to={`/settings/role/edit/${id}`}
                 className='editButton'>
            Редактировать информацию
        </NavLink>
    </div>
}

export default EditUser
