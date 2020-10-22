// React
import React, {useEffect} from 'react'

// Third-party
import ProductFormEdit
    from '../../components/Products/ProductForm/ProductFormEdit'
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'

// Typescript
import {
    IProduct, IProductAutolong,
    IProductsRootState
} from '../../components/Products/IProducts'
import {IProvidersRootState} from '../../components/Providers/IProviders'

// Actions
import {fetchProductsByVendors} from '../../store/actions/products'
import {fetchProviders} from '../../store/actions/providers'


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

    const {vendorProducts} = useSelector(
        (state: IProductsRootState) => ({
            vendorProducts: state.productsState.vendorProducts
        }))

    const getProductSubmitHandler =
        handleSubmit((formValues) => {
            dispatch(fetchProductsByVendors(formValues))
        })
    return (
        <>
            <form onSubmit={getProductSubmitHandler}>
                <div className='card mb-3'>
                    <div className="card-body">
                        <label htmlFor="articles">
                            Добавить товар по артикулу
                        </label>
                        <textarea
                            ref={register}
                            name="vendorCodes" rows={4}
                            placeholder='Каждый артикул через пробел'>
                        </textarea>
                        <button
                            className='btn btn-success'
                            type='submit'>
                            Добавить
                        </button>
                    </div>
                </div>
            </form>
            {vendorProducts.map((product: IProduct | IProductAutolong) => {
                return <ProductFormEdit
                    providers={providers}
                    key={'id' in product
                        ? product.id
                        : product.number + product.articul}
                    product={product}/>
            })}
        </>
    )
}

export default ProductsCreate
