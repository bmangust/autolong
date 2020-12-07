// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

// Typescript
import {ICatalog, ICatalogsRootState} from '../../components/Catalogs/ICatalogs'
import {IProvidersRootState} from '../../components/Providers/IProviders'
import {ITagsRootState} from '../../components/Catalogs/ITags'

// Actions
import {fetchCatalogById} from '../../store/actions/catalogs'
import {fetchProviders} from '../../store/actions/providers'
import {fetchTags} from '../../store/actions/tags'

// App
import CatalogForm from '../../components/Catalogs/CatalogForm/CatalogForm'
import Error from '../../components/UI/Error/Error'
import Loader from '../../components/UI/Loader/Loader'

const CatalogEdit: React.FC = () => {
    const dispatch = useDispatch()
    const {id}: any = useParams()

    useEffect(() => {
        dispatch(fetchCatalogById(id))
        dispatch(fetchProviders())
        dispatch(fetchTags())
    }, [dispatch, id])

    const {catalog, loading, error} = useSelector(
        (state: ICatalogsRootState) => ({
            error: state.catalogsState.error,
            catalog: state.catalogsState.catalog,
            loading: state.catalogsState.loading
        }))

    const {providers, loadingProviders} = useSelector(
        (state: IProvidersRootState) => ({
            providers: state.providersState.providers,
            loadingProviders: state.providersState.loading
        }))

    const {tags, loadingTags} = useSelector(
        (state: ITagsRootState) => ({
            tags: state.tagsState.tags,
            loadingTags: state.tagsState.loading
        }))

    if (error) {
        return <Error/>
    }
    if (loading || loadingTags || loadingProviders) {
        return <Loader/>
    }
    return <CatalogForm
        providers={providers} tags={tags}
        type='edit' catalog={catalog as ICatalog}/>
}

export default CatalogEdit
