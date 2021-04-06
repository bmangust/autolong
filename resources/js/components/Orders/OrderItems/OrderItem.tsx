// React
import React, {useEffect, useState} from 'react'
import classes from './OrderItems.module.css'
import {imgFormatter, moneyFormatter, useDebounce} from '../../../utils'
import SvgClose from '../../UI/iconComponents/Close'
import {IProduct} from '../../Products/IProducts'
import Input from '../../UI/Inputs/Input/Input'

type Props = {
    item: IProduct
    onChange: Function
    onDelete: Function
    onChangePrice: Function
}

const OrderItem: React.FC<Props> = (props) => {
    const {item, onChange, onChangePrice, onDelete} = props
    const [price, setPrice] = useState(item.price.cny.toString())
    const debouncedPrice = useDebounce(price, 700)

    useEffect(() => {
        onChangePrice(debouncedPrice, item.id, 'cny')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedPrice])

    return <div key={item.id + item.nameRu} className={classes.products + ' row mb-2'}>
        <div className={classes.productImg + ' col-xl-1'}>
            {imgFormatter(item.image, null, item.nameRu, 'pt-2')}
        </div>
        <div className='col-xl-4 pr-0'>
            <p className={classes.productName}>{item.nameRu}</p>
        </div>
        <div className='col-xl-2 d-flex align-items-center'>
            <input
                name='qty'
                data-id={item.id}
                className={classes.productCount + ' pr-1'}
                defaultValue='1'
                onChange={(e) => onChange(e, item.id)}
                type='number'
            />
        </div>
        <div className='col-xl-4 pr-xl-0'>
            <div className={classes.productPrices}>
                <Input
                    className={classes.productCount + ' mt-0'}
                    name='priceCny'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type='number'
                />
                {item.price
                    ? moneyFormatter(item.price, ['cny'])
                    : null}
            </div>
        </div>
        <div className={classes.deleteButton + ' col-xl-1 text-right pr-xl-4 pr-2'}>
            <SvgClose
                onClick={() => onDelete(item.id)}
                className='mt-lg-3 mt-0 deleteButton'
            />
        </div>
    </div>
}

export default OrderItem
