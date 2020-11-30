// React
import React from 'react'

// Third-party
import {useDispatch} from 'react-redux'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {push} from 'connected-react-router'

// Styles
import classes from '../../pages/settings/roles/CreateRole.module.css'

// Typescript
import {IRole} from './IRoles'

// Actions
import {updateRole} from '../../store/actions/roles'

// App
import Form from '../UI/Form/Form'
import Input from '../UI/Inputs/Input/Input'
import InputCheckbox from '../UI/Inputs/InputCheckbox/InputCheckbox'

const EditRoleForm: React.FC<{ role: IRole }> = ({role}) => {
    const dispatch = useDispatch()

    const schema = yup.object().shape({
        name: yup.string().required('Поле обязательно к заполнению')
    })

    const defaultValues = {
        name: role.name
    }

    Object.entries(role.accesses)
        .map(([key, value]) => {
            defaultValues[key] = value == 1
        })

    const {register, handleSubmit, errors} =
        useForm({
            defaultValues,
            resolver: yupResolver(schema)
        })

    const goBackHandler = () => {
        dispatch(push('/settings/roles'))
    }

    const createRoleHandler =
        handleSubmit((formValues) => {
            const accesses: any = {}
            Object.entries(formValues).map(([key, value]) => {
                if (key !== 'name') {
                    accesses[key] = value ? 1 : 0
                    delete formValues[key]
                }
            })
            formValues.accesses = accesses
            dispatch(updateRole(formValues, role.id))
        })

    return <div className={classes.form + ' card card-body'}>
        <Form onSubmit={createRoleHandler}>
            <div className="row mb-4">
                <Input
                    placeholder='Введите название роли'
                    type='text'
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    ref={register}
                    required={true}
                    label='Название роли'
                    defaultValue=''
                    name='name'/>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Заказы</p>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='ordersIndex'
                        ref={register}
                        label='Доступ и просмотр информации о заказах'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='ordersCreate'
                        ref={register}
                        label='Создание заказа'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='ordersUpdate'
                        ref={register}
                        label='Редактирование информации о заказе'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='ordersShowCargo'
                        ref={register}
                        label='Показывать заказы карго?'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='ordersDelete'
                        ref={register}
                        label='Удаление заказа'/>
                </div>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Контейнеры</p>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='containersIndex'
                        ref={register}
                        label='Доступ и просмотр информации о контейнере'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='containersCreate'
                        ref={register}
                        label='Создание контейнера'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='containersUpdate'
                        ref={register}
                        label='Редактирование информации о контейнере'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='containersDelete'
                        ref={register}
                        label='Удаление контейнера'/>
                </div>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Каталоги</p>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='catalogsIndex'
                        ref={register}
                        label='Доступ и просмотр информации о каталоге'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='catalogsCreate'
                        ref={register}
                        label='Добавление нового каталога'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='catalogsUpdate'
                        ref={register}
                        label='Редактирование информации о каталоге'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='catalogsDelete'
                        ref={register}
                        label='Удаление каталога'/>
                </div>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Товары</p>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='productsIndex'
                        ref={register}
                        label='Доступ и просмотр информации о товаре'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='productsCreate'
                        ref={register}
                        label='Добавление нового товара'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='productsUpdate'
                        ref={register}
                        label='Редактирование информации о товаре'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='productsDelete'
                        ref={register}
                        label='Удаление товара'/>
                </div>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Поставщики</p>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='providersIndex'
                        ref={register}
                        label='Доступ и просмотр информации о поставщике'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='providersCreate'
                        ref={register}
                        label='Добавление нового поставщика'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='providersUpdate'
                        ref={register}
                        label='Редактирование информации о поставщике'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='providersDelete'
                        ref={register}
                        label='Удаление поставщика'/>
                </div>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Импортеры</p>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='importersIndex'
                        ref={register}
                        label='Доступ и просмотр информации об импортёре'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='importersCreate'
                        ref={register}
                        label='Добавление нового импортёра'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='importersUpdate'
                        ref={register}
                        label='Редактирование информации об импортёре'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='importersDelete'
                        ref={register}
                        label='Удаление импортёра'/>
                </div>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Доступ администратора</p>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='settingsIndex'
                        ref={register}
                        label='Доступ и просмотр информации о настройках'/>
                </div>

                <div className="col-lg-6">
                    <InputCheckbox
                        name='userRolesIndex'
                        ref={register}
                        label='Доступ и просмотр информации о роли'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='userRolesCreate'
                        ref={register}
                        label='Добавление новой роли'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='userRolesUpdate'
                        ref={register}
                        label='Редактирование роли'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='userRolesDelete'
                        ref={register}
                        label='Удаление роли'/>
                </div>

                <div className="col-lg-6">
                    <InputCheckbox
                        name='userIndex'
                        ref={register}
                        label='Доступ и просмотр информации о пользователе'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='userCreate'
                        ref={register}
                        label='Добавление нового пользователя'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='userUpdate'
                        ref={register}
                        label='Редактирование информации пользователя'/>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='userDelete'
                        ref={register}
                        label='Удаление пользователя'/>
                </div>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Дополнительно</p>
                </div>
                <div className="col-lg-6">
                    <InputCheckbox
                        name='logsIndex'
                        ref={register}
                        label='Доступ и просмотр информации о логах'/>
                </div>
            </div>

            <div className={classes.btns}>
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
        </Form>
    </div>
}

export default EditRoleForm
