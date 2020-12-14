// React
import React from 'react'
import {IProduct} from '../../Products/IProducts'
import {imgFormatter, moneyFormatter} from '../../../utils'

import classes from '../OrderItems/OrderItems.module.css'
import SvgClose from '../../UI/iconComponents/Close'
import {NavLink} from 'react-router-dom'

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
            <div
                key={item.id + item.nameRu}
                className={classes.products + ' row mb-2'}
            >
                <div className={classes.productImg + ' col-xl-1'}>
                    {imgFormatter(item.image, null, item.nameRu, 'pt-2')}
                </div>
                <div className='col-xl-4 pr-0'>
                    <p className={classes.productName}>{item.nameRu}</p>
                </div>
                <div className='col-xl-2 d-flex align-items-center'>
                    <input
                        data-id={item.id}
                        min={1}
                        className={classes.productCount + ' pr-1'}
                        defaultValue={1}
                        onChange={(e) => onChange(e, item.id)}
                        type='number'
                    />
                </div>
                <div className='col-xl-4 pr-xl-0'>
                    <p className={classes.productPrices}>
                        <input
                            min={0}
                            step={0.01}
                            className={classes.productCount + ' mt-0'}
                            name='priceCny'
                            value={item.price.cny}
                            onChange={(e) => onChangePrice(e, item.id, 'cny')}
                            type='number'
                        />
                        {item.price
                            ? moneyFormatter(item.price, ['cny'])
                            : null}
                    </p>
                </div>
                <div className={
                    classes.deleteButton +
                    ' col-xl-1 text-right pr-xl-4 pr-2'}>
                    <SvgClose
                        onClick={() => onDelete(item.id)}
                        className='mt-lg-3 mt-0 deleteButton'
                    />
                </div>
            </div>
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
                        <div className='row align-items-center mt-1'>
                            <div className='col-xl-2 col-6'>
                                <p className={classes.orderProductsArticle}>
                                    {item.autolongNumber}
                                </p>
                            </div>
                            <div className='col-xl-4 col-6'>
                                <p className={classes.orderProductsItemPrice
                                + ' priceOne'}>
                                    Цена за шт:
                                    {item.price
                                        ? moneyFormatter(item.price,
                                            coursesWithout)
                                        : null}
                                </p>
                            </div>
                            <div className='col-xl-2 col-6'>
                                <p className={classes.orderProductsCount}>
                                    {item.quantity + ' шт'}
                                </p>
                            </div>
                            <div className='col-xl-4 col-6
                            text-xl-right text-left'>
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
