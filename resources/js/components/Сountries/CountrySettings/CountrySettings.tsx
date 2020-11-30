// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Typescript
import {ICountriesRootState} from '../ICountries'

// Actions
import {
    createCountry,
    deleteCountryById,
    fetchCountries
} from '../../../store/actions/countries'

// App
import Error from '../../UI/Error/Error'
import CountryCitiesForm from '../../General/CountryCitiesForm'

const CountrySettings: React.FC = () => {
    const dispatch = useDispatch()

    const {countries, error} = useSelector(
        (state: ICountriesRootState) => ({
            countries: state.countriesState.countries,
            error: state.countriesState.error
        }))

    useEffect(() => {
        dispatch(fetchCountries())
    }, [dispatch])

    if (error) {
        return <Error/>
    }
    return <CountryCitiesForm
        addAction={createCountry}
        removeAction={deleteCountryById}
        data={countries}
        placeholder='Укажите страну'
        title='Настройки стран'
        label='Страна'/>
}

export default CountrySettings
