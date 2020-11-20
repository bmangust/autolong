// React
import React, {useState} from 'react'

// Styles
import classes from './OrderPackages.module.css'

// Third-party
import Collapse from 'react-bootstrap/cjs/Collapse'
import {useDispatch} from 'react-redux'

// Typescript
import {IProduct} from '../Products/IProducts'

// Actions
import {createOrderInvoice} from '../../store/actions/orders'

// App
import Package from './Package/Package'
import SvgCube from '../UI/iconComponents/Cube'

const OrderPackages: React.FC<{ items: IProduct[], orderId: number }> = (
    {items, orderId}) => {
    const [show, isShow] = useState(false)
    const [data, setData] = useState({})
    const dispatch = useDispatch()

    const showPackagesHandler = () => {
        console.log(data)
        isShow(oldState => !oldState)
    }

    const createPackageHandler = () => {
        dispatch(createOrderInvoice(orderId, data, 'packinglist'))
    }

    return <div className="card card-body mb-3">
        <h2 className='mb-4'>Упаковка</h2>
        <Collapse in={show}>
            <div>
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
            </div>
        </Collapse>
        <div className={classes.btns}>
            <SvgCube width='50' height='50'/>
            <button onClick={showPackagesHandler}
                    className='btn btn-outline-dashed'>
                {show ? 'Скрыть' : 'Показать'} упаковочный лист
            </button>
            {items && Object.keys(data).length === items.length
                ? <button className='btn btn-success'
                        onClick={createPackageHandler}>
                    Сформировать упаковочный лист для контейнера
                </button>
                : null
            }
        </div>
    </div>
}

export default OrderPackages
