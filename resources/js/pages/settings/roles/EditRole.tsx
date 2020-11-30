// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

// Actions
import {fetchRoleById} from '../../../store/actions/roles'

// Typescript
import {IRolesRootState} from '../../../components/Roles/IRoles'

// App
import Error from '../../../components/UI/Error/Error'
import Loader from '../../../components/UI/Loader/Loader'
import EditRoleForm from '../../../components/Roles/EditRoleForm'

const EditRole: React.FC = () => {
    const dispatch = useDispatch()
    const {id}: any = useParams()

    useEffect(() => {
        dispatch(fetchRoleById(id))
    }, [dispatch, id])

    const {role, loading, error} = useSelector(
        (state: IRolesRootState) => ({
            role: state.rolesState.role,
            error: state.rolesState.error,
            loading: state.rolesState.loading
        }))

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    return <EditRoleForm role={role}/>
}

export default EditRole
