// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'

// Typescript
import {IProductsRootState} from '../../components/Products/IProducts'
import {IProvidersRootState} from '../../components/Providers/IProviders'
import {IOrdersRootState} from '../../components/Orders/IOrders'

// Actions
import {fetchProductsByVendors} from '../../store/actions/products'
import {fetchProviders} from '../../store/actions/providers'

// App
import ProductsForms from '../../components/Products/ProductForm/ProductsForms'
import Error from '../../components/UI/Error/Error'
import Loader from '../../components/UI/Loader/Loader'
import Form from '../../components/UI/Form/Form'
import Input from '../../components/UI/Inputs/Input/Input'


const ProductsCreate: React.FC = () => {
    const dispatch = useDispatch()
    const {unpublished}: any = useParams()
    const [count, setCount] = useState<string | number>('')
    const [newProducts, setNewProducts] = useState<null | { number: number }[]>(null)
    const [errorInput, setErrorInput] = useState(false)

    const {notFound} = useSelector(
        (state: IOrdersRootState) => ({
            notFound: state.ordersState.notFound
        }))

    let numbers
    if (notFound && notFound.length) {
        numbers = notFound.join('\n')
    }

    const {register, handleSubmit} = useForm({
        defaultValues: {
            numbers: numbers || ''
        }
    })

    const {providers} = useSelector((state: IProvidersRootState) => ({
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

    const getProductSubmitHandler = handleSubmit((formValues) => {
        dispatch(fetchProductsByVendors(formValues, unpublished === 'unpublished' ? 0 : 1))
    })

    const onChangeHandler = (e) => {
        const value = e.target.value
        if (value <= 0) {
            setCount('')
        }
        if (value >= 11) {
            setCount(10)
            setErrorInput(false)
        }
        if (value > 0 && value < 11) {
            setCount(+value)
            setErrorInput(false)
        }
    }

    const addNewForms = () => {
        if (count) {
            const newArray = new Array(count).fill('')
                .map((_, index) => ({
                    number: index + 1
                }))
            setNewProducts(newArray)
            setErrorInput(false)
        } else {
            setErrorInput(true)
        }
    }

    let contentProduct = <ProductsForms
        unpublished={unpublished}
        vendorProducts={vendorProducts}
        providers={providers}
    />

    if (newProducts) {
        contentProduct = <ProductsForms
            unpublished={unpublished}
            vendorProducts={newProducts}
            providers={providers}
        />
    }
    if (error) {
        contentProduct = <Error/>
    }
    if (vendorLoading) {
        contentProduct = <Loader/>
    }

    return <>
        <Form onSubmit={getProductSubmitHandler}>
            <div className='card mb-3'>
                <div className="card-body">
                    {unpublished !== 'unpublished'
                        ? <>
                            <div className="row">
                                <div className="col-lg-7">
                                    <label htmlFor="articles">
                                        Добавить товары по внутреннему номер
                                    </label>
                                    <textarea
                                        ref={register({required: true})}
                                        name="numbers"
                                        rows={4}
                                        placeholder='Добавляйте каждый внутреннему номер через enter'>
                                    </textarea>
                                </div>
                            </div>
                            <button
                                className='btn btn-success mt-2'
                                type='submit'>
                                Добавить товары
                            </button>
                        </>
                        : <div className="row">
                            <div className="col-lg-6">
                                <Input
                                    helperText='Укажите число от 1 до 10'
                                    error={errorInput}
                                    onChange={(e) => onChangeHandler(e)}
                                    label='Кол-во новых товаров'
                                    name="numbers"
                                    value={count.toString()}
                                    type='number'
                                />
                                <button
                                    style={{marginTop: 36}}
                                    className='btn btn-success'
                                    onClick={() => addNewForms()}
                                    type='button'>
                                    Добавить товары
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Form>
        {contentProduct}
    </>
}

export default ProductsCreate
