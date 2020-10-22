// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'

// Typescript
import {IProvider, IProvidersRootState} from '../../Providers/IProviders'
import {IProduct, IProductsRootState} from '../../Products/IProducts'

// Actions
import {createOrder} from '../../../store/actions/orders'
import {fetchProviders} from '../../../store/actions/providers'
import {fetchProducts} from '../../../store/actions/products'

// App
import OrderItems from '../OrderItems/OrderItems'

interface ICreateOrderData {
    name: string
    providerId: string
    items: []
    cargo: number
}

const OrderForm: React.FC = () => {
    const {
        register, handleSubmit
    } = useForm<ICreateOrderData>()

    const [items, setItems] = useState([])
    const [data, setData] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()

    const {providers} = useSelector(
        (state: IProvidersRootState) => ({
            providers: state.providersState.providers
        }))

    const {products} = useSelector(
        (state: IProductsRootState) => ({
            products: state.productsState.products
        }))

    useEffect(() => {
        dispatch(fetchProviders())
        dispatch(fetchProducts())
    }, [dispatch])

    const onChangeQtyHandler = (e, itemId: number) => {
        const value = +e.target.value
        // @ts-ignore
        setData(oldData => [...oldData, oldData.find(({id}) =>
            id === itemId).quantity = value])
    }

    const onDeleteHandler = (itemId: number) => {
        const newData = data.filter(el => el.id !== itemId)
        const newItems = items.filter(el => el.id !== itemId)
        setData(newData)
        setItems(newItems)
    }

    const onChangeHandler = (e) => {
        const product = JSON.parse(e.target.value)
        // @ts-ignore
        setData(oldData => [...oldData, {id: product.id, quantity: 1}])
        setItems(oldItems => [...oldItems, product])
    }

    const orderFormSubmitHandler =
        handleSubmit((formValues: ICreateOrderData) => {
            formValues.items = data.filter(el => typeof el === 'object')
            formValues.cargo = formValues.cargo ? 1 : 0
            dispatch(createOrder(formValues))
            history.push('/orders')
        })

    return (
        <form onSubmit={orderFormSubmitHandler}>
            <div className='card mb-3'>
                <div className="card-body">
                    <div className='mb-3 row'>
                        <div className="col-lg-6">
                            <label className='w-100' htmlFor='name'>
                                Название заказа
                            </label>
                            <input
                                className='col-lg-10 mb-3' name="name"
                                ref={register}
                                placeholder="Введите название" type="text"/>

                            <label className='w-100' htmlFor='provider'>
                                Выберите поставщика
                            </label>
                            <select
                                ref={register}
                                name="providerId"
                                className='col-lg-10'
                            >
                                <option disabled
                                        defaultValue=''>Поставщик
                                </option>
                                {providers.map((provider: IProvider) => {
                                    return (<option
                                        key={provider.id + provider.name}
                                        value={provider.id}>
                                        {provider.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className="col-lg-6">
                            <label className='w-100' htmlFor='provider'>
                                Статус карго
                            </label>
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    name='cargo' ref={register}
                                    className="custom-control-input"
                                    id="customSwitch1"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="customSwitch1">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card mb-3'>
                <div className="card-body">
                    <h2>Список товаров в заказе</h2>
                    <select name="addProduct" onChange={onChangeHandler}
                            className='mb-3'>
                        <option defaultValue=''>
                            Выберите товар
                        </option>
                        {products.map((product: IProduct) => {
                            const isFind = items.find(
                                ({id}) => id === product.id)
                            if (!isFind) {
                                return (<option
                                    key={product.id}
                                    value={JSON.stringify(product)}>
                                    {product.nameRu}</option>)
                            } else {
                                return null
                            }
                        })}
                    </select>
                    <OrderItems
                        onDelete={onDeleteHandler}
                        onChange={onChangeQtyHandler} items={items}/>
                    <div className="text-right mb-3">
                        Итоговая стоимость
                        <span
                            className="ml-4 font-weight-bold"
                        >124 ¥</span>
                    </div>
                    <div
                        className="d-flex justify-content-between mt-4">
                        <button
                            onClick={() => {
                                history.goBack()
                            }} className='mr-3 btn btn-light'>
                            Отмена
                        </button>
                        <button className='btn btn-success'
                                type="submit">
                            Сформировать
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default OrderForm
