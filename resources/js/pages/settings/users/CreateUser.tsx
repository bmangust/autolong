// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import * as yup from 'yup'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {push} from 'connected-react-router'
import Select from 'react-select'

// Typescript
import {IRole, IRolesRootState} from '../../../components/Roles/IRoles'

// Actions
import {createUser} from '../../../store/actions/users'
import {fetchRoles} from '../../../store/actions/roles'

// App
import Form from '../../../components/UI/Form/Form'
import Input from '../../../components/UI/Inputs/Input/Input'

const CreateUser = () => {
    const dispatch = useDispatch()

    const schema = yup.object().shape({
        name: yup.string().required('Поле обязательно к заполнению'),
        lastname: yup.string().required('Поле обязательно к заполнению'),
        roleId: yup.object().required(),
        password: yup.string()
            .min(8, 'Минимальная длина пароль 8 символов')
            .required('Поле обязательно к заполнению'),
        email: yup.string().email('Укажите корректный email')
            .required('Поле обязательно к заполнению')
    })

    const {register, control, handleSubmit, errors} =
        useForm({resolver: yupResolver(schema)})

    const goBackHandler = () => {
        dispatch(push('/settings/users'))
    }

    useEffect(() => {
        dispatch(fetchRoles())
    }, [dispatch])

    const {roles} = useSelector(
        (state: IRolesRootState) => ({
            roles: state.rolesState.roles
        }))

    const roleSelect = <Select
        placeholder='Роль'
        classNamePrefix='select-mini'
        className='select-mini'
    />

    let rolesOptions = []

    if (roles) {
        rolesOptions = roles.map(
            (role: IRole) => {
                return {
                    label: role.name,
                    value: role.id
                }
            })
    }

    const createUserHandler =
        handleSubmit((formValues) => {
            formValues.roleId = formValues.roleId.value
            dispatch(createUser(formValues))
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
                    defaultValue=''
                    name='name'/>

                <Input
                    placeholder='Введите фамилию'
                    type='text'
                    error={!!errors.lastname}
                    helperText={errors?.lastname?.message}
                    ref={register}
                    required={true}
                    label='Фамилия'
                    defaultValue=''
                    name='lastname'/>

                <Input
                    placeholder='Введите отчество'
                    type='text'
                    ref={register}
                    label='Отчество'
                    defaultValue=''
                    name='patronymic'/>
            </div>

            <div className="row">
                <div className='col-lg-6'>
                    <label className='required'
                           htmlFor='roleId'>
                        Выберите роль
                    </label>
                    <Controller
                        name="roleId"
                        as={roleSelect}
                        defaultValue=''
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
                    defaultValue=''
                    name='email'/>

                <Input
                    placeholder='+7 (000)000-00-00'
                    type='text'
                    error={!!errors.phone}
                    helperText={errors?.phone?.message}
                    ref={register}
                    label='Номер телефона'
                    defaultValue=''
                    autoComplete='phone'
                    name='phone'/>

                <Input
                    placeholder='Введите пароль'
                    type='password'
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    ref={register}
                    required={true}
                    label='Пароль'
                    defaultValue=''
                    name='password'/>
            </div>

            <div className="row">
                <div className="col-6">
                    <button
                        type='button'
                        onClick={goBackHandler}
                        className='btn btn-light mr-3'>
                        Назад
                    </button>
                    <button
                        type='submit'
                        className='btn btn-success'>
                        Сохранить
                    </button>
                </div>
            </div>
        </Form>
    </div>
}

export default CreateUser
