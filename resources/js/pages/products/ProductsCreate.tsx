// React
import React from 'react'

// Third-party
import ProductFormEdit
    from '../../components/Products/ProductForm/ProductFormEdit'
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'

// Typescript
import {IOrdersRootState} from '../../components/Orders/IOrders'
import {IProduct, IProductAutolong} from '../../components/Products/IProducts'

// Actions
import {fetchProductsByVendor} from '../../store/actions/orders'


const ProductsCreate: React.FC = () => {
    const dispatch = useDispatch()

    const {
        register, handleSubmit
    } = useForm()

    const {orderProducts} = useSelector(
        (state: IOrdersRootState) => ({
            orderProducts: state.ordersState.orderProducts
        }))

    const getProductSubmitHandler =
        handleSubmit((formValues) => {
            dispatch(fetchProductsByVendor(formValues))
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
            {orderProducts.map((product: IProduct | IProductAutolong) => {
                return <ProductFormEdit
                    key={'id' in product
                        ? product.id
                        : product.number + product.articul}
                    product={product}/>
            })}
        </>
    )
}

export default ProductsCreate
