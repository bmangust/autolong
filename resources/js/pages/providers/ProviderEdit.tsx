// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

// Typescript
import {IProvidersRootState} from '../../components/Providers/IProviders'
import {ICountriesRootState} from '../../components/Сountries/ICountries'
import {ICatalogsRootState} from '../../components/Catalogs/ICatalogs'

// Actions
import {fetchCountries} from '../../store/actions/countries'
import {fetchCatalogs} from '../../store/actions/catalogs'
import {fetchProviderById} from '../../store/actions/providers'

// App
import ProviderFormEdit
    from '../../components/Providers/ProviderForm/ProviderFormEdit'
import Loader from '../../components/UI/Loader/Loader'
import Error from '../../components/UI/Error/Error'

const ProviderEdit: React.FC = () => {
    const {id}: any = useParams()
    const dispatch = useDispatch()

    const {provider, loading, error} = useSelector(
        (state: IProvidersRootState) => ({
            provider: state.providersState.provider,
            loading: state.providersState.loading,
            error: state.providersState.error
        }))

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

    useEffect(() => {
        dispatch(fetchCountries())
        dispatch(fetchProviderById(id))
        dispatch(fetchCatalogs())
    }, [dispatch, id])

    if (error || errorCountries || errorCatalogs) {
        return <Error/>
    }
    if (loading || loadingCountries || loadingCatalogs) {
        return <Loader/>
    }

    return (
        <ProviderFormEdit
            provider={provider}
            countries={countries}
            catalogs={catalogs}
        />
    )
}

export default ProviderEdit
