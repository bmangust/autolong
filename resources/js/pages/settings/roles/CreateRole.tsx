// React
import React from 'react'

// Third-party
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Styles
import classes from './CreateRole.module.css'

// Actions
import {createRole} from '../../../store/actions/roles'

// App
import Form from '../../../components/UI/Form/Form'
import Input from '../../../components/UI/Inputs/Input/Input'
import InputCheckbox
    from '../../../components/UI/Inputs/InputCheckbox/InputCheckbox'

const CreateRole: React.FC = () => {
    const dispatch = useDispatch()

    const schema = yup.object().shape({
        name: yup.string().required('Поле обязательно к заполнению')
    })

    const {register, handleSubmit, errors} =
        useForm({resolver: yupResolver(schema)})

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
            dispatch(createRole(formValues))
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
                <InputCheckbox
                    name='ordersCreate'
                    ref={register}
                    label='Создание заказа'/>
                <InputCheckbox
                    name='ordersUpdate'
                    ref={register}
                    label='Редактирование информации о заказе'/>
                <InputCheckbox
                    name='ordersShowCargo'
                    ref={register}
                    label='Показывать заказы карго?'/>
                <InputCheckbox
                    name='ordersIndex'
                    ref={register}
                    label='Доступ в раздел и просмотр информации'/>
                <InputCheckbox
                    name='ordersDelete'
                    ref={register}
                    label='Удаление заказа'/>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Контейнеры</p>
                </div>
                <InputCheckbox
                    name='containersCreate'
                    ref={register}
                    label='Создание контейнера'/>
                <InputCheckbox
                    name='containersUpdate'
                    ref={register}
                    label='Редактирование информации о контейнере'/>
                <InputCheckbox
                    name='containersIndex'
                    ref={register}
                    label='Просмотр информации о контейнере'/>
                <InputCheckbox
                    name='containersDelete'
                    ref={register}
                    label='Удаление контейнера'/>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Каталоги</p>
                </div>
                <InputCheckbox
                    name='catalogsCreate'
                    ref={register}
                    label='Добавление нового каталога'/>
                <InputCheckbox
                    name='catalogsUpdate'
                    ref={register}
                    label='Редактирование информации о каталоге'/>
                <InputCheckbox
                    name='catalogsIndex'
                    ref={register}
                    label='Просмотр информации о каталоге'/>
                <InputCheckbox
                    name='catalogsDelete'
                    ref={register}
                    label='Удаление каталога'/>
            </div>


            <div className='row mb-4'>
                <div className="col-12">
                    <p>Товары</p>
                </div>
                <InputCheckbox
                    name='productsCreate'
                    ref={register}
                    label='Добавление нового товара'/>
                <InputCheckbox
                    name='productsUpdate'
                    ref={register}
                    label='Редактирование информации о товаре'/>
                <InputCheckbox
                    name='productsIndex'
                    ref={register}
                    label='Просмотр информации о товаре'/>
                <InputCheckbox
                    name='productsDelete'
                    ref={register}
                    label='Удаление товара'/>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Поставщики</p>
                </div>
                <InputCheckbox
                    name='providersCreate'
                    ref={register}
                    label='Добавление нового поставщика'/>
                <InputCheckbox
                    name='providersUpdate'
                    ref={register}
                    label='Редактирование информации о поставщике'/>
                <InputCheckbox
                    name='providersIndex'
                    ref={register}
                    label='Просмотр информации о поставщике'/>
                <InputCheckbox
                    name='providersDelete'
                    ref={register}
                    label='Удаление поставщика'/>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Импортеры</p>
                </div>
                <InputCheckbox
                    name='importersCreate'
                    ref={register}
                    label='Добавление нового импортёра'/>
                <InputCheckbox
                    name='importersUpdate'
                    ref={register}
                    label='Редактирование информации об импортёре'/>
                <InputCheckbox
                    name='importersIndex'
                    ref={register}
                    label='Просмотр информации об импортёре'/>
                <InputCheckbox
                    name='importersDelete'
                    ref={register}
                    label='Удаление импортёра'/>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Доступ администратора</p>
                </div>
                <InputCheckbox
                    name='userRolesCreate'
                    ref={register}
                    label='Создание роли'/>
                <InputCheckbox
                    name='userRolesUpdate'
                    ref={register}
                    label='Редактирование роли'/>
                <InputCheckbox
                    name='userRolesIndex'
                    ref={register}
                    label='Просмотр роли'/>
                <InputCheckbox
                    name='userRolesDelete'
                    ref={register}
                    label='Удаление роли'/>

                <InputCheckbox
                    name='userCreate'
                    ref={register}
                    label='Добавление нового пользователя'/>
                <InputCheckbox
                    name='userUpdate'
                    ref={register}
                    label='Редактирование информации пользователя'/>
                <InputCheckbox
                    name='userIndex'
                    ref={register}
                    label='Просмотр информации о пользователе'/>
                <InputCheckbox
                    name='userDelete'
                    ref={register}
                    label='Удаление пользователя'/>
            </div>

            <div className='row mb-4'>
                <div className="col-12">
                    <p>Дополнительно</p>
                </div>
                <InputCheckbox
                    name='logsIndex'
                    ref={register}
                    label='Просмотр лог'/>
            </div>

            <div>
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

export default CreateRole
