// React
import React, {useEffect} from 'react'

// Third-party
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'

// Typescript
import {IRolesRootState} from './IRoles'

// Actions
import {fetchRoles} from '../../store/actions/roles'

// App
import AutoTable from '../../components/UI/AutoTable/AutoTable'
import Error from '../../components/UI/Error/Error'
import Loader from '../../components/UI/Loader/Loader'
import Placeholder from '../UI/Placeholder/Placeholder'

const RolesTable: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRoles())
    }, [dispatch])

    const {roles, loading, error} = useSelector(
        (state: IRolesRootState) => ({
            roles: state.rolesState.roles,
            loading: state.rolesState.loading,
            error: state.rolesState.error
        }))

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Роль',
            classes: 'title',
            sort: true
        }
    ]

    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (!roles.length) {
        return <Placeholder
            description='Нажмите на кнопку «Добавить роль»,
             чтобы она отображалась в списке'
            link='/settings/roles/add' linkName='Добавить роль'
            title='В этом списке ещё нет ролей'/>
    }
    return <AutoTable
        keyField='id'
        data={roles}
        button={{link: '/settings/roles/add', text: 'Добавить роль'}}
        columns={columns}/>
}

export default RolesTable
