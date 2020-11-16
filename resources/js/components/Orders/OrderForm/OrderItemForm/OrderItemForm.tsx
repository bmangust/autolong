// React
import React, {useState} from 'react'

// Third-party
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'

// Typescript
import {IProvider} from '../../../Providers/IProviders'
import {IProduct} from '../../../Products/IProducts'

// Actions
import {createOrder} from '../../../../store/actions/orders'

// Styles
import classes from './OrderItemForm.module.css'

// App
import OrderItems from '../../OrderItems/OrderItems'
import {currencyConversion} from '../../../../utils'

interface ICreateOrderData {
    name: string
    providerId: string
    items: []
    cargo: number
}

const OrderItemForm: React.FC<{
    providers: IProvider[]
    onHide: Function
    providerId: number
    products: IProduct[]
}> = ({providers, providerId, onHide, products}) => {
    const [items, setItems] = useState(() => {
        return products.map((el) => (el.id ? {...el, quantity: 1} : el))
    })
    const {register, handleSubmit, errors} =
        useForm<ICreateOrderData>()

    const dispatch = useDispatch()

    const orderFormSubmitHandler = handleSubmit(
        (formValues: ICreateOrderData) => {
            formValues.cargo = formValues.cargo ? 1 : 0
            formValues.items = items
            formValues.providerId = providerId
            onHide(providerId)
            dispatch(createOrder(formValues))
        }
    )

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
        if (!newItems.length) {
            onHide(providerId)
        }
    }

    let totalPrice = 0

    items.forEach((el) => {
        totalPrice =
            totalPrice + (+el.price.cny) * el.quantity
    })

    return (<div className="card mb-3">
            <form onSubmit={orderFormSubmitHandler}>
                <div className="card-body mb-4 pb-0">
                    <h2 className={classes.provider}>
                        Поставщик:
                        {providers.find(({id}) =>
                            id === providerId).name}
                    </h2>
                    <OrderItems
                        onDelete={onDeleteHandler}
                        onChange={onChangeQtyHandler}
                        onChangePrice={onChangePrice}
                        items={items}
                    />
                </div>

                <div className={classes.form}>
                    <div className='mb-3 row'>
                        <div className='col-lg-6'>
                            <label
                                className='w-100 required'
                                htmlFor='name'
                            >
                                Название заказа
                            </label>
                            <input
                                className='col-lg-10 mb-3'
                                name='name'
                                ref={register({required: true})}
                                placeholder='Введите название'
                                type='text'
                            />
                            {errors.name && (
                                <small>Это поле обязательно</small>
                            )}
                        </div>
                        <div className='col-lg-6'>
                            <label className='w-100' htmlFor='cargo'>
                                Статус карго
                            </label>
                            <div className='custom-control custom-switch'>
                                <input
                                    type='checkbox'
                                    name='cargo'
                                    ref={register}
                                    id={providerId + 'cargo'}
                                    className='custom-control-input'
                                />
                                <label className="custom-control-label"
                                       htmlFor={providerId + 'cargo'}>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <hr className={classes.hr}/>
                        <div className={classes.formFooter}>
                            <div className={classes.submit}>
                                <div className={classes.submitPrice}>
                                    Итоговая стоимость
                                    <span>
                                        {totalPrice + ' ¥'}
                                    </span>
                                </div>
                            </div>
                            <div className={classes.quantity}>
                                Всего товаров поставщика ({items.length})
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-success'
                            type='submit'>
                        Сформировать
                    </button>
                </div>
            </form>
        </div>
    )
}

export default OrderItemForm
