// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'

// Typescript
import {IProductsRootState} from '../../components/Products/IProducts'
import {IProvidersRootState} from '../../components/Providers/IProviders'

// Actions
import {fetchProductsByVendors} from '../../store/actions/products'
import {fetchProviders} from '../../store/actions/providers'

// App
import ProductsForms from '../../components/Products/ProductForm/ProductsForms'
import Error from '../../components/UI/Error/Error'
import Loader from '../../components/UI/Loader/Loader'
import {IOrdersRootState} from '../../components/Orders/IOrders'


const ProductsCreate: React.FC = () => {
    const dispatch = useDispatch()
    const {unpublished}: any = useParams()

    const {notFound} = useSelector(
        (state: IOrdersRootState) => ({
            notFound: state.ordersState.notFound
        }))

    let numbers
    if (notFound && notFound.length) {
        numbers = notFound.join('\n')
    }

    const {
        register, handleSubmit
    } = useForm({
        defaultValues: {
            numbers: numbers || ''
        }
    })

    const {providers} = useSelector(
        (state: IProvidersRootState) => ({
            providers: state.providersState.providers
        }))

    useEffect(() => {
        dispatch(fetchProviders())
    }, [dispatch])

    const {vendorProducts, vendorLoading, error} = useSelector(
        (state: IProductsRootState) => ({
            vendorProducts: state.productsState.vendorProducts,
            vendorLoading: state.productsState.vendorLoading,
            error: state.productsState.error
        }))

    const getProductSubmitHandler =
        handleSubmit((formValues) => {
            dispatch(fetchProductsByVendors(formValues,
                unpublished === 'unpublished' ? 0 : 1))
        })

    let contentProduct =
        <ProductsForms
            unpublished={unpublished}
            vendorProducts={vendorProducts}
            providers={providers}
        />

    if (error) {
        contentProduct = <Error/>
    }
    if (vendorLoading) {
        contentProduct = <Loader/>
    }

    return (
        <>
            <form onSubmit={getProductSubmitHandler}>
                <div className='card mb-3'>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-7">
                                <label htmlFor="articles">
                                    Добавить товары по внутреннему номер
                                </label>
                                <textarea
                                    ref={register({required: true})}
                                    name="numbers" rows={4}
                                    placeholder='
                                    Добавляйте каждый внутреннему
                                    номер через enter
                                    '>
                        </textarea>
                            </div>
                        </div>
                        <button
                            className='btn btn-success mt-2'
                            type='submit'>
                            Добавить товары
                        </button>
                    </div>
                </div>
            </form>
            {contentProduct}
        </>
    )
}

export default ProductsCreate
