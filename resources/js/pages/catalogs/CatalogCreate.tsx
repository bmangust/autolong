// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Typescript
import {IProvidersRootState} from '../../components/Providers/IProviders'
import {ITagsRootState} from '../../components/Catalogs/ITags'

// Actions
import {fetchProviders} from '../../store/actions/providers'
import {fetchTags} from '../../store/actions/tags'

// App
import CatalogForm from '../../components/Catalogs/CatalogForm/CatalogForm'
import Loader from '../../components/UI/Loader/Loader'

const CatalogCreate: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProviders())
        dispatch(fetchTags())
    }, [dispatch])

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

    if (loadingTags || loadingProviders) {
        return <Loader/>
    }

    return <CatalogForm tags={tags} providers={providers}/>
}

export default CatalogCreate
