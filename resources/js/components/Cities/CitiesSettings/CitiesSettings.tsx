// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Typescript

// Actions
import {
    createCity,
    deleteCityById,
    fetchCities
} from '../../../store/actions/cities'

// App
import Error from '../../UI/Error/Error'
import CountryCitiesForm from '../../General/CountryCitiesForm'
import {ICitiesRootState} from '../ICities'


const CitiesSettings: React.FC = () => {
    const dispatch = useDispatch()

    const {cities, error} = useSelector(
        (state: ICitiesRootState) => ({
            cities: state.citiesState.cities,
            error: state.citiesState.error
        }))

    useEffect(() => {
        dispatch(fetchCities())
    }, [dispatch])

    if (error) {
        return <Error/>
    }
    return <CountryCitiesForm
        addAction={createCity}
        removeAction={deleteCityById}
        data={cities}
        placeholder='Укажите город'
        title='Настройки городов'
        label='Город'/>
}

export default CitiesSettings
