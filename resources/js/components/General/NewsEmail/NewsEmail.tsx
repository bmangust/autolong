// React
import React from 'react'

// Third-party
import {useDispatch} from 'react-redux'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

// Actions
import {
    deleteEmailSettings,
    updateEmailSettings
} from '../../../store/actions/settings'

// Styles
import classes from './NewsEmail.module.css'

// App
import Form from '../../UI/Form/Form'
import Input from '../../UI/Inputs/Input/Input'
import Error from '../../UI/Error/Error'
import InputCheckbox from '../../UI/Inputs/InputCheckbox/InputCheckbox'

const NewsEmail: React.FC = (props) => {
    const {errorEmail, emailSettings} = props
    const dispatch = useDispatch()

    const schema = yup.object()
        .shape({
            dispatchTime: yup.string()
                .required('Поле обязательно к заполнению'),
            email: yup.string()
                .email('Укажите корректный email')
                .required('Поле обязательно к заполнению')
        })

    const deleteEmailSettingsHandler = () => {
        dispatch(deleteEmailSettings())
    }

    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: emailSettings.email,
            dispatchTime: emailSettings.dispatchTime,
            notifyWeekend: emailSettings.notifyWeekend == 1
        }
    })

    const saveSettingsHandler =
        handleSubmit((formValues) => {
            formValues.notifyWeekend = formValues.notifyWeekend ? 1 : 0
            dispatch(updateEmailSettings(formValues))
        })
    if (errorEmail) {
        return <Error/>
    }
    if (!emailSettings) {
        return null
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
                    name='email'/>
                <Input
                    placeholder='Укажите время отправки'
                    type='time'
                    error={!!errors.dispatchTime}
                    helperText={errors?.dispatchTime?.message}
                    ref={register}
                    required={true}
                    label='Время отправки'
                    name='dispatchTime'/>
                <div className="col-lg-6">
                    <InputCheckbox
                        ref={register}
                        label='Уведомлять в выходные'
                        name='notifyWeekend'/>
                </div>
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
