// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Typescript
import {ICountriesRootState} from '../../components/Сountries/ICountries'
import {ICatalogsRootState} from '../../components/Catalogs/ICatalogs'

// Actions
import {fetchCountries} from '../../store/actions/countries'
import {fetchCatalogs} from '../../store/actions/catalogs'

// App
import ProviderForm from '../../components/Providers/ProviderForm/ProviderForm'
import Loader from '../../components/UI/Loader/Loader'
import Error from '../../components/UI/Error/Error'

const ProviderCreate: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCountries())
        dispatch(fetchCatalogs())
    }, [dispatch])

    const {countries, loadingCountries, errorCountries} = useSelector(
        (state: ICountriesRootState) => ({
            countries: state.countriesState.countries,
            loadingCountries: state.countriesState.loading,
            errorCountries: state.countriesState.error
        }))

    const {catalogs, loadingCatalogs, errorCatalogs} = useSelector(
        (state: ICatalogsRootState) => ({
            catalogs: state.catalogsState.catalogs,
            loadingCatalogs: state.catalogsState.loading,
            errorCatalogs: state.catalogsState.error
        }))

    if (errorCountries || errorCatalogs) {
        return <Error/>
    }
    if (loadingCountries || loadingCatalogs) {
        return <Loader/>
    }

    return (
        <ProviderForm
            countries={countries}
            catalogs={catalogs}
        />
    )
}

export default ProviderCreate
