// React
import React from 'react'
import {IProduct} from '../../Products/IProducts'
import {imgFormatter, moneyFormatter} from '../../../utils'

import classes from '../OrderItems/OrderItems.module.css'
import SvgClose from '../../UI/iconComponents/Close'

interface IOrderItems {
    items: IProduct[]
    onChange?: Function
    onDelete?: Function
    onChangePrice?: Function
}

const OrderItems: React.FC<IOrderItems> =
    ({
         items,
         onChange,
         onDelete,
         onChangePrice
     }) => {
        if (!items.length) {
            return (
                <div
                    className={classes.orderProductsNoItems}>
                    В этом списке еще нет товаров
                </div>
            )
        }
        return onChange && onDelete && onChangePrice
            ? items.map((item: IProduct) => {
                return (
                    <div key={item.id + item.nameRu}
                         className={classes.products + ' row mb-2'}>
                        <div className={classes.productImg + ' col-1'}>
                            {imgFormatter(
                                item.image,
                                null,
                                item.nameRu,
                                'pt-2')}
                        </div>
                        <div className="col-4 pr-0">
                            <p className={classes.productName}>
                                {item.nameRu}
                            </p>
                        </div>
                        <div className="col-2">
                            <input data-id={item.id} min={1}
                                   className={classes.productCount + ' pr-1'}
                                   defaultValue={1}
                                   onChange={(e) => onChange(e, item.id)}
                                   type="number"/>
                        </div>
                        <div className='col-4 pr-0'>
                            <p className={classes.productPrices}>
                                <input
                                    min={0}
                                    step={0.01}
                                    className={classes.productCount
                                    + ' mt-0'}
                                    name="priceCny"
                                    value={item.price.cny}
                                    onChange={(e) =>
                                        onChangePrice(e, item.id, 'cny')}
                                    type="number"/>
                                {item.price
                                    ? moneyFormatter(item.price, 'cny')
                                    : null
                                }
                            </p>
                        </div>
                        <div className="col-1 text-right pr-4">
                            <SvgClose onClick={() => onDelete(item.id)}
                                      className='mt-3 deleteButton'/>
                        </div>
                    </div>
                )
            })

            : items.map((item: IProduct) => {
                return (
                    <div key={item.id + item.nameRu}
                         className={classes.orderProducts + ' row mb-2'}>
                        <div className={classes.productImg + ' col-2'}>
                            {imgFormatter(
                                item.image,
                                null,
                                item.nameRu,
                                'pt-2')}
                        </div>
                        <div className="col-4 pl-0 pr-0">
                            <p className={classes.orderProductsName}>
                                {item.nameRu}
                            </p>
                        </div>
                        <div className="col-2">
                            <p className={classes.orderProductsCount}>
                                {item.quantity + ' шт'}
                            </p>
                        </div>
                        <div className='col-4 text-right'>
                            <p className={classes.orderProductsPrice}>
                                {item.price
                                    ? moneyFormatter(item.price)
                                    : null
                                }
                            </p>
                        </div>
                        <div className='col-10 offset-2 pl-0'>
                            <hr/>
                        </div>
                    </div>
                )
            })
    }

export default OrderItems
