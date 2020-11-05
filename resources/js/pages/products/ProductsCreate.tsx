// React
import React, {useEffect} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'

// Typescript
import {IProductsRootState} from '../../components/Products/IProducts'
import {IProvidersRootState} from '../../components/Providers/IProviders'

// Actions
import {fetchProductsByVendors} from '../../store/actions/products'
import {fetchProviders} from '../../store/actions/providers'
import ProductsForms from '../../components/Products/ProductForm/ProductsForms'
import Error from '../../components/UI/Error/Error'
import Loader from '../../components/UI/Loader/Loader'


const ProductsCreate: React.FC = () => {
    const dispatch = useDispatch()

    const {
        register, handleSubmit
    } = useForm()

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
            dispatch(fetchProductsByVendors(formValues))
        })

    let contentProduct =
        <div className='card card-body text-center'>
            Выберите товары по внутреннему номеру
        </div>

    if (error) {
        contentProduct = <Error/>
    }
    if (vendorLoading) {
        contentProduct = <Loader/>
    }
    if (!vendorLoading && !error && vendorProducts.length) {
        contentProduct = <ProductsForms
            vendorProducts={vendorProducts}
            providers={providers}
        />
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
