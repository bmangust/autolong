// React
import React, {useContext, useEffect} from 'react'

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
import {SanctumContext} from '../../../Sanctum'

const EditUser: React.FC = () => {
    const dispatch = useDispatch()
    const {id}: any = useParams()
    const {user} = useContext(SanctumContext)

    useEffect(() => {
        dispatch(fetchUserById(id))
    }, [dispatch, id])

    const {userProfile, loading, error} = useSelector(
        (state: IUsersRootState) => ({
            userProfile: state.usersState.user,
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
                    {'lastname' in userProfile && userProfile.lastname
                        ? userProfile.lastname + ' '
                        : ''}
                    {'name' in userProfile && userProfile.name
                        ? userProfile.name + ' '
                        : ''}
                    {'patronymic' in userProfile && userProfile.patronymic
                        ? userProfile.patronymic + ' '
                        : ''}
                </p>
                <p>
                    {'role' in userProfile
                        ? userProfile.role.name
                        : '-'
                    }
                </p>
                <p>
                    {'email' in userProfile
                        ? userProfile.email
                        : '-'
                    }
                </p>
                <p>
                    {'phone' in userProfile
                        ? userProfile.phone
                        : '-'
                    }
                </p>
            </div>
        </div>
        {user && user.role.accesses.userUpdate == 1
            ? <NavLink
                to={`/settings/user/edit/${id}`}
                className='editButton'>
                Редактировать информацию
            </NavLink>
            : null
        }
    </div>
}

export default EditUser
