// React
import React, {useState} from 'react'

// Third-party
import {useDispatch} from 'react-redux'
import Collapse from 'react-bootstrap/cjs/Collapse'

// Typescript
import {IOrder} from '../Orders/IOrders'

// Actions
import {createOrderInvoice} from '../../store/actions/orders'

// App
import Package from './Package/Package'

const OrderPackages: React.FC<{ orders: IOrder[], containerId: number }> = (
    {orders, containerId}) => {
    const [isShow, setIsShow] = useState(false)
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    const showPackagesHandler = () => {
        setIsShow(oldState => !oldState)
    }

    const createPackageHandler = () => {
        dispatch(createOrderInvoice(containerId, data, 'packinglist'))
    }

    let dataLength = 0

    orders.forEach((order) => {
        dataLength += order.items.length
    })

    return <div className="card card-body mb-3">
        <h2 className='mb-4'>Упаковка</h2>
        <Collapse in={isShow}>
            <div>
                {orders.map(order =>
                    <div key={order.id}>
                        {order.items && order.items.length
                            ? order.items.map((item) =>
                                <Package
                                    orderId={order.id}
                                    key={item.id}
                                    setData={setData}
                                    item={item}/>)
                            : null
                        }
                    </div>
                )}
            </div>
        </Collapse>
        <button onClick={showPackagesHandler}
                className='btn btn-outline-dashed'>
            {isShow ? 'Скрыть' : 'Показать'} упаковку
        </button>
        {data.length === dataLength
            ? <button className='btn btn-success'
                      onClick={createPackageHandler}>
                Сформировать упаковочный лист для контейнера
            </button>
            : null
        }
    </div>
}

export default OrderPackages
