// React
import React, {useState} from 'react'

// Styles
import classes from './OrderPackages.module.css'

// Third-party
import {useDispatch} from 'react-redux'

// Typescript
import {IProduct} from '../Products/IProducts'

// Actions
import {createOrderInvoice} from '../../store/actions/orders'

// App
import Package from './Package/Package'
import SvgCube from '../UI/iconComponents/Cube'

const OrderPackages: React.FC<{
    setIsOpen: Function
    containerId: number
    items: IProduct[]
    packingList: boolean
    orderId: number
}> = (
    {items, packingList, orderId, containerId, setIsOpen}) => {
    const [data, setData] = useState<any>({})
    const dispatch = useDispatch()

    const createPackageHandler = () => {
        data.old = packingList ? 1 : 0
        dispatch(createOrderInvoice(orderId, data, 'packinglist', containerId))
        setIsOpen(false)
    }

    return <div>
        <div className='mb-3'>
            {items && items.length
                ? items.map((item) =>
                    <Package
                        key={item.id}
                        setData={setData}
                        item={item}/>)
                : null
            }
        </div>
        <div className={classes.btns}>
            {items && Object.keys(data).length === items.length
                ? <div>
                    <SvgCube/>
                    <button className='btn btn-success'
                            onClick={createPackageHandler}>
                        Сформировать упаковочный лист для контейнера
                    </button>
                </div>
                : null
            }
        </div>
    </div>
}

export default OrderPackages
