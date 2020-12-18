// React
import React, {useContext, useEffect} from 'react'

// Third-party
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'

// Typescript
import {IRolesRootState} from './IRoles'

// Actions
import {fetchRoles} from '../../store/actions/roles'

// App
import AutoTable from '../../components/UI/AutoTable/AutoTable'
import Error from '../../components/UI/Error/Error'
import Loader from '../../components/UI/Loader/Loader'
import Placeholder from '../UI/Placeholder/Placeholder'
import SvgEdit from '../UI/iconComponents/Edit'
import {SanctumContext} from '../../Sanctum'

const RolesTable: React.FC = () => {
    const dispatch = useDispatch()
    const {user} = useContext(SanctumContext)

    useEffect(() => {
        dispatch(fetchRoles())
    }, [dispatch])

    const {roles, loading, error} = useSelector(
        (state: IRolesRootState) => ({
            roles: state.rolesState.roles,
            loading: state.rolesState.loading,
            error: state.rolesState.error
        }))

    const nameFormatter = (name, row) => {
        return <div className='d-flex justify-content-between'>
            <NavLink to={`/settings/role/${row.id}`}>{name}</NavLink>
            <NavLink to={`/settings/role/edit/${row.id}`}>
                <SvgEdit/>
            </NavLink>
        </div>
    }

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Роль',
            classes: 'title',
            sort: true,
            formatter: nameFormatter
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
            description='Нажмите на кнопку «Добавить роль», чтобы она отображалась в списке'
            link={user && user.role.accesses.userRolesCreate == 1 ? 'settings/roles/add' : undefined}
            linkName='Добавить роль'
            title='В этом списке ещё нет ролей'/>
    }

    return <AutoTable
        keyField='id'
        data={roles}
        rowClickLink='settings/role'
        button={user && user.role.accesses.userRolesCreate == 1
            ? {link: 'settings/roles/add', text: 'Добавить роль'}
            : undefined}
        columns={columns}/>
}

export default RolesTable
