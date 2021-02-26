// React
import React, {useEffect, useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'

// Typescript
import {IProvidersRootState} from '../../components/Providers/IProviders'
import {IOrdersRootState} from '../../components/Orders/IOrders'

// Styles
import classes from './Orders.module.css'

// Actions
import {fetchItemsByVendors} from '../../store/actions/orders'
import {fetchProviders} from '../../store/actions/providers'

// App
import OrdersForms from '../../components/Orders/OrderForm/OrdersForms'
import ProductsForms from '../../components/Products/ProductForm/ProductsForms'
import {Accordion, Button} from 'react-bootstrap'

const OrdersCreate: React.FC = () => {
    const dispatch = useDispatch()
    const [newProducts, setNewProducts] = useState<{ number: number }[]>()

    const {register, handleSubmit} = useForm()

    const getProductSubmitHandler = handleSubmit((formValues) => {
        dispatch(fetchItemsByVendors(formValues))
    })

    const {orderProducts, notFound} = useSelector((state: IOrdersRootState) => ({
        orderProducts: state.ordersState.orderProducts,
        notFound: state.ordersState.notFound
    }))

    const {providers} = useSelector((state: IProvidersRootState) => ({
        providers: state.providersState.providers
    }))

    useEffect(() => {
        if (notFound && notFound.length) {
            const newArr: { number: number }[] = []
            notFound.map((item) => {
                newArr.push({number: +item})
            })
            setNewProducts(newArr)
        } else {
            setNewProducts([])
        }
    }, [notFound])

    useEffect(() => {
        dispatch(fetchProviders())
    }, [dispatch])

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
                                ref={register}
                                name='numbers'
                                rows={4}
                                placeholder=' Добавляйте каждый внутреннему номер через enter'
                            />
                            <button
                                className='btn btn-success mt-2'
                                type='submit'>
                                Добавить товары
                            </button>
                        </div>
                        <div className="col-lg-4">
                            {notFound && notFound.length
                                ? <p className={classes.notFound}>
                                    Для артикулов {notFound.join(', ')} не найдены записи.
                                    <span>
                                        Создайте эти товары
                                    </span>
                                </p>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
        {newProducts && newProducts.length
            ? <Accordion defaultActiveKey="0">
                <div className='mb-0'>
                    <Accordion.Toggle as={Button} variant="empty" eventKey="0">
                        Создание товаров
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <ProductsForms
                            unpublished='published'
                            vendorProducts={newProducts}
                            providers={providers}
                            isOrdersPage
                        />
                    </Accordion.Collapse>
                </div>
            </Accordion>
            : null
        }
        {orderProducts && Object.keys(orderProducts).length
            ? <OrdersForms
                items={orderProducts}
                providers={providers}
            />
            : null
        }
    </>
}

export default OrdersCreate
