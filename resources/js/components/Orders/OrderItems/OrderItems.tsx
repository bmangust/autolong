// React
import React from 'react'
import {IProduct} from '../../Products/IProducts'
import {moneyFormatter} from '../../../utils'

import classes from '../OrderItems/OrderItems.module.css'
import SvgClose from '../../UI/iconComponents/Close'

interface IOrderItems {
    items: IProduct[]
    onChange?: Function
    onDelete?: Function
}

const OrderItems: React.FC<IOrderItems> =
    ({
         items,
         onChange,
         onDelete
     }) => {
        if (!items.length) {
            return null
        }
        return onChange && onDelete
            ? items.map((item: IProduct) => {
                return (
                    <div key={item.id + item.nameRu}
                         className={classes.products + ' row mb-2'}>
                        <div className={classes.productImg + ' col-2'}>
                            <img src={item.image ||
                            '/imgs/placeholder-product-image.png'}
                                 alt={item.nameRu}/>
                        </div>
                        <div className="col-4">
                        <span className={classes.productName}>
                            {item.nameRu}
                        </span>
                        </div>
                        <div className="col-2">
                            <input data-id={item.id} min={1}
                                   className={classes.productCount + ' pr-1'}
                                   defaultValue={1}
                                   onChange={(e) => onChange(e, item.id)}
                                   type="number"/>
                        </div>
                        <div className={classes.productPrices + ' col-3'}>
                            {item.price
                                ? moneyFormatter(item.price)
                                : null
                            }
                        </div>
                        <div className="col-1">
                            <SvgClose onClick={() => onDelete(item.id)}
                                      className='mt-3 deleteButton'/>
                        </div>
                    </div>
                )
            })

            : items.map((item: IProduct) => {
                return (
                    <div key={item.id + item.nameRu}
                         className={classes.orderProducts + ' row'}>
                        <div className={classes.productImg + ' col-2'}>
                            <img src={item.image ||
                            '/imgs/placeholder-product-image.png'}
                                 alt={item.nameRu}/>
                        </div>
                        <div className="col-4 pl-0">
                        <span className={classes.orderProductsName}>
                            {item.nameRu}
                        </span>
                        </div>
                        <div className="col-2">
                            <span className={classes.orderProductsCount}>
                                {item.quantity + ' шт'}
                            </span>
                        </div>
                        <div className="col-4">
                            <span className={classes.orderProductsPrice}>
                                {item.priceCny}
                            </span>
                        </div>
                    </div>
                )
            })
    }

export default OrderItems
