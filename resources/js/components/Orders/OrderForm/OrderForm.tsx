// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import Select from 'react-select'

// Typescript
import {IProvider, IProvidersRootState} from '../../Providers/IProviders'
import {IOrdersRootState} from '../IOrders'

// Actions
import {createOrder, fetchItemsByVendors} from '../../../store/actions/orders'
import {fetchProviders} from '../../../store/actions/providers'

// App
import OrderItems from '../OrderItems/OrderItems'
import {currencyConversion} from '../../../utils'

interface ICreateOrderData {
    name: string
    providerId: string
    items: []
    cargo: number
}

const OrderForm: React.FC = () => {
    let totalPrice = 0
    const {register, handleSubmit, control, errors, setValue} =
        useForm<ICreateOrderData>()

    const {register: register2, handleSubmit: handleSubmit2} =
        useForm<ICreateOrderData>()

    const dispatch = useDispatch()

    const {providers} = useSelector((state: IProvidersRootState) => ({
        providers: state.providersState.providers
    }))

    const {orderProducts} = useSelector((state: IOrdersRootState) => ({
        orderProducts: state.ordersState.orderProducts
    }))

    const [items, setItems] = useState(() => {
        return orderProducts
            .filter((el) => 'id' in el)
            .map((el) => (el.id ? {...el, quantity: 1} : el))
    })

    const providersOptions = providers.map((provider: IProvider) => {
        return {
            label: provider.name,
            value: provider.id
        }
    })

    useEffect(() => {
        dispatch(fetchProviders())
    }, [dispatch])

    if (items.length) {
        setValue(
            'providerId',
            providersOptions
                .filter(({value}) =>
                    value === items[0]?.providerId)[0]
        )
    }

    const onChangeQtyHandler = (e, itemId: number) => {
        const value = +e.target.value
        const newItems = items.map((el) =>
            el.id === itemId ? {...el, quantity: value} : el
        )
        setItems(newItems)
    }

    const onChangePrice = (e, itemId: number, currencyCode) => {
        const value = e.target.value
        const newPrice = currencyConversion(+value, currencyCode)
        const newItems = items.map((el) =>
            el.id === itemId ? {...el, price: newPrice} : el
        )
        setItems(newItems)
    }

    const onDeleteHandler = (itemId: number) => {
        const newItems = items.filter((el) => el.id !== itemId)
        setItems(newItems)
    }

    const select = (
        <Select
            placeholder='Выберите поставщика'
            classNamePrefix='select-mini'
            className='select-mini'
        />
    )

    const orderFormSubmitHandler = handleSubmit(
        (formValues: ICreateOrderData) => {
            formValues.cargo = formValues.cargo ? 1 : 0
            formValues.items = items
            formValues.providerId = formValues.providerId.value
            dispatch(createOrder(formValues, '/orders'))
        }
    )

    const getProductSubmitHandler = handleSubmit2((formValues) => {
        totalPrice = 0
        dispatch(fetchItemsByVendors(formValues))
    })

    return <>
        <form onSubmit={getProductSubmitHandler}>
            <div className='card mb-3'>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-lg-7'>
                            <label htmlFor='articles'>
                                Добавить товар по внутреннему номер
                            </label>
                            <textarea
                                ref={register2}
                                name='numbers'
                                rows={4}
                                placeholder='
                            Добавляйте каждый внутреннему номер через enter
                            '/>
                        </div>
                    </div>
                    <button className='btn btn-success mt-2' type='submit'>
                        Добавить товары
                    </button>
                </div>
            </div>
        </form>

        <form onSubmit={orderFormSubmitHandler}>
            <div className='card mb-3'>
                <div className='card-body'>
                    <div className='mb-3 row'>
                        <div className='col-lg-6'>
                            <label className='w-100 required'
                                   htmlFor='name'>
                                Название заказа
                            </label>
                            <input
                                className='col-lg-10 mb-3'
                                name='name'
                                ref={register({required: true})}
                                placeholder='Введите название'
                                type='text'/>
                            {errors.name && (
                                <small>Это поле обязательно</small>
                            )}

                            <label
                                className='w-100 required'
                                htmlFor='provider'>
                                Выберите поставщика
                            </label>
                            <div className='col-lg-10 mb-3 p-0'>
                                <Controller
                                    defaultValue=''
                                    name='providerId'
                                    as={select}
                                    options={providersOptions}
                                    control={control}
                                    rules={{required: true}}
                                />
                                {errors.providerId && (
                                    <small>Это поле обязательно</small>
                                )}
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <label className='w-100' htmlFor='provider'>
                                Статус карго
                            </label>
                            <div className='custom-control custom-switch'>
                                <input
                                    type='checkbox'
                                    name='cargo'
                                    ref={register}
                                    className='custom-control-input'
                                    id='customSwitch1'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card mb-3'>
                <div className='card-body'>
                    <h2 className='mb-3'>Список товаров в заказе</h2>
                    <OrderItems
                        onDelete={onDeleteHandler}
                        onChange={onChangeQtyHandler}
                        onChangePrice={onChangePrice}
                        items={items}/>
                    <div className='text-right mb-3 mt-3'>
                        Итоговая стоимость
                        <span className='ml-4 font-weight-bold'>
                                {items.map((el) => {
                                    totalPrice =
                                        totalPrice + el.price.cny * el.quantity
                                })}
                            {totalPrice + ' ¥'}
                        </span>
                    </div>
                    <div className='flex-sm-row flex-column
                        d-flex justify-content-between mt-4'>
                        <button className='btn btn-success' type='submit'>
                            Сформировать
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </>
}

export default OrderForm
