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
                        <div className="row">
                            <div className="col-lg-7">
                                <label htmlFor="articles">
                                    Добавить товары по внутреннему номер
                                </label>
                                <textarea
                                    ref={register}
                                    name="numbers" rows={4}
                                    placeholder='
                                    Добавляйте каждый внутреннему номер через enter
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
