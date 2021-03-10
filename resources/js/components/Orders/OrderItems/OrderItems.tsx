// React
import React from 'react'
import {IProduct} from '../../Products/IProducts'
import {imgFormatter, moneyFormatter} from '../../../utils'

import classes from '../OrderItems/OrderItems.module.css'
import {NavLink} from 'react-router-dom'
import OrderItem from './OrderItem'

interface IOrderItems {
    items: IProduct[]
    onChange?: Function
    onDelete?: Function
    onChangePrice?: Function
    coursesWithout?: string[]
}

const OrderItems: React.FC<IOrderItems> = (
    {
        items,
        onChange,
        onDelete,
        coursesWithout = ['rub', 'usd'],
        onChangePrice
    }) => {
    if (!items || !items.length) {
        return (
            <div className={classes.orderProductsNoItems}>
                В этом списке еще нет товаров
            </div>
        )
    }
    return onChange && onDelete && onChangePrice
        ? items.map((item: IProduct) => (
            <OrderItem
                item={item}
                key={item.id + item.nameRu}
                onChange={onChange}
                onDelete={onDelete}
                onChangePrice={onChangePrice}
            />
        ))
        : <div>
            {items.map((item: IProduct) => (
                <div
                    key={item.id + item.nameRu}
                    className={classes.orderProducts + ' row'}>
                    <div className={classes.productImg + ' col-xl-2'}>
                        {imgFormatter(item.image, null, item.nameRu, 'pt-0')}
                    </div>
                    <div className='col-xl-10'>
                        <NavLink
                            to={`/product/${item.productId}`}
                            className={classes.orderProductsName}>
                            {item.nameRu}
                        </NavLink>
                        <div className='row align-items-baseline mt-1'>
                            <div className='col-xl-2'>
                                <p className={classes.orderProductsArticle}>
                                    {item.autolongNumber}
                                </p>
                            </div>
                            <div className='col-xl-4'>
                                <p className={classes.orderProductsItemPrice + ' priceOne'}>
                                    Цена за шт:
                                    {item.price
                                        ? moneyFormatter(item.price,
                                            coursesWithout)
                                        : null}
                                </p>
                            </div>
                            <div className='col-xl-2'>
                                <p className={classes.orderProductsCount}>
                                    {item.quantity + ' шт'}
                                </p>
                            </div>
                            <div className='col-xl-4 text-xl-right text-left'>
                                <p className={classes.orderProductsPrice}>
                                    {item.fullPrice
                                        ? moneyFormatter(item.fullPrice,
                                            coursesWithout)
                                        : null}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
}

export default OrderItems
