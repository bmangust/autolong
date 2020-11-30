// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

// Actions
import {
    deleteEmailSettings,
    fetchEmailSettings,
    updateEmailSettings
} from '../../../store/actions/settings'

// Styles
import classes from './NewsEmail.module.css';

// App
import Form from '../../UI/Form/Form'
import Input from '../../UI/Inputs/Input/Input'
import Error from '../../UI/Error/Error'
import Loader from '../../UI/Loader/Loader'


const NewsEmail: React.FC = () => {
    const dispatch = useDispatch()

    const {loadingEmail, errorEmail, emailSettings} = useSelector(
        (state) => ({
            loadingEmail: state.settingsState.loadingEmail,
            errorEmail: state.settingsState.errorEmail,
            emailSettings: state.settingsState.emailSettings
        }))

    const schema = yup.object().shape({
        dispatchTime: yup.string().required('Поле обязательно к заполнению'),
        email: yup.string().email('Укажите корректный email')
            .required('Поле обязательно к заполнению')
    })

    const deleteEmailSettingsHandler = () => {
        dispatch(deleteEmailSettings())
    }

    useEffect(() => {
        dispatch(fetchEmailSettings())
    }, [dispatch])

    const {register, handleSubmit, errors} =
        useForm({resolver: yupResolver(schema)})

    const saveSettingsHandler =
        handleSubmit((formValues) => {
            dispatch(updateEmailSettings(formValues))
        })
    if (errorEmail) {
        return <Error/>
    }
    if (loadingEmail) {
        return <Loader/>
    }
    return <div className='card card-body mb-3'>
        <h2>Настройка отправки писем с новинками</h2>
        <Form onSubmit={saveSettingsHandler}>
            <div className="row mb-3">
                <Input
                    placeholder='E-mail'
                    type='email'
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    ref={register}
                    required={true}
                    label='E-mail'
                    defaultValue={emailSettings.email || ''}
                    name='email'/>
                <Input
                    placeholder='Укажите время отправки'
                    type='time'
                    error={!!errors.dispatchTime}
                    helperText={errors?.dispatchTime?.message}
                    ref={register}
                    required={true}
                    defaultValue={emailSettings.dispatchTime || ''}
                    label='Время отправки'
                    name='dispatchTime'/>
            </div>
            <div className={classes.btns}>
                <button
                    type='submit'
                    className="btn btn-success">
                    Сохранить
                </button>
                <button
                    type='button'
                    onClick={deleteEmailSettingsHandler}
                    className="btn btn-light">
                    Отменить отправку
                </button>
            </div>
        </Form>
    </div>
}

export default NewsEmail
