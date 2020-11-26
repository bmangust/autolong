// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

// Typescript
import {IRolesRootState} from '../../../components/Roles/IRoles'
import {IUsersRootState} from '../../../components/Users/IUsers'

// Actions
import {fetchUserById} from '../../../store/actions/users'
import {fetchRoles} from '../../../store/actions/roles'

// App
import EditUserForm from '../../../components/Users/EditUserForm'
import Error from '../../../components/UI/Error/Error'
import Loader from '../../../components/UI/Loader/Loader'

const EditUser: React.FC = () => {
    const dispatch = useDispatch()
    const {id}: any = useParams()

    useEffect(() => {
        dispatch(fetchRoles())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchUserById(id))
    }, [dispatch, id])

    const {user, loading, error} = useSelector(
        (state: IUsersRootState) => ({
            user: state.usersState.user,
            loading: state.usersState.loading,
            error: state.usersState.error
        }))
    const {roles, loadingRoles} = useSelector(
        (state: IRolesRootState) => ({
            roles: state.rolesState.roles,
            loadingRoles: state.rolesState.loading
        }))
    if (error) {
        return <Error/>
    }
    if (loading || loadingRoles) {
        return <Loader/>
    }
    return <EditUserForm roles={roles} user={user}/>
}

export default EditUser
