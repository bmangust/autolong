// React
import React from 'react'

// Third-party
import {useDispatch} from 'react-redux'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {AxiosError} from 'axios'

// Styles
import classes from './CountryCitiesForm.module.css'

// App
import Error from '../UI/Error/Error'
import Form from '../UI/Form/Form'
import SvgClose from '../UI/iconComponents/Close'
import Input from '../UI/Inputs/Input/Input'

const CountryCitiesForm: React.FC<{
    addAction: Function
    removeAction: Function
    error?: AxiosError
    data: any[]
    placeholder: string
    title: string
    label: string
}> = (
    {
        addAction,
        removeAction,
        error,
        data,
        placeholder,
        title,
        label
    }) => {
    const dispatch = useDispatch()

    const schema = yup.object().shape({
        name: yup.string().required('Поле обязательно к заполнению')
    })

    const removeHandler = (id) => {
        dispatch(removeAction(id))
    }

    const {register, handleSubmit, errors} =
        useForm({resolver: yupResolver(schema)})

    const addHandler =
        handleSubmit((formValues) => {
            dispatch(addAction(formValues))
        })

    if (error) {
        return <Error/>
    }
    return <div className='card card-body mb-3'>
        <h2>{title}</h2>
        <div className={classes.countries}>
            {data && data.map((item) =>
                <div className={classes.country} key={item.id}>
                    <span>{item.name}</span>
                    <div onClick={() => removeHandler(item.id)}
                         className={classes.delete}>
                        <SvgClose/>
                    </div>
                </div>
            )}
        </div>
        <Form onSubmit={addHandler}>
            <div className="row mb-3">
                <Input
                    placeholder={placeholder}
                    type='text'
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    ref={register}
                    required={true}
                    label={label}
                    name='name'/>
            </div>
            <button
                type='submit'
                className="btn btn-success">
                Добавить
            </button>
        </Form>
    </div>
}

export default CountryCitiesForm
