// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'

// Typescript
import {IProvider, IProvidersRootState} from '../../Providers/IProviders'
import {IOrdersRootState} from '../IOrders'

// Actions
import {createOrder, fetchItemsByVendors} from '../../../store/actions/orders'
import {fetchProviders} from '../../../store/actions/providers'

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

    const {
        register: register2, handleSubmit: handleSubmit2
    } = useForm<ICreateOrderData>()

    const dispatch = useDispatch()
    const history = useHistory()

    const {providers} = useSelector(
        (state: IProvidersRootState) => ({
            providers: state.providersState.providers
        }))

    const {orderProducts} = useSelector(
        (state: IOrdersRootState) => ({
            orderProducts: state.ordersState.orderProducts
        }))

    const [items, setItems] = useState([])

    useEffect(() => {
        dispatch(fetchProviders())
        const filtered = orderProducts.filter(el => 'id' in el)
            .map(el => el.id ? {...el, quantity: 1} : el)
        setItems(filtered)
    }, [dispatch, orderProducts])

    const onChangeQtyHandler = (e, itemId: number) => {
        const value = +e.target.value
        const newItems = items
            .map(el => el.id === itemId ? {...el, quantity: value} : el)
        setItems(newItems)
    }

    const onDeleteHandler = (itemId: number) => {
        const newItems = items.filter(el => el.id !== itemId)
        setItems(newItems)
    }

    const orderFormSubmitHandler =
        handleSubmit((formValues: ICreateOrderData) => {
            formValues.cargo = formValues.cargo ? 1 : 0
            formValues.items = items
            dispatch(createOrder(formValues))
            history.push('/orders')
        })

    const getProductSubmitHandler =
        handleSubmit2((formValues) => {
            dispatch(fetchItemsByVendors(formValues))
        })

    return (
        <>

            <form onSubmit={getProductSubmitHandler}>
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-7">
                                <label htmlFor="articles">
                                    Добавить товар по артикулу
                                </label>
                                <textarea
                                    ref={register2}
                                    name="numbers" rows={4}
                                    placeholder='
                            Добавляйте каждый артикул через enter
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
                        <h2 className="mb-3">
                            Список товаров в заказе
                        </h2>
                        <OrderItems
                            onDelete={onDeleteHandler}
                            onChange={onChangeQtyHandler}
                            items={items}/>
                        <div className="text-right mb-3 mt-3">
                            Итоговая стоимость
                            <span
                                className="ml-4 font-weight-bold">
                                {items
                                    .map(
                                        el => +el.price.cny * el.quantity
                                    ) + ' ¥'
                                }
                            </span>
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
        </>
    )
}

export default OrderForm
