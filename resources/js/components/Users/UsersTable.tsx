// React
import React, {useEffect} from 'react'

// Third-party
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'

// Actions
import {fetchUsers} from '../../store/actions/users'

// Typescript
import {IUsersRootState} from './IUsers'

// App
import AutoTable from '../UI/AutoTable/AutoTable'
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import Placeholder from '../UI/Placeholder/Placeholder'

const UsersTable = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const {users, loading, error} = useSelector(
        (state: IUsersRootState) => ({
            users: state.usersState.users,
            loading: state.usersState.loading,
            error: state.usersState.error
        }))

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Сотрудник',
            classes: 'title',
            sort: true
        },
        {
            dataField: 'role',
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
    if (!users.length) {
        return <Placeholder
            description='Нажмите на кнопку «Добавить сотрудника»,
             чтобы он отображался в списке'
            link='/settings/users/add' linkName='Добавить сотрудника'
            title='В этом списке ещё нет сотрудников'/>
    }
    return <AutoTable
        keyField='id'
        data={users}
        button={{link: '/settings/users/add', text: 'Добавить сотрудника'}}
        columns={columns}/>
}

export default UsersTable
