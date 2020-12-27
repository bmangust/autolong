// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

// Typescript
import {IProvidersRootState} from '../../components/Providers/IProviders'
import {IProduct, IProductsRootState} from '../../components/Products/IProducts'

// Actions
import {fetchProviders} from '../../store/actions/providers'
import {fetchProductById} from '../../store/actions/products'

// App
import ProductFormEdit
    from '../../components/Products/ProductForm/ProductFormEdit'
import Loader from '../../components/UI/Loader/Loader'

const ProductEdit: React.FC = () => {
    const {id, unpublished}: any = useParams()
    const dispatch = useDispatch()

    const {providers, loadingProvider} = useSelector(
        (state: IProvidersRootState) => ({
            providers: state.providersState.providers,
            loadingProvider: state.providersState.loading
        }))

    const {product, loading, error} = useSelector(
        (state: IProductsRootState) => ({
            error: state.productsState.error,
            product: state.productsState.product,
            loading: state.productsState.loading
        })
    )

    useEffect(() => {
        dispatch(fetchProviders())
        dispatch(fetchProductById(id))
    }, [dispatch, id])

    if (error) {
        return <div>Error! {error.message}</div>
    }
    if (loading || loadingProvider) {
        return <Loader/>
    }

    return (
        <ProductFormEdit
            unpublished={unpublished}
            product={product as IProduct}
            providers={providers}/>
    )
}

export default ProductEdit
