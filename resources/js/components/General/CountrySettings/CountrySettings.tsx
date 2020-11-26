// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

// Typescript
import {ICountriesRootState} from '../../Сountries/ICountries'

// Styles
import classes from './CountrySettings.module.css'

// Actions
import {
    createCountry,
    deleteCountryById,
    fetchCountries
} from '../../../store/actions/countries'

// App
import Form from '../../UI/Form/Form'
import Input from '../../UI/Inputs/Input/Input'
import Error from '../../UI/Error/Error'
import SvgClose from '../../UI/iconComponents/Close'


const CountrySettings: React.FC = () => {
    const dispatch = useDispatch()

    const {countries, error} = useSelector(
        (state: ICountriesRootState) => ({
            countries: state.countriesState.countries,
            error: state.countriesState.error
        }))

    const schema = yup.object().shape({
        name: yup.string().required('Поле обязательно к заполнению')
    })

    const removeCountryHandler = (id) => {
        dispatch(deleteCountryById(id))
    }

    useEffect(() => {
        dispatch(fetchCountries())
    }, [dispatch])

    const {register, handleSubmit, errors} =
        useForm({resolver: yupResolver(schema)})

    const addCountryHandler =
        handleSubmit((formValues) => {
            dispatch(createCountry(formValues))
        })
    if (error) {
        return <Error/>
    }
    // if (loadingEmail) {
    //     return <Loader/>
    // }
    return <div className='card card-body mb-3'>
        <h2>Настройки стран</h2>
        <div className={classes.countries}>
            {countries && countries.map((country) =>
                <div className={classes.country} key={country.id}>
                    <span>{country.name}</span>
                    <div onClick={() => removeCountryHandler(country.id)}
                         className={classes.delete}>
                        <SvgClose/>
                    </div>
                </div>
            )}
        </div>
        <Form onSubmit={addCountryHandler}>
            <div className="row mb-3">
                <Input
                    placeholder='Укажите страну'
                    type='name'
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    ref={register}
                    required={true}
                    label='Страна'
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

export default CountrySettings
