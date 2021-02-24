// React
import React from 'react'

// Third-party
import {useDispatch} from 'react-redux'
import * as yup from 'yup'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import Select from 'react-select'
import {useHistory} from 'react-router-dom'

// Typescript
import {IRole} from '../Roles/IRoles'

// Actions
import {deleteUserById, updateUserById} from '../../store/actions/users'

// App
import Form from '../UI/Form/Form'
import Input from '../UI/Inputs/Input/Input'
import {IUser} from './IUsers'

// Styles
import classes from './EditUserForm.module.css'
import SvgDelete from '../UI/iconComponents/Delete'

type Props = {
    roles: IRole[]
    user: IUser
}

const EditUserForm: React.FC<Props> = (props) => {
    const {roles, user} = props
    const dispatch = useDispatch()
    const history = useHistory()

    const rolesOptions = roles.map(
        (role: IRole) => {
            return {
                label: role.name,
                value: role.id
            }
        })

    const schema = yup.object()
        .shape({
            name: yup.string()
                .required('Поле обязательно к заполнению'),
            lastname: yup.string()
                .required('Поле обязательно к заполнению'),
            roleId: yup.object()
                .required(),
            email: yup.string()
                .email('Укажите корректный email')
        })

    const {register, control, handleSubmit, errors} = useForm({
        defaultValues: {
            name: user.name,
            lastname: user.lastname,
            patronymic: user.patronymic,
            phone: user.phone,
            roleId: rolesOptions.filter(({value}) => value === user.role.id)[0],
            email: user.email
        },
        resolver: yupResolver(schema)
    })

    const goBackHandler = () => {
        history.push('/settings/users')
    }

    const deleteUserHandler = () => {
        dispatch(deleteUserById(user.id))
    }

    const roleSelect = <Select
        placeholder='Роль'
        classNamePrefix='select-mini'
        className='select-mini'
    />

    const createUserHandler = handleSubmit((formValues) => {
        formValues.roleId = formValues.roleId.value
        dispatch(updateUserById(formValues, user.id))
    })

    return <div className='card card-body'>
        <Form onSubmit={createUserHandler}>
            <div className="row">
                <Input
                    placeholder='Введите имя сотрудника'
                    type='text'
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    ref={register}
                    required={true}
                    label='Имя'
                    name='name'/>

                <Input
                    placeholder='Введите фамилию'
                    type='text'
                    error={!!errors.lastname}
                    helperText={errors?.lastname?.message}
                    ref={register}
                    required={true}
                    label='Фамилия'
                    name='lastname'/>

                <Input
                    placeholder='Введите отчество'
                    type='text'
                    ref={register}
                    label='Отчество'
                    name='patronymic'/>
            </div>

            <div className="row">
                <div className='col-lg-6'>
                    <label
                        className='required'
                        htmlFor='roleId'
                    >
                        Выберите роль
                    </label>
                    <Controller
                        defaultValue=''
                        name="roleId"
                        as={roleSelect}
                        options={rolesOptions}
                        control={control}
                    />
                    {errors.roleId &&
                    <small style={{color: '#f44a0e'}}>
                        Это поле обязательно
                    </small>}
                </div>
            </div>

            <div className="row">
                <Input
                    placeholder='Введите e-mail'
                    type='email'
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    ref={register}
                    required={true}
                    label='E-mail'
                    name='email'/>

                <Input
                    placeholder='+7 (000)000-00-00'
                    type='text'
                    error={!!errors.phone}
                    helperText={errors?.phone?.message}
                    ref={register}
                    label='Номер телефона'
                    name='phone'/>

                <Input
                    placeholder='Введите пароль'
                    type='password'
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    ref={register}
                    label='Пароль'
                    name='password'/>
            </div>

            <div className="row">
                <div className={classes.btns + ' col-lg-6'}>
                    <button
                        type='button'
                        onClick={goBackHandler}
                        className='btn btn-light'>
                        Назад
                    </button>
                    <button
                        type='submit'
                        className='btn btn-success'>
                        Сохранить
                    </button>
                </div>
                <div className="col-6 mt-auto mb-auto">
                    <button
                        className={classes.delete + ' btn-link btn'}
                        onClick={deleteUserHandler}
                        type='button'>
                        <SvgDelete/>
                        Удалить профиль из системы
                    </button>
                </div>
            </div>
        </Form>
    </div>
}

export default EditUserForm
