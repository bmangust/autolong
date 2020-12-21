// React
import React, {useContext, useEffect} from 'react'

// Third-party
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'

// Actions
import {fetchUsers} from '../../store/actions/users'

// Typescript
import {IUsersRootState} from './IUsers'
import {IRole} from '../Roles/IRoles'

// App
import AutoTable from '../UI/AutoTable/AutoTable'
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import Placeholder from '../UI/Placeholder/Placeholder'
import SvgEdit from '../UI/iconComponents/Edit'
import {SanctumContext} from '../../Sanctum'

const UsersTable = () => {
    const dispatch = useDispatch()
    const {user} = useContext(SanctumContext)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const {users, loading, error} = useSelector((state: IUsersRootState) => ({
        users: state.usersState.users,
        loading: state.usersState.loading,
        error: state.usersState.error
    }))

    const roleFormatter = (role: IRole, row) => {
        return <div className='d-flex justify-content-between'>
            <NavLink to={`/settings/role/${role.id}`}>
                {role.name}
            </NavLink>
            <NavLink to={`/settings/user/edit/${row.id}`}>
                <SvgEdit/>
            </NavLink>
        </div>
    }

    const nameFormatter = (name, row) => {
        return `${name} ${row.lastname}`
    }

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Сотрудник',
            classes: 'title',
            sort: true,
            formatter: nameFormatter
        },
        {
            dataField: 'role',
            text: 'Роль',
            classes: 'title',
            formatter: roleFormatter
        }
    ]
    if (error) {
        return <Error/>
    }
    if (loading) {
        return <Loader/>
    }
    if (!users.length) {
        return <Placeholder
            description='Нажмите на кнопку «Добавить сотрудника», чтобы он отображался в списке'
            link={user && user.role.accesses.userCreate == 1 ? 'settings/users/add' : undefined}
            linkName='Добавить сотрудника'
            title='В этом списке ещё нет сотрудников'/>
    }
    return <AutoTable
        keyField='id'
        data={users}
        rowClickLink='settings/user'
        button={user && user.role.accesses.userCreate == 1
            ? {link: 'settings/users/add', text: 'Добавить сотрудника'}
            : undefined}
        columns={columns}/>
}

export default UsersTable
