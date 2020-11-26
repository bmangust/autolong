// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'

// Typescript
import {IUsersRootState} from '../../../components/Users/IUsers'

// Actions
import {fetchUserById} from '../../../store/actions/users'

// App
import Error from '../../../components/UI/Error/Error'
import Loader from '../../../components/UI/Loader/Loader'

const EditUser: React.FC = () => {
    const dispatch = useDispatch()
    const {id}: any = useParams()

    useEffect(() => {
        dispatch(fetchUserById(id))
    }, [dispatch, id])

    const {user, loading, error} = useSelector(
        (state: IUsersRootState) => ({
            user: state.usersState.user,
            loading: state.usersState.loading,
            error: state.usersState.error
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
                <p>ФИО</p>
                <p>Роль</p>
                <p>E-mail</p>
                <p>Телефон</p>
            </div>
            <div className="col-lg-7 infoBlockText">
                <p>
                    {'lastname' in user
                        ? user.lastname + ' '
                        : ''}
                    {'name' in user
                        ? user.name
                        : ''}
                    {'patronymic' in user
                        ? user.patronymic + ' '
                        : ''}
                </p>
                <p>
                    {'role' in user
                        ? user.role.name
                        : '-'
                    }
                </p>
                <p>
                    {'email' in user
                        ? user.email
                        : '-'
                    }
                </p>
                <p>
                    {'phone' in user
                        ? user.phone
                        : '-'
                    }
                </p>
            </div>
        </div>
        <NavLink to={`/settings/user/edit/${id}`}
                 className='editButton'>
            Редактировать информацию
        </NavLink>
    </div>
}

export default EditUser
